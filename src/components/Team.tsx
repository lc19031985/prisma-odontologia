"use client";

import { useState } from "react";
import Button from "./Button";
import Dialog from "./Dialog";
import { IconCamera } from "./Icons";
import { team, type TeamMember } from "@/content/team";
import { isPending } from "@/lib/links";
import styles from "./Team.module.css";

export default function Team() {
  const [openMember, setOpenMember] = useState<TeamMember | null>(null);
  const [openAll, setOpenAll] = useState(false);

  return (
    <section id="equipe" className={styles.section}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.text}>
          <h2 className={styles.title}>Nossa equipe</h2>
          <p className={styles.lead}>
            Profissionais comprometidas com o seu sorriso em todas as fases da
            sua vida.
          </p>
          <Button variant="light" onClick={() => setOpenAll(true)}>
            Conheça nossa equipe&ensp;→
          </Button>
        </div>

        <ul className={styles.cards}>
          {team.map((m) => (
            <li key={m.id}>
              <button
                type="button"
                className={styles.card}
                onClick={() => setOpenMember(m)}
                aria-label={`Conhecer ${m.name}`}
              >
                <span className={styles.photo}>
                  {/* PENDENTE: fotos da equipe em referencias/fotos/ */}
                  <span className="img-placeholder">
                    <IconCamera size={24} />
                    <span>Foto</span>
                  </span>
                </span>
                <span className={styles.name}>{m.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <Dialog
        open={openMember !== null}
        onClose={() => setOpenMember(null)}
        label="Equipe"
        title={openMember?.name ?? ""}
      >
        <p className={styles.dialogArea}>{openMember?.area}</p>
        {openMember && !isPending(openMember.cro) ? (
          <p className={styles.dialogCro}>{openMember.cro}</p>
        ) : null}
        {openMember && isPending(openMember.bio) ? (
          <p>
            <em>Apresentação em breve.</em>
          </p>
        ) : (
          <p>{openMember?.bio}</p>
        )}
      </Dialog>

      <Dialog
        open={openAll}
        onClose={() => setOpenAll(false)}
        label="Equipe"
        title="Quem cuida de você"
      >
        <ul className={styles.dialogList}>
          {team.map((m) => (
            <li key={m.id}>
              <strong>{m.name}</strong>
              <span>{m.area}</span>
              {!isPending(m.cro) ? <span>{m.cro}</span> : null}
            </li>
          ))}
        </ul>
      </Dialog>
    </section>
  );
}
