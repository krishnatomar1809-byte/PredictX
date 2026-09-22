
const fs = require('fs');
const path = require('path');

function replaceInDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceInDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      content = content.replace(/text-white/g, 'text-text-main');
      content = content.replace(/border-white\/5/g, 'border-primary/10');
      content = content.replace(/border-white\/10/g, 'border-primary/20');
      content = content.replace(/border-white\/20/g, 'border-primary/30');
      content = content.replace(/bg-white\/5/g, 'bg-primary/5');
      content = content.replace(/bg-white\/10/g, 'bg-primary/10');
      content = content.replace(/bg-white\/\[0\.02\]/g, 'bg-surface');
      content = content.replace(/hover:text-white/g, 'hover:text-primary');
      fs.writeFileSync(fullPath, content);
    }
  }
}
replaceInDir('src/pages');
replaceInDir('src/components');
console.log('Replacement done.');

