"use client";

import { useEffect, useRef, type ReactNode } from "react";
import styles from "./Dialog.module.css";

type Props = {
  open: boolean;
  onClose: () => void;
  /** Rótulo pequeno acima do título (opcional). */
  label?: string;
  title: string;
  children: ReactNode;
  /** Rodapé com ações (opcional). */
  footer?: ReactNode;
};

/**
 * Diálogo com o elemento nativo <dialog>: foco preso, fechamento por Esc e
 * retorno do foco ao gatilho são comportamentos nativos de showModal()/close().
 */
export default function Dialog({ open, onClose, label, title, children, footer }: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    else if (!open && el.open) el.close();
  }, [open]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handleClose = () => onClose();
    el.addEventListener("close", handleClose);
    return () => el.removeEventListener("close", handleClose);
  }, [onClose]);

  return (
    <dialog
      ref={ref}
      className={styles.dialog}
      aria-labelledby={undefined}
      onClick={(e) => {
        // Clique no backdrop (fora da caixa interna) fecha o diálogo.
        if (e.target === ref.current) ref.current?.close();
      }}
    >
      <div className={styles.inner}>
        <button
          type="button"
          className={styles.close}
          onClick={() => ref.current?.close()}
          aria-label="Fechar"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
        {label ? <p className="section-label">{label}</p> : null}
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.body}>{children}</div>
        {footer ? <div className={styles.footer}>{footer}</div> : null}
      </div>
    </dialog>
  );
}
