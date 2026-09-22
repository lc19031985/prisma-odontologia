/*
 * RASCUNHO PARA REVISÃO JURÍDICA — não publicar como definitivo sem a
 * validação de profissional habilitado. Pendências: razão social, CNPJ e
 * e-mail do encarregado de dados (ver PENDENCIAS.md).
 */
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { clinic } from "@/config/clinic";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "Política de Privacidade | Prisma Odontologia",
  description:
    "Como o site da Prisma Odontologia trata informações de navegação, cookies e redirecionamentos.",
  alternates: { canonical: "/politica-de-privacidade/" },
};

export default function PoliticaDePrivacidade() {
  return (
    <>
      <Header />
      <main id="conteudo" className={`container ${styles.page}`}>
        <h1>Política de Privacidade</h1>
        <p className={styles.updated}>Versão para revisão — Prisma Odontologia</p>

        <p>
          Esta política explica como o site da {clinic.name} trata informações
          durante a sua navegação. A clínica está localizada na{" "}
          {clinic.address.street}, bairro {clinic.address.district},{" "}
          {clinic.address.city} – {clinic.address.state}.
        </p>

        <h2>O que este site coleta</h2>
        <p>
          Este site é informativo e <strong>não possui formulários de coleta de
          dados pessoais</strong>. Você navega sem precisar informar nome,
          e-mail, telefone ou qualquer outro dado.
        </p>

        <h2>Redirecionamentos para WhatsApp e Google</h2>
        <p>
          Os botões de agendamento abrem uma conversa no WhatsApp, e os botões
          de rota e avaliação abrem serviços do Google. Ao usar esses serviços,
          passam a valer as políticas de privacidade das respectivas empresas
          (Meta e Google). As mensagens que você enviar pelo WhatsApp são
          tratadas diretamente entre você e a clínica.
        </p>

        <h2 id="cookies">Cookies e mapa incorporado</h2>
        <p>
          A página exibe um mapa incorporado do Google Maps, que pode definir
          cookies de terceiros ao ser carregado. Esses cookies são controlados
          pelo Google, conforme a política de privacidade do Google. O próprio
          site guarda apenas uma preferência local no seu navegador
          (localStorage) para lembrar que você viu o aviso de cookies — essa
          informação não é enviada a nenhum servidor.
        </p>

        <h2>Ferramentas de estatística</h2>
        <p>
          Atualmente o site não utiliza ferramentas de estatística de acesso
          nem pixels de publicidade. Se isso mudar no futuro, esta política
          será atualizada antes da ativação.
        </p>

        <h2>Seus direitos (LGPD)</h2>
        <p>
          Nos termos da Lei Geral de Proteção de Dados (Lei nº 13.709/2018),
          você pode solicitar informações sobre o tratamento de dados
          eventualmente realizados pela clínica em seus atendimentos. Contato
          para assuntos de privacidade: em breve.
          {/* [PENDENTE: razão social, CNPJ e e-mail do encarregado de dados] */}
        </p>

        <a className={styles.back} href="/">
          ← Voltar para a página inicial
        </a>
      </main>
      <Footer />
    </>
  );
}
