const fs = require('fs');
const path = require('path');

const fixMode = process.argv.includes('--fix');
const filesToCheck = [
  'README.md',
  'SECURITY.md',
  'CONTRIBUTING.md',
  'docs/index.html',
];

const issues = [];
const fixed = [];

const normalizeEol = (content) => content.replace(/\r\n/g, '\n');

const record = (file, message, { fixable = true } = {}) => {
  if (!fixMode || !fixable) {
    issues.push(`${file}: ${message}`);
    return;
  }
  fixed.push(`${file}: ${message}`);
};

const checkTrailingWhitespace = (file) => {
  const originalContent = fs.readFileSync(file, 'utf8');
  const lines = normalizeEol(originalContent).split('\n');
  let mutated = false;

  const trimmed = lines.map((line, idx) => {
    if (/[ \t]+$/.test(line)) {
      record(file, `line ${idx + 1} has trailing whitespace`);
      mutated = true;
      return line.replace(/[ \t]+$/, '');
    }
    return line;
  });

  let finalContent = trimmed.join('\n');
  if (!finalContent.endsWith('\n')) {
    record(file, 'missing final newline');
    mutated = true;
    finalContent += '\n';
  }

  if (fixMode && mutated) {
    fs.writeFileSync(file, finalContent, 'utf8');
  }
};

const checkHtml = (file) => {
  const content = fs.readFileSync(file, 'utf8');
  if (!content.includes('<title>')) {
    record(file, 'missing <title> tag');
  }
  if (!content.includes('Paywaz Documentation Hub')) {
    record(file, 'expected landing heading content');
  }
};

for (const file of filesToCheck) {
  if (!fs.existsSync(file)) {
    record(file, 'file is missing', { fixable: false });
    continue;
  }

  checkTrailingWhitespace(file);

  if (file.endsWith('.html')) {
    checkHtml(file);
  }
}

if (issues.length > 0) {
  console.error('Lint issues found:');
  issues.forEach((issue) => console.error(`- ${issue}`));
  if (!fixMode) {
    console.error('\nRun `npm run format` to attempt to fix trailing whitespace and newline issues.');
  }
  process.exit(1);
}

if (fixMode && fixed.length > 0) {
  console.log('Applied fixes for:');
  fixed.forEach((item) => console.log(`- ${item}`));
}

console.log('Lint checks passed.');
