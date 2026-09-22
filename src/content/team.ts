/**
 * Dados da equipe.
 * Enquanto o registro de especialista de cada profissional não for confirmado
 * no CRO, a área é exibida como "Atuação em ..." (conformidade CFO — seção 16
 * do prompt; ver DECISOES.md e PENDENCIAS.md).
 */
export type TeamMember = {
  id: string;
  name: string;
  /** Área exibida no cartão. */
  area: string;
  cro: string;
  bio: string;
  photo: string | null; // caminho em public/img quando a foto existir
};

export const team: TeamMember[] = [
  {
    id: "priscilla-mayara",
    name: "Dra. Priscilla Mayara",
    area: "Atuação em Implantodontia e Reabilitação Oral",
    cro: "CRO-MA 3334",
    bio: "[PENDENTE: minicurrículo aprovado da Dra. Priscilla Mayara]",
    photo: null,
  },
  {
    id: "maine-sarmento",
    name: "Dra. Maine Sarmento",
    area: "Atuação em Endodontia",
    cro: "[PENDENTE: CRO da Dra. Maine Sarmento]",
    bio: "[PENDENTE: minicurrículo aprovado da Dra. Maine Sarmento]",
    photo: null,
  },
  {
    id: "anna-karoline",
    name: "Dra. Anna Karoline",
    area: "Atuação em Ortodontia",
    cro: "[PENDENTE: CRO da Dra. Anna Karoline]",
    bio: "[PENDENTE: minicurrículo aprovado da Dra. Anna Karoline]",
    photo: null,
  },
  {
    id: "carla-victoria",
    name: "Dra. Carla Victória",
    area: "Atuação em Odontopediatria",
    cro: "[PENDENTE: CRO da Dra. Carla Victória]",
    bio: "[PENDENTE: minicurrículo aprovado da Dra. Carla Victória]",
    photo: null,
  },
];
