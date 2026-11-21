import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { join, extname, normalize } from "node:path";

const MIME: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".webmanifest": "application/manifest+json",
};

const root = join(process.cwd(), "app");
let port = 8080;
for (let i = 2; i < process.argv.length; i++) {
  if (process.argv[i] === "--port" && process.argv[i + 1]) {
    port = Number(process.argv[i + 1]);
    i++;
  }
}

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url ?? "/", "http://127.0.0.1");
    let rel = decodeURIComponent(url.pathname);
    if (rel === "/") rel = "/index.html";
    const safe = normalize(join(root, rel));
    if (!safe.startsWith(root + "/") && safe !== root) {
      res.writeHead(403, { "content-type": "text/plain" });
      res.end("Forbidden\n");
      return;
    }
    const bytes = await readFile(safe);
    res.writeHead(200, { "content-type": MIME[extname(safe)] ?? "application/octet-stream" });
    res.end(bytes);
  } catch {
    res.writeHead(404, { "content-type": "text/plain" });
    res.end("Not found\n");
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Neon Vice guide serving app/ at http://127.0.0.1:${port}/`);
});
