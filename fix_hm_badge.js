const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const targetStr =     <div class="hm-badge">
      <div class="hm-badge-icon"><i class="fas fa-award"></i></div>
      <div class="hm-badge-text">
        <span>ASIAN PAINTS AUTHORIZED BEAUTIFUL HOMES STUDIO</span>
        <span>PREMIUM INTERIOR STUDIO</span>
        <span><i class="fas fa-circle"></i> HYDERABAD</span>
      </div>
    </div>;

const replacementStr =     <div class="hm-badge">
      <div class="hm-badge-icon"><i class="fas fa-award"></i></div>
      <div class="hm-badge-col">
        <span>ASIAN PAINTS AUTHORIZED</span>
        <span>BEAUTIFUL HOMES STUDIO</span>
      </div>
      <div class="hm-badge-divider"></div>
      <div class="hm-badge-col">
        <span>PREMIUM</span>
        <span>INTERIOR STUDIO</span>
      </div>
      <div class="hm-badge-divider"></div>
      <div class="hm-badge-col hm-badge-loc">
        <span><i class="fas fa-circle"></i> HYDERABAD</span>
      </div>
    </div>;

html = html.replace(targetStr, replacementStr);
fs.writeFileSync('index.html', html);
console.log('Fixed hm-badge HTML');
