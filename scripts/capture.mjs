// Captura telas do site em desenvolvimento (uso interno das fases 2–3).
// node scripts/capture.mjs <diretório-saída>
import { chromium } from "playwright";
import path from "node:path";

const outDir = process.argv[2] ?? "capturas";
const base = process.argv[3] ?? "http://localhost:3000";
const sizes = [
  { name: "1440", width: 1440, height: 900 },
  { name: "768", width: 768, height: 1024 },
  { name: "390", width: 390, height: 844 },
  { name: "320", width: 320, height: 700 },
];

const browser = await chromium.launch();
for (const s of sizes) {
  const page = await browser.newPage({ viewport: { width: s.width, height: s.height } });
  await page.goto(base, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  await page.screenshot({
    path: path.join(outDir, `home-${s.name}-full.png`),
    fullPage: true,
  });
  await page.screenshot({ path: path.join(outDir, `home-${s.name}-dobra.png`) });
  await page.close();
  console.log(`✓ ${s.name}px`);
}
await browser.close();
