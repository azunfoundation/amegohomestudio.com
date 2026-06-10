const fs = require('fs');

let css = fs.readFileSync('style.css', 'utf8');

const replacements = [
  // Desktop Hero BG & Overlays
  [/\.hero-cinematic-overlay \{[\s\S]*?\}/, '.hero-cinematic-overlay {\n  position: absolute; inset: 0;\n  background: linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(250,248,245,0.85) 35%, rgba(245,242,238,0.90) 100%);\n}'],
  [/\.hero-vignette \{[\s\S]*?\}/, '.hero-vignette {\n  position: absolute; inset: 0;\n  background: radial-gradient(ellipse 100% 80% at 50% 50%, transparent 40%, rgba(255,255,255,0.6) 100%);\n}'],
  
  // Orbs
  [/background: radial-gradient\(circle, rgba\(201,162,39,0\.18\) 0%, transparent 70%\);/, 'background: radial-gradient(circle, rgba(220,190,100,0.15) 0%, transparent 70%);'],
  [/background: radial-gradient\(circle, rgba\(232,71,28,0\.12\) 0%, transparent 70%\);/, 'background: radial-gradient(circle, rgba(200,100,80,0.08) 0%, transparent 70%);'],
  [/background: radial-gradient\(circle, rgba\(124,58,237,0\.10\) 0%, transparent 70%\);/, 'background: radial-gradient(circle, rgba(150,150,150,0.08) 0%, transparent 70%);'],
  
  // Grids & Lines
  [/linear-gradient\(rgba\(255,255,255,0\.028\) 1px, transparent 1px\)/g, 'linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px)'],
  [/linear-gradient\(90deg, rgba\(255,255,255,0\.028\) 1px, transparent 1px\)/g, 'linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)'],
  [/rgba\(201,162,39,0\.3\)/g, 'rgba(0,0,0,0.05)'],
  [/rgba\(201,162,39,0\.5\)/g, 'rgba(0,0,0,0.08)'],
  
  // Badge
  [/background: rgba\(255,255,255,0\.06\);[\s\n]*border: 1px solid rgba\(201,162,39,0\.35\);/g, 'background: rgba(255,255,255,0.9);\n  border: 1px solid rgba(0,0,0,0.08);'],
  [/color: rgba\(255,255,255,0\.88\);/g, 'color: #333;'],
  [/\.badge-icon \{[\s\S]*?box-shadow:.*?;[\n\s]*\}/, '.badge-icon {\n  width: 26px; height: 26px;\n  border-radius: 50%;\n  background: #d32f2f;\n  display: flex; align-items: center; justify-content: center;\n  color: #fff;\n  font-size: 0.65rem;\n  flex-shrink: 0;\n  box-shadow: none;\n}'],
  [/\.badge-dot span \{[\s\S]*?animation:.*?;[\n\s]*\}/, '.badge-dot span {\n  display: block;\n  width: 5px; height: 5px;\n  border-radius: 50%;\n  background: #d32f2f;\n  animation: badgePulse 2.4s ease-in-out infinite;\n}'],
  [/\.badge-location \{[\s\S]*?\}/, '.badge-location {\n  color: #d32f2f;\n  font-weight: 600;\n}'],
  
  // Title
  [/\.hero-title \{[\s\S]*?color: #fff;/g, '.hero-title {\n  font-family: var(--font-head);\n  font-weight: 700;\n  line-height: 1.05;\n  color: #1a1a1a;'],
  [/color: rgba\(255,255,255,0\.65\);/g, 'color: #555;'],
  [/background: linear-gradient\(135deg, var\(--gold-light\) 0%, #F5C842 50%, var\(--gold\) 100%\);/, 'background: linear-gradient(135deg, #d4af37 0%, #aa7c11 100%);'],
  [/color: rgba\(255,255,255,0\.82\);/g, 'color: #333;'],
  [/\.title-highlight \{[\s\S]*?color: #fff;/g, '.title-highlight {\n  display: inline-block;\n  position: relative;\n  color: #1a1a1a;'],
  
  // Sub
  [/color: rgba\(255,255,255,0\.68\);/g, 'color: #555;'],
  [/color: rgba\(255,255,255,0\.90\);/g, 'color: #222;'],
  
  // Links
  [/color: rgba\(255,255,255,0\.55\);/g, 'color: #555;'],
  [/color: rgba\(255,255,255,0\.9\);/g, 'color: #111;'],
  
  // Buttons
  [/\.hero-btn--primary \{[\s\S]*?border:.*?;[\n\s]*\}/, '.hero-btn--primary {\n  background: #d32f2f;\n  color: #fff;\n  box-shadow: 0 8px 24px rgba(211,47,47,0.3);\n  border: none;\n}'],
  [/\.hero-btn--primary:hover \{[\s\S]*?\}/, '.hero-btn--primary:hover {\n  transform: translateY(-3px);\n  box-shadow: 0 12px 32px rgba(211,47,47,0.4);\n}'],
  [/\.hero-btn--ghost \{[\s\S]*?-webkit-backdrop-filter:.*?;[\n\s]*\}/, '.hero-btn--ghost {\n  background: #fff;\n  color: #333;\n  border: 1px solid rgba(0,0,0,0.1);\n  backdrop-filter: none;\n  -webkit-backdrop-filter: none;\n}'],
  [/\.hero-btn--ghost .hero-btn-icon \{[\s\S]*?\}/, '.hero-btn--ghost .hero-btn-icon {\n  background: rgba(0,0,0,0.05);\n  color: #555;\n}'],
  [/\.hero-btn--ghost:hover \{[\s\S]*?\}/, '.hero-btn--ghost:hover {\n  background: rgba(0,0,0,0.02);\n  border-color: rgba(0,0,0,0.15);\n  transform: translateY(-3px);\n  box-shadow: 0 8px 24px rgba(0,0,0,0.05);\n}'],
  
  // Trust
  [/\.hero-trust \{[\s\S]*?max-width: 100%;[\n\s]*\}/, '.hero-trust {\n  display: flex;\n  align-items: center;\n  flex-wrap: nowrap;\n  background: #fff;\n  border: 1px solid rgba(0,0,0,0.08);\n  border-radius: 16px;\n  padding: 0.85rem 1.2rem;\n  gap: 0.8rem;\n  width: fit-content;\n  max-width: 100%;\n  box-shadow: 0 8px 24px rgba(0,0,0,0.04);\n}'],
  [/\.ti-icon \{[\s\S]*?transition:.*?;[\n\s]*\}/, '.ti-icon {\n  width: 36px; height: 36px;\n  border-radius: 10px;\n  background: rgba(0,0,0,0.04);\n  border: 1px solid rgba(0,0,0,0.05);\n  display: flex; align-items: center; justify-content: center;\n  color: #555;\n  font-size: 0.8rem;\n  flex-shrink: 0;\n  transition: all 0.3s var(--ease);\n}'],
  [/\.ti-icon--gold \{[\s\S]*?\}/, '.ti-icon--gold {\n  background: rgba(212,175,55,0.1);\n  border-color: rgba(212,175,55,0.2);\n  color: #aa7c11;\n}'],
  [/\.trust-indicator:hover \.ti-icon \{[\s\S]*?\}/, '.trust-indicator:hover .ti-icon {\n  background: rgba(211,47,47,0.1);\n  border-color: rgba(211,47,47,0.2);\n  color: #d32f2f;\n  transform: scale(1.1) rotate(-5deg);\n}'],
  [/\.ti-text strong \{[\s\S]*?line-height: 1\.1;[\n\s]*\}/, '.ti-text strong {\n  font-size: 0.88rem;\n  font-weight: 700;\n  color: #1a1a1a;\n  letter-spacing: -0.01em;\n  line-height: 1.1;\n}'],
  [/\.ti-text span \{[\s\S]*?margin-top: 2px;[\n\s]*\}/, '.ti-text span {\n  font-size: 0.65rem;\n  color: #666;\n  letter-spacing: 0.04em;\n  text-transform: uppercase;\n  margin-top: 2px;\n}'],
  [/\.trust-divider \{[\s\S]*?flex-shrink: 0;[\n\s]*\}/, '.trust-divider {\n  width: 1px;\n  height: 32px;\n  background: rgba(0,0,0,0.08);\n  flex-shrink: 0;\n}'],
  
  // Panel
  [/\.hero-panel \{[\s\S]*?animation:.*?;[\n\s]*\}/, '.hero-panel {\n  position: relative;\n  background: #ffffff;\n  border-radius: 24px;\n  border: 1px solid rgba(0,0,0,0.08);\n  box-shadow: 0 16px 48px rgba(0,0,0,0.08);\n  padding: 2.2rem 2rem;\n  overflow: hidden;\n  animation: panelEntrance 1s cubic-bezier(0.22, 1, 0.36, 1) 0.3s both;\n}'],
  [/\.hero-panel::before \{[\s\S]*?pointer-events: none;[\n\s]*\}/, '.hero-panel::before {\n  content: \'\';\n  position: absolute;\n  top: 0; right: 0;\n  width: 140px; height: 140px;\n  background: radial-gradient(circle at top right, rgba(212,175,55,0.08) 0%, transparent 70%);\n  pointer-events: none;\n}'],
  [/\.panel-glow \{[\s\S]*?pointer-events: none;[\n\s]*\}/, '.panel-glow {\n  display: none;\n}'],
  [/\.panel-title \{[\s\S]*?margin-bottom: 0\.45rem;[\n\s]*\}/, '.panel-title {\n  font-family: var(--font-head);\n  font-size: 1.6rem;\n  font-weight: 700;\n  color: #1a1a1a;\n  line-height: 1.2;\n  letter-spacing: -0.02em;\n  margin-bottom: 0.45rem;\n}'],
  [/\.panel-title em \{[\s\S]*?background-clip: text;[\n\s]*\}/, '.panel-title em {\n  font-style: italic;\n  background: linear-gradient(135deg, #d4af37, #aa7c11);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n}'],
  [/\.panel-sub \{[\s\S]*?letter-spacing: 0\.01em;[\n\s]*\}/, '.panel-sub {\n  font-size: 0.8rem;\n  color: #666;\n  letter-spacing: 0.01em;\n}'],
  [/\.panel-sub strong \{[\s\S]*?font-weight: 600;[\n\s]*\}/, '.panel-sub strong {\n  color: #222;\n  font-weight: 600;\n}'],
  [/\.panel-divider \{[\s\S]*?margin-bottom: 1\.4rem;[\n\s]*\}/, '.panel-divider {\n  height: 1px;\n  background: rgba(0,0,0,0.06);\n  margin-bottom: 1.4rem;\n}'],
  
  // Form
  [/\.lf-label \{[\s\S]*?padding-left: 2px;[\n\s]*\}/, '.lf-label {\n  font-size: 0.67rem;\n  font-weight: 700;\n  letter-spacing: 0.10em;\n  text-transform: uppercase;\n  color: #555;\n  padding-left: 2px;\n}'],
  [/\.lf-icon \{[\s\S]*?transition: color 0\.3s var\(--ease\);[\n\s]*\}/, '.lf-icon {\n  position: absolute;\n  left: 12px;\n  color: #888;\n  font-size: 0.78rem;\n  z-index: 1;\n  pointer-events: none;\n  transition: color 0.3s var(--ease);\n}'],
  [/\.lf-input \{[\s\S]*?outline: none;[\n\s]*\}/, '.lf-input {\n  width: 100%;\n  padding: 0.75rem 1rem 0.75rem 2.4rem;\n  background: #f9f9f9;\n  border: 1px solid #e0e0e0;\n  border-radius: 11px;\n  font-size: 0.85rem;\n  color: #333;\n  font-family: var(--font-body);\n  -webkit-appearance: none;\n  appearance: none;\n  transition: background 0.3s var(--ease), border-color 0.3s var(--ease), box-shadow 0.3s var(--ease);\n  outline: none;\n}'],
  [/\.lf-input::placeholder \{ color: rgba\(255,255,255,0\.25\); \}/, '.lf-input::placeholder { color: #aaa; }'],
  [/\.lf-input:focus \{[\s\S]*?box-shadow:.*?;[\n\s]*\}/, '.lf-input:focus {\n  background: #fff;\n  border-color: #d32f2f;\n  box-shadow: 0 0 0 3px rgba(211,47,47,0.1);\n}'],
  [/\.lf-input-wrap:focus-within \.lf-icon \{ color: var\(--gold-light\); \}/, '.lf-input-wrap:focus-within .lf-icon { color: #d32f2f; }'],
  [/\.lf-select-arrow \{[\s\S]*?z-index: 1;[\n\s]*\}/, '.lf-select-arrow {\n  position: absolute;\n  right: 12px;\n  color: #888;\n  font-size: 0.65rem;\n  pointer-events: none;\n  z-index: 1;\n}'],
  [/\.lf-input option \{[\s\S]*?color: rgba\(255,255,255,0\.9\);[\n\s]*\}/, '.lf-input option {\n  background: #fff;\n  color: #333;\n}'],
  [/\.lf-focus-line \{[\s\S]*?transform-origin: center;[\n\s]*\}/, '.lf-focus-line {\n  position: absolute;\n  bottom: 0; left: 10%; right: 10%;\n  height: 2px;\n  background: #d32f2f;\n  border-radius: 2px;\n  transform: scaleX(0);\n  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);\n  transform-origin: center;\n}'],
  [/\.lf-submit \{[\s\S]*?transition:.*?;[\n\s]*\}/, '.lf-submit {\n  width: 100%;\n  padding: 1rem;\n  border: none;\n  border-radius: 14px;\n  cursor: pointer;\n  position: relative;\n  overflow: hidden;\n  margin-top: 0.3rem;\n  background: #d32f2f;\n  box-shadow: 0 8px 24px rgba(211,47,47,0.25);\n  transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);\n}'],
  [/\.lf-submit:hover \{[\s\S]*?inset 0 1px 0 rgba\(255,255,255,0\.2\);[\n\s]*\}/, '.lf-submit:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 12px 32px rgba(211,47,47,0.35);\n}'],
  [/\.lf-trust-note \{[\s\S]*?padding-top: 0\.2rem;[\n\s]*\}/, '.lf-trust-note {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n  font-size: 0.68rem;\n  color: #666;\n  letter-spacing: 0.02em;\n  padding-top: 0.2rem;\n}'],
  [/\.hero-scroll-cue span \{[\s\S]*?color: rgba\(255,255,255,0\.35\);[\n\s]*\}/, '.hero-scroll-cue span {\n  font-size: 0.6rem;\n  font-weight: 600;\n  letter-spacing: 0.2em;\n  text-transform: uppercase;\n  color: #555;\n}'],
  [/\.scroll-line \{[\s\S]*?animation:.*?;[\n\s]*\}/, '.scroll-line {\n  width: 1px; height: 0;\n  background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.2));\n  animation: scrollGrow 2s ease-in-out infinite;\n}'],
  
  // Mobile Hero
  [/\.hero-mobile \{[\s\S]*?z-index: 10;[\n\s]*\}/, '.hero-mobile {\n  position: relative;\n  width: 100%;\n  background-color: #ffffff !important;\n  background-image: \n    linear-gradient(to bottom, rgba(255,255,255,0.95) 0%, rgba(250,248,245,0.90) 70%, #ffffff 100%),\n    url(\'hero_interior.png\') !important;\n  background-size: cover !important;\n  background-position: center top !important;\n  background-repeat: no-repeat !important;\n  color: #1a1a1a;\n  padding: 100px 1.2rem 4rem;\n  display: flex;\n  flex-direction: column;\n  z-index: 10;\n}'],
  [/\.hm-badge \{[\s\S]*?margin-bottom: 0\.5rem;[\n\s]*\}/, '.hm-badge {\n  display: flex;\n  align-items: stretch;\n  background: #fff;\n  border: 1px solid rgba(0,0,0,0.1);\n  box-shadow: 0 4px 12px rgba(0,0,0,0.05);\n  border-radius: 999px;\n  padding: 0.35rem 0.8rem 0.35rem 0.35rem;\n  gap: 12px;\n  margin-bottom: 0.5rem;\n}'],
  [/\.hm-badge-icon \{[\s\S]*?box-shadow:.*?;[\n\s]*\}/, '.hm-badge-icon {\n  width: 32px; height: 32px;\n  border-radius: 50%;\n  background: #d32f2f;\n  display: flex; align-items: center; justify-content: center;\n  color: #fff;\n  font-size: 0.8rem;\n  flex-shrink: 0;\n  box-shadow: none;\n}'],
  [/\.hm-badge-col span \{[\s\S]*?white-space: nowrap;[\n\s]*\}/, '.hm-badge-col span {\n  font-size: 0.45rem;\n  font-weight: 800;\n  letter-spacing: 0.05em;\n  color: #666;\n  line-height: 1;\n  white-space: nowrap;\n}'],
  [/\.hm-badge-col span:first-child \{ color: rgba\(255,255,255,0\.9\); font-size: 0\.5rem; \}/, '.hm-badge-col span:first-child { color: #333; font-size: 0.5rem; }'],
  [/\.hm-badge-divider \{[\s\S]*?margin: 2px 0;[\n\s]*\}/, '.hm-badge-divider {\n  width: 1px;\n  background: rgba(0,0,0,0.1);\n  margin: 2px 0;\n}'],
  [/\.hm-title-1 \{[\s\S]*?line-height: 1\.1;[\n\s]*\}/, '.hm-title-1 {\n  font-family: \'Playfair Display\', serif;\n  font-style: italic;\n  font-size: 2.2rem;\n  font-weight: 400;\n  color: #555;\n  line-height: 1.1;\n}'],
  [/\.hm-title-2 \{[\s\S]*?color: #fff;[\n\s]*\}/, '.hm-title-2 {\n  font-size: 3rem;\n  font-weight: 900;\n  letter-spacing: -0.02em;\n  line-height: 1;\n  color: #1a1a1a;\n}'],
  [/\.hm-title-2 em \{[\s\S]*?color: var\(--gold\);[\n\s]*\}/, '.hm-title-2 em {\n  font-style: italic;\n  color: #aa7c11;\n}'],
  [/\.hm-title-3 \{[\s\S]*?line-height: 1\.2;[\n\s]*\}/, '.hm-title-3 {\n  font-size: 1.6rem;\n  font-weight: 400;\n  letter-spacing: -0.01em;\n  line-height: 1.2;\n  color: #333;\n}'],
  [/\.hm-sub \{[\s\S]*?margin-bottom: 0\.5rem;[\n\s]*\}/, '.hm-sub {\n  font-size: 0.95rem;\n  color: #555;\n  line-height: 1.6;\n  margin-top: 0.5rem;\n  margin-bottom: 0.5rem;\n}'],
  [/\.hm-sub em \{[\s\S]*?margin-top: 6px;[\n\s]*\}/, '.hm-sub em {\n  display: block;\n  font-weight: 700;\n  font-style: italic;\n  color: #222;\n  margin-top: 6px;\n}'],
  [/\.hm-btn-primary \{[\s\S]*?border: 1px solid rgba\(255,255,255,0\.1\);[\n\s]*\}/, '.hm-btn-primary {\n  background: #d32f2f;\n  box-shadow: 0 8px 24px rgba(211,47,47,0.3);\n  border: none;\n  color: #fff;\n}'],
  [/\.hm-btn-secondary \{[\s\S]*?border: 1px solid rgba\(255,255,255,0\.1\);[\n\s]*\}/, '.hm-btn-secondary {\n  background: #fff;\n  border: 1px solid rgba(0,0,0,0.1);\n  color: #333;\n}'],
  [/\.hm-btn-icon \{[\s\S]*?flex-shrink: 0;[\n\s]*\}/, '.hm-btn-icon {\n  width: 38px; height: 38px;\n  border-radius: 8px;\n  background: rgba(0,0,0,0.05);\n  display: flex; align-items: center; justify-content: center;\n  color: #555;\n  font-size: 1rem;\n  flex-shrink: 0;\n}'],
  [/\.hm-btn-primary \.hm-btn-icon \{[\s\S]*?\}/, ''], // Just in case
  [/\.hm-btn-title \{[\s\S]*?letter-spacing: -0\.01em;[\n\s]*\}/, '.hm-btn-title {\n  color: #1a1a1a;\n  font-weight: 700;\n  font-size: 1.05rem;\n  letter-spacing: -0.01em;\n}'],
  [/\.hm-btn-sub \{[\s\S]*?margin-top: 2px;[\n\s]*\}/, '.hm-btn-sub {\n  color: #666;\n  font-size: 0.7rem;\n  margin-top: 2px;\n}'],
  [/\.hm-calc-link \{[\s\S]*?margin-top: 0\.2rem;[\n\s]*\}/, '.hm-calc-link {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  color: #555;\n  font-size: 0.8rem;\n  text-decoration: none;\n  font-weight: 600;\n  margin-top: 0.2rem;\n}'],
  [/\.hm-form-card \{[\s\S]*?box-shadow:.*?;[\n\s]*\}/, '.hm-form-card {\n  margin-top: 2rem;\n  background: #ffffff;\n  border: 1px solid rgba(0,0,0,0.08);\n  border-radius: 20px;\n  padding: 2rem 1.5rem;\n  position: relative;\n  box-shadow: 0 16px 48px rgba(0,0,0,0.08);\n}'],
  [/\.hm-form-title \{[\s\S]*?letter-spacing: -0\.02em;[\n\s]*\}/, '.hm-form-title {\n  font-size: 1.8rem;\n  font-weight: 800;\n  color: #1a1a1a;\n  line-height: 1.1;\n  margin-bottom: 0.3rem;\n  letter-spacing: -0.02em;\n}'],
  [/\.hm-form-title em \{[\s\S]*?color: var\(--gold\);[\n\s]*\}/, '.hm-form-title em {\n  font-family: \'Playfair Display\', serif;\n  font-style: italic;\n  font-weight: 400;\n  color: #aa7c11;\n}'],
  [/\.hm-form-sub \{[\s\S]*?margin-bottom: 1\.5rem;[\n\s]*\}/, '.hm-form-sub {\n  font-size: 0.85rem;\n  color: #666;\n  margin-bottom: 1.5rem;\n}'],
  [/\.hm-form-sub strong \{ color: #fff; \}/, '.hm-form-sub strong { color: #1a1a1a; }'],
  [/\.hm-field label \{[\s\S]*?letter-spacing: 0\.05em;[\n\s]*\}/, '.hm-field label {\n  font-size: 0.65rem;\n  font-weight: 800;\n  color: #555;\n  letter-spacing: 0.05em;\n}'],
  [/\.hm-input-wrap input, \.hm-input-wrap select \{[\s\S]*?transition: border-color 0\.3s;[\n\s]*\}/, '.hm-input-wrap input, .hm-input-wrap select {\n  width: 100%;\n  background: #f9f9f9;\n  border: 1px solid #e0e0e0;\n  border-radius: 12px;\n  padding: 14px 14px 14px 44px;\n  color: #333;\n  font-family: inherit;\n  font-size: 0.95rem;\n  outline: none;\n  transition: border-color 0.3s;\n}'],
  [/\.hm-input-wrap input:focus, \.hm-input-wrap select:focus \{[\s\S]*?\}[\n\s]*/, '.hm-input-wrap input:focus, .hm-input-wrap select:focus {\n  border-color: #d32f2f;\n}\n'],
  [/\.hm-input-icon \{[\s\S]*?font-size: 0\.9rem;[\n\s]*\}/, '.hm-input-icon {\n  position: absolute;\n  left: 16px;\n  top: 50%;\n  transform: translateY(-50%);\n  color: #888;\n  font-size: 0.9rem;\n}'],
  [/\.hm-submit \{[\s\S]*?box-shadow:.*?;[\n\s]*\}/, '.hm-submit {\n  margin-top: 0.5rem;\n  background: #d32f2f;\n  color: #fff;\n  border: none;\n  border-radius: 12px;\n  padding: 14px;\n  font-weight: 800;\n  font-size: 0.9rem;\n  white-space: nowrap;\n  cursor: pointer;\n  display: flex; align-items: center; justify-content: center; gap: 8px;\n  box-shadow: 0 8px 24px rgba(211,47,47,0.3);\n}'],
  [/\.hm-form-footer \{[\s\S]*?margin-top: 0\.5rem;[\n\s]*\}/, '.hm-form-footer {\n  text-align: center;\n  font-size: 0.6rem;\n  color: #777;\n  margin-top: 0.5rem;\n}'],
  [/\.hm-scroll-line \{[\s\S]*?\}[\n\s]*/, '.hm-scroll-line {\n  width: 1px; height: 40px;\n  background: linear-gradient(to bottom, rgba(0,0,0,0.2), transparent);\n}\n'],
  [/\.hm-scroll span \{[\s\S]*?\}[\n\s]*/, '.hm-scroll span {\n  font-size: 0.6rem; font-weight: 800; letter-spacing: 0.2em; color: #555;\n}\n'],
  [/\.hm-glow \{[\s\S]*?\}[\n\s]*/, '.hm-glow {\n  display: none;\n}\n']
];

for (let i = 0; i < replacements.length; i++) {
  const [regex, replacement] = replacements[i];
  const matched = css.match(regex);
  if (!matched) {
    console.log("Failed to match: ", regex.toString());
  } else {
    css = css.replace(regex, replacement);
  }
}

// Additional fix for primary button inside mobile
css += '\n.hm-btn-primary .hm-btn-icon { background: rgba(255,255,255,0.2); color: #fff; }\n.hm-btn-primary .hm-btn-title { color: #fff; }\n.hm-btn-primary .hm-btn-sub { color: rgba(255,255,255,0.8); }';

fs.writeFileSync('style.css', css);
console.log('Update complete');
