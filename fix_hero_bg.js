const fs = require('fs');

// 1. Update index.html to remove <div class="hm-bg"></div>
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace('<div class="hm-bg"></div>', '');
fs.writeFileSync('index.html', html);

// 2. Update style.css
let css = fs.readFileSync('style.css', 'utf8');

// Replace .hero-mobile
const heroMobileTarget = /\.hero-mobile\s*\{[\s\S]*?z-index:\s*10;\s*overflow:\s*hidden;\s*\}/g;
const heroMobileReplace = .hero-mobile {
  position: relative;
  width: 100%;
  background-color: #0f0f15 !important;
  background-image: 
    linear-gradient(to bottom, rgba(15,15,21,0.85) 0%, rgba(15,15,21,0.95) 70%, #0f0f15 100%),
    url('hero_interior.png') !important;
  background-size: cover !important;
  background-position: center top !important;
  background-repeat: no-repeat !important;
  color: #fff;
  padding: 100px 1.2rem 4rem;
  display: flex;
  flex-direction: column;
  z-index: 10;
};
css = css.replace(heroMobileTarget, heroMobileReplace);

// Remove .hm-bg completely
const hmBgTarget = /\.hm-bg\s*\{[\s\S]*?opacity:\s*1;\s*\}/g;
css = css.replace(hmBgTarget, '');

const hmBgAfterTarget = /\.hm-bg::after\s*\{[\s\S]*?z-index:\s*1;\s*\}/g;
css = css.replace(hmBgAfterTarget, '');

fs.writeFileSync('style.css', css);
console.log('Fixed background issue!');
