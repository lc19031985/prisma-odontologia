import Button from "./Button";
import MapEmbed from "./MapEmbed";
import { IconClock, IconGoogleG, IconPin, IconWhatsApp } from "./Icons";
import { clinic } from "@/config/clinic";
import {
  mapsLink,
  reviewLink,
  routeLink,
  whatsappLink,
} from "@/lib/links";
import styles from "./Location.module.css";

export default function Location() {
  const review = reviewLink();
  const a = clinic.address;

  return (
    <section id="estrutura" className={styles.section}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.mapCol}>
          <MapEmbed />
          <a
            className={styles.mapLink}
            href={mapsLink()}
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver mapa ampliado
            <span className="visually-hidden"> (abre em nova aba)</span>
          </a>
        </div>

        <div className={styles.info}>
          <p className="section-label">Estrutura</p>
          <h2 className={styles.title}>
            Um espaço pensado
            <br />
            para você.
          </h2>
          <p className={styles.lead}>
            Um ambiente moderno, acolhedor e equipado com tecnologia para
            oferecer mais conforto, segurança e bem-estar em cada atendimento.
          </p>

          <ul className={styles.details}>
            <li>
              <span className={styles.detailIcon} aria-hidden="true">
                <IconPin />
              </span>
              <address className={styles.address}>
                {a.street}
                <br />
                {a.reference}
                <br />
                Bairro {a.district} · {a.city} – {a.state}
                <br />
                CEP: {a.zip}
              </address>
            </li>
            <li>
              <span className={styles.detailIcon} aria-hidden="true">
                <IconClock />
              </span>
              <div>
                {clinic.hours.map((h) => (
                  <p key={h.label} className={styles.hour}>
                    {h.label} · {h.value}
                  </p>
                ))}
              </div>
            </li>
          </ul>

          <div className={styles.buttons}>
            <Button href={routeLink()} external>
              Traçar rota
            </Button>
            <Button
              href={whatsappLink()}
              external
              variant="light"
              icon={<IconWhatsApp size={18} />}
            >
              Falar pelo WhatsApp
            </Button>
            <Button
              href={review}
              pending={review === null}
              external
              variant="light"
              icon={<IconGoogleG size={16} />}
            >
              Avaliar no Google
            </Button>
          </div>
        </div>
      </div>

      {/* Texto decorativo aprovado pelo cliente */}
      <div className={styles.sideText} aria-hidden="true">
        <p>Mais que sorrisos, relações para sempre</p>
      </div>
    </section>
  );
}
