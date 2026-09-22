import Button from "./Button";
import { GoldLine } from "./OrganicShape";
import { IconCamera } from "./Icons";
import { whatsappLink } from "@/lib/links";
import styles from "./Hero.module.css";

const SPECIALTIES_LINE = [
  "Implantodontia",
  "Reabilitação Oral",
  "Ortodontia",
  "Endodontia",
  "Odontopediatria",
];

export default function Hero() {
  return (
    <section id="topo" className={styles.hero}>
      {/* Texto vertical decorativo (oculto para leitores de tela) */}
      <div className={styles.verticalText} aria-hidden="true">
        <GoldLine />
        <p>Saúde&ensp;·&ensp;Estética&ensp;·&ensp;Confiança&ensp;·&ensp;Bem-estar</p>
      </div>

      <div className={`container ${styles.inner}`}>
        <div className={styles.content}>
          <p className="section-label">Odontologia integrada</p>
          <h1 className={styles.title}>
            Cuidado em<br />cada detalhe.
          </h1>
          <p className={styles.lead}>
            Tecnologia, planejamento e atendimento humano para cuidar de você em
            todas as fases.
          </p>
          <div className={styles.buttons}>
            <Button href={whatsappLink()} external>
              Agende sua consulta&ensp;→
            </Button>
            <Button href="#a-prisma" variant="outline">
              Conheça a Prisma
            </Button>
          </div>
          <p className={styles.specialtiesLine}>
            {SPECIALTIES_LINE.map((s, i) => (
              <span key={s}>
                {s}
                {i < SPECIALTIES_LINE.length - 1 ? (
                  <span className={styles.dot} aria-hidden="true">
                    •
                  </span>
                ) : null}
              </span>
            ))}
          </p>
        </div>

        <div className={styles.media}>
          <div className={styles.photoShape}>
            {/* PENDENTE: referencias/fotos/hero.* — usar <picture> otimizado quando houver */}
            <div className="img-placeholder">
              <IconCamera size={34} />
              <span>
                Foto principal da clínica
                <br />
                ou atendimento
              </span>
            </div>
          </div>
          <p className={styles.handwritten} aria-hidden="true">
            Sorrisos que acompanham
            <br />
            sua história
          </p>
        </div>
      </div>
    </section>
  );
}
