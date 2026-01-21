const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;
require('dotenv').config({ path: '.env.local' });

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

const PUBLIC_DIR = path.join(__dirname, '../public');
const MAP_FILE = path.join(__dirname, '../cloudinary-map.json');
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.avif'];

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

async function uploadImages() {
    console.log('Starting migration to Cloudinary...');

    const force = process.argv.includes('--force');
    const fileIndex = process.argv.findIndex(arg => arg === '--file' || arg.startsWith('--file='));
    let targetFile = null;
    if (fileIndex !== -1) {
        const arg = process.argv[fileIndex];
        if (arg.startsWith('--file=')) {
            targetFile = arg.split('=')[1];
        } else if (fileIndex + 1 < process.argv.length) {
            targetFile = process.argv[fileIndex + 1];
        }
    }

    if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME === 'your_cloud_name') {
        console.error('ERROR: Please fill in your Cloudinary credentials in .env.local');
        process.exit(1);
    }

    const allFiles = getAllFiles(PUBLIC_DIR);
    let imageFiles = allFiles.filter(file => ALLOWED_EXTENSIONS.includes(path.extname(file).toLowerCase()));

    if (targetFile) {
        imageFiles = imageFiles.filter(file => {
            const rel = path.relative(PUBLIC_DIR, file).replace(/\\/g, '/');
            return rel === targetFile || ('/' + rel) === targetFile || file === targetFile;
        });
        if (imageFiles.length === 0) {
            console.error(`ERROR: File not found: ${targetFile}`);
            process.exit(1);
        }
    }

    console.log(`Found ${imageFiles.length} images to process.`);

    const urlMap = {};
    if (fs.existsSync(MAP_FILE)) {
        try {
            Object.assign(urlMap, JSON.parse(fs.readFileSync(MAP_FILE, 'utf8')));
        } catch (e) {
            console.warn('Could not read existing map file, starting fresh.');
        }
    }

    let successCount = 0;
    let skippedCount = 0;
    let errorCount = 0;

    for (const file of imageFiles) {
        const relativePath = path.relative(PUBLIC_DIR, file).replace(/\\/g, '/');
        const publicKey = '/' + relativePath;

        if (urlMap[publicKey] && !force && !targetFile) {
            console.log(`Skipping (already mapped): ${relativePath}`);
            skippedCount++;
            continue;
        }

        console.log(`${force || targetFile ? 'Updating' : 'Uploading'}: ${relativePath}...`);
        try {
            const result = await cloudinary.uploader.upload(file, {
                folder: 'creditor-website-assets/' + path.dirname(relativePath).replace(/^\.\/?/, ''),
                use_filename: true,
                unique_filename: false,
                overwrite: true,
                resource_type: 'auto'
            });

            urlMap[publicKey] = result.secure_url;
            successCount++;
        } catch (error) {
            console.error(`Failed to upload ${relativePath}:`, error.message);
            errorCount++;
        }
    }

    // Sort the map for cleanliness
    const sortedMap = {};
    Object.keys(urlMap).sort().forEach(key => {
        sortedMap[key] = urlMap[key];
    });

    fs.writeFileSync(MAP_FILE, JSON.stringify(sortedMap, null, 2));
    console.log('\nMigration complete!');
    console.log(`Processed: ${successCount}`);
    console.log(`Skipped: ${skippedCount}`);
    console.log(`Errors: ${errorCount}`);
    console.log(`Map saved to: ${MAP_FILE}`);
}

uploadImages();
