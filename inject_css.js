const fs = require('fs');

const css = `
/* ═══════════════════════════════════════════════════════
   MOBILE HERO SECTION (Screenshots exactly)
═══════════════════════════════════════════════════════ */

/* Mobile Hero wrapper */
.hero-mobile {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: #0f0f15;
  color: #fff;
  padding: 100px 1.2rem 4rem;
  display: flex;
  flex-direction: column;
  z-index: 10;
  overflow: hidden;
}

.hm-bg {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-image: 
    linear-gradient(to bottom, rgba(15,15,21,0.2) 0%, rgba(15,15,21,0.95) 60%, #0f0f15 100%),
    url('hero_interior.png');
  background-size: cover;
  background-position: center;
  z-index: -1;
  opacity: 0.5;
}

.hm-bg::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 40px 40px;
  z-index: 1;
}

.hm-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 500px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

/* Badge */
.hm-badge {
  display: flex;
  align-items: stretch;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(201,162,39,0.3);
  border-radius: 999px;
  backdrop-filter: blur(10px);
  padding: 0.35rem 0.8rem 0.35rem 0.35rem;
  gap: 12px;
  margin-bottom: 0.5rem;
}

.hm-badge-icon {
  width: 32px; height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--gold), var(--gold-light));
  display: flex; align-items: center; justify-content: center;
  color: #fff;
  font-size: 0.8rem;
  flex-shrink: 0;
  box-shadow: 0 0 15px rgba(201,162,39,0.4);
}

.hm-badge-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2px;
}

.hm-badge-text span {
  font-size: 0.5rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  color: rgba(255,255,255,0.7);
  line-height: 1;
}

.hm-badge-text span:first-child { color: rgba(255,255,255,0.9); font-size: 0.55rem; }
.hm-badge-text span:last-child { color: var(--gold); }
.hm-badge-text span:last-child i { font-size: 0.4rem; margin-right: 3px; }

/* Title */
.hm-title {
  display: flex;
  flex-direction: column;
  margin: 0;
}

.hm-title-1 {
  font-family: 'Playfair Display', serif;
  font-style: italic;
  font-size: 2.2rem;
  font-weight: 400;
  color: rgba(255,255,255,0.8);
  line-height: 1.1;
}

.hm-title-2 {
  font-size: 3rem;
  font-weight: 900;
  letter-spacing: -0.02em;
  line-height: 1;
  color: #fff;
}

.hm-title-2 em {
  font-style: italic;
  color: var(--gold);
}

.hm-title-3 {
  font-size: 1.6rem;
  font-weight: 400;
  letter-spacing: -0.01em;
  line-height: 1.2;
}

.hm-title-3 strong { font-weight: 900; }

/* Subtitle */
.hm-sub {
  font-size: 0.95rem;
  color: rgba(255,255,255,0.65);
  line-height: 1.6;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.hm-sub em {
  display: block;
  font-weight: 700;
  font-style: italic;
  color: rgba(255,255,255,0.9);
  margin-top: 6px;
}

/* CTAs */
.hm-ctas {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.hm-btn {
  display: flex;
  align-items: center;
  padding: 0.8rem 1.2rem;
  border-radius: 12px;
  text-decoration: none;
  gap: 12px;
  transition: transform 0.3s ease;
}

.hm-btn:active { transform: scale(0.98); }

.hm-btn-primary {
  background: linear-gradient(135deg, var(--orange), var(--purple));
  box-shadow: 0 8px 25px rgba(232,71,28,0.25);
  border: 1px solid rgba(255,255,255,0.1);
}

.hm-btn-secondary {
  background: rgba(255,255,255,0.05);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.1);
}

.hm-btn-icon {
  width: 38px; height: 38px;
  border-radius: 8px;
  background: rgba(255,255,255,0.2);
  display: flex; align-items: center; justify-content: center;
  color: #fff;
  font-size: 1rem;
  flex-shrink: 0;
}

.hm-btn-text {
  display: flex;
  flex-direction: column;
}

.hm-btn-title {
  color: #fff;
  font-weight: 700;
  font-size: 1.05rem;
  letter-spacing: -0.01em;
}

.hm-btn-sub {
  color: rgba(255,255,255,0.7);
  font-size: 0.7rem;
  margin-top: 2px;
}

.hm-calc-link {
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(255,255,255,0.6);
  font-size: 0.8rem;
  text-decoration: none;
  font-weight: 600;
  margin-top: 0.2rem;
}

.hm-calc-link i { color: var(--orange); }

/* Embedded Form */
.hm-form-card {
  margin-top: 2rem;
  background: rgba(25, 25, 30, 0.7);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 20px;
  padding: 2rem 1.5rem;
  position: relative;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.5);
}

.hm-form-tag {
  position: absolute;
  top: -12px;
  left: 1.5rem;
  background: var(--whatsapp-dk);
  color: #fff;
  font-size: 0.6rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  padding: 4px 10px;
  border-radius: 999px;
  display: flex; align-items: center; gap: 4px;
}

.hm-form-tag i { font-size: 0.4rem; color: #51ff8e; }

.hm-form-title {
  font-size: 1.8rem;
  font-weight: 800;
  color: #fff;
  line-height: 1.1;
  margin-bottom: 0.3rem;
  letter-spacing: -0.02em;
}

.hm-form-title em {
  font-family: 'Playfair Display', serif;
  font-style: italic;
  font-weight: 400;
  color: var(--gold);
}

.hm-form-sub {
  font-size: 0.85rem;
  color: rgba(255,255,255,0.6);
  margin-bottom: 1.5rem;
}

.hm-form-sub strong { color: #fff; }

.hm-form { display: flex; flex-direction: column; gap: 1.2rem; }

.hm-field { display: flex; flex-direction: column; gap: 6px; }

.hm-field label {
  font-size: 0.65rem;
  font-weight: 800;
  color: rgba(255,255,255,0.5);
  letter-spacing: 0.05em;
}

.hm-input-wrap {
  position: relative;
}

.hm-input-wrap input, .hm-input-wrap select {
  width: 100%;
  background: rgba(0,0,0,0.3);
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: 12px;
  padding: 14px 14px 14px 44px;
  color: #fff;
  font-family: inherit;
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.3s;
}

.hm-input-wrap select { appearance: none; }

.hm-input-wrap input:focus, .hm-input-wrap select:focus {
  border-color: rgba(201,162,39,0.5);
}

.hm-input-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--gold);
  font-size: 0.9rem;
}

.hm-submit {
  margin-top: 0.5rem;
  background: linear-gradient(135deg, var(--orange), var(--purple));
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 16px;
  font-weight: 800;
  font-size: 1rem;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center; gap: 10px;
  box-shadow: 0 8px 25px rgba(232,71,28,0.25);
}

.hm-form-footer {
  text-align: center;
  font-size: 0.6rem;
  color: rgba(255,255,255,0.4);
  margin-top: 0.5rem;
}

.hm-scroll {
  display: flex; flex-direction: column; align-items: center;
  gap: 8px; margin-top: 3rem;
  opacity: 0.5;
}

.hm-scroll-line {
  width: 1px; height: 40px;
  background: linear-gradient(to bottom, rgba(255,255,255,0.5), transparent);
}

.hm-scroll span {
  font-size: 0.6rem; font-weight: 800; letter-spacing: 0.2em;
}

.hm-wa-float {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  background: var(--whatsapp);
  color: #fff;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 1.5rem;
  box-shadow: 0 4px 15px rgba(37, 211, 102, 0.4);
  z-index: 100;
  text-decoration: none;
}

/* Default display states */
.hero-mobile { display: none; }
.hero { display: block; }

@media (max-width: 768px) {
  .hero-mobile { display: flex !important; }
  .hero { display: none !important; }
}
`;

fs.appendFileSync('style.css', '\\n' + css);
console.log('Injected CSS!');
