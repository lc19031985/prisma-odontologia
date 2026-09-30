"use client";

import { useState } from "react";
import Button from "./Button";
import Dialog from "./Dialog";
import SpecialtyIcon, { SpecialtyIconDefs } from "./SpecialtyIcon";
import { specialties, type Specialty } from "@/content/specialties";
import { whatsappLink } from "@/lib/links";
import styles from "./Specialties.module.css";

export default function Specialties() {
  const [open, setOpen] = useState<Specialty | null>(null);

  return (
    <section id="especialidades" className={styles.section}>
      <div className="container">
        <header className={styles.header}>
          <p className="section-label">
            <span className={styles.labelLine} aria-hidden="true" />
            Tratamentos completos para todas as fases
            <span className={styles.labelLine} aria-hidden="true" />
          </p>
          <h2 className={styles.title}>Especialidades</h2>
        </header>

        {/* Gradientes/filtros dos ícones — uma única vez na página. */}
        <SpecialtyIconDefs />

        {/*
          Cards do design "Cards Especialidades" (referencias/design/). O
          design pede <a> para uma página por especialidade; como o site é
          de página única, o card continua abrindo o diálogo — por isso é
          <button> e o conteúdo interno usa <span> (conteúdo permitido).
        */}
        <ul className={styles.grid}>
          {specialties.map((s) => (
            <li key={s.id}>
              <button
                type="button"
                className={styles.card}
                onClick={() => setOpen(s)}
              >
                <span className={styles.inner}>
                  <SpecialtyIcon icon={s.icon} className={styles.icon} />
                  <span>
                    <span className={styles.cardTitle}>{s.title}</span>
                    <span className={styles.cardDesc}>{s.caption}</span>
                  </span>
                  <span className={styles.cardBtn} aria-hidden="true">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#843B3B"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <Dialog
        open={open !== null}
        onClose={() => setOpen(null)}
        label="Especialidade"
        title={open?.title ?? ""}
        footer={
          <Button href={whatsappLink()} external>
            Agendar avaliação
          </Button>
        }
      >
        {open?.paragraphs.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
      </Dialog>
    </section>
  );
}
