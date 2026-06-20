const fs = require('fs');
const path = require('path');

function replaceInDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== 'node_modules' && file !== '.next') {
        replaceInDir(fullPath);
      }
    } else {
      const ext = path.extname(fullPath);
      if (['.ts', '.tsx', '.js', '.jsx', '.md', '.xml'].includes(ext)) {
        try {
          const content = fs.readFileSync(fullPath, 'utf8');
          let newContent = content;
          let changed = false;

          const replacements = [
            { search: '"/courses"', replace: '"/services/course-cataloges"' },
            { search: "'/courses'", replace: "'/services/course-cataloges'" },
            { search: "`/courses`", replace: "`/services/course-cataloges`" },
            { search: ">/courses<", replace: ">/services/course-cataloges<" },

            { search: '"/become-private"', replace: '"/services/course-cataloges/become-private"' },
            { search: "'/become-private'", replace: "'/services/course-cataloges/become-private'" },
            { search: "`/become-private`", replace: "`/services/course-cataloges/become-private`" },
            { search: ">https://creditoracademy.com/become-private<", replace: ">https://creditoracademy.com/services/course-cataloges/become-private<" },

            { search: '"/operate-private"', replace: '"/services/course-cataloges/operate-private"' },
            { search: "'/operate-private'", replace: "'/services/course-cataloges/operate-private'" },
            { search: "`/operate-private`", replace: "`/services/course-cataloges/operate-private`" },
            { search: ">https://creditoracademy.com/operate-private<", replace: ">https://creditoracademy.com/services/course-cataloges/operate-private<" },

            { search: '"/financial-freedom"', replace: '"/services/course-cataloges/financial-freedom"' },
            { search: "'/financial-freedom'", replace: "'/services/course-cataloges/financial-freedom'" },
            { search: "`/financial-freedom`", replace: "`/services/course-cataloges/financial-freedom`" },
            { search: ">https://creditoracademy.com/financial-freedom<", replace: ">https://creditoracademy.com/services/course-cataloges/financial-freedom<" },
            
            { search: ">https://creditoracademy.com/courses<", replace: ">https://creditoracademy.com/services/course-cataloges<" }
          ];

          for (const rep of replacements) {
            if (newContent.includes(rep.search)) {
              newContent = newContent.split(rep.search).join(rep.replace);
              changed = true;
            }
          }

          if (changed) {
            fs.writeFileSync(fullPath, newContent, 'utf8');
            console.log('Updated', fullPath);
          }
        } catch (e) {
          console.error('Error with', fullPath, e);
        }
      }
    }
  }
}

replaceInDir('C:/Users/HP/Documents/GitHub/CreditorWebsite/package/src');
replaceInDir('C:/Users/HP/Documents/GitHub/CreditorWebsite/package/public');
