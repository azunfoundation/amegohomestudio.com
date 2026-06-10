const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

css = css.replace(/background: #0f0f15;/g, 'background-color: #0f0f15 !important;');
fs.writeFileSync('style.css', css);
console.log('Fixed hero-mobile background color');
