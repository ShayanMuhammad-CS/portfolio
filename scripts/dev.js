import path from "node:path";
import fs from "node:fs";

const PORT = process.env.PORT || 3000;
const rootDir = process.cwd();

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".pdf": "application/pdf",
  ".woff": "font/woff",
  ".woff2": "font/woff2"
};

const server = Bun.serve({
  port: PORT,
  fetch(req) {
    const url = new URL(req.url);
    let pathname = decodeURIComponent(url.pathname);
    if (pathname === "/" || pathname === "") {
      pathname = "/index.html";
    }

    const filePath = path.join(rootDir, pathname);

    // Prevent directory traversal
    if (!filePath.startsWith(rootDir)) {
      return new Response("Forbidden", { status: 403 });
    }

    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      const contentType = mimeTypes[ext] || "application/octet-stream";
      return new Response(Bun.file(filePath), {
        headers: {
          "Content-Type": contentType,
          "Cache-Control": "no-cache"
        }
      });
    }

    // Fallback to index.html for SPA routing
    return new Response(Bun.file(path.join(rootDir, "index.html")), {
      headers: { "Content-Type": "text/html; charset=utf-8" }
    });
  }
});

console.log(`\n🚀 Portfolio Dev Server running at: http://localhost:${server.port}`);
console.log(`📂 Serving directory: ${rootDir}`);
console.log(`Press Ctrl+C to stop.\n`);
