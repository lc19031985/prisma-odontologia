import { IconWhatsApp } from "./Icons";
import { whatsappLink } from "@/lib/links";
import styles from "./Floating.module.css";

export default function FloatingWhatsApp() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.whatsapp}
      aria-label="Falar com a Prisma Odontologia pelo WhatsApp (abre em nova aba)"
    >
      <IconWhatsApp size={26} />
    </a>
  );
}
