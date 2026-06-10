const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const injection = `
<!-- ═══════════════════════════════════════════════════════
     MOBILE HERO SECTION
═══════════════════════════════════════════════════════ -->
<section class="hero-mobile mobile-only" id="hero-mobile">
  <div class="hm-bg"></div>
  <div class="container hm-container">
    
    <!-- Premium Badge -->
    <div class="hm-badge">
      <div class="hm-badge-icon"><i class="fas fa-award"></i></div>
      <div class="hm-badge-text">
        <span>ASIAN PAINTS AUTHORIZED BEAUTIFUL HOMES STUDIO</span>
        <span>PREMIUM INTERIOR STUDIO</span>
        <span><i class="fas fa-circle"></i> HYDERABAD</span>
      </div>
    </div>

    <!-- Massive Luxury Heading -->
    <h1 class="hm-title">
      <span class="hm-title-1">Designing</span>
      <span class="hm-title-2">Luxury <em>Spaces</em></span>
      <span class="hm-title-3">That Feel <strong>Timeless.</strong></span>
    </h1>

    <!-- Supporting Paragraph -->
    <p class="hm-sub">
      From concept to completion — Hyderabad's most trusted interior studio.<br>
      <em>One vision. One team. Extraordinary results.</em>
    </p>

    <!-- CTAs -->
    <div class="hm-ctas">
      <a href="#estimate" class="hm-btn hm-btn-primary">
        <div class="hm-btn-icon"><i class="far fa-calendar-check"></i></div>
        <div class="hm-btn-text">
          <span class="hm-btn-title">Get Free Estimate</span>
          <span class="hm-btn-sub">Expert visits within 24 hrs</span>
        </div>
      </a>
      
      <a href="#portfolio" class="hm-btn hm-btn-secondary">
        <div class="hm-btn-icon"><i class="far fa-image"></i></div>
        <div class="hm-btn-text">
          <span class="hm-btn-title">Explore Projects</span>
          <span class="hm-btn-sub">500+ homes designed</span>
        </div>
      </a>
    </div>

    <a href="calculator.html" class="hm-calc-link"><i class="fas fa-calculator"></i> Try our Price Calculator</a>

    <!-- Embedded Form Card -->
    <div class="hm-form-card" id="mobile-form">
      <div class="hm-form-tag"><i class="fas fa-circle"></i> AVAILABLE NOW</div>
      <h2 class="hm-form-title">Get a Free Design<br><em>Consultation</em></h2>
      <p class="hm-form-sub">Our expert calls you within <strong>2 hours</strong></p>

      <form class="hm-form" id="hm-form">
        <div class="hm-field">
          <label>FULL NAME</label>
          <div class="hm-input-wrap">
            <i class="far fa-user hm-input-icon"></i>
            <input type="text" placeholder="Your full name" required>
          </div>
        </div>

        <div class="hm-field">
          <label>PHONE NUMBER</label>
          <div class="hm-input-wrap">
            <i class="fas fa-phone-alt hm-input-icon"></i>
            <input type="tel" placeholder="+91 XXXXX XXXXX" required>
          </div>
        </div>

        <div class="hm-field">
          <label>LOCALITY</label>
          <div class="hm-input-wrap">
            <i class="fas fa-map-marker-alt hm-input-icon"></i>
            <input type="text" placeholder="Kondapur, Suncity..." required>
          </div>
        </div>

        <div class="hm-field">
          <label>REQUIREMENT</label>
          <div class="hm-input-wrap">
            <i class="fas fa-layer-group hm-input-icon"></i>
            <select required>
              <option value="" disabled selected>Select...</option>
              <option>Full Home Interiors</option>
              <option>Modular Kitchen</option>
              <option>Wardrobes</option>
              <option>Bathroom Design</option>
            </select>
          </div>
        </div>

        <button type="submit" class="hm-submit">
          <i class="fab fa-whatsapp"></i> Book My Free Consultation
        </button>
        <p class="hm-form-footer"><i class="fas fa-lock"></i> 100% confidential - No spam - Expert calls within 2 hours</p>
      </form>
    </div>

    <!-- Scroll Line -->
    <div class="hm-scroll">
      <div class="hm-scroll-line"></div>
      <span>SCROLL</span>
    </div>

  </div>
</section>
`;

html = html.replace('</section>', '</section>\n' + injection);
fs.writeFileSync('index.html', html);
console.log('Injected mobile hero html!');
