const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

const replacements = [
  // Desktop Title
  [
    /background: linear-gradient\(135deg, #d4af37 0%, #aa7c11 100%\);/g,
    'background: linear-gradient(90deg, #F95D28 0%, #A136B6 100%);'
  ],
  // Desktop Panel Title
  [
    /background: linear-gradient\(135deg, #d4af37, #aa7c11\);/g,
    'background: linear-gradient(90deg, #F95D28 0%, #A136B6 100%);'
  ],
  // Mobile Title
  [
    /\.hm-title-2 em \{\s*font-style: italic;\s*color: #aa7c11;\s*\}/g,
    '.hm-title-2 em {\n  font-style: italic;\n  background: linear-gradient(90deg, #F95D28 0%, #A136B6 100%);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n}'
  ],
  // Mobile Form Title
  [
    /\.hm-form-title em \{\s*font-family: 'Playfair Display', serif;\s*font-style: italic;\s*font-weight: 400;\s*color: #aa7c11;\s*\}/g,
    '.hm-form-title em {\n  font-family: \'Playfair Display\', serif;\n  font-style: italic;\n  font-weight: 400;\n  background: linear-gradient(90deg, #F95D28 0%, #A136B6 100%);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n}'
  ]
];

for (let i = 0; i < replacements.length; i++) {
  const [regex, replacement] = replacements[i];
  if (!regex.test(css)) {
    console.log("Failed to match: ", regex.toString());
  } else {
    css = css.replace(regex, replacement);
  }
}

fs.writeFileSync('style.css', css);
console.log('Update complete');
