const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

// 1. Desktop: hide hb-mobile
css += '\n\n.hb-mobile { display: none; }\n';

// 2. Mobile changes: hide hb-desktop, show hb-mobile, revert badge styling, reduce logo size
css = css.replace(/@media \(max-width: 600px\) \{/, `@media (max-width: 600px) {
  .site-logo-img { height: 36px; }
  .hb-desktop { display: none; }
  .hb-mobile { display: inline; }
`);

// 3. Fix the hero padding top
css = css.replace(/\.hero\s*\{\s*padding-top:\s*180px;\s*\}/, '.hero { padding-top: 100px; }');
css = css.replace(/\.hero\s*\{\s*padding-top:\s*140px;\s*\}/, '.hero { padding-top: 100px; }');
css = css.replace(/\.hero\s*\{\s*padding-top:\s*95px;\s*\}/, '.hero { padding-top: 100px; }');

// 4. Revert hero badge to original pill shape on mobile
// Replace the block from .hero-badge { background: transparent; to }
css = css.replace(/\.hero-badge\s*\{[\s\S]*?\.badge-location::before\s*\{[\s\S]*?\}\s*/, 
  `.hero-badge {
    font-size: 0.65rem;
    white-space: nowrap;
    border-radius: 999px;
    padding: 0.4rem 0.9rem 0.4rem 0.5rem;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(201,162,39,0.35);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 1.6rem;
  }
  .badge-icon {
    display: flex;
    width: 26px; height: 26px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--gold), var(--gold-light));
    align-items: center; justify-content: center;
    color: #fff;
    font-size: 0.65rem;
    flex-shrink: 0;
  }
  .hero-badge > span {
    color: rgba(255,255,255,0.88);
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
  .badge-dot {
    display: block;
    width: 4px; height: 4px;
    border-radius: 50%;
    background: var(--orange);
  }
  .badge-location {
    color: var(--gold);
  }
`);

fs.writeFileSync('style.css', css, 'utf8');
