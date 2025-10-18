const fs = require('fs');

// Read the file
let content = fs.readFileSync('./src/data/tours-data.js', 'utf8');

// Replace first occurrence (keep for Yerevan)
// Leave it as is

// Replace second occurrence (Garni)
let count = 0;
content = content.replace(/https:\/\/images\.unsplash\.com\/photo-1545558014-8692077e9b5c/g, (match) => {
  count++;
  if (count === 2) {
    return 'https://images.unsplash.com/photo-1590608897129-79da98d15969';
  }
  return match;
});

// Write back
fs.writeFileSync('./src/data/tours-data.js', content);
console.log('Replaced second occurrence of the duplicate image');