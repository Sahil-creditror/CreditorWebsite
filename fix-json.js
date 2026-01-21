const fs = require('fs');
const path = require('path');
const file = 'package/cloudinary-map.json';
let content = fs.readFileSync(file, 'utf8');
// Simple fix: if there is a comma before the last }, remove it
content = content.replace(/,\s*}/, '\n}');
fs.writeFileSync(file, content);
