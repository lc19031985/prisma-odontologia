/**
 * Extrai a logomarca oficial do PDF de identidade visual, SEM redesenhá-la:
 * renderiza a página em alta resolução e separa o traço original do fundo
 * bege por decomposição de cor (o traço mantém a cor marsala do manual).
 *
 * Gera em public/img/:
 *   logo-completa.png  → lockup vertical oficial completo (Opção 1)
 *   logo-emblema.png   → o círculo com a flor (usado também como favicon)
 *   logo-wordmark.png  → bloco "PRISMA / ODONTOLOGIA"
 * E o favicon em src/app/icon.png.
 *
 * Uso: node scripts/extract-logo.mjs "<caminho do PDF>"
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { createCanvas } from "@napi-rs/canvas";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";

const PDF = process.argv[2] ?? "../PRISMA_material_grafico.pdf";
const SCALE = 4;

// Cores do manual (página "Paleta de Cores")
const BEGE = [243, 235, 231];
const MARSALA = [156, 90, 92];

const data = new Uint8Array(await fs.readFile(PDF));
const doc = await getDocument({ data }).promise;
const page = await doc.getPage(1);
const viewport = page.getViewport({ scale: SCALE });
const canvas = createCanvas(viewport.width, viewport.height);
const ctx = canvas.getContext("2d");
await page.render({ canvasContext: ctx, viewport }).promise;

const { width, height } = canvas;
const img = ctx.getImageData(0, 0, width, height);
const px = img.data;

// Decomposição: alfa = distância do pixel ao bege, normalizada pela
// distância bege→marsala. Preserva o anti-aliasing do traço original.
const maxDist = Math.hypot(
  MARSALA[0] - BEGE[0],
  MARSALA[1] - BEGE[1],
  MARSALA[2] - BEGE[2],
);
const alpha = new Float32Array(width * height);
for (let i = 0; i < width * height; i++) {
  const r = px[i * 4];
  const g = px[i * 4 + 1];
  const b = px[i * 4 + 2];
  const d = Math.hypot(r - BEGE[0], g - BEGE[1], b - BEGE[2]);
  alpha[i] = Math.min(1, d / maxDist);
}

// Faixa do rótulo "Logo Principal – Opção 1" (rodapé da página): ignorar.
const usableHeight = Math.floor(height * 0.92);

function bounds(y0, y1) {
  let minX = width, maxX = -1, minY = y1, maxY = -1;
  for (let y = y0; y < y1; y++) {
    for (let x = 0; x < width; x++) {
      if (alpha[y * width + x] > 0.06) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  return maxX < 0 ? null : { minX, maxX, minY, maxY };
}

// Bandas horizontais separadas por linhas vazias (emblema / PRISMA / ODONTOLOGIA)
function bands() {
  const rows = [];
  for (let y = 0; y < usableHeight; y++) {
    let any = false;
    for (let x = 0; x < width; x++) {
      if (alpha[y * width + x] > 0.06) {
        any = true;
        break;
      }
    }
    rows.push(any);
  }
  const out = [];
  let start = null;
  for (let y = 0; y < rows.length; y++) {
    if (rows[y] && start === null) start = y;
    if (!rows[y] && start !== null) {
      out.push([start, y - 1]);
      start = null;
    }
  }
  if (start !== null) out.push([start, rows.length - 1]);
  // funde bandas separadas por menos de 8px (ruído)
  const merged = [];
  for (const b of out) {
    const last = merged[merged.length - 1];
    if (last && b[0] - last[1] < 8) last[1] = b[1];
    else merged.push(b);
  }
  return merged;
}

async function save(box, file, pad = 12) {
  const x0 = Math.max(0, box.minX - pad);
  const y0 = Math.max(0, box.minY - pad);
  const w = Math.min(width, box.maxX + pad) - x0;
  const h = Math.min(usableHeight, box.maxY + pad) - y0;
  const out = createCanvas(w, h);
  const octx = out.getContext("2d");
  const oimg = octx.createImageData(w, h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const a = alpha[(y0 + y) * width + (x0 + x)];
      const j = (y * w + x) * 4;
      oimg.data[j] = MARSALA[0];
      oimg.data[j + 1] = MARSALA[1];
      oimg.data[j + 2] = MARSALA[2];
      oimg.data[j + 3] = Math.round(a * 255);
    }
  }
  octx.putImageData(oimg, 0, 0);
  await fs.writeFile(file, await out.encode("png"));
  console.log(`✓ ${file} (${w}×${h})`);
  return { w, h };
}

await fs.mkdir("public/img", { recursive: true });

const all = bounds(0, usableHeight);
if (!all) throw new Error("Nenhum traço encontrado na página 1.");
await save(all, "public/img/logo-completa.png");

const b = bands();
console.log(
  "Bandas detectadas:",
  b.map(([a, z]) => `${a}-${z}`).join(", "),
);
if (b.length >= 2) {
  // 1ª banda: emblema; demais: wordmark (PRISMA + ODONTOLOGIA)
  const emblem = bounds(b[0][0], b[0][1] + 1);
  const word = bounds(b[1][0], b[b.length - 1][1] + 1);
  await save(emblem, "public/img/logo-emblema.png");
  await save(word, "public/img/logo-wordmark.png");

  // Favicon quadrado a partir do emblema, centralizado
  const pad = 20;
  const ew = emblem.maxX - emblem.minX + 2 * pad;
  const eh = emblem.maxY - emblem.minY + 2 * pad;
  const size = Math.max(ew, eh);
  const fav = createCanvas(size, size);
  const fctx = fav.getContext("2d");
  const fimg = fctx.createImageData(size, size);
  const offX = Math.round((size - ew) / 2) + pad - emblem.minX;
  const offY = Math.round((size - eh) / 2) + pad - emblem.minY;
  for (let y = emblem.minY - pad; y <= emblem.maxY + pad; y++) {
    for (let x = emblem.minX - pad; x <= emblem.maxX + pad; x++) {
      if (x < 0 || y < 0 || x >= width || y >= usableHeight) continue;
      const a = alpha[y * width + x];
      const tx = x + offX;
      const ty = y + offY;
      if (tx < 0 || ty < 0 || tx >= size || ty >= size) continue;
      const j = (ty * size + tx) * 4;
      fimg.data[j] = MARSALA[0];
      fimg.data[j + 1] = MARSALA[1];
      fimg.data[j + 2] = MARSALA[2];
      fimg.data[j + 3] = Math.round(a * 255);
    }
  }
  fctx.putImageData(fimg, 0, 0);
  await fs.mkdir("src/app", { recursive: true });
  const sharp = (await import("sharp")).default;
  await sharp(await fav.encode("png"))
    .resize(512, 512)
    .png()
    .toFile("src/app/icon.png");
  console.log("✓ src/app/icon.png (favicon 512×512)");
}
