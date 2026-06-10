const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

const replaceBg = `.hm-bg {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-image: 
    linear-gradient(to bottom, rgba(15,15,21,0.85) 0%, rgba(15,15,21,0.95) 70%, #0f0f15 100%),
    url('hero_interior.png');
  background-size: cover;
  background-position: center;
  z-index: -1;
  opacity: 1;
}`;

const replaceBadge = `.hm-badge-col {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2px;
}

.hm-badge-col span {
  font-size: 0.45rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  color: rgba(255,255,255,0.7);
  line-height: 1;
  white-space: nowrap;
}

.hm-badge-col span:first-child { color: rgba(255,255,255,0.9); font-size: 0.5rem; }

.hm-badge-divider {
  width: 1px;
  background: rgba(255,255,255,0.15);
  margin: 2px 0;
}

.hm-badge-loc { justify-content: center; align-items: center; }
.hm-badge-loc span { color: var(--gold) !important; font-size: 0.45rem !important; font-weight: 900 !important; }
.hm-badge-loc span i { font-size: 0.4rem; margin-right: 3px; }`;

const bgRegex = /\.hm-bg\s*\{[^}]*\opacity:\s*0\.5;\s*\}/g;

const badgeRegex = /\.hm-badge-text\s*\{[^}]*\}\s*\.hm-badge-text\s*span\s*\{[^}]*\}\s*\.hm-badge-text\s*span:first-child\s*\{[^}]*\}\s*\.hm-badge-text\s*span:last-child\s*\{[^}]*\}\s*\.hm-badge-text\s*span:last-child\s*i\s*\{[^}]*\}/g;

css = css.replace(bgRegex, replaceBg);
css = css.replace(badgeRegex, replaceBadge);
fs.writeFileSync('style.css', css);
console.log('Fixed CSS');
