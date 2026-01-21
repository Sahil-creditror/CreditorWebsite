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

        // Pattern: 
        // Any Cloudinary URL prefix followed by another Cloudinary URL prefix
        // We look for the nested occurrences and keep only the last valid one.

        // This regex matches a prefix + optional transform + timestamp + assets-folder
        // followed by another https://res.cloudinary.com
        // We replace the first part with nothing, keeping the second part.

        // More robust: Keep only the LAST instance of https://res.cloudinary.com in a sequence
        const regex = /https:\/\/res\.cloudinary\.com\/[^"'\s]*?(https:\/\/res\.cloudinary\.com\/)/g;

        let changed = true;
        let fileFixes = 0;
        while (changed) {
            const newContent = content.replace(regex, '$1');
            if (newContent === content) {
                changed = false;
            } else {
                content = newContent;
                fileFixes++;
            }
        }

        if (content !== originalContent) {
            fs.writeFileSync(file, content, 'utf8');
            console.log(`Fixed ${file} (${fileFixes} iterative fixes)`);
            modifiedFiles++;
            totalFixes += fileFixes;
        }
    });

    console.log(`\nFix complete!`);
    console.log(`Files modified: ${modifiedFiles}`);
}

processFiles();
