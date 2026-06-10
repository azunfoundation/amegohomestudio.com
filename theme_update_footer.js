const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

const replacements = [
  {
    target: `.site-footer { background: var(--dark); }`,
    replace: `.site-footer { background: #fcfcfa; border-top: 1px solid rgba(0,0,0,0.05); }`
  },
  {
    target: `  border-bottom: 1px solid rgba(255,255,255,0.06);`,
    replace: `  border-bottom: 1px solid rgba(0,0,0,0.06);`
  },
  {
    target: `  color: rgba(255,255,255,0.45);`,
    replace: `  color: #666;`
  },
  {
    target: `  background: rgba(255,255,255,0.07);\n  border: 1px solid rgba(255,255,255,0.10);`,
    replace: `  background: #ffffff;\n  border: 1px solid rgba(0,0,0,0.05);\n  box-shadow: 0 2px 10px rgba(0,0,0,0.02);`
  },
  {
    target: `.footer-logo-wrap:hover { background: rgba(255,255,255,0.12); }`,
    replace: `.footer-logo-wrap:hover { background: #ffffff; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }`
  },
  {
    target: `  background: rgba(255,255,255,0.06);\n  border: 1px solid rgba(255,255,255,0.10);\n  color: #555;`,
    replace: `  background: #ffffff;\n  border: 1px solid rgba(0,0,0,0.08);\n  color: #444;`
  },
  {
    target: `  color: rgba(255,255,255,0.42);\n  transition: color var(--dur), padding-left var(--dur);`,
    replace: `  color: #555;\n  transition: color var(--dur), padding-left var(--dur);`
  },
  {
    target: `  color: rgba(255,255,255,0.42);\n  margin-bottom: 0.8rem;`,
    replace: `  color: #555;\n  margin-bottom: 0.8rem;`
  },
  {
    target: `.footer-contact-col a { color: rgba(255,255,255,0.42); transition: color var(--dur); }`,
    replace: `.footer-contact-col a { color: #555; transition: color var(--dur); }`
  },
  {
    target: `  mix-blend-mode: lighten;`,
    replace: `  mix-blend-mode: multiply;`
  },
  {
    target: `.ap-footer-badge span { font-size: 0.70rem; color: rgba(255,255,255,0.38); }`,
    replace: `.ap-footer-badge span { font-size: 0.70rem; color: #777; }`
  },
  {
    target: `.footer-bottom p { font-size: 0.78rem; color: rgba(255,255,255,0.30); }`,
    replace: `.footer-bottom p { font-size: 0.78rem; color: #777; }`
  },
  {
    target: `.footer-bottom p:last-child { color: rgba(255,255,255,0.22); }`,
    replace: `.footer-bottom p:last-child { color: #999; }`
  }
];

let changed = false;
replacements.forEach(r => {
  if(css.includes(r.target)) {
    css = css.replace(r.target, r.replace);
    changed = true;
  } else {
    console.log("NOT FOUND:", r.target);
  }
});

if(changed) {
  fs.writeFileSync('style.css', css);
  console.log("Footer theme updated!");
} else {
  console.log("No changes made.");
}
