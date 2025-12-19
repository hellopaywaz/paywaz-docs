const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const [, , rootDirArg = 'docs', portArg = '4173'] = process.argv;
const rootDir = path.resolve(rootDirArg);
const port = Number(portArg) || 4173;

if (!fs.existsSync(rootDir)) {
  console.error(`Directory not found: ${rootDir}`);
  process.exit(1);
}

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url);
  const safePath = path.normalize(parsedUrl.pathname || '/').replace(/^\.\.(\/|\\)/, '');
  let pathname = path.join(rootDir, safePath);

  if (fs.existsSync(pathname) && fs.statSync(pathname).isDirectory()) {
    pathname = path.join(pathname, 'index.html');
  }

  fs.readFile(pathname, (err, data) => {
    if (err) {
      res.statusCode = 404;
      res.end('Not found');
      return;
    }

    const ext = path.parse(pathname).ext;
    res.setHeader('Content-Type', mimeTypes[ext] || 'text/plain');
    res.end(data);
  });
});

server.listen(port, () => {
  console.log(`Serving ${rootDir} at http://localhost:${port}`);
});
