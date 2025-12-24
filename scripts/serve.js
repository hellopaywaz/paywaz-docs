const http = require("http");
const fs = require("fs");
const path = require("path");

const [, , rootDirArg = "docs", portArg = "4173"] = process.argv;
const rootDirInput = path.resolve(rootDirArg);
const port = Number(portArg) || 4173;

if (!fs.existsSync(rootDirInput)) {
  console.error(`Directory not found: ${rootDirInput}`);
  process.exit(1);
}

// Resolve real path of root to defend against symlink tricks
const rootReal = fs.realpathSync(rootDirInput);
const rootWithSep = rootReal.endsWith(path.sep) ? rootReal : rootReal + path.sep;

const mimeTypes = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
};

function isWithinRoot(realCandidate) {
  return realCandidate === rootReal || realCandidate.startsWith(rootWithSep);
}

const server = http.createServer((req, res) => {
  // Use WHATWG URL parsing; ensure it works with relative req.url
  let pathnameRaw = "/";
  try {
    const u = new URL(req.url || "/", "http://localhost");
    pathnameRaw = u.pathname || "/";
  } catch {
    res.statusCode = 400;
    res.end("Bad request");
    return;
  }

  // Decode percent-encoding (reject malformed)
  let decodedPath;
  try {
    decodedPath = decodeURIComponent(pathnameRaw);
  } catch {
    res.statusCode = 400;
    res.end("Bad request");
    return;
  }

  // Basic hard rejects
  if (decodedPath.includes("\0")) {
    res.statusCode = 400;
    res.end("Bad request");
    return;
  }

  // Normalize and force relative
  let rel = path.normalize(decodedPath);

  // Convert leading slashes/backslashes into relative path
  rel = rel.replace(/^([/\\])+/, "");

  // Reject absolute paths / drive letters / UNC (Windows safety)
  if (path.isAbsolute(rel) || /^[A-Za-z]:/.test(rel) || rel.startsWith("\\\\")) {
    res.statusCode = 403;
    res.end("Forbidden");
    return;
  }

  // Default document
  if (!rel) rel = "index.html";

  // Build candidate path under root
  let candidate = path.join(rootReal, rel);

  // If directory, serve index.html
  try {
    if (fs.existsSync(candidate) && fs.statSync(candidate).isDirectory()) {
      candidate = path.join(candidate, "index.html");
    }
  } catch {
    // fall through to 404 below
  }

  // If file exists, resolve real path to prevent symlink escape
  let realFile;
  try {
    if (!fs.existsSync(candidate) || !fs.statSync(candidate).isFile()) {
      res.statusCode = 404;
      res.end("Not found");
      return;
    }
    realFile = fs.realpathSync(candidate);
  } catch {
    res.statusCode = 404;
    res.end("Not found");
    return;
  }

  if (!isWithinRoot(realFile)) {
    res.statusCode = 403;
    res.end("Forbidden");
    return;
  }

  fs.readFile(realFile, (err, data) => {
    if (err) {
      res.statusCode = 404;
      res.end("Not found");
      return;
    }
    const ext = path.extname(realFile);
    res.setHeader("Content-Type", mimeTypes[ext] || "text/plain");
    res.end(data);
  });
});

server.listen(port, () => {
  console.log(`Serving ${rootReal} at http://localhost:${port}`);
});
