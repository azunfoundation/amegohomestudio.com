/* ═══════════════════════════════════════════════════════
   AMEGO HOMESTUDIO — category-page.js
   Renders all 28 category pages dynamically from URL param
   Usage: category.html?page=modular-kitchen
═══════════════════════════════════════════════════════ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
  const debounce = (fn, ms = 100) => { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; };

  /* ─── GET PAGE SLUG FROM URL ─────────────────────── */
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('page') || 'modular-kitchen';
  const cat = CATEGORIES_DATA[slug];

  if (!cat) {
    document.title = '404 — Page Not Found | Amego HomeStudio';
    document.body.innerHTML = `
      <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;text-align:center;font-family:Inter,sans-serif">
        <h1 style="font-size:3rem;color:#E8471C">404</h1>
        <p style="color:#888;margin:1rem 0">Page not found. The category you're looking for doesn't exist.</p>
        <a href="index.html" style="background:linear-gradient(135deg,#E8471C,#7C3AED);color:#fff;padding:.8rem 2rem;border-radius:8px;text-decoration:none;font-weight:600">← Back to Home</a>
      </div>`;
    return;
  }

  /* ─── BUILD MEGA MENU ────────────────────────────── */
  function buildMegaMenu() {
    NAV_MENU.forEach((col, idx) => {
      const colEl = $(`#mega-col-${idx + 1}`);
      if (!colEl) return;
      colEl.innerHTML = `<div class="mega-col-title">Column ${idx + 1}</div>`;
      const titles = ['Kitchen & Storage', 'Rooms & Spaces', 'Finishing & Decor'];
      colEl.innerHTML = `<div class="mega-col-title">${titles[idx] || ''}</div>`;
      col.items.forEach(item => {
        const a = document.createElement('a');
        a.href = `category.html?page=${item.slug}`;
        a.className = 'mega-item' + (item.slug === slug ? ' active-page' : '');
        a.textContent = item.label;
        colEl.appendChild(a);
      });
    });
  }

  /* ─── BUILD FOOTER SERVICES ──────────────────────── */
  function buildFooterServices() {
    const list = $('#footer-services-list');
    if (!list) return;
    const top6 = NAV_MENU[0].items.slice(0, 6);
    top6.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `<a href="category.html?page=${item.slug}">${item.label}</a>`;
      list.appendChild(li);
    });
  }

  /* ─── POPULATE DYNAMIC CONTENT ───────────────────── */
  function populatePage() {
    const img = getCatImage(cat.slug);

    // Meta
    document.title = `${cat.title} | Amego HomeStudio Hyderabad`;
    $('#page-meta-desc')?.setAttribute('content', cat.metaDesc);

    // Breadcrumb
    const bcCurrent = $('#bc-current');
    if (bcCurrent) bcCurrent.textContent = cat.shortTitle;

    // Hero
    const heroImg = $('#cat-hero-img');
    if (heroImg) { heroImg.src = img; heroImg.alt = cat.title; }

    const tagEl = $('#cat-tag');
    if (tagEl && cat.tag) { tagEl.textContent = cat.tag; }

    const heroTitle = $('#cat-hero-title');
    if (heroTitle) heroTitle.innerHTML = cat.heroTitle;

    const heroSub = $('#cat-hero-sub');
    if (heroSub) heroSub.textContent = cat.heroSub;

    const heroPriceEl = $('#cat-hero-price');
    if (heroPriceEl) {
      heroPriceEl.innerHTML = `<i class="fas fa-tag"></i> Starting from <strong>${cat.priceFrom}</strong> ${cat.priceUnit}`;
    }

    const waBtn = $('#cat-wa-cta');
    if (waBtn) {
      const msg = encodeURIComponent(`Hi Amego HomeStudio! I'm interested in ${cat.shortTitle} for my home. Please call me back.`);
      waBtn.href = `https://wa.me/919885457772?text=${msg}`;
    }

    // Overview
    const ovTitle = $('#cat-overview-title');
    if (ovTitle) ovTitle.innerHTML = `About Our <em>${cat.shortTitle}</em> Service`;

    const ovDesc = $('#cat-overview-desc');
    if (ovDesc) ovDesc.innerHTML = cat.description;

    const priceBox = $('#cat-price-box');
    if (priceBox) {
      priceBox.innerHTML = `
        <div>
          <div class="cat-price-from">Starting Price</div>
          <div class="cat-price-num">${cat.priceFrom}</div>
          <div class="cat-price-unit">${cat.priceUnit}</div>
        </div>
        <a href="index.html#estimate" class="btn btn-primary">Get Free Estimate <i class="fas fa-arrow-right"></i></a>`;
    }

    // Features grid
    const featGrid = $('#cat-features-grid');
    if (featGrid) {
      featGrid.innerHTML = cat.features.map(f => `
        <div class="cat-feature-item">
          <div class="cat-fi-icon"><i class="fas ${f.icon}"></i></div>
          <h4>${f.title}</h4>
          <p>${f.desc}</p>
        </div>`).join('');
    }

    // Layouts
    const layoutsGrid = $('#cat-layouts-grid');
    if (layoutsGrid) {
      layoutsGrid.innerHTML = cat.layouts.map((l, i) => `
        <div class="cat-layout-pill">
          <i class="fas fa-check"></i> ${l}
        </div>`).join('');
    }

    // Form section
    const formTitle = $('#cat-form-title');
    if (formTitle) formTitle.textContent = `Get a Free ${cat.shortTitle} Estimate`;

    const formSub = document.querySelector('#cat-form-sub');
    if (formSub) formSub.textContent = `Tell us about your ${cat.shortTitle.toLowerCase()} project and our specialist will call you within 24 hours with a detailed, transparent quote.`;

    const catTextarea = document.getElementById('clf-msg');
    if (catTextarea) catTextarea.placeholder = `Tell us more about your ${cat.shortTitle.toLowerCase()} requirements, size, budget, timeline...`;

    // FAQ
    const faqGrid = $('#cat-faq-grid');
    if (faqGrid && cat.faqs) {
      faqGrid.innerHTML = cat.faqs.map((faq, i) => `
        <div class="faq-item" id="faq-${i}">
          <button class="faq-question" aria-expanded="false" aria-controls="faq-ans-${i}">
            ${faq.q}
            <i class="fas fa-chevron-down"></i>
          </button>
          <div class="faq-answer" id="faq-ans-${i}" role="region">${faq.a}</div>
        </div>`).join('');

      // FAQ accordion
      $$('.faq-question').forEach(btn => {
        btn.addEventListener('click', () => {
          const item = btn.closest('.faq-item');
          const isOpen = item.classList.contains('open');
          $$('.faq-item').forEach(f => f.classList.remove('open'));
          if (!isOpen) item.classList.add('open');
          btn.setAttribute('aria-expanded', !isOpen);
        });
      });
    }

    // Related pages
    const relGrid = $('#cat-related-grid');
    if (relGrid && cat.relatedPages) {
      relGrid.innerHTML = cat.relatedPages.map(relSlug => {
        const relCat = CATEGORIES_DATA[relSlug];
        if (!relCat) return '';
        const relImg = getCatImage(relSlug);
        return `
          <a href="category.html?page=${relSlug}" class="related-card">
            <div class="related-card-img"><img src="${relImg}" alt="${relCat.shortTitle}" loading="lazy"/></div>
            <div class="related-card-body">
              <div class="related-card-icon"><i class="fas ${relCat.icon}"></i></div>
              <h4>${relCat.shortTitle}</h4>
              <span>From ${relCat.priceFrom} <i class="fas fa-arrow-right" style="font-size:0.65rem"></i></span>
            </div>
          </a>`;
      }).join('');
    }
  }

  /* ─── SCROLL & HEADER BEHAVIOR ───────────────────── */
  const header = $('#site-header');
  const backTop = $('#back-top');
  let lastScroll = 0;

  window.addEventListener('scroll', debounce(() => {
    const y = window.scrollY;
    if (y > 80) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
    if (y > lastScroll + 10 && y > 300) header.classList.add('hidden');
    else if (y < lastScroll - 5) header.classList.remove('hidden');
    lastScroll = y;
    if (y > 400) backTop.classList.add('visible');
    else backTop.classList.remove('visible');
  }, 10));

  window.addEventListener('scroll', () => {
    if (window.scrollY < 100) header.classList.remove('hidden');
  }, { passive: true });

  backTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ─── HAMBURGER ──────────────────────────────────── */
  const hamburger = $('#hamburger');
  const navLinks = $('#nav-links');

  hamburger?.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    navLinks.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  // Mobile mega menu toggle
  const megaTrigger = $('#services-trigger');
  const megaParent = megaTrigger?.closest('.has-mega-menu');
  megaTrigger?.addEventListener('click', e => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      megaParent.classList.toggle('active');
    }
  });

  /* ─── AOS ANIMATIONS ─────────────────────────────── */
  const aosObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-visible');
        aosObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  $$('[data-aos]').forEach(el => aosObserver.observe(el));

  /* ─── FORM SUBMISSION ────────────────────────────── */
  const catForm = $('#cat-lead-form');
  catForm?.addEventListener('submit', e => {
    e.preventDefault();
    const name  = $('#clf-name')?.value.trim();
    const phone = $('#clf-phone')?.value.trim();
    const city  = $('#clf-city')?.value.trim();
    const msg   = $('#clf-msg')?.value.trim();

    if (!name || !phone || !city) {
      if (!name) $('#clf-name').classList.add('error');
      if (!phone) $('#clf-phone').classList.add('error');
      if (!city) $('#clf-city').classList.add('error');
      return;
    }

    const btn = $('#clf-btn');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    const waMsg = encodeURIComponent(
      `Hello Amego HomeStudio! 🏠\n\n*Service:* ${cat.title}\n*Name:* ${name}\n*Phone:* ${phone}\n*Location:* ${city}\n${msg ? `*Details:* ${msg}\n` : ''}\nI would like a free estimate.`
    );

    setTimeout(() => {
      $('#cat-form-success').style.display = 'flex';
      catForm.reset();
      btn.disabled = false;
      btn.innerHTML = '<i class="fab fa-whatsapp"></i> Get Free Estimate via WhatsApp';
      window.open(`https://wa.me/919885457772?text=${waMsg}`, '_blank', 'noopener');
    }, 800);
  });

  // Clear errors on input
  $$('input, textarea').forEach(f => {
    f.addEventListener('input', () => f.classList.remove('error'));
  });

  /* ─── INIT ───────────────────────────────────────── */
  buildMegaMenu();
  buildFooterServices();
  populatePage();

  // Fade in
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.4s ease';
  window.addEventListener('load', () => { document.body.style.opacity = '1'; });

  // Trigger visible AOS elements
  setTimeout(() => {
    $$('[data-aos]').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) el.classList.add('aos-visible');
    });
  }, 150);

  console.log(`%c🏠 Amego HomeStudio — ${cat.shortTitle} page loaded`, 'color:#E8471C;font-weight:bold');
});
