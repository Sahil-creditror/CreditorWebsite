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

    if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME === 'your_cloud_name') {
        console.error('ERROR: Please fill in your Cloudinary credentials in .env.local');
        process.exit(1);
    }

    const allFiles = getAllFiles(PUBLIC_DIR);
    const imageFiles = allFiles.filter(file => ALLOWED_EXTENSIONS.includes(path.extname(file).toLowerCase()));

    console.log(`Found ${imageFiles.length} images to upload.`);

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
        const publicKey = '/' + relativePath; // Standardize key as /path/to/image.png

        if (urlMap[publicKey]) {
            console.log(`Skipping (already mapped): ${relativePath}`);
            skippedCount++;
            continue;
        }

        console.log(`Uploading: ${relativePath}...`);
        try {
            // Use the file path as the public_id to maintain structure, removing extension for cleaner IDs
            // Cloudinary handles extensions, but typically public_id doesn't have it.
            // However, to avoid conflicts, let's just let Cloudinary convert or keep it.
            // We will use the relative path (without extension) as folder/name

            const folder = path.dirname(relativePath) === '.' ? 'root' : path.dirname(relativePath);
            const filename = path.basename(relativePath, path.extname(relativePath));

            // Construct a public_id that mirrors the folder structure
            // e.g. images/hero/bg becomes images/hero/bg
            const publicId = relativePath.replace(/\.[^/.]+$/, "");

            const result = await cloudinary.uploader.upload(file, {
                folder: 'creditor-website-assets/' + path.dirname(relativePath).replace(/^\.\/?/, ''), // Namespace it
                use_filename: true,
                unique_filename: false,
                overwrite: false,
                resource_type: 'auto'
            });

            urlMap[publicKey] = result.secure_url;
            successCount++;
        } catch (error) {
            console.error(`Failed to upload ${relativePath}:`, error.message);
            errorCount++;
        }
    }

    fs.writeFileSync(MAP_FILE, JSON.stringify(urlMap, null, 2));
    console.log('\nMigration complete!');
    console.log(`Uploaded: ${successCount}`);
    console.log(`Skipped: ${skippedCount}`);
    console.log(`Errors: ${errorCount}`);
    console.log(`Map saved to: ${MAP_FILE}`);
}

uploadImages();
