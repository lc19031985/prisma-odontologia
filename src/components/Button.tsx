import type { ReactNode, MouseEventHandler } from "react";
import styles from "./Button.module.css";

type Props = {
  children: ReactNode;
  href?: string | null;
  onClick?: MouseEventHandler;
  variant?: "primary" | "outline" | "light" | "ghost";
  /** Link externo: nova aba + aviso acessível. */
  external?: boolean;
  /** Link ainda [PENDENTE:...]: desabilitado com "em breve". */
  pending?: boolean;
  className?: string;
  ariaLabel?: string;
  icon?: ReactNode;
};

/**
 * Botão/link padrão do site.
 * Um link pendente nunca leva a um href quebrado: em desenvolvimento ganha um
 * contorno de alerta; em produção aparece com aria-disabled e o texto "em breve".
 */
export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  external = false,
  pending = false,
  className = "",
  ariaLabel,
  icon,
}: Props) {
  const isDev = process.env.NODE_ENV === "development";
  const cls = [
    styles.button,
    styles[variant],
    pending ? (isDev ? styles.pendingDev : styles.pendingProd) : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const inner = (
    <>
      {icon ? <span className={styles.icon} aria-hidden="true">{icon}</span> : null}
      <span>{children}</span>
      {pending ? <span className={styles.soon}>em breve</span> : null}
      {external && !pending ? (
        <span className="visually-hidden"> (abre em nova aba)</span>
      ) : null}
    </>
  );

  if (pending || !href) {
    if (onClick && !pending) {
      return (
        <button type="button" className={cls} onClick={onClick} aria-label={ariaLabel}>
          {inner}
        </button>
      );
    }
    return (
      <a className={cls} aria-disabled="true" role="link" aria-label={ariaLabel}>
        {inner}
      </a>
    );
  }

  return (
    <a
      className={cls}
      href={href}
      onClick={onClick}
      aria-label={ariaLabel}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
    >
      {inner}
    </a>
  );
}
