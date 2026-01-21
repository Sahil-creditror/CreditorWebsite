const fs = require('fs');
const path = require('path');

const MAP_FILE = path.join(__dirname, '../cloudinary-map.json');
const SRC_DIR = path.join(__dirname, '../src');
const PUBLIC_DIR = path.join(__dirname, '../public');

// Extensions to process
const EXTENSIONS = ['.tsx', '.ts', '.js', '.jsx', '.css', '.scss', '.less', '.json'];

// Load map
const urlMap = JSON.parse(fs.readFileSync(MAP_FILE, 'utf8'));

// Prepare replacements
// We want to replace both "/images/foo.png" and "images/foo.png"
// We must replace the version WITH slash first to avoid double replacement issues like "/https://..."
const replacements = [];

Object.entries(urlMap).forEach(([localPath, cloudUrl]) => {
    // localPath is like "/images/foo.png"

    // 1. Exact match with leading slash
    if (localPath.startsWith('/')) {
        replacements.push({
            from: localPath,
            to: cloudUrl
        });

        // 2. Match without leading slash
        replacements.push({
            from: localPath.substring(1),
            to: cloudUrl
        });
    } else {
        // Should generally be covered above as map keys seem to have leading slash, 
        // but just in case:
        replacements.push({
            from: localPath,
            to: cloudUrl
        });
        // And maybe with added slash?
        replacements.push({
            from: '/' + localPath,
            to: cloudUrl
        });
    }
});

// Sort replacements by length of 'from' string, descending
// This ensures we replace specifc long paths before shorter substrings
replacements.sort((a, b) => b.from.length - a.from.length);

function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
        if (fs.statSync(dirPath + '/' + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + '/' + file, arrayOfFiles);
        } else {
            arrayOfFiles.push(path.join(dirPath, '/', file));
        }
    });

    return arrayOfFiles;
}

function processFiles() {
    const files = getAllFiles(SRC_DIR);
    let totalReplacements = 0;
    let modifiedFiles = 0;

    files.forEach(file => {
        if (!EXTENSIONS.includes(path.extname(file))) return;

        let content = fs.readFileSync(file, 'utf8');
        let originalContent = content;
        let fileReplacements = 0;

        // Apply replacements
        replacements.forEach(({ from, to }) => {
            // We use split/join for global replacement without regex issues
            // But we need to be careful.
            // Is it safe to globally replace "images/icon.png"?
            // Yes, provided it's indeed a path.
            // However, to be safer, we should check if the file actually contains the string first.

            if (content.includes(from)) {
                // Check if we just replaced this part already?
                // No, we are doing sequential replacements.
                // But wait, if we replaced "/images/foo.png" with URL,
                // The file content now contains URL.
                // The next loop might check "images/foo.png".
                // URL contains "images/foo.png" (Cloudinary URLs often preserve the original path structure!).
                // Example: https://res.cloudinary.com/.../images/foo.png
                // If we replace "images/foo.png" again, we break the URL!
                // CRITICAL FIX: We must NOT replace if it's already part of a Cloudinary URL.
                // But checking that is hard with simple string replace.

                // BETTER STRATEGY:
                // Use a single regex for all replacements? Too big.
                // 
                // Strategy:
                // 1. Unique placeholders? No.
                // 2. Look for valid boundaries? 
                //    Usually these paths are inside quotes: "images/foo.png" or 'images/foo.png' or url(images/foo.png)
                //    Or in CSS: url(/images/foo.png)

                // Let's refine the replacement list.
                // We only replace if the string is NOT preceded by 'http' or 'https://res.cloudinary.com'.
                // But JS string replace doesn't support lookbehind well in all environments/nodes? Node 14+ does.

                // Let's do a more robust approach:
                // Identify all occurrences. Check context.

                // Alternative:
                // 1. Replace '/images/...' -> 'CLOUDINARY_PREFIX/images/...'
                // 2. Replace 'images/...' -> 'CLOUDINARY_PREFIX/images/...' (only if not preceded by /)

                // Actually, let's look at the generated Cloudinary URLs.
                // They look like: https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883278/creditor-website-assets/images/about-us/banner/aboutus-banner.png
                // They DO contain the original path path "images/about-us/...".

                // So simply replacing "images/about-us/..." WILL break the already-replaced URLs if we are not careful.

                // FIX:
                // Use a regex to match ONLY if NOT part of the Cloudinary URL.
                // Since all our new URLs start with "https://res.cloudinary.com", we can check that.

                // Even simpler:
                // Just perform the replacement.
                // BUT exclude matches that are already inside the Cloudinary domain.
                // We can do this by regex:
                // /(?<!https:\/\/res\.cloudinary\.com.*)images\/foo\.png/
                // But JS lookbehind is variable length? No, JS lookbehind must be fixed length in some engines? No, V8 handles it.
                // But ".*" inside lookbehind is invalid in many regex engines.

                // OK, manual check.
                // Find index of match. Check chars before it.

                let index = -1;
                while ((index = content.indexOf(from, index + 1)) !== -1) {
                    // Check identifying context
                    const startToCheck = Math.max(0, index - 50); // check 50 chars back
                    const precedingText = content.substring(startToCheck, index);

                    if (precedingText.includes('res.cloudinary.com')) {
                        // likely already replaced or existing URL
                        continue;
                    }

                    // Also valid check: quotes.
                    // Usually paths are 'path' or "path".
                    // If we just blindly replace, we are safe IF we iterate carefully.

                    // Wait, I am overcomplicating. 
                    // I have 2 steps:
                    // 1. Replace '/images/...' with NEW_URL
                    // 2. Replace 'images/...' with NEW_URL

                    // If I do step 1, the text becomes "https://res.cloudinary.com/.../images/..."
                    // Step 2 attempts to replace "images/..."
                    // It finds it INSIDE "https://res.cloudinary.com/.../images/..."

                    // SIMPLE FIX:
                    // The Cloudinary URL structure I used in the migration info:
                    // folder: 'creditor-website-assets/' + path.dirname(relativePath)
                    // So the Cloudinary path is: `creditor-website-assets/images/...`
                    //
                    // My search string is `images/...`
                    //
                    // So yes, `creditor-website-assets/images/foo.png` DOES contain `images/foo.png`.
                    //
                    // However, `creditor-website-assets` is unique.
                    // I can check if the match is preceded by `creditor-website-assets/`.
                    // If so, SKIP.

                    const precedingChunk = content.substring(Math.max(0, index - 60), index);

                    if (precedingChunk.includes('res.cloudinary.com')) {
                        continue;
                    }

                    // Perform replacement
                    const before = content.substring(0, index);
                    const after = content.substring(index + from.length);
                    content = before + to + after;

                    // Adjust index because string length changed
                    index += (to.length - from.length);
                    fileReplacements++;
                }
            }
        });

        if (content !== originalContent) {
            fs.writeFileSync(file, content, 'utf8');
            console.log(`Updated ${file} (${fileReplacements} replacements)`);
            modifiedFiles++;
            totalReplacements += fileReplacements;
        }
    });

    console.log(`\nReplacement complete!`);
    console.log(`Files modified: ${modifiedFiles}`);
    console.log(`Total replacements: ${totalReplacements}`);
}

processFiles();
