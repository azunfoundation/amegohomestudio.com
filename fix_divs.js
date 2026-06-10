const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const badBlockRegex = /<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<div class="estimate-form-wrap" data-aos="fade-left">/;
const replacementStr = `        </div>
      </div>
      <div class="estimate-form-wrap" data-aos="fade-left">`;

if (badBlockRegex.test(html)) {
    html = html.replace(badBlockRegex, replacementStr);
    fs.writeFileSync('index.html', html);
    console.log('Successfully fixed index.html!');
} else {
    console.log('Regex not found!');
}
