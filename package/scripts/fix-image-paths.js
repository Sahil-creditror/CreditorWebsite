const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, '../src');

// Extensions to process
const EXTENSIONS = ['.tsx', '.ts', '.js', '.jsx', '.css', '.scss', '.less', '.json'];

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
    let totalFixes = 0;
    let modifiedFiles = 0;

    files.forEach(file => {
        if (!EXTENSIONS.includes(path.extname(file))) return;

        let content = fs.readFileSync(file, 'utf8');
        const originalContent = content;

        // Regex to capture the double URL pattern
        // We look for: https://res.cloudinary.com...creditor-website-assetshttps://res.cloudinary.com...
        // And we keep the second one.

        // Pattern: 
        // (https:\/\/res\.cloudinary\.com\/[^"'\s]*?creditor-website-assets)(https:\/\/res\.cloudinary\.com\/[^"'\s]*)
        // The first group is the prefix to discard. The second group is the one to keep.
        // Note: We use non-greedy matching `*?` to handle multiple instances on a line if possible, 
        // though the specific case `assetshttps` is the key.

        const regex = /(https:\/\/res\.cloudinary\.com\/[^"'\s]*?creditor-website-assets)(https:\/\/res\.cloudinary\.com\/)/g;

        if (regex.test(content)) {
            // Replace with only the second part (and whatever follows it is preserved naturally as we only matched the prefix and the start of the second url)
            // Wait, if I replace `(prefix)(start_of_valid)` with `$2`, I keep `start_of_valid`.
            // The rest of valid URL is not part of the match, so it stays.

            content = content.replace(regex, '$2');

            if (content !== originalContent) {
                fs.writeFileSync(file, content, 'utf8');
                console.log(`Fixed ${file}`);
                modifiedFiles++;
                totalFixes++;
            }
        }
    });

    console.log(`\nFix complete!`);
    console.log(`Files modified: ${modifiedFiles}`);
}

processFiles();
