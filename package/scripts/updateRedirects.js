const fs = require('fs');

const fullPath = 'C:/Users/HP/Documents/GitHub/CreditorWebsite/package/next.config.ts';
let content = fs.readFileSync(fullPath, 'utf8');

const replacements = [
  { search: 'destination: "/become-private"', replace: 'destination: "/services/course-cataloges/become-private"' },
  { search: 'destination: "/operate-private"', replace: 'destination: "/services/course-cataloges/operate-private"' },
  { search: 'destination: "/financial-freedom"', replace: 'destination: "/services/course-cataloges/financial-freedom"' }
];

for (const rep of replacements) {
  content = content.split(rep.search).join(rep.replace);
}

// Add redirects for the old paths to the new paths
const newRedirects = `
      {
        source: "/courses",
        destination: "/services/course-cataloges",
        permanent: true,
      },
      {
        source: "/become-private",
        destination: "/services/course-cataloges/become-private",
        permanent: true,
      },
      {
        source: "/operate-private",
        destination: "/services/course-cataloges/operate-private",
        permanent: true,
      },
      {
        source: "/financial-freedom",
        destination: "/services/course-cataloges/financial-freedom",
        permanent: true,
      },`;

content = content.replace('async redirects() {\n    return [', 'async redirects() {\n    return [' + newRedirects);

fs.writeFileSync(fullPath, content, 'utf8');
console.log('Updated next.config.ts');
