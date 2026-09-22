"use client";

import { useEffect, useRef, useState } from "react";
import { IconPin } from "./Icons";
import { mapEmbedUrl } from "@/lib/links";
import styles from "./Location.module.css";

/**
 * O iframe do Google Maps só entra no DOM quando a seção se aproxima da tela
 * (IntersectionObserver). Isso tira ~1s de JavaScript de terceiros do
 * carregamento inicial e evita cookies do Google para quem nem chega ao mapa.
 * O espaço é reservado pelo contêiner (sem salto de layout).
 */
export default function MapEmbed() {
  const ref = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || load) return;
    if (!("IntersectionObserver" in window)) {
      setLoad(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: "600px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [load]);

  return (
    <div ref={ref} className={styles.mapFrame}>
      {load ? (
        <iframe
          src={mapEmbedUrl()}
          title="Mapa com a localização da Prisma Odontologia"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          className={styles.mapPlaceholder}
          onClick={() => setLoad(true)}
        >
          <IconPin size={28} />
          <span>Mostrar o mapa</span>
        </button>
      )}
    </div>
  );
}
