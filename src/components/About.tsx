"use client";

import { useState } from "react";
import Button from "./Button";
import Dialog from "./Dialog";
import { Wave } from "./OrganicShape";
import { IconHeartLine, IconToothLine, IconUsers } from "./Icons";
import { whatsappLink } from "@/lib/links";
import styles from "./About.module.css";

const FEATURES = [
  {
    icon: <IconUsers />,
    title: "Atendimento integrado",
    text: "Diferentes especialidades em um só lugar.",
  },
  {
    icon: <IconToothLine />,
    // Legenda reescrita sem "previsíveis" (conformidade — ver DECISOES.md)
    title: "Tecnologia e planejamento",
    text: "Recursos modernos a serviço do seu cuidado.",
  },
  {
    icon: <IconHeartLine />,
    title: "Cuidado humano",
    text: "Escuta, respeito e atendimento personalizado.",
  },
];

export default function About() {
  const [open, setOpen] = useState(false);

  return (
    <section id="a-prisma" className={styles.section}>
      <Wave color="var(--bege)" />
      <div className={styles.bandBege}>
        <div className={`container ${styles.inner}`}>
          <div className={styles.text}>
            <h2 className={styles.title}>
              Uma experiência
              <br />
              <em>integrada de cuidado</em>
            </h2>
            <p className={styles.lead}>
              Na Prisma Odontologia, unimos conhecimento, tecnologia e um olhar
              humano para oferecer um atendimento completo, personalizado e de
              excelência, em todas as fases da sua vida.
            </p>
            <Button variant="outline" onClick={() => setOpen(true)}>
              Conheça mais sobre a Prisma&ensp;→
            </Button>
          </div>

          <ul className={styles.features}>
            {FEATURES.map((f) => (
              <li key={f.title}>
                <span className={styles.featureIcon} aria-hidden="true">
                  {f.icon}
                </span>
                <div>
                  <h3 className={styles.featureTitle}>{f.title}</h3>
                  <p className={styles.featureText}>{f.text}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className={styles.media}>
            <div className={styles.photoFrame}>
              <picture>
                <source
                  type="image/avif"
                  srcSet="/img/recepcao-480.avif 480w, /img/recepcao-960.avif 960w"
                  sizes="(max-width: 700px) 90vw, 420px"
                />
                <source
                  type="image/webp"
                  srcSet="/img/recepcao-480.webp 480w, /img/recepcao-960.webp 960w"
                  sizes="(max-width: 700px) 90vw, 420px"
                />
                <img
                  src="/img/recepcao-960.webp"
                  alt="Recepção da Prisma Odontologia, com balcão de mármore claro, arranjo de flores e a logomarca da clínica aplicada na parede"
                  width={960}
                  height={1011}
                  loading="lazy"
                  className={styles.photo}
                />
              </picture>
            </div>
          </div>
        </div>
      </div>
      <Wave color="var(--bege)" flip />

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        label="A Prisma"
        title="Prisma Odontologia"
        footer={
          <Button href={whatsappLink()} external>
            Agende sua consulta
          </Button>
        }
      >
        {/* [PENDENTE: texto institucional aprovado pela clínica] — rascunho
            neutro provisório abaixo, marcado para substituição. */}
        <p>
          <em>(Texto provisório, aguardando o texto institucional aprovado pela
          clínica.)</em>
        </p>
        <p>
          A Prisma Odontologia atende em Imperatriz – MA, na Rua Pernambuco,
          nº 366, esquina com a Rua Fortunato Bandeira, no bairro Nova
          Imperatriz.
        </p>
        <p>
          A clínica reúne diferentes áreas da Odontologia em um só lugar —
          Implantodontia e Reabilitação Oral, Prótese, Endodontia, Ortodontia,
          Odontopediatria e cuidados preventivos — com atendimento planejado
          caso a caso e foco na experiência de cada paciente.
        </p>
      </Dialog>
    </section>
  );
}
