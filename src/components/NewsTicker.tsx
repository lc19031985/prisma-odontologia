"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Button from "./Button";
import Dialog from "./Dialog";
import {
  IconBulb,
  IconChevronRight,
  IconDoc,
  IconPause,
  IconPlay,
  IconShieldLine,
  IconSmile,
  IconToothLine,
} from "./Icons";
import { weekOfYear } from "@/lib/week";
import { whatsappLink } from "@/lib/links";
import weekly from "@/content/weekly-content.json";
import styles from "./NewsTicker.module.css";

type Item = {
  categoria: string;
  titulo: string;
  subtitulo: string;
  texto: string;
  icone: string;
  verificar: string | null;
};

const SETS = (weekly as { semanas: { semana: number; itens: Item[] }[] }).semanas;

const ROTATION_MS = 7000;

function ItemIcon({ name }: { name: string }) {
  switch (name) {
    case "digital":
      return <IconBulb />;
    case "cuidados":
    case "rotina":
      return <IconDoc />;
    case "odontopediatria":
      return <IconSmile />;
    case "fiodental":
    case "escova":
      return <IconShieldLine />;
    default:
      return <IconToothLine size={26} />;
  }
}

export default function NewsTicker() {
  // Renderiza a semana 1 no HTML estático; após a hidratação, calcula a semana
  // real no navegador (site estático — ver src/lib/week.ts). A altura da faixa
  // é reservada no CSS para não haver salto de layout.
  const [setIndex, setSetIndex] = useState(0);
  const [active, setActive] = useState(0); // item ativo no celular/tablet
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [openItem, setOpenItem] = useState<Item | null>(null);
  const interactedRef = useRef(false);
  const regionRef = useRef<HTMLDivElement>(null);

  const items = SETS[setIndex % SETS.length].itens;

  useEffect(() => {
    setSetIndex((weekOfYear() - 1) % SETS.length);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Rotação automática (só tem efeito visual no celular/tablet).
  useEffect(() => {
    if (paused || reducedMotion || openItem) return;
    const id = window.setInterval(() => {
      setActive((a) => (a + 1) % items.length);
    }, ROTATION_MS);
    return () => window.clearInterval(id);
  }, [paused, reducedMotion, openItem, items.length]);

  // A rotação pausa com hover, foco ou toque e não reinicia sozinha depois
  // que o usuário interage.
  const stopForUser = useCallback(() => {
    interactedRef.current = true;
    setPaused(true);
  }, []);

  const pauseTemporarily = useCallback(() => setPaused(true), []);
  const resumeIfNotInteracted = useCallback(() => {
    if (!interactedRef.current) setPaused(false);
  }, []);

  const goTo = (i: number) => {
    stopForUser();
    setActive((i + items.length) % items.length);
  };

  return (
    <section className={styles.band} aria-label="Novidades e orientações">
      <div className={`container ${styles.inner}`}>
        <p className={styles.label}>
          <span className={styles.labelShort}>Novidades</span>
          <span className={styles.labelLong}>Novidades e orientações</span>
        </p>

        <div
          ref={regionRef}
          className={styles.items}
          onPointerEnter={pauseTemporarily}
          onPointerLeave={resumeIfNotInteracted}
          onFocus={pauseTemporarily}
          onBlur={resumeIfNotInteracted}
          onTouchStart={stopForUser}
        >
          {items.map((item, i) => (
            <button
              key={`${setIndex}-${item.categoria}`}
              type="button"
              className={`${styles.item} ${i === active ? styles.itemActive : ""}`}
              onClick={() => {
                stopForUser();
                setOpenItem(item);
              }}
            >
              <span className={styles.itemIcon} aria-hidden="true">
                <ItemIcon name={item.icone} />
              </span>
              <span className={styles.itemText}>
                <strong>{item.titulo}</strong>
                <span>{item.subtitulo}</span>
              </span>
            </button>
          ))}
        </div>

        <div className={styles.controls}>
          <button
            type="button"
            className={styles.pauseBtn}
            onClick={() => {
              interactedRef.current = true;
              setPaused((p) => !p);
            }}
            aria-label={paused ? "Retomar a rotação das chamadas" : "Pausar a rotação das chamadas"}
          >
            {paused ? <IconPlay /> : <IconPause />}
          </button>
          <div className={styles.dots} role="tablist" aria-label="Chamada em destaque">
            {items.map((item, i) => (
              <button
                key={item.categoria}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-label={`${item.categoria}: ${item.titulo}`}
                className={`${styles.dot} ${i === active ? styles.dotActive : ""}`}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
          <button
            type="button"
            className={styles.arrow}
            aria-label="Próxima chamada"
            onClick={() => goTo(active + 1)}
          >
            <IconChevronRight />
          </button>
        </div>
      </div>

      <Dialog
        open={openItem !== null}
        onClose={() => setOpenItem(null)}
        label={openItem?.categoria}
        title={openItem?.titulo ?? ""}
        footer={
          <Button href={whatsappLink()} external>
            Agendar avaliação
          </Button>
        }
      >
        <p>{openItem?.texto}</p>
      </Dialog>
    </section>
  );
}
