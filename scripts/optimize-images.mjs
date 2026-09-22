/**
 * Lê referencias/fotos/ e gera versões AVIF e WebP em 3 larguras em public/img/.
 * Uso: npm run images
 * (A exportação estática desativa o otimizador do next/image; por isso as
 * imagens são pré-otimizadas aqui com sharp.)
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const SRC = path.resolve("referencias/fotos");
const OUT = path.resolve("public/img");
const WIDTHS = [480, 960, 1440];
const INPUT_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".tiff", ".avif"]);

async function main() {
  let files = [];
  try {
    files = (await fs.readdir(SRC)).filter((f) =>
      INPUT_EXT.has(path.extname(f).toLowerCase()),
    );
  } catch {
    console.log(`Pasta ${SRC} não encontrada — nada a otimizar.`);
    return;
  }

  if (files.length === 0) {
    console.log("Nenhuma foto encontrada em referencias/fotos/.");
    return;
  }

  await fs.mkdir(OUT, { recursive: true });

  for (const file of files) {
    const name = path.parse(file).name;
    const input = path.join(SRC, file);
    const meta = await sharp(input).metadata();

    for (const width of WIDTHS) {
      if (meta.width && meta.width < width) continue;
      const base = sharp(input).resize({ width, withoutEnlargement: true });
      await base
        .clone()
        .avif({ quality: 55 })
        .toFile(path.join(OUT, `${name}-${width}.avif`));
      await base
        .clone()
        .webp({ quality: 74 })
        .toFile(path.join(OUT, `${name}-${width}.webp`));
      console.log(`✓ ${name} @ ${width}px (avif + webp)`);
    }
  }

  console.log(`\nPronto. Arquivos gerados em ${OUT}.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
