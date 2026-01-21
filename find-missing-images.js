const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, 'package/public');
const MAP_FILE = path.join(__dirname, 'package/cloudinary-map.json');
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.avif'];

function getAllFiles(dirPath, arrayOfFiles) {
    if (!fs.existsSync(dirPath)) return [];
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

const map = JSON.parse(fs.readFileSync(MAP_FILE, 'utf8'));
const allFiles = getAllFiles(PUBLIC_DIR);
const images = allFiles.filter(file => ALLOWED_EXTENSIONS.includes(path.extname(file).toLowerCase()));

console.log('Images not in map:');
images.forEach(file => {
    const rel = file.split('public')[1].replace(/\\/g, '/');

    if (!map[rel]) {
        console.log(rel);
    }
});
