const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const replacement = `              <div class="result-breakdown">
                <div class="breakdown-item"><span>Standard</span><span id="bt-standard">₹11,80,000</span></div>
                <div class="breakdown-item"><span>Premium</span><span id="bt-premium">₹12,40,000</span></div>
                <div class="breakdown-item"><span>Luxe</span><span id="bt-luxe">₹13,20,000</span></div>
              </div>
              <a href="#estimate" class="btn btn-primary btn-full calc-cta">Get Free Estimate</a>
              <a href="https://wa.me/919885457772?text=Hi!%20I%20need%20a%20quote%20for%20Bathroom%20Design." target="_blank" class="btn btn-whatsapp btn-full" style="margin-top:8px">
                <i class="fab fa-whatsapp"></i> WhatsApp This Quote
              </a>
            </div>
            <p class="calc-disclaimer">*Includes tiles, fittings, vanity &amp; waterproofing. Luxury fixtures &amp; freestanding tubs priced separately.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ═══════════════════════════════════════════════════════
     FREE ESTIMATE FORM
═══════════════════════════════════════════════════════ -->
<section class="section estimate-section" id="estimate">
  <div class="container">
    <div class="estimate-grid">
      <div class="estimate-info" data-aos="fade-right">
        <span class="section-tag">Free Consultation</span>
        <h2 class="section-title">Get Your <em>Free Estimate</em></h2>
        <p>Tell us about your project and our interior design expert will contact you within <strong>24 hours</strong> with a detailed, transparent quote.</p>
        <div class="estimate-points">
          <div class="estimate-pt"><div class="estimate-pt-icon"><i class="fas fa-check"></i></div> Free home visit within 24 hours</div>
          <div class="estimate-pt"><div class="estimate-pt-icon"><i class="fas fa-check"></i></div> Detailed itemized quote, no surprises</div>
          <div class="estimate-pt"><div class="estimate-pt-icon"><i class="fas fa-check"></i></div> 3D visualization before work begins</div>
          <div class="estimate-pt"><div class="estimate-pt-icon"><i class="fas fa-check"></i></div> Asian Paints colour consultation included</div>`;

const badBlockRegex = /<div class="result-breakdown">[\s\S]*?<div class="breakdown-item"><span>Standard<\/span><span id="bt-standard">.*?<\/span><\/div>[\s\S]*?<div class="breakdown-item"><span>Premium<\/span><span id="bt-premium">.*?<\/span><\/div>[\s\S]*?<div class="breakdown-item"><span>Luxe<\/span><span id="bt-luxe">.*?<\/span><\/div>[\s\S]*?<\/div>[\s\S]*?<div class="estimate-pt"><div class="estimate-pt-icon"><i class="fas fa-check"><\/i><\/div> Asian Paints colour consultation included<\/div>/;

if (badBlockRegex.test(html)) {
    html = html.replace(badBlockRegex, replacement);
    fs.writeFileSync('index.html', html);
    console.log('Successfully restored index.html!');
} else {
    console.log('Regex did not match!');
}
