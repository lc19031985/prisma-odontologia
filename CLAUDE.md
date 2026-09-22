# Prisma Odontologia — regras do projeto

Site institucional da Prisma Odontologia (Imperatriz – MA). Público: paciente
leigo. Referência visual obrigatória: `referencias/design-aprovado.jpeg`.
Referência de conteúdo/comportamento: `../prompt-claude-code-prisma.md`.

## Regras invioláveis

1. **Não inventar** links, credenciais, telefones, avaliações, depoimentos,
   fotos, registros profissionais, equipamentos ou serviços. O que faltar vira
   `[PENDENTE: descrição]` e entra em `PENDENCIAS.md`.
2. **Não redesenhar, recolorir nem recriar a logomarca oficial.** A logomarca
   foi extraída do PDF de identidade (`referencias/logo/`) para
   `public/img/logo-*.png` sem alterações (método em DECISOES.md);
   `src/components/Logo.tsx` monta o arranjo horizontal com os recortes
   oficiais. Favicon: `src/app/icon.png` (emblema oficial).
3. Não copiar conteúdo da internet; textos educativos próprios, linguagem
   simples, sem promessa de resultado, preço, promoção ou comparação
   (conformidade CFO). Toda explicação termina orientando avaliação
   profissional.
4. Sem bibliotecas de carrossel/animação/UI. CSS e React nativos.
   Diálogos com `<dialog>` nativo.
5. Nada de pop-up invasivo, som, vídeo automático ou rolagem horizontal.
6. Dados da clínica SOMENTE em `src/config/clinic.ts`; links montados em
   `src/lib/links.ts`.

## Paleta (src/styles/tokens.css)

| Token | Valor | Uso |
|---|---|---|
| `--bege` | `#F3EBE7` | fundos, faixas claras |
| `--rose` | `#C0988E` | detalhes, ícones, fios secundários |
| `--marsala` | `#9C5A5C` | botão principal, faixa da equipe |
| `--marsala-escuro` | `#7A4143` | hover, texto sobre bege (AA) |
| `--marsala-profundo` | `#5F3234` | títulos grandes |
| `--dourado` | `#C8AE84` | SÓ fios finos, estrelas, contornos discretos |

Neutros quentes: `--branco-quente #FDFBF9`, `--cinza-quente #5F544F`.
Sem azul/verde predominante, sem excesso de dourado, sem aparência hospitalar.

## Tipografia

- Títulos: **Cormorant Garamond** 500–600 (substituta da Cocomat Pro, que não
  está licenciada — ver DECISOES.md). Se a clínica licenciar a Cocomat Pro,
  colocar os .woff2 em `referencias/fontes/` e trocar em `src/app/layout.tsx`.
- Texto: **Raleway**. Manuscrita decorativa: **Allura** (muita moderação).
- Rótulos: caixa alta, `letter-spacing: 0.22em`, marsala/rosé.

## Estrutura

- `src/app/` — layout, página única + `/politica-de-privacidade` e
  `/termos-de-uso` (rascunhos jurídicos).
- `src/components/` — Header, Hero, NewsTicker, About, Specialties, Team,
  GoogleReview, Location, Footer, FloatingWhatsApp, BackToTop, Dialog, Button,
  Logo, OrganicShape (Wave/Blob/GoldLine), SpecialtyIcon, Icons, CookieNotice,
  CurrentYear. CSS Modules por componente.
- `src/content/` — `weekly-content.json` (conjuntos semanais), `specialties.ts`,
  `team.ts`.
- `src/lib/week.ts` — semana ISO no navegador (site estático). Testes em
  `tests/week.test.mjs` (`npm test`).
- `scripts/optimize-images.mjs` (`npm run images`) e
  `scripts/check-pendencias.mjs` (`npm run check:pendencias`).

## Comandos

- `npm run dev` — desenvolvimento (porta 3000)
- `npm run build` — exportação estática em `out/`
- `npm run build:prod` — falha com pendência crítica (use `ALLOW_PENDING=1` para liberar)
- `npm test` — testes de `week.ts`

## Estado das fases (prompt, seção 20)

- Fases 1–5: **concluídas** (design aprovado pelo cliente em 22/09/2026).
  52 conjuntos semanais escritos; verificação completa passando — 26/26
  checagens Playwright/axe (`npm run verify`) e Lighthouse mobile 93/97/100/100
  (`npm run lighthouse`, com `npm run serve:out` ativo). Resultados em
  TESTES.md.
- Fase 6 (publicação): aguarda o domínio (cliente vai contratar) e os dados
  críticos de PENDENCIAS.md (nº CRO da clínica, confirmação dos recursos
  citados em "Na Prisma"). `out/` está pronto para deploy — ver DEPLOY.md.
- Regra de contraste: o rosé `#C0988E` NÃO atinge AA sobre bege — usar só em
  elementos gráficos, nunca como cor de texto (ver DECISOES.md).
