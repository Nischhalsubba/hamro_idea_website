const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const outDir = path.join(root, 'public');

const rootFiles = [
  'index.html',
  'services.html',
  'solutions.html',
  'work.html',
  'process.html',
  'about.html',
  'insights.html',
  'contact.html',
  'privacy-policy.html',
  'terms-of-use.html',
  'cookie-consent.html',
  '404.html',
  'robots.txt',
  'sitemap.xml'
];

const folders = [
  'assets/css',
  'assets/js',
  'assets/images',
  'about',
  'contact',
  'insights',
  'process',
  'services',
  'work'
];

function copyFile(relativePath) {
  const from = path.join(root, relativePath);
  const to = path.join(outDir, relativePath);

  if (!fs.existsSync(from)) {
    throw new Error(`Missing build artifact: ${relativePath}`);
  }

  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.copyFileSync(from, to);
}

function copyFolder(relativePath) {
  const from = path.join(root, relativePath);
  const to = path.join(outDir, relativePath);

  if (!fs.existsSync(from)) {
    throw new Error(`Missing build folder: ${relativePath}`);
  }

  fs.cpSync(from, to, { recursive: true });
}

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

rootFiles.forEach(copyFile);
folders.forEach(copyFolder);

console.log(`Prepared Vercel output in ${path.relative(root, outDir)}/`);
