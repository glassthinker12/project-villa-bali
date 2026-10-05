const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Installing sharp...');
execSync('npm i --no-save sharp', { stdio: 'inherit' });

const sharp = require('sharp');
const dir = path.join(__dirname, 'public/images/villas');
const files = fs.readdirSync(dir).filter(f => f.startsWith('villa-three-') && f.endsWith('.webp'));

(async () => {
  for (const file of files) {
    const input = path.join(dir, file);
    const output = path.join(dir, 'opt_' + file);
    console.log('Optimizing', file, '...');
    await sharp(input)
      .resize({ width: 1200, withoutEnlargement: true })
      .webp({ quality: 75, effort: 6 })
      .toFile(output);
    fs.renameSync(output, input);
  }
  console.log('Done optimizing');
})();
