const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, '../src');

// Extensions to process
const EXTENSIONS = ['.tsx', '.ts', '.js', '.jsx'];

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

    // Regex to find and fix "import x from '...publichttps...'"
    // We want to change:
    // import x from ".....publichttps://..." 
    // to:
    // const x = "https://..."
    // AND
    // usage of `x.src` to `x`

    files.forEach(file => {
        if (!EXTENSIONS.includes(path.extname(file))) return;

        let content = fs.readFileSync(file, 'utf8');
        const originalContent = content;

        // Pattern 1: import ... from "...publichttps..."
        // Matches: import variableName from "path/publichttps://url"
        // Capture: variableName, url
        const importRegex = /import\s+(\w+)\s+from\s+["'][^"']*public(https:\/\/res\.cloudinary\.com[^"']+)["']/g;

        let match;
        let variablesToFix = [];

        // First pass: fix imports and collect variable names
        content = content.replace(importRegex, (match, varName, url) => {
            // Add to list of variables that need .src removal reference
            variablesToFix.push(varName);
            return `const ${varName} = "${url}"`;
        });

        // Second pass: fix usage of .src for these variables
        variablesToFix.forEach(varName => {
            // Replace varName.src with varName
            const usageRegex = new RegExp(`\\b${varName}\\.src\\b`, 'g');
            content = content.replace(usageRegex, varName);
        });

        if (content !== originalContent) {
            fs.writeFileSync(file, content, 'utf8');
            console.log(`Fixed imports in ${file}`);
            modifiedFiles++;
            totalFixes++;
        }
    });

    console.log(`\nImport fix complete!`);
    console.log(`Files modified: ${modifiedFiles}`);
}

processFiles();
