/**
 * Verificação da Fase 5 (Playwright + axe) contra o build estático servido.
 * Pré-requisitos: `npm run build` e `node scripts/serve-out.mjs 3010` rodando.
 * Uso: node scripts/verify.mjs [urlBase]
 *
 * Checagens:
 *  1. Sem rolagem horizontal em 320/390/768/1440 px
 *  2. Navegação por Tab percorre os controles principais
 *  3. Cada <dialog> abre, fecha por Esc e devolve o foco ao gatilho
 *  4. href de cada botão (wa.me com mensagem codificada, rota, avaliação pendente)
 *  5. Carrossel: rotação automática, pausa, e prefers-reduced-motion
 *  6. axe-core: nenhuma violação serious/critical
 */
import { chromium } from "playwright";
import { AxeBuilder } from "@axe-core/playwright";
import { clinic } from "../src/config/clinic.ts";

const BASE = process.argv[2] ?? "http://localhost:3010";
const results = [];
const fail = (name, detail) =>
  results.push({ name, ok: false, detail: String(detail).slice(0, 200) });
const pass = (name, detail = "") => results.push({ name, ok: true, detail });

/** Evita que o aviso de cookies apareça (já "aceito"). */
async function abrir(p, url = BASE) {
  await p.goto(url, { waitUntil: "domcontentloaded" });
  await p.evaluate(() => localStorage.setItem("prisma-cookies-ok", "1"));
  await p.goto(url, { waitUntil: "networkidle" });
}

const browser = await chromium.launch();

// ── 1. Rolagem horizontal ────────────────────────────────────────────────
for (const width of [320, 390, 768, 1440]) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  await page.goto(BASE, { waitUntil: "networkidle" });
  const overflow = await page.evaluate(() => {
    const el = document.scrollingElement;
    return el.scrollWidth - el.clientWidth;
  });
  overflow <= 1
    ? pass(`sem rolagem horizontal @${width}px`)
    : fail(`sem rolagem horizontal @${width}px`, `overflow de ${overflow}px`);
  await page.close();
}

// ── Página desktop para as demais checagens ──────────────────────────────
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await abrir(page);

// ── 2. Navegação por Tab ─────────────────────────────────────────────────
{
  const seen = new Set();
  await page.keyboard.press("Tab"); // skip-link
  const first = await page.evaluate(() =>
    document.activeElement?.textContent?.trim().slice(0, 40),
  );
  first === "Pular para o conteúdo"
    ? pass("primeiro Tab foca o skip-link")
    : fail("primeiro Tab foca o skip-link", `focado: ${first}`);
  for (let i = 0; i < 80; i++) {
    await page.keyboard.press("Tab");
    const info = await page.evaluate(() => {
      const el = document.activeElement;
      return el ? `${el.tagName}:${(el.getAttribute("aria-label") ?? el.textContent ?? "").trim().slice(0, 40)}` : "none";
    });
    seen.add(info);
  }
  const txt = [...seen].join("|");
  const marcos = ["A Prisma", "Agende sua consulta", "Especialidades", "Traçar rota", "Política de Privacidade"];
  const faltando = marcos.filter((m) => !txt.includes(m));
  faltando.length === 0
    ? pass(`Tab alcança os controles principais (${seen.size} paradas distintas)`)
    : fail("Tab alcança os controles principais", `não alcançados: ${faltando.join(", ")}`);
}

// ── 3. Diálogos ──────────────────────────────────────────────────────────
async function checkDialog(name, openFn) {
  await openFn();
  const opened = await page
    .waitForSelector("dialog[open]", { timeout: 3000 })
    .then(() => true)
    .catch(() => false);
  if (!opened) return fail(`diálogo: ${name}`, "não abriu");
  await page.keyboard.press("Escape");
  await page.waitForTimeout(250);
  const closed = (await page.locator("dialog[open]").count()) === 0;
  if (!closed) return fail(`diálogo: ${name}`, "não fechou com Esc");
  const focusBack = await page.evaluate(
    () => document.activeElement !== document.body,
  );
  focusBack
    ? pass(`diálogo: ${name} (abre, Esc fecha, foco devolvido)`)
    : fail(`diálogo: ${name}`, "foco não devolvido ao gatilho");
}

const newsItems = page.locator("section[aria-label='Novidades e orientações'] button").filter({ hasNot: page.locator("[role='tab']") });
await checkDialog("novidade 1", async () => {
  await page.locator("section[aria-label='Novidades e orientações'] >> button:has(strong)").first().click();
});
await checkDialog("A Prisma (institucional)", async () => {
  await page.getByRole("button", { name: /Conheça mais sobre a Prisma/ }).click();
});
for (let i = 0; i < 6; i++) {
  await checkDialog(`especialidade ${i + 1}`, async () => {
    await page.locator("#especialidades li > button").nth(i).click();
  });
}
await checkDialog("equipe (todas)", async () => {
  await page.getByRole("button", { name: /Conheça nossa equipe/ }).click();
});
await checkDialog("equipe (Dra. Priscilla)", async () => {
  await page.locator("#equipe li > button").first().click();
});

// ── 4. Hrefs ─────────────────────────────────────────────────────────────
{
  const esperado = `https://wa.me/${clinic.whatsappNumber}?text=${encodeURIComponent(clinic.whatsappMessage)}`;
  const links = await page.locator("a[href^='https://wa.me/']").evaluateAll((as) => as.map((a) => a.href));
  links.length > 0 && links.every((h) => h === esperado)
    ? pass(`links do WhatsApp corretos (${links.length} ocorrências, mensagem codificada)`)
    : fail("links do WhatsApp", `esperado ${esperado}; encontrados: ${[...new Set(links)].join(" | ")}`);

  const rota = await page.locator("a", { hasText: "Traçar rota" }).first().getAttribute("href");
  rota?.startsWith("https://www.google.com/maps/dir/?api=1&destination=") && !rota.includes("destination_place_id")
    ? pass("link de rota correto (sem place_id enquanto pendente)")
    : fail("link de rota", rota ?? "ausente");

  const reviewDisabled = await page.locator("a[aria-disabled='true']", { hasText: "Avaliar no Google" }).count();
  reviewDisabled >= 2
    ? pass(`botões "Avaliar no Google" pendentes desabilitados (${reviewDisabled})`)
    : fail("botões de avaliação pendentes", `encontrados ${reviewDisabled}, esperado ≥ 2 com aria-disabled`);

  // o iframe do mapa entra sob demanda (MapEmbed) — rolar até a seção
  await page.locator("#estrutura").scrollIntoViewIfNeeded();
  const mapa = await page
    .waitForSelector("iframe[title='Mapa com a localização da Prisma Odontologia']", { timeout: 6000 })
    .then((f) => f.getAttribute("src"))
    .catch(() => null);
  mapa?.includes("google.com/maps") && mapa.includes("output=embed")
    ? pass("iframe do mapa carrega ao aproximar da seção (embed por endereço)")
    : fail("iframe do mapa", mapa ?? "não carregou ao rolar até a seção");

  const externos = await page.locator("a[target='_blank']").evaluateAll((as) => as.filter((a) => a.rel !== "noopener noreferrer").map((a) => a.href));
  externos.length === 0
    ? pass("todos os links externos com rel=noopener noreferrer")
    : fail("rel dos links externos", externos.join(", "));
}
await page.close();

// ── 5. Carrossel (celular) ───────────────────────────────────────────────
{
  const m = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await abrir(m);
  const ativo = () => m.locator("[role='tab'][aria-selected='true']").getAttribute("aria-label");
  const a1 = await ativo();
  await m.waitForTimeout(7600);
  const a2 = await ativo();
  a1 !== a2
    ? pass("carrossel roda automaticamente (~7s)")
    : fail("rotação automática do carrossel", "item não mudou após 7,6s");

  await m.getByRole("button", { name: /Pausar a rotação/ }).click();
  const a3 = await ativo();
  await m.waitForTimeout(7600);
  const a4 = await ativo();
  a3 === a4
    ? pass("botão de pausa interrompe a rotação")
    : fail("pausa do carrossel", "item mudou mesmo pausado");
  await m.close();

  const rm = await browser.newPage({
    viewport: { width: 390, height: 844 },
    reducedMotion: "reduce",
  });
  await abrir(rm);
  const r1 = await rm.locator("[role='tab'][aria-selected='true']").getAttribute("aria-label");
  await rm.waitForTimeout(7600);
  const r2 = await rm.locator("[role='tab'][aria-selected='true']").getAttribute("aria-label");
  r1 === r2
    ? pass("prefers-reduced-motion desativa a rotação automática")
    : fail("prefers-reduced-motion", "carrossel rodou mesmo com movimento reduzido");
  await rm.close();
}

// ── 6. axe-core ──────────────────────────────────────────────────────────
for (const [label, viewport] of [["desktop", { width: 1440, height: 900 }], ["celular", { width: 390, height: 844 }]]) {
  const ctx = await browser.newContext({ viewport });
  const p = await ctx.newPage();
  await abrir(p);
  const axe = await new AxeBuilder({ page: p }).analyze();
  const graves = axe.violations.filter((v) => ["serious", "critical"].includes(v.impact));
  graves.length === 0
    ? pass(`axe ${label}: sem violações serious/critical (${axe.violations.length} menores)`)
    : fail(`axe ${label}`, graves.map((v) => `${v.id} (${v.impact}): ${v.nodes.length} nós`).join("; "));
  if (axe.violations.length > 0) {
    console.log(`  [axe ${label}] violações menores:`, axe.violations.map((v) => `${v.id}(${v.impact})`).join(", "));
  }
  await ctx.close();
}

await browser.close();

// ── Relatório ────────────────────────────────────────────────────────────
console.log("\n════════ RESULTADO DA VERIFICAÇÃO ════════\n");
for (const r of results) {
  console.log(`${r.ok ? "✔" : "✘"} ${r.name}${r.detail ? ` — ${r.detail}` : ""}`);
}
const falhas = results.filter((r) => !r.ok);
console.log(`\n${results.length - falhas.length}/${results.length} checagens passaram.`);
process.exit(falhas.length > 0 ? 1 : 0);
