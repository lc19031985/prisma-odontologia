/**
 * Lighthouse mobile contra o build estático servido (Fase 5).
 * Pré-requisito: node scripts/serve-out.mjs 3010 rodando.
 * Uso: node scripts/lighthouse.mjs [url]
 */
import { chromium } from "playwright";
import lighthouse from "lighthouse";

const URL = process.argv[2] ?? "http://localhost:3010";
const PORT = 9333;

const launchArgs = [`--remote-debugging-port=${PORT}`];
if (process.env.HOST_RESOLVER) {
  launchArgs.push(`--host-resolver-rules=${process.env.HOST_RESOLVER}`);
}
const browser = await chromium.launch({ args: launchArgs });

try {
  const { lhr } = await lighthouse(URL, {
    port: PORT,
    output: "json",
    logLevel: "error",
  });
  console.log(`\nLighthouse (mobile) — ${URL}\n`);
  for (const [key, cat] of Object.entries(lhr.categories)) {
    console.log(`  ${cat.title}: ${Math.round(cat.score * 100)}`);
  }
  const abaixo = Object.values(lhr.categories).filter((c) => c.score < 0.9);
  if (abaixo.length > 0) {
    console.log("\nPrincipais oportunidades:");
    for (const c of abaixo) {
      for (const ref of c.auditRefs.slice(0, 30)) {
        const a = lhr.audits[ref.id];
        if (a && a.score !== null && a.score < 0.9 && ref.weight > 0) {
          console.log(`  [${c.title}] ${a.title} (${a.score})`);
        }
      }
    }
    process.exitCode = 1;
  }
} finally {
  await browser.close();
}
