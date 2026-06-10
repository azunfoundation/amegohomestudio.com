const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

// Replace literal '\n' strings that are alone on a line or anywhere
css = css.replace(/\\n/g, '');

fs.writeFileSync('style.css', css);
console.log('Cleaned literal newlines from CSS');
