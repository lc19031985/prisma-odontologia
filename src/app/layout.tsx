import type { Metadata } from "next";
import { Cormorant_Garamond, Raleway, Allura } from "next/font/google";
import { clinic } from "@/config/clinic";
import { instagramLink } from "@/lib/links";
import "@/styles/globals.css";

/*
 * Fontes: Cocomat Pro não está licenciada/disponível em referencias/fontes/,
 * então os títulos usam Cormorant Garamond (substituição registrada em
 * DECISOES.md). Raleway para textos; Allura para as frases manuscritas.
 */
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-cormorant",
});

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-raleway",
});

const allura = Allura({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-allura",
});

export const metadata: Metadata = {
  metadataBase: new URL(clinic.siteUrl),
  title: "Prisma Odontologia | Cuidado e tecnologia em Imperatriz",
  description:
    "Odontologia integrada, tecnologia e atendimento humano em Imperatriz. Implantodontia, Reabilitação Oral, Endodontia, Ortodontia e Odontopediatria.",
  alternates: { canonical: "/" },
  // Imagem Open Graph ainda pendente (depende da foto do hero) — PENDENCIAS.md.
  openGraph: {
    title: "Prisma Odontologia | Cuidado e tecnologia em Imperatriz",
    description:
      "Odontologia integrada, tecnologia e atendimento humano em Imperatriz.",
    url: "/",
    type: "website",
    locale: "pt_BR",
    siteName: clinic.name,
  },
  twitter: {
    card: "summary",
    title: "Prisma Odontologia | Cuidado e tecnologia em Imperatriz",
    description:
      "Odontologia integrada, tecnologia e atendimento humano em Imperatriz.",
  },
};

/** JSON-LD Dentist — somente dados reais (coordenadas e logo pendentes). */
function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: clinic.name,
    url: clinic.siteUrl,
    telephone: `+${clinic.whatsappNumber}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: clinic.address.street,
      addressLocality: clinic.address.city,
      addressRegion: clinic.address.state,
      postalCode: clinic.address.zip,
      addressCountry: "BR",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:00",
        closes: "12:00",
      },
    ],
    sameAs: [
      instagramLink(clinic.instagramClinic),
      instagramLink(clinic.instagramProfessional),
    ],
  };
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${cormorant.variable} ${raleway.variable} ${allura.variable}`}
    >
      <body>
        <a href="#conteudo" className="skip-link">
          Pular para o conteúdo
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
        />
      </body>
    </html>
  );
}
