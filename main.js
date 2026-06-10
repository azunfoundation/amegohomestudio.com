/* ═══════════════════════════════════════════════════════
   AMEGO HOMESTUDIO — main.js
   Full interactivity: nav, hero, calculators, forms,
   portfolio filter, testimonials slider, animations
═══════════════════════════════════════════════════════ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  /* ─── EMAILJS CONFIG ─────────────────────────────── */
  // ⚠️  Replace these three values with your own from https://www.emailjs.com/
  const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';     // Account → API Keys → Public Key
  const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';     // Email Services → Service ID
  const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';    // Email Templates → Template ID
  if (typeof emailjs !== 'undefined') {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  }

  /* ─── UTILS ──────────────────────────────────────── */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
  const formatINR = n => {
    if (n >= 10000000) return '₹' + (n / 10000000).toFixed(2) + ' Cr';
    if (n >= 100000)  return '₹' + (n / 100000).toFixed(2) + ' L';
    if (n >= 1000)    return '₹' + (n / 1000).toFixed(1) + 'K';
    return '₹' + n.toLocaleString('en-IN');
  };
  const debounce = (fn, ms = 100) => { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; };

  /* ─── SCROLL TRACKING ────────────────────────────── */
  let lastScroll = 0;
  const header = $('#site-header');
  const backTop = $('#back-top');

  /* ─── BUILD MEGA MENU (desktop) ─────────────────── */
  function buildMegaMenu() {
    if (typeof NAV_MENU === 'undefined') return;
    NAV_MENU.forEach((col, idx) => {
      const colEl = $(`#mega-col-${idx + 1}`);
      if (!colEl) return;
      const titles = ['Kitchen & Storage', 'Rooms & Spaces', 'Finishing & Decor'];
      colEl.innerHTML = `<div class="mega-col-title">${titles[idx] || ''}</div>`;
      col.items.forEach(item => {
        const a = document.createElement('a');
        a.href = `category.html?page=${item.slug}`;
        a.className = 'mega-item';
        a.textContent = item.label;
        colEl.appendChild(a);
      });
    });
  }
  buildMegaMenu();

  /* ─── MOBILE SERVICES DROPDOWN (flat list) ───────── */
  // Build a separate flat dropdown for mobile that is completely
  // independent of the desktop mega-menu CSS.
  function buildMobileServicesDropdown() {
    if (typeof NAV_MENU === 'undefined') return;
    if ($('#mobile-services-list')) return; // already built

    const wrapper = document.createElement('li');
    wrapper.id = 'mobile-services-list';
    wrapper.className = 'mobile-services-list';

    const colTitles = ['Kitchen & Storage', 'Rooms & Spaces', 'Finishing & Decor'];
    NAV_MENU.forEach((col, idx) => {
      // Section label
      const label = document.createElement('div');
      label.className = 'mobile-services-label';
      label.textContent = colTitles[idx];
      wrapper.appendChild(label);
      // Items
      col.items.forEach(item => {
        const a = document.createElement('a');
        a.href = `category.html?page=${item.slug}`;
        a.className = 'mobile-services-item';
        a.textContent = item.label;
        // Close nav on click
        a.addEventListener('click', () => {
          const hbg = $('#hamburger');
          const nl  = $('#nav-links');
          hbg?.classList.remove('open');
          nl?.classList.remove('open');
          hbg?.setAttribute('aria-expanded', false);
          document.body.style.overflow = '';
          wrapper.style.display = 'none';
        });
        wrapper.appendChild(a);
      });
    });

    // Insert as a li sibling after the Services li
    megaParent?.insertAdjacentElement('afterend', wrapper);
    wrapper.style.display = 'none';
  }

  /* ─── HAMBURGER MENU ─────────────────────────────── */
  const hamburger = $('#hamburger');
  const navLinks  = $('#nav-links');
  const megaTrigger = $('#services-trigger');
  const megaParent  = megaTrigger?.closest('.has-mega-menu');

  // Toggle hamburger open/close
  hamburger?.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    navLinks.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
    // Hide services dropdown when closing the nav
    if (!open) {
      const msl = $('#mobile-services-list');
      if (msl) msl.style.display = 'none';
      megaParent?.classList.remove('active');
    }
  });

  // Close nav when a non-trigger link is clicked
  $$('.nav-link:not(.mega-trigger)').forEach(a => {
    a.addEventListener('click', () => {
      hamburger?.classList.remove('open');
      navLinks?.classList.remove('open');
      hamburger?.setAttribute('aria-expanded', false);
      document.body.style.overflow = '';
      const msl = $('#mobile-services-list');
      if (msl) msl.style.display = 'none';
      megaParent?.classList.remove('active');
    });
  });

  // ── Mobile Services Flat Dropdown ─────────────────
  // Builds a simple flat <li> list independent of desktop mega-menu CSS.
  function buildMobileServicesDropdown() {
    if (typeof NAV_MENU === 'undefined') return;
    if ($('#mobile-services-list')) return; // already built

    const wrapper = document.createElement('li');
    wrapper.id = 'mobile-services-list';
    wrapper.className = 'mobile-services-list';

    const colTitles = ['Kitchen & Storage', 'Rooms & Spaces', 'Finishing & Decor'];
    NAV_MENU.forEach((col, idx) => {
      const label = document.createElement('div');
      label.className = 'mobile-services-label';
      label.textContent = colTitles[idx];
      wrapper.appendChild(label);

      col.items.forEach(item => {
        const a = document.createElement('a');
        a.href = `category.html?page=${item.slug}`;
        a.className = 'mobile-services-item';
        a.textContent = item.label;
        a.addEventListener('click', () => {
          hamburger?.classList.remove('open');
          navLinks?.classList.remove('open');
          hamburger?.setAttribute('aria-expanded', false);
          document.body.style.overflow = '';
          wrapper.style.display = 'none';
          megaParent?.classList.remove('active');
        });
        wrapper.appendChild(a);
      });
    });

    // Insert as a <li> sibling directly after the Services <li>
    megaParent?.insertAdjacentElement('afterend', wrapper);
    wrapper.style.display = 'none';
  }

  // Services trigger: on mobile show flat dropdown, on desktop allow hover
  megaTrigger?.addEventListener('click', e => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      buildMobileServicesDropdown();
      const msl = $('#mobile-services-list');
      if (!msl) return;
      const isOpen = msl.style.display === 'block';
      msl.style.display = isOpen ? 'none' : 'block';
      megaParent.classList.toggle('active', !isOpen);
    }
  });

  // Close nav/dropdown on outside click
  document.addEventListener('click', e => {
    if (!navLinks) return;
    if (navLinks.classList.contains('open') && !navLinks.contains(e.target) && !hamburger?.contains(e.target)) {
      hamburger?.classList.remove('open');
      navLinks.classList.remove('open');
      hamburger?.setAttribute('aria-expanded', false);
      document.body.style.overflow = '';
      const msl = $('#mobile-services-list');
      if (msl) msl.style.display = 'none';
      megaParent?.classList.remove('active');
    }
  });

  /* ─── SCROLL TRACKING ────────────────────────────── */
  window.addEventListener('scroll', debounce(() => {
    const y = window.scrollY;
    if (y > 80) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
    if (y > lastScroll + 10 && y > 300) header.classList.add('hidden');
    else if (y < lastScroll - 5) header.classList.remove('hidden');
    lastScroll = y;
    if (y > 400) backTop.classList.add('visible');
    else backTop.classList.remove('visible');
    updateActiveNav();
  }, 10));

  backTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  function updateActiveNav() {
    const sections = $$('section[id]');
    const allNavLinks = $$('.nav-link');
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    allNavLinks.forEach(a => {
      a.classList.remove('active');
      if (a.getAttribute('href') === '#' + current) a.classList.add('active');
    });
  }

  /* ─── SCROLL ANIMATIONS (AOS-like) ──────────────── */
  const aosObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-visible');
        aosObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  $$('[data-aos]').forEach(el => aosObserver.observe(el));

  /* ─── HERO CINEMATIC ENTRANCE ANIMATIONS ─────────── */
  function initHeroAnimations() {
    const heroEls = $$('[data-hero-animate]');
    if (!heroEls.length) return;

    // Trigger entrance with staggered delays on load
    const triggerHero = () => {
      heroEls.forEach(el => {
        el.classList.add('hero-visible');
      });
    };

    // Use requestAnimationFrame so transitions fire after layout
    requestAnimationFrame(() => requestAnimationFrame(triggerHero));
  }
  initHeroAnimations();

  /* ─── HERO MOUSE PARALLAX ────────────────────────── */
  const heroBg = $('#hero-parallax-bg');
  const heroSection = $('#hero');

  if (heroBg && heroSection && window.matchMedia('(pointer: fine)').matches) {
    let rafId;
    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;

    heroSection.addEventListener('mousemove', e => {
      const rect = heroSection.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      targetX = (e.clientX - cx) / rect.width;
      targetY = (e.clientY - cy) / rect.height;
    });

    heroSection.addEventListener('mouseleave', () => {
      targetX = 0; targetY = 0;
    });

    const lerpParallax = () => {
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;
      const moveX = currentX * 18;
      const moveY = currentY * 12;
      heroBg.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.08)`;
      rafId = requestAnimationFrame(lerpParallax);
    };
    lerpParallax();
  }

  /* ─── COUNTER ANIMATION ──────────────────────────── */
  const counters = $$('.counter');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = +el.dataset.target;
      const duration = 1800;
      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target);
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));

  /* ─── CALCULATOR ─────────────────────────────────── */
  const calcTabs  = $$('.calc-tab');
  const calcPanels = $$('.calc-panel');

  // Tab switching
  calcTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.calc;
      calcTabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', false); });
      calcPanels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      tab.setAttribute('aria-selected', true);
      const panel = $(`#calc-${target}`);
      panel?.classList.add('active');
      // Calculate immediately when tab opens
      switch (target) {
        case 'full-home': calcFullHome(); break;
        case 'kitchen':   calcKitchen(); break;
        case 'wardrobe':  calcWardrobe(); break;
        case 'bathroom':  calcBathroom(); break;
      }
    });
  });

  // Range hints
  $$('.range-hint').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.target;
      const input = $(`#${targetId}`);
      if (input) {
        input.value = btn.dataset.val;
        input.dispatchEvent(new Event('input'));
        $$('.range-hint').forEach(b => { if (b.dataset.target === targetId) b.classList.remove('active'); });
        btn.classList.add('active');
      }
    });
  });

  // ── Full Home Calculator ──
  function calcFullHome() {
    const area = parseFloat($('#fh-area')?.value) || 1000;
    const BASE_RATE = 1800;
    const basic   = Math.round(area * BASE_RATE * 0.8);
    const premium = Math.round(area * BASE_RATE);
    const luxe    = Math.round(area * BASE_RATE * 1.25);

    const el = {
      result:  $('#fh-result'),
      range:   $('#fh-range'),
      basic:   $('#fh-basic'),
      premium: $('#fh-premium'),
      luxe:    $('#fh-luxe'),
    };
    if (el.result)  el.result.textContent  = formatINR(premium);
    if (el.range)   el.range.textContent   = `Range: ${formatINR(basic)} – ${formatINR(luxe)}`;
    if (el.basic)   el.basic.textContent   = formatINR(basic);
    if (el.premium) el.premium.textContent = formatINR(premium);
    if (el.luxe)    el.luxe.textContent    = formatINR(luxe);
  }

  // ── Kitchen Calculator ──
  function calcKitchen() {
    const length = parseFloat($('#kt-length')?.value) || 12;
    const RATE = 2500;
    const basic   = Math.round(length * RATE * 0.85);
    const premium = Math.round(length * RATE);
    const luxe    = Math.round(length * RATE * 1.4);

    animateValue('#kt-result', premium);
    const range = $('#kt-range');
    if (range) range.textContent = `Range: ${formatINR(basic)} – ${formatINR(luxe)}`;
    const kb = $('#kt-basic');   if (kb) kb.textContent = formatINR(basic);
    const kp = $('#kt-premium'); if (kp) kp.textContent = formatINR(premium);
    const kl = $('#kt-luxe');    if (kl) kl.textContent = formatINR(luxe);
  }

  // ── Wardrobe Calculator ──
  function calcWardrobe() {
    const length = parseFloat($('#wd-length')?.value) || 10;
    const RATE = 2200;
    const basic   = Math.round(length * RATE * 0.8);
    const premium = Math.round(length * RATE);
    const luxe    = Math.round(length * RATE * 1.4);

    animateValue('#wd-result', premium);
    const range = $('#wd-range');
    if (range) range.textContent = `Range: ${formatINR(basic)} – ${formatINR(luxe)}`;
    const wb = $('#wd-basic');   if (wb) wb.textContent = formatINR(basic);
    const wp = $('#wd-premium'); if (wp) wp.textContent = formatINR(premium);
    const wl = $('#wd-luxe');    if (wl) wl.textContent = formatINR(luxe);
  }

  // ── Bathroom Calculator ──
  function calcBathroom() {
    const count   = parseInt($('#bt-count')?.value) || 2;
    const RATE_STD  = 80000;
    const RATE_PREM = 120000;
    const RATE_LUXE = 180000;
    const std  = count * RATE_STD;
    const prem = count * RATE_PREM;
    const luxe = count * RATE_LUXE;

    // Check selected finish
    const finish = $('input[name="btfinish"]:checked')?.value || 'premium';
    const display = finish === 'standard' ? std : finish === 'luxe' ? luxe : prem;

    animateValue('#bt-result', display);
    const range = $('#bt-range');
    if (range) range.textContent = `For ${count} bathroom${count > 1 ? 's' : ''} · ₹${(RATE_PREM / 1000)}K each (premium)`;
    const bs = $('#bt-standard'); if (bs) bs.textContent = formatINR(std);
    const bp = $('#bt-premium');  if (bp) bp.textContent = formatINR(prem);
    const bl = $('#bt-luxe');     if (bl) bl.textContent = formatINR(luxe);
  }

  function animateValue(selector, target) {
    const el = $(selector);
    if (!el) return;
    const start = performance.now();
    const duration = 600;
    const tick = now => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = formatINR(Math.round(eased * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  // Wire up live inputs
  const fhArea   = $('#fh-area');
  const ktLength = $('#kt-length');
  const wdLength = $('#wd-length');
  const btCount  = $('#bt-count');

  fhArea?.addEventListener('input',   debounce(calcFullHome, 150));
  ktLength?.addEventListener('input', debounce(calcKitchen,  150));
  wdLength?.addEventListener('input', debounce(calcWardrobe, 150));
  $$('input[name="btfinish"]').forEach(r => r.addEventListener('change', calcBathroom));
  $$('input[name="layout"]').forEach(r  => r.addEventListener('change', calcKitchen));
  $$('input[name="wdtype"]').forEach(r  => r.addEventListener('change', calcWardrobe));

  // Bathroom +/− buttons
  $$('.counter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = $(`.bt-counter input`);
      if (!input) return;
      let val = parseInt(input.value) || 1;
      val = btn.classList.contains('plus') ? Math.min(val + 1, 8) : Math.max(val - 1, 1);
      input.value = val;
      calcBathroom();
    });
  });

  // Initialize all calculators
  calcFullHome();
  calcKitchen();
  calcWardrobe();
  calcBathroom();

  /* ─── PORTFOLIO FILTER ───────────────────────────── */
  const filterBtns  = $$('.filter-btn');
  const portfolioItems = $$('.portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      portfolioItems.forEach(item => {
        const cat = item.dataset.cat;
        const show = filter === 'all' || cat === filter;
        item.style.transition = 'opacity 0.3s, transform 0.3s';
        if (show) {
          item.classList.remove('hidden');
          item.style.opacity = '1';
          item.style.transform = 'scale(1)';
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => { if (!show) item.classList.add('hidden'); }, 300);
        }
      });
    });
  });

  /* ─── TESTIMONIALS SLIDER ────────────────────────── */
  const tTrack = $('#testimonials-track');
  const tDots  = $$('.t-dot');
  const tPrev  = $('#t-prev');
  const tNext  = $('#t-next');
  let tCurrent = 0;
  let tTotal   = 0;
  let tAutoplay;
  const GAP_PX = 24; // matches 1.5rem gap in CSS

  function getVisibleCols() {
    return window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3;
  }

  function initTestimonials() {
    if (!tTrack) return;
    const cards = tTrack.querySelectorAll('.t-card');
    tTotal = cards.length;
    goTo(0);
    startAutoplay();
  }

  function goTo(index) {
    if (!tTrack) return;
    const cols = getVisibleCols();
    // Clamp so we never slide past the last group
    const maxIndex = Math.max(0, tTotal - cols);
    tCurrent = Math.max(0, Math.min((index + tTotal) % tTotal, maxIndex));

    // Get the actual card width from the DOM (most reliable)
    const firstCard = tTrack.querySelector('.t-card');
    if (!firstCard) return;
    const cardWidth = firstCard.getBoundingClientRect().width;
    const offset = tCurrent * (cardWidth + GAP_PX);

    tTrack.style.transition = 'transform 0.5s cubic-bezier(0.4,0,0.2,1)';
    tTrack.style.transform  = `translateX(-${offset}px)`;

    tDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === tCurrent);
      dot.setAttribute('aria-selected', i === tCurrent);
    });
  }

  function startAutoplay() {
    clearInterval(tAutoplay);
    tAutoplay = setInterval(() => goTo(tCurrent + 1), 5000);
  }

  tPrev?.addEventListener('click', () => { goTo(tCurrent - 1); startAutoplay(); });
  tNext?.addEventListener('click', () => { goTo(tCurrent + 1); startAutoplay(); });
  tDots.forEach((dot, i) => { dot.addEventListener('click', () => { goTo(i); startAutoplay(); }); });

  // Touch/swipe support
  let tsX = 0;
  tTrack?.addEventListener('touchstart', e => { tsX = e.touches[0].clientX; }, { passive: true });
  tTrack?.addEventListener('touchend', e => {
    const diff = tsX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { goTo(diff > 0 ? tCurrent + 1 : tCurrent - 1); startAutoplay(); }
  });
  window.addEventListener('resize', debounce(() => goTo(tCurrent), 200));

  initTestimonials();

  /* ─── FORM SUBMISSION ────────────────────────────── */
  function getFormData(form) {
    const data = {};
    new FormData(form).forEach((v, k) => data[k] = v);
    return data;
  }

  function validateForm(form) {
    let valid = true;
    $$('[required]', form).forEach(field => {
      field.classList.remove('error');
      if (!field.value.trim()) {
        field.classList.add('error');
        field.setAttribute('aria-invalid', 'true');
        valid = false;
      }
      if (field.type === 'tel' && field.value && !/^[6-9][0-9]{9}$/.test(field.value.replace(/\s/g, ''))) {
        field.classList.add('error');
        valid = false;
      }
      if (field.type === 'email' && field.value && !/\S+@\S+\.\S+/.test(field.value)) {
        field.classList.add('error');
        valid = false;
      }
    });
    if (!valid) {
      const firstError = $('.error', form);
      firstError?.focus();
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    return valid;
  }

  function buildWhatsAppMsg(data) {
    let msg = `Hello Amego HomeStudio! 🏠\n\n`;
    if (data.name)        msg += `*Name:* ${data.name}\n`;
    if (data.phone)       msg += `*Phone:* ${data.phone}\n`;
    if (data.email)       msg += `*Email:* ${data.email}\n`;
    if (data.city)        msg += `*Location:* ${data.city}\n`;
    if (data.requirement) msg += `*Requirement:* ${data.requirement}\n`;
    if (data.service)     msg += `*Service:* ${data.service}\n`;
    if (data.message)     msg += `*Message:* ${data.message}\n`;
    msg += `\nI would like to book a free consultation.`;
    return encodeURIComponent(msg);
  }

  /**
   * Sends form data as an email via EmailJS to info@amegohomestudio.com.
   * Falls back silently if EmailJS is not configured yet.
   */
  function sendEmail(data, formLabel) {
    if (typeof emailjs === 'undefined') return;
    const templateParams = {
      form_type:   formLabel || 'Website Form',
      from_name:   data.name        || '—',
      from_phone:  data.phone       || '—',
      from_email:  data.email       || '—',
      city:        data.city        || '—',
      requirement: data.requirement || data.service || '—',
      message:     data.message     || '—',
      to_email:    'info@amegohomestudio.com',
    };
    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
      .then(() => console.log('📧 Email sent to info@amegohomestudio.com'))
      .catch(err => console.warn('EmailJS error (check credentials):', err));
  }

  function submitToWhatsApp(data, form, successId, btnId, formLabel) {
    const btn = $(btnId, form) || form.querySelector('[type="submit"]');
    const original = btn?.innerHTML;
    if (btn) { btn.disabled = true; btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...'; }

    // Send email notification first
    sendEmail(data, formLabel);

    setTimeout(() => {
      // Show success message
      const successEl = $(successId);
      if (successEl) { successEl.style.display = 'flex'; }
      form.reset();
      if (btn) { btn.disabled = false; btn.innerHTML = original; }
      // Open WhatsApp
      const msg = buildWhatsAppMsg(data);
      window.open(`https://wa.me/919885457772?text=${msg}`, '_blank', 'noopener');
    }, 800);
  }

  // Hero form (luxury panel)
  const heroForm = $('#hero-form');
  heroForm?.addEventListener('submit', e => {
    e.preventDefault();
    if (!validateForm(heroForm)) return;
    const data = getFormData(heroForm);
    const btn = $('#hero-form-btn');
    const originalInner = btn?.innerHTML;
    if (btn) {
      btn.disabled = true;
      btn.querySelector('.lf-submit-inner').innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Connecting…</span>';
    }
    // Send email notification for hero form
    sendEmail(data, 'Hero Consultation Form');

    setTimeout(() => {
      // Success feedback
      if (btn) {
        btn.querySelector('.lf-submit-inner').innerHTML = '<i class="fas fa-check-circle"></i><span>Consultation Booked!</span>';
        btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
        setTimeout(() => {
          btn.disabled = false;
          btn.querySelector('.lf-submit-inner').innerHTML = '<i class="fab fa-whatsapp"></i><span>Book My Free Consultation</span>';
          btn.style.background = '';
        }, 3000);
      }
      heroForm.reset();
      const msg = buildWhatsAppMsg(data);
      window.open(`https://wa.me/919885457772?text=${msg}`, '_blank', 'noopener');
    }, 800);
  });

  // Estimate form
  const estimateForm = $('#estimate-form');
  estimateForm?.addEventListener('submit', e => {
    e.preventDefault();
    if (!validateForm(estimateForm)) return;
    const data = getFormData(estimateForm);
    submitToWhatsApp(data, estimateForm, '#estimate-success', '#estimate-btn', 'Free Estimate Form');
  });

  // Contact form
  const contactForm = $('#contact-form');
  contactForm?.addEventListener('submit', e => {
    e.preventDefault();
    if (!validateForm(contactForm)) return;
    const data = getFormData(contactForm);
    submitToWhatsApp(data, contactForm, '#contact-success', null, 'Contact Form');
  });

  /* ─── SMOOTH ANCHOR SCROLLING ────────────────────── */
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (href === '#') { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
      const target = $(href);
      if (target) {
        e.preventDefault();
        const offset = header.offsetHeight + 12;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ─── INPUT FIELD INTERACTIONS ───────────────────── */
  // Shake on error clear
  $$('input, select, textarea').forEach(field => {
    field.addEventListener('input', () => {
      if (field.value.trim()) {
        field.classList.remove('error');
        field.removeAttribute('aria-invalid');
      }
    });
  });

  /* ─── LAZY LOAD IMAGES ───────────────────────────── */
  if ('IntersectionObserver' in window) {
    const imgObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) { img.src = img.dataset.src; delete img.dataset.src; }
          imgObserver.unobserve(img);
        }
      });
    }, { rootMargin: '200px' });
    $$('img[loading="lazy"]').forEach(img => imgObserver.observe(img));
  }

  /* ─── WHATSAPP FLOAT VISIBILITY ──────────────────── */
  const waFloat = $('#wa-float');
  // Show after 3s
  setTimeout(() => { waFloat?.classList.add('show'); }, 3000);

  /* ─── PAGE LOAD ANIMATION ────────────────────────── */
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  window.addEventListener('load', () => {
    document.body.style.opacity = '1';
  });

  /* ─── CLOSE MOBILE NAV ON SCROLL ────────────────── */
  window.addEventListener('scroll', () => {
    if (navLinks.classList.contains('open')) {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
      document.body.style.overflow = '';
    }
  }, { passive: true });

  /* ─── PROCESS STEP HOVER ─────────────────────────── */
  $$('.process-step').forEach((step, i) => {
    step.style.animationDelay = `${i * 0.1}s`;
  });

  /* ─── KEYBOARD NAVIGATION ────────────────────────── */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      // Close mobile nav
      if (navLinks.classList.contains('open')) {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', false);
        document.body.style.overflow = '';
      }
    }
    // Testimonials arrow keys
    if (document.activeElement?.closest('.testimonials-section')) {
      if (e.key === 'ArrowLeft') { goTo(tCurrent - 1); startAutoplay(); }
      if (e.key === 'ArrowRight') { goTo(tCurrent + 1); startAutoplay(); }
    }
  });

  /* ─── STICKY HEADER TRANSITION FIX ──────────────── */
  // Re-enable header show on scroll up near top
  window.addEventListener('scroll', () => {
    if (window.scrollY < 100) header.classList.remove('hidden');
  }, { passive: true });

  /* ─── INITIAL AOS TRIGGER ────────────────────────── */
  // Elements already in viewport on load
  setTimeout(() => {
    $$('[data-aos]').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('aos-visible');
      }
    });
  }, 100);

  console.log('%c🏠 Amego HomeStudio Website Loaded', 'color:#E8471C;font-weight:bold;font-size:14px');
  console.log('%cBuilt with ❤️ for Hyderabad homes', 'color:#7C3AED;font-size:12px');
});
