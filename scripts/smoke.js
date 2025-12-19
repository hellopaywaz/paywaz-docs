const fs = require('fs');
const path = require('path');

const requiredFiles = ['docs/index.html', 'docs/.nojekyll'];

for (const file of requiredFiles) {
  if (!fs.existsSync(file)) {
    console.error(`Missing required file: ${file}`);
    process.exit(1);
  }
}

const indexPath = path.join('docs', 'index.html');
const content = fs.readFileSync(indexPath, 'utf8');

const assertions = [
  {
    check: content.includes('Paywaz Documentation Hub'),
    message: 'Landing page title missing',
  },
  {
    check: content.includes('window.__PAYWAZ_SPEC_URL__'),
    message: 'Spec URL bootstrap variable missing',
  },
  {
    check: content.includes('hellopaywaz.github.io/paywaz-sdk-js'),
    message: 'SDK docs link missing',
  },
];

const failures = assertions.filter((assertion) => !assertion.check);

if (failures.length > 0) {
  failures.forEach((failure) => console.error(failure.message));
  process.exit(1);
}

console.log('Smoke check passed: docs page is present and wired to API + SDK references.');
