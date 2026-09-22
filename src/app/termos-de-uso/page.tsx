/*
 * RASCUNHO PARA REVISÃO JURÍDICA — não publicar como definitivo sem a
 * validação de profissional habilitado. Pendências: razão social e CNPJ
 * (ver PENDENCIAS.md).
 */
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { clinic } from "@/config/clinic";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "Termos de Uso | Prisma Odontologia",
  description: "Condições de uso do site da Prisma Odontologia.",
  alternates: { canonical: "/termos-de-uso/" },
};

export default function TermosDeUso() {
  return (
    <>
      <Header />
      <main id="conteudo" className={`container ${styles.page}`}>
        <h1>Termos de Uso</h1>
        <p className={styles.updated}>Versão para revisão — Prisma Odontologia</p>

        <h2>Finalidade do site</h2>
        <p>
          Este site apresenta a {clinic.name}, suas áreas de atuação, equipe,
          estrutura e canais de contato. O conteúdo tem caráter informativo e
          educativo, voltado ao público geral.
        </p>

        <h2>O conteúdo não substitui consulta</h2>
        <p>
          As informações publicadas aqui não constituem diagnóstico,
          orientação individual nem promessa de resultado. Cada caso é único e
          deve ser avaliado por profissional habilitado em consulta.
        </p>

        <h2>Agendamentos</h2>
        <p>
          O agendamento de consultas é feito pelo WhatsApp da clínica. O envio
          de mensagem não caracteriza atendimento de urgência; em situações de
          emergência, procure um serviço de urgência.
        </p>

        <h2>Propriedade intelectual</h2>
        <p>
          Os textos, a identidade visual e a marca {clinic.name} pertencem à
          clínica e não podem ser reproduzidos sem autorização.
          {/* [PENDENTE: razão social e CNPJ do titular da marca] */}
        </p>

        <h2>Links externos</h2>
        <p>
          O site contém links para serviços de terceiros (WhatsApp, Google
          Maps, Google Avaliações e Instagram). A clínica não controla esses
          serviços e não se responsabiliza por seus conteúdos ou políticas.
        </p>

        <h2>Responsabilidade técnica</h2>
        <p>
          Responsável técnica: {clinic.technicalManager.name} —{" "}
          {clinic.technicalManager.cro}.
        </p>

        <a className={styles.back} href="/">
          ← Voltar para a página inicial
        </a>
      </main>
      <Footer />
    </>
  );
}
