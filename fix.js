const fs = require('fs');
let c = fs.readFileSync('index.html', 'utf8');

if (!c.includes('<div class="hero-cinematic-overlay">')) {
    // Restore deleted content
    const restoreContent = `    <div class="hero-cinematic-overlay"></div>
    <div class="hero-vignette"></div>
  </div>

  <!-- Floating Ambient Light Orbs -->
  <div class="hero-orb hero-orb--1" aria-hidden="true"></div>
  <div class="hero-orb hero-orb--2" aria-hidden="true"></div>
  <div class="hero-orb hero-orb--3" aria-hidden="true"></div>

  <!-- Luxury Grid Accent -->
  <div class="hero-grid-accent" aria-hidden="true"></div>

  <!-- Thin horizontal light line accent -->
  <div class="hero-line-accent" aria-hidden="true"></div>

  <div class="container hero-container">

    <!-- ─── LEFT: Content ─── -->
    <div class="hero-content">

      <!-- Premium Badge -->
      <div class="hero-badge" data-hero-animate="badge">`;

    c = c.replace('<div class="hero-badge" data-hero-animate="badge">', restoreContent);
}

// Update the badge text
c = c.replace(/<span>Asian Paints Authorized Beautiful Homes Studio<\/span>/, 
    '<span class="hb-desktop">Asian Paints Authorized Beautiful Homes Studio</span>\n          <span class="hb-mobile">Premium Interior Studio</span>');

fs.writeFileSync('index.html', c, 'utf8');
