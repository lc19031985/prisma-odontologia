"use client";

import { useState } from "react";
import Button from "./Button";
import Dialog from "./Dialog";
import SpecialtyIcon from "./SpecialtyIcon";
import { IconChevronRight } from "./Icons";
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

        <ul className={styles.grid}>
          {specialties.map((s) => (
            <li key={s.id}>
              <button
                type="button"
                className={styles.card}
                onClick={() => setOpen(s)}
              >
                <span className={styles.cardIcon} aria-hidden="true">
                  <SpecialtyIcon icon={s.icon} />
                </span>
                <span className={styles.cardText}>
                  <strong>{s.title}</strong>
                  <span>{s.caption}</span>
                </span>
                <span className={styles.cardArrow} aria-hidden="true">
                  <IconChevronRight />
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
