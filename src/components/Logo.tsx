import styles from "./Logo.module.css";

/**
 * Logomarca oficial da Prisma Odontologia (ArthDesignn, Identidade Visual
 * 2025 — "Logo Principal, Opção 1"), extraída sem alterações do PDF
 * PRISMA_material_grafico.pdf (ver DECISOES.md).
 *
 * O arranjo horizontal (emblema + wordmark) segue o cabeçalho/rodapé do
 * design aprovado; os dois arquivos são recortes do arquivo oficial, sem
 * redesenho nem recoloração. Lockup vertical completo: /img/logo-completa.png.
 */
export default function Logo({ variant = "default" }: { variant?: "default" | "footer" }) {
  return (
    <span className={`${styles.lockup} ${variant === "footer" ? styles.footer : ""}`}>
      <img
        src="/img/logo-emblema.png"
        alt=""
        width={262}
        height={256}
        className={styles.emblem}
      />
      <img
        src="/img/logo-wordmark.png"
        alt="Prisma Odontologia"
        width={720}
        height={259}
        className={styles.wordmark}
      />
    </span>
  );
}
