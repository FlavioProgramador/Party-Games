const fs = require('fs');

const content = fs.readFileSync('./src/games/impostor/data/wordBank.ts', 'utf-8');

// Use a regex to capture all category values
const categoryRegex = /"category":\s*"([^"]+)"/g;
let match;
const categories = new Set();

while ((match = categoryRegex.exec(content)) !== null) {
  categories.add(match[1]);
}

console.log(Array.from(categories));
