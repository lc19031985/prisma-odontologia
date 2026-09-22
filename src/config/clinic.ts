/**
 * ÚNICO lugar com dados da clínica.
 * Nenhum componente pode ter telefone, endereço ou link escrito diretamente.
 * Campos no formato [PENDENTE: ...] são detectados por isPending() (src/lib/links.ts)
 * e listados por `npm run check:pendencias`.
 */
export const clinic = {
  name: "Prisma Odontologia",
  slogan: "Cuidado em cada detalhe.",
  phoneDisplay: "(99) 98263-0549",
  whatsappNumber: "5599982630549",
  whatsappMessage:
    "Olá! Vim pelo site da Prisma Odontologia e gostaria de agendar uma consulta.",
  address: {
    street: "Rua Pernambuco, nº 366",
    reference: "Esquina com a Rua Fortunato Bandeira",
    district: "Nova Imperatriz",
    city: "Imperatriz",
    state: "MA",
    zip: "65907-270",
  },
  hours: [
    { label: "Segunda a sexta", value: "8h às 18h" },
    { label: "Sábado", value: "8h às 12h" },
  ],
  instagramClinic: "prisma.odontologiaa",
  instagramProfessional: "dra.priscillamayara",
  technicalManager: { name: "Dra. Priscilla Mayara", cro: "CRO-MA 3334" },
  clinicCroRegistration: "[PENDENTE: nº de inscrição da clínica no CRO-MA]",
  google: {
    placeId: "[PENDENTE: Place ID da Prisma]",
    mapsUrl: "[PENDENTE: link do Google Maps]",
    reviewUrl: "[PENDENTE: link direto de avaliação do Google]",
  },
  // Domínio contratado em 22/09/2026 (Registro.br). Canônico: www, com
  // redirecionamento do domínio raiz — ver DEPLOY.md.
  siteUrl: "https://www.odontologiaprisma.com.br",
} as const;

export type Clinic = typeof clinic;
