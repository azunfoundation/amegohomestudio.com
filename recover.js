const fs = require('fs');

const path = 'C:\\Users\\DELL\\.gemini\\antigravity\\brain\\29fa41e4-a98d-4f8b-81aa-49b76d5100b2\\.system_generated\\logs\\transcript.jsonl';
const txt = fs.readFileSync(path, 'utf8');

// Find all tool_calls that are write_to_file for style.css
const regex = /"TargetFile":"(?:[^"]*?)style\.css","CodeContent":"(.*?)"/gs;
let best = null;
let match;
while ((match = regex.exec(txt)) !== null) {
    if (!best || match[1].length > best.length) {
        best = match[1];
    }
}

if (best) {
    // Unescape JSON string
    try {
        const decoded = JSON.parse('"' + best + '"');
        fs.writeFileSync('c:\\amegohomestudio.com\\style_recovered.css', decoded, 'utf8');
        console.log('Recovered successfully! Length: ' + decoded.length);
    } catch (e) {
        console.error('Failed to parse json string: ', e.message);
    }
} else {
    console.log('No write_to_file found for style.css in the log.');
}
