const fs = require('fs');
const path = require('path');

function getBlogsSlugs() {
  try {
    const postsDirectory = path.join(process.cwd(), 'markdown', 'blogs');
    return fs.readdirSync(postsDirectory);
  } catch (error) {
    console.error('Error reading blog directory:', error);
    return [];
  }
}

function getPostSlugs() {
  try {
    const postsDirectory = path.join(process.cwd(), 'markdown', 'projects');
    return fs.readdirSync(postsDirectory);
  } catch (error) {
    console.error('Error reading projects directory:', error);
    return [];
  }
}

module.exports = {
  getBlogsSlugs,
  getPostSlugs,
};

