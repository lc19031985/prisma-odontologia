import Button from "./Button";
import { IconGoogleG, IconSpeech, IconStar } from "./Icons";
import { reviewLink } from "@/lib/links";
import styles from "./GoogleReview.module.css";

export default function GoogleReview() {
  const href = reviewLink();

  return (
    <section className={styles.section} aria-labelledby="titulo-avaliacao">
      <div className={`container ${styles.inner}`}>
        <span className={styles.speech} aria-hidden="true">
          <IconSpeech />
        </span>

        <div className={styles.text}>
          <p className="section-label">Sua experiência</p>
          <h2 id="titulo-avaliacao" className={styles.title}>
            Já conhece o nosso cuidado?
          </h2>
          <p className={styles.lead}>
            Se você já é paciente da Prisma, compartilhe sua experiência. Sua
            avaliação nos ajuda a cuidar cada vez melhor.
          </p>
        </div>

        <div className={styles.action}>
          <span className={styles.stars} aria-hidden="true">
            <IconStar />
            <IconStar />
            <IconStar />
            <IconStar />
            <IconStar />
          </span>
          <div className={styles.googleRow}>
            <span className={styles.gBadge} aria-hidden="true">
              <IconGoogleG size={26} />
            </span>
            <Button
              href={href}
              external
              pending={href === null}
              ariaLabel="Avaliar a Prisma Odontologia no Google"
            >
              Avaliar no Google
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
