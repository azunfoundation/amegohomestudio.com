const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

const targetBg = .hm-bg {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-image: 
    linear-gradient(to bottom, rgba(15,15,21,0.85) 0%, rgba(15,15,21,0.95) 70%, #0f0f15 100%),
    url('hero_interior.png');
  background-size: cover;
  background-position: center;
  z-index: -1;
  opacity: 1;
};

const replaceBg = .hm-bg {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-image: 
    linear-gradient(to bottom, rgba(15,15,21,0.85) 0%, rgba(15,15,21,0.95) 60%, rgba(168, 85, 247, 0.4) 85%, rgba(232, 71, 28, 0.4) 100%),
    url('hero_interior.png');
  background-size: cover;
  background-position: center;
  z-index: -1;
  opacity: 1;
};

css = css.replace(targetBg, replaceBg);
fs.writeFileSync('style.css', css);
console.log('Updated hm-bg colors');
