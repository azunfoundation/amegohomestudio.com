const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

const replacements = [
  // Desktop
  [/\.hero-title \{\s*font-family: var\(--font-head\);\s*font-weight: 700;\s*line-height: 1\.05;\s*color: #1a1a1a;/g, '.hero-title {\n  font-family: var(--font-head);\n  font-weight: 700;\n  line-height: 1.05;\n  color: #ffffff;'],
  [/\.hero-title-line--1 \{\s*font-size: clamp\(3rem, 6vw, 5\.2rem\);\s*font-weight: 300;\s*letter-spacing: -0\.01em;\s*color: #555;/g, '.hero-title-line--1 {\n  font-size: clamp(3rem, 6vw, 5.2rem);\n  font-weight: 300;\n  letter-spacing: -0.01em;\n  color: rgba(255,255,255,0.9);'],
  [/\.hero-title-line--3 \{\s*font-size: clamp\(2\.2rem, 4\.2vw, 3\.6rem\);\s*font-weight: 500;\s*letter-spacing: -0\.02em;\s*color: #333;/g, '.hero-title-line--3 {\n  font-size: clamp(2.2rem, 4.2vw, 3.6rem);\n  font-weight: 500;\n  letter-spacing: -0.02em;\n  color: #ffffff;'],
  [/\.title-highlight \{\s*display: inline-block;\s*position: relative;\s*color: #1a1a1a;/g, '.title-highlight {\n  display: inline-block;\n  position: relative;\n  color: #ffffff;'],
  
  [/\.hero-sub \{\s*color: #555;/g, '.hero-sub {\n  color: rgba(255,255,255,0.85);'],
  [/\.hero-sub-accent \{\s*display: block;\s*margin-top: 0\.4rem;\s*color: #222;/g, '.hero-sub-accent {\n  display: block;\n  margin-top: 0.4rem;\n  color: #ffffff;'],
  
  [/\.hero-text-link \{\s*display: inline-flex;\s*align-items: center;\s*gap: 7px;\s*font-size: 0\.88rem;\s*font-weight: 600;\s*color: #555;/g, '.hero-text-link {\n  display: inline-flex;\n  align-items: center;\n  gap: 7px;\n  font-size: 0.88rem;\n  font-weight: 600;\n  color: rgba(255,255,255,0.8);'],
  [/\.hero-text-link:hover \{\s*color: #111;/g, '.hero-text-link:hover {\n  color: #ffffff;'],
  
  [/\.hero-scroll-cue span \{\s*font-size: 0\.6rem;\s*font-weight: 600;\s*letter-spacing: 0\.2em;\s*text-transform: uppercase;\s*color: #555;/g, '.hero-scroll-cue span {\n  font-size: 0.6rem;\n  font-weight: 600;\n  letter-spacing: 0.2em;\n  text-transform: uppercase;\n  color: rgba(255,255,255,0.7);'],
  [/\.scroll-line \{\s*width: 1px; height: 0;\s*background: linear-gradient\(to bottom, transparent, rgba\(0,0,0,0\.2\)\);/g, '.scroll-line {\n  width: 1px; height: 0;\n  background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.6));'],

  // Mobile
  [/\.hm-title-1 \{\s*font-family: 'Playfair Display', serif;\s*font-style: italic;\s*font-size: 2\.2rem;\s*font-weight: 400;\s*color: #555;/g, '.hm-title-1 {\n  font-family: \'Playfair Display\', serif;\n  font-style: italic;\n  font-size: 2.2rem;\n  font-weight: 400;\n  color: rgba(255,255,255,0.9);'],
  [/\.hm-title-2 \{\s*font-size: 3rem;\s*font-weight: 900;\s*letter-spacing: -0\.02em;\s*line-height: 1;\s*color: #1a1a1a;/g, '.hm-title-2 {\n  font-size: 3rem;\n  font-weight: 900;\n  letter-spacing: -0.02em;\n  line-height: 1;\n  color: #ffffff;'],
  [/\.hm-title-3 \{\s*font-size: 1\.6rem;\s*font-weight: 400;\s*letter-spacing: -0\.01em;\s*line-height: 1\.2;\s*color: #333;/g, '.hm-title-3 {\n  font-size: 1.6rem;\n  font-weight: 400;\n  letter-spacing: -0.01em;\n  line-height: 1.2;\n  color: #ffffff;'],
  
  [/\.hm-sub \{\s*font-size: 0\.95rem;\s*color: #555;/g, '.hm-sub {\n  font-size: 0.95rem;\n  color: rgba(255,255,255,0.85);'],
  [/\.hm-sub em \{\s*display: block;\s*font-weight: 700;\s*font-style: italic;\s*color: #222;/g, '.hm-sub em {\n  display: block;\n  font-weight: 700;\n  font-style: italic;\n  color: #ffffff;'],
  
  [/\.hm-calc-link \{\s*display: flex;\s*align-items: center;\s*gap: 8px;\s*color: #555;/g, '.hm-calc-link {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  color: rgba(255,255,255,0.8);'],
  
  [/\.hm-scroll-line \{\s*width: 1px; height: 40px;\s*background: linear-gradient\(to bottom, rgba\(0,0,0,0\.2\), transparent\);\s*\}/g, '.hm-scroll-line {\n  width: 1px; height: 40px;\n  background: linear-gradient(to bottom, rgba(255,255,255,0.5), transparent);\n}'],
  [/\.hm-scroll span \{\s*font-size: 0\.6rem; font-weight: 800; letter-spacing: 0\.2em; color: #555;\s*\}/g, '.hm-scroll span {\n  font-size: 0.6rem; font-weight: 800; letter-spacing: 0.2em; color: rgba(255,255,255,0.7);\n}']
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
