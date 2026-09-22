/**
 * Conteúdo das especialidades.
 * Legendas reescritas em relação ao design para evitar promessa de resultado
 * (conformidade CFO — ver DECISOES.md).
 * Textos escritos para paciente leigo: o que é, quando procurar, como costuma
 * ser o acompanhamento. Sempre terminam orientando a avaliação profissional.
 */
export type Specialty = {
  id: string;
  title: string;
  caption: string;
  icon: "implante" | "protese" | "endodontia" | "ortodontia" | "odontopediatria" | "prevencao";
  paragraphs: string[];
};

export const specialties: Specialty[] = [
  {
    id: "implantodontia",
    title: "Implantodontia e Reabilitação Oral",
    caption: "Reposição de dentes com planejamento individualizado.",
    icon: "implante",
    paragraphs: [
      "A implantodontia repõe dentes perdidos por meio de implantes: pequenos pinos de titânio fixados no osso que servem de apoio para coroas ou próteses. A reabilitação oral organiza esse processo quando há vários dentes envolvidos, devolvendo mastigação, fala e conforto.",
      "Costuma ser indicada quando falta um ou mais dentes, quando uma prótese removível incomoda ou quando a mastigação ficou difícil. Cada caso começa com exames e um planejamento individual.",
      "O acompanhamento inclui etapas de avaliação, cirurgia, cicatrização e manutenção periódica. Agende uma avaliação para entender o caminho adequado ao seu caso.",
    ],
  },
  {
    id: "protese-digital",
    title: "Prótese e Odontologia Digital",
    caption: "Próteses planejadas com apoio de recursos digitais.",
    icon: "protese",
    paragraphs: [
      "As próteses dentárias substituem dentes ausentes ou muito comprometidos — podem ser fixas, removíveis ou apoiadas sobre implantes. A odontologia digital usa recursos como escaneamento e planejamento em computador para apoiar o desenho de cada peça.",
      "Vale procurar essa área quando um dente está muito destruído, quando uma prótese antiga está desconfortável ou quando se deseja substituir dentes ausentes.",
      "O tratamento envolve avaliação, planejamento, provas e ajustes até o conforto adequado, com revisões periódicas depois. Uma avaliação profissional indica a opção mais adequada para você.",
    ],
  },
  {
    id: "endodontia",
    title: "Endodontia",
    caption: "Cuidado com a parte interna do dente.",
    icon: "endodontia",
    paragraphs: [
      "A endodontia é a área que trata a parte interna do dente — a polpa e os canais radiculares. É o conhecido tratamento de canal, indicado quando essa região é atingida por cáries profundas, traumas ou fraturas.",
      "Sinais de que uma avaliação é necessária: dor persistente, sensibilidade prolongada ao quente ou frio, escurecimento do dente ou inchaço na gengiva.",
      "O tratamento remove o tecido comprometido, limpa e preenche os canais, geralmente em uma ou poucas sessões, com anestesia local. Diante de qualquer sintoma, procure uma avaliação profissional o quanto antes.",
    ],
  },
  {
    id: "ortodontia",
    title: "Ortodontia",
    caption: "Alinhamento dos dentes e da mordida.",
    icon: "ortodontia",
    paragraphs: [
      "A ortodontia cuida da posição dos dentes e do encaixe da mordida, por meio de aparelhos fixos ou alinhadores. Além da estética, dentes alinhados facilitam a higiene e a mastigação.",
      "Pode ser procurada em qualquer idade: crianças em fase de troca de dentes, adolescentes e adultos. Apinhamento, espaços, mordida desajustada ou desconforto ao mastigar são motivos comuns de consulta.",
      "O tratamento tem consultas regulares de ajuste e, ao final, uso de contenção. A duração varia caso a caso — uma avaliação profissional define o plano ideal.",
    ],
  },
  {
    id: "odontopediatria",
    title: "Odontopediatria",
    caption: "Cuidado e confiança desde os primeiros sorrisos.",
    icon: "odontopediatria",
    paragraphs: [
      "A odontopediatria é a odontologia dedicada a bebês, crianças e adolescentes. Além de tratar, ensina hábitos de higiene e alimentação que acompanham a criança pela vida toda.",
      "A primeira consulta é recomendada ainda no primeiro ano de vida, com o nascimento dos primeiros dentes. Depois, visitas periódicas ajudam a prevenir cáries e a acompanhar o desenvolvimento da arcada.",
      "As consultas são adaptadas ao ritmo da criança, criando uma relação de confiança com o consultório. Agende uma avaliação para começar esse acompanhamento.",
    ],
  },
  {
    id: "prevencao",
    title: "Prevenção e cuidados gerais",
    caption: "Acompanhamento regular da saúde bucal.",
    icon: "prevencao",
    paragraphs: [
      "A prevenção reúne os cuidados de rotina: exame clínico, limpeza profissional, aplicação de flúor, orientação de escovação e uso do fio dental.",
      "Consultas periódicas permitem identificar cáries, alterações na gengiva e outras condições ainda no início, quando o cuidado costuma ser mais simples.",
      "A frequência ideal varia de pessoa para pessoa — em geral, a cada seis meses. Agende uma avaliação para montar a sua rotina de cuidado.",
    ],
  },
];
