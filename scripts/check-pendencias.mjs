/**
 * Lista todas as pendências ([PENDENTE: ...]) do projeto.
 * Uso:
 *   npm run check:pendencias          → lista tudo
 *   node scripts/check-pendencias.mjs --strict
 *       → sai com erro se houver pendência CRÍTICA (WhatsApp, domínio),
 *         a menos que ALLOW_PENDING=1 esteja definido.
 */
import { promises as fs } from "node:fs";
import path from "node:path";

const ROOTS = ["src", "public"];
const EXT = new Set([".ts", ".tsx", ".json", ".css", ".md", ".txt", ".xml"]);
const PATTERN = /\[PENDENTE:[^\]]*\]/g;
const CRITICAL = [/whatsapp/i, /dom[ií]nio/i];

async function* walk(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (EXT.has(path.extname(entry.name))) yield full;
  }
}

const findings = [];
for (const root of ROOTS) {
  try {
    await fs.access(root);
  } catch {
    continue;
  }
  for await (const file of walk(root)) {
    const text = await fs.readFile(file, "utf8");
    const lines = text.split("\n");
    lines.forEach((line, i) => {
      for (const match of line.matchAll(PATTERN)) {
        findings.push({ file, line: i + 1, text: match[0] });
      }
    });
  }
}

if (findings.length === 0) {
  console.log("Nenhuma pendência encontrada. ✓");
  process.exit(0);
}

console.log(`\n${findings.length} pendência(s) encontrada(s):\n`);
for (const f of findings) {
  console.log(`  ${f.file}:${f.line}  ${f.text}`);
}

const strict = process.argv.includes("--strict");
if (strict && process.env.ALLOW_PENDING !== "1") {
  const critical = findings.filter((f) =>
    CRITICAL.some((re) => re.test(f.text)),
  );
  if (critical.length > 0) {
    console.error(
      `\nERRO: ${critical.length} pendência(s) crítica(s) (WhatsApp/domínio). ` +
        "O build de produção foi interrompido. Defina ALLOW_PENDING=1 para prosseguir mesmo assim.",
    );
    process.exit(1);
  }
}

console.log(
  "\nDetalhes e responsáveis em PENDENCIAS.md. O build segue normalmente.",
);
