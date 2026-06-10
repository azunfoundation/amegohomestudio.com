const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const targetHtml =         <p class="hm-form-footer"><i class="fas fa-lock"></i> 100% confidential - No spam - Expert calls within 2 hours</p>
      </form>
    </div>

    <!-- Scroll Line -->
    <div class="hm-scroll">;

const replacementHtml =         <p class="hm-form-footer"><i class="fas fa-lock"></i> 100% confidential - No spam - Expert calls within 2 hours</p>
      </form>
    </div>

    <!-- Ambient Glow Below Form -->
    <div class="hm-glow"></div>

    <!-- Scroll Line -->
    <div class="hm-scroll">;

html = html.replace(targetHtml, replacementHtml);
fs.writeFileSync('index.html', html);
console.log('Added hm-glow to HTML');
