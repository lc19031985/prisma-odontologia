/**
 * Servidor estático mínimo para a pasta out/ (verificação da Fase 5 e testes
 * locais do build). Uso: node scripts/serve-out.mjs [porta]
 */
import { createServer } from "node:http";
import { promises as fs } from "node:fs";
import path from "node:path";
import { gzipSync } from "node:zlib";

const PORT = Number(process.argv[2] ?? 3010);
const ROOT = path.resolve("out");

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
  ".woff2": "font/woff2",
};

createServer(async (req, res) => {
  try {
    const url = decodeURIComponent(new URL(req.url, "http://x").pathname);
    let file = path.join(ROOT, url);
    const candidates = [
      file,
      path.join(file, "index.html"),
      `${file.replace(/\/$/, "")}.html`,
    ];
    let found = null;
    for (const c of candidates) {
      try {
        const st = await fs.stat(c);
        if (st.isFile()) {
          found = c;
          break;
        }
      } catch {
        /* tenta o próximo */
      }
    }
    if (!found) {
      res.writeHead(404, { "content-type": "text/plain" });
      res.end("404");
      return;
    }
    const ext = path.extname(found).toLowerCase();
    const type = TYPES[ext] ?? "application/octet-stream";
    let body = await fs.readFile(found);
    const headers = { "content-type": type, "cache-control": "public, max-age=3600" };
    // gzip para tipos textuais, como qualquer hospedagem real faz
    const textual = [".html", ".css", ".js", ".json", ".svg", ".txt"].includes(ext);
    if (textual && (req.headers["accept-encoding"] ?? "").includes("gzip")) {
      body = gzipSync(body);
      headers["content-encoding"] = "gzip";
    }
    res.writeHead(200, headers);
    res.end(body);
  } catch (err) {
    res.writeHead(500, { "content-type": "text/plain" });
    res.end(String(err));
  }
}).listen(PORT, () => console.log(`out/ servido em http://localhost:${PORT}`));
