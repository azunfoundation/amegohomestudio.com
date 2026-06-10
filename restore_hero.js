const fs = require('fs');

const missingCSS = `
  position: absolute;
  left: 0; right: 0;
  top: 55%;
  height: 1px;
  background: linear-gradient(90deg,
    transparent 0%,
    rgba(201,162,39,0.3) 30%,
    rgba(201,162,39,0.5) 50%,
    rgba(201,162,39,0.3) 70%,
    transparent 100%);
  z-index: 0;
  pointer-events: none;
  animation: lineShimmer 6s ease-in-out infinite alternate;
}

/* ═══════════════════════════════════════════════════════
   CONTAINER
═══════════════════════════════════════════════════════ */
.hero-container {
  position: relative; z-index: 1;
  display: grid;
  grid-template-columns: 1.2fr 450px;
  gap: 4rem;
  align-items: center;
  padding-top: 2rem;
  padding-bottom: 5rem;
  width: 100%;
}

.hero-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

/* Entrance Animations */
[data-hero-animate] {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
}
[data-hero-animate].hero-visible { opacity: 1; transform: none; }

/* Desktop Badge (mobile badge is below) */
.hero-badge {
  font-size: 0.7rem;
  white-space: nowrap;
  border-radius: 999px;
  padding: 0.4rem 1rem 0.4rem 0.4rem;
  background: rgba(0,0,0,0.4);
  border: 1px solid rgba(201,162,39,0.4);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 20px rgba(0,0,0,0.2);
}
.badge-icon {
  width: 28px; height: 28px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--gold), #fcd34d);
  display: flex; align-items: center; justify-content: center;
  color: #000;
  font-size: 0.7rem;
}
.hb-desktop { color: #fff; font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em; }
.hb-mobile { display: none; }
.badge-dot { width: 4px; height: 4px; border-radius: 50%; background: var(--orange); }
.badge-location { color: var(--gold); font-weight: 700; font-size: 0.7rem; }

/* Title */
.hero-title {
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  line-height: 1.05;
}
.hero-title-line { display: block; }
.hero-title-line--1 { font-family: var(--font-heading); font-style: italic; font-weight: 400; font-size: clamp(2.5rem, 4vw, 3.5rem); color: rgba(255,255,255,0.9); }
.hero-title-line--2 { font-weight: 800; font-size: clamp(3.5rem, 6vw, 5.5rem); color: #fff; text-transform: uppercase; letter-spacing: -0.02em; }
.hero-title-line--2 em { font-family: var(--font-heading); font-style: italic; color: var(--gold); text-transform: none; font-weight: 500; }
.hero-title-line--3 { font-weight: 300; font-size: clamp(1.8rem, 3vw, 2.8rem); color: rgba(255,255,255,0.7); }
.title-highlight { font-weight: 700; color: #fff; }

/* Subtitle */
.hero-sub {
  font-size: 1.1rem;
  line-height: 1.6;
  color: rgba(255,255,255,0.7);
  max-width: 540px;
  margin-bottom: 2.5rem;
}
.hero-sub-accent { display: block; margin-top: 0.5rem; color: var(--gold); font-weight: 600; font-style: italic; }

/* CTAs */
.hero-ctas {
  display: flex;
  gap: 1.2rem;
  margin-bottom: 1.5rem;
  width: 100%;
}
.hero-btn {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  padding: 0.8rem 1.2rem;
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.3s ease;
  flex: 1;
}
.hero-btn--primary {
  background: linear-gradient(135deg, var(--orange), var(--purple));
  box-shadow: 0 10px 30px rgba(232,71,28,0.3);
  border: 1px solid rgba(255,255,255,0.1);
}
.hero-btn--primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 40px rgba(232,71,28,0.4);
}
.hero-btn--ghost {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}
.hero-btn--ghost:hover { background: rgba(255,255,255,0.1); transform: translateY(-3px); }
.hero-btn-icon { width: 36px; height: 36px; border-radius: 50%; background: rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center; color: #fff; font-size: 0.9rem; flex-shrink: 0; }
.hero-btn-text { display: flex; flex-direction: column; align-items: flex-start; }
.hero-btn-label { color: #fff; font-weight: 700; font-size: 0.95rem; }
.hero-btn-sub { color: rgba(255,255,255,0.7); font-size: 0.7rem; margin-top: 2px; }
.hero-btn-arrow { margin-left: auto; color: #fff; font-size: 0.9rem; }

.hero-calc-link { margin-bottom: 3rem; }
.hero-text-link { color: var(--gold); font-size: 0.9rem; font-weight: 600; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; transition: gap 0.3s; }
.hero-text-link:hover { gap: 12px; }

/* Trust Indicators */
.hero-trust {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  background: rgba(0,0,0,0.3);
  padding: 1rem 1.5rem;
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.05);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  flex-wrap: wrap;
}
.trust-indicator { display: flex; align-items: center; gap: 12px; }
.ti-icon { width: 36px; height: 36px; border-radius: 50%; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; color: var(--gold); font-size: 0.9rem; }
.ti-text { display: flex; flex-direction: column; }
.ti-text strong { color: #fff; font-size: 0.9rem; font-weight: 800; line-height: 1; margin-bottom: 2px; }
.ti-text span { color: rgba(255,255,255,0.5); font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.05em; }
.trust-divider { width: 1px; height: 30px; background: rgba(255,255,255,0.1); }

/* Right Panel Form */
.hero-panel {
  background: rgba(15,15,25,0.6);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 24px;
  padding: 2.5rem;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: 0 20px 50px rgba(0,0,0,0.5);
  position: relative;
}
.hero-panel::before {
  content: ''; position: absolute; inset: 0; border-radius: 24px; padding: 1px;
  background: linear-gradient(135deg, rgba(201,162,39,0.4), transparent 50%, rgba(201,162,39,0.1));
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor; mask-composite: exclude; pointer-events: none;
}
.panel-title { color: #fff; font-size: 1.8rem; font-weight: 800; margin-bottom: 0.5rem; }
.panel-sub { color: rgba(255,255,255,0.6); font-size: 0.9rem; margin-bottom: 2rem; }
.panel-form { display: flex; flex-direction: column; gap: 1.2rem; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.2rem; }
.input-group { position: relative; }
.input-group i { position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: rgba(255,255,255,0.4); font-size: 0.9rem; }
.hero-input, .hero-select {
  width: 100%; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1);
  border-radius: 10px; padding: 0.9rem 1rem 0.9rem 2.8rem; color: #fff; font-size: 0.9rem;
  outline: none; transition: all 0.3s ease;
}
.hero-input:focus, .hero-select:focus { border-color: var(--gold); background: rgba(0,0,0,0.5); }
.hero-select { appearance: none; cursor: pointer; }
.hero-submit-btn {
  background: linear-gradient(135deg, var(--gold), var(--gold-light));
  color: #000; font-weight: 800; font-size: 1rem; border: none; border-radius: 10px;
  padding: 1rem; cursor: pointer; transition: all 0.3s ease; display: flex; align-items: center; justify-content: center; gap: 10px; margin-top: 0.5rem; box-shadow: 0 10px 20px rgba(201,162,39,0.2);
}
.hero-submit-btn:hover { transform: translateY(-3px); box-shadow: 0 15px 30px rgba(201,162,39,0.4); }

/* Mobile Responsive Hero */
@media (max-width: 1024px) {
  .hero-container { grid-template-columns: 1fr; gap: 3rem; }
  .hero-title-line--2 { font-size: clamp(3rem, 8vw, 4rem); }
}

@media (max-width: 600px) {
  .site-logo-img { height: 36px; }
  .hero { padding-top: 100px; padding-bottom: 2rem; min-height: auto; }
  .hero-container { display: flex; flex-direction: column; padding-top: 1rem; gap: 2rem; }
  
  /* Badge */
  .hero-badge {
    padding: 0.4rem 0.8rem 0.4rem 0.4rem;
    font-size: 0.65rem;
    margin-bottom: 1rem;
    width: fit-content;
    border-radius: 999px;
  }
  .hb-desktop { display: none; }
  .hb-mobile { display: inline; color: #fff; font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em; }
  
  /* Titles */
  .hero-title { align-items: flex-start; margin-bottom: 1rem; }
  .hero-title-line--1 { font-size: 2rem; }
  .hero-title-line--2 { font-size: 2.5rem; line-height: 1.1; margin: 4px 0; }
  .hero-title-line--3 { font-size: 1.5rem; }
  .hero-sub { font-size: 0.95rem; line-height: 1.5; margin-bottom: 1.5rem; }
  
  /* CTAs */
  .hero-ctas { flex-direction: column; gap: 0.8rem; }
  .hero-btn { padding: 0.7rem 1rem; width: 100%; justify-content: flex-start; }
  .hero-btn-icon { width: 32px; height: 32px; }
  .hero-btn-label { font-size: 0.85rem; }
  
  /* Trust Panel */
  .hero-trust { gap: 0.8rem; padding: 0.8rem; border-radius: 12px; display: grid; grid-template-columns: 1fr 1fr; justify-content: start; }
  .trust-indicator { width: 100%; gap: 8px; }
  .ti-icon { width: 28px; height: 28px; font-size: 0.7rem; }
  .ti-text strong { font-size: 0.8rem; }
  .ti-text span { font-size: 0.55rem; }
  .trust-divider { display: none; }
  
  /* Form Panel */
  .hero-panel { padding: 1.5rem; border-radius: 16px; margin-top: 0.5rem; }
  .form-row { grid-template-columns: 1fr; gap: 1rem; }
  .panel-title { font-size: 1.5rem; }
}
`;

let css = fs.readFileSync('style.css', 'utf8');

// Find where to insert it. We will replace the broken hero-line-accent tail with the properly closed hero-line-accent + missingCSS.
const brokenLineAccent = `.hero-line-accent {
  position: absolute;
  left: 0; right: 0;
  top: 55%;
  height: 1px;
  background: linear-gradient(90deg,
  .hero-badge {`;

if (css.includes('.hero-line-accent {\n  position: absolute;\n  left: 0; right: 0;\n  top: 55%;\n  height: 1px;\n  background: linear-gradient(90deg,')) {
    // It's broken. Let's find the exact index.
    const searchStr = `.hero-line-accent {`;
    const startIndex = css.indexOf(searchStr);
    
    // The broken part ends right where the script `fix_css.js` inserted `.hero-badge`.
    // We can just completely replace everything from `.hero-line-accent {` up to `/* ═══════════════════════════════════════════════════════\n   PROCESS`
    const processIndex = css.indexOf('/* ═══════════════════════════════════════════════════════\n   PROCESS');
    
    if (startIndex !== -1 && processIndex !== -1) {
        const fixedCSS = css.substring(0, startIndex) + '.hero-line-accent {' + missingCSS + '\n' + css.substring(processIndex);
        fs.writeFileSync('style.css', fixedCSS, 'utf8');
        console.log('Successfully restored Hero CSS!');
    } else {
        console.log('Could not find bounds to restore.');
    }
} else {
    console.log('hero-line-accent looks different, cannot replace.');
}

