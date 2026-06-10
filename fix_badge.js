const fs = require('fs');
const files = ['calculator.html', 'category.html', 'contact.html', 'partners.html', 'portfolio.html', 'process.html', 'reviews.html', 'services.html'];
files.forEach(f => {
  if(fs.existsSync(f)) {
    let content = fs.readFileSync(f, 'utf8');
    content = content.replace(/<div class="ap-footer-badge">[\s\S]*?<i class="fas fa-certificate"><\/i>/g, '<div class="ap-footer-badge">\n            <img src="ap_badge.jpg" alt="Asian Paints" class="ap-badge-img">');
    fs.writeFileSync(f, content);
  }
});
