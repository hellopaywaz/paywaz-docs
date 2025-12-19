const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '..', 'docs');
const outputDir = path.join(__dirname, '..', 'dist');

if (!fs.existsSync(sourceDir)) {
  console.error(`Source docs directory not found at: ${sourceDir}`);
  process.exit(1);
}

fs.rmSync(outputDir, { recursive: true, force: true });
fs.mkdirSync(outputDir, { recursive: true });

const copyRecursive = (src, dest) => {
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      fs.mkdirSync(destPath, { recursive: true });
      copyRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
};

copyRecursive(sourceDir, outputDir);

console.log(`Copied documentation from ${sourceDir} to ${outputDir}`);
