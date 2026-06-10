const fs = require('fs');
const path = require('path');

const dir = 'c:\\amegohomestudio.com';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const target = '<p>Made with <i class=\"fas fa-heart\" style=\"color:#E8471C\"></i> in Hyderabad</p>';
const replacement = '<p>Designed and developed by <a href=\"https://creativals.com\" target=\"_blank\" style=\"color: var(--gold); text-decoration: none; font-weight: 600;\">creativals.com</a></p>';

files.forEach(file => {
    const fullPath = path.join(dir, file);
    let content = fs.readFileSync(fullPath, 'utf8');
    if (content.includes(target)) {
        content = content.replace(target, replacement);
        fs.writeFileSync(fullPath, content);
        console.log('Updated ' + file);
    }
});
