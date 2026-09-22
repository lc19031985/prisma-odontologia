"use client";

import { useEffect, useState } from "react";
import styles from "./CookieNotice.module.css";

const STORAGE_KEY = "prisma-cookies-ok";

/**
 * Aviso de cookies discreto e não bloqueante (LGPD).
 * Informa o uso do mapa incorporado do Google; escolha guardada em
 * localStorage com try/catch (pode falhar em navegação privada).
 */
export default function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  return (
    <div className={styles.notice} role="region" aria-label="Aviso de cookies">
      <p>
        Este site usa o mapa incorporado do Google, que pode definir cookies de
        terceiros.{" "}
        <a href="/politica-de-privacidade/">Saiba mais na Política de Privacidade</a>.
      </p>
      <button
        type="button"
        onClick={() => {
          try {
            localStorage.setItem(STORAGE_KEY, "1");
          } catch {
            // navegação privada: apenas fecha nesta visita
          }
          setVisible(false);
        }}
      >
        Entendi
      </button>
    </div>
  );
}
