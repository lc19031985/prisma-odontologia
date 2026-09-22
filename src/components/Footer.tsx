import Logo from "./Logo";
import CurrentYear from "./CurrentYear";
import { IconInstagram, IconPhone, IconPin, IconWhatsApp } from "./Icons";
import { clinic } from "@/config/clinic";
import { instagramLink, isPending, whatsappLink } from "@/lib/links";
import styles from "./Footer.module.css";

export default function Footer() {
  const a = clinic.address;

  return (
    <footer id="contato" className={styles.footer}>
      <div className={`container ${styles.top}`}>
        <div className={styles.brand}>
          <Logo variant="footer" />
          <p className={styles.handwritten} aria-hidden="true">
            {clinic.slogan}
          </p>
        </div>

        <ul className={styles.contacts}>
          <li>
            <span className={styles.cIcon} aria-hidden="true">
              <IconPhone size={16} />
            </span>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
              {clinic.phoneDisplay}
              <span className="visually-hidden"> (WhatsApp, abre em nova aba)</span>
            </a>
          </li>
          <li>
            <span className={styles.cIcon} aria-hidden="true">
              <IconInstagram size={16} />
            </span>
            <a
              href={instagramLink(clinic.instagramClinic)}
              target="_blank"
              rel="noopener noreferrer"
            >
              @{clinic.instagramClinic}
              <span className="visually-hidden"> (abre em nova aba)</span>
            </a>
          </li>
          <li>
            <span className={styles.cIcon} aria-hidden="true">
              <IconInstagram size={16} />
            </span>
            <a
              href={instagramLink(clinic.instagramProfessional)}
              target="_blank"
              rel="noopener noreferrer"
            >
              @{clinic.instagramProfessional}
              <span className="visually-hidden"> (abre em nova aba)</span>
            </a>
          </li>
          <li>
            <span className={styles.cIcon} aria-hidden="true">
              <IconPin size={16} />
            </span>
            <span>
              {a.street} · {a.reference}
              <br />
              Bairro {a.district} · {a.city} – {a.state} · CEP: {a.zip}
            </span>
          </li>
        </ul>

        <div className={styles.legalInfo}>
          <p>
            Responsável técnica: {clinic.technicalManager.name} —{" "}
            {clinic.technicalManager.cro}
          </p>
          {/* A linha só aparece quando o nº for preenchido em clinic.ts
              (decisão do cliente em 22/09/2026 — nada de "em breve" no ar).
              Continua obrigatória para publicar: ver PENDENCIAS.md. */}
          {!isPending(clinic.clinicCroRegistration) ? (
            <p>
              Inscrição da clínica no CRO-MA: {clinic.clinicCroRegistration}
            </p>
          ) : null}
          <ul className={styles.legalLinks}>
            <li>
              <a href="/politica-de-privacidade/">Política de Privacidade</a>
            </li>
            <li>
              <a href="/termos-de-uso/">Termos de Uso</a>
            </li>
            <li>
              <a href="/politica-de-privacidade/#cookies">Cookies</a>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={`container ${styles.bottomInner}`}>
          <p>
            © <CurrentYear /> {clinic.name}. Todos os direitos reservados.
          </p>
          <p className={styles.tagline}>Sorrisos reais. Histórias únicas.</p>
        </div>
      </div>
    </footer>
  );
}
