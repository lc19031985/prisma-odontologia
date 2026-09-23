# Pendências — Prisma Odontologia

Tudo o que falta para o site sair do ar com dados 100% reais, agrupado por
responsável. O comando `npm run check:pendencias` lista as ocorrências de
`[PENDENTE: ...]` no código com arquivo e linha.

## Clínica (Dra. Priscilla / administração)

| Pendência | Onde entra | Criticidade |
|---|---|---|
| ~~Domínio definitivo~~ **Resolvido** — `odontologiaprisma.com.br` contratado em 22/09/2026; canônica, sitemap, Open Graph e robots.txt já configurados. Falta apenas o apontamento DNS na publicação (DEPLOY.md) | `src/config/clinic.ts` (`siteUrl`) | — |
| Place ID do Google e link do Google Maps | `src/config/clinic.ts` (`google.placeId`, `google.mapsUrl`) — melhora o mapa e a rota | Alta |
| Link direto de avaliação do Google | `src/config/clinic.ts` (`google.reviewUrl`) — hoje os botões "Avaliar no Google" aparecem como "em breve" | Alta |
| Nº de inscrição da clínica no CRO-MA | `src/config/clinic.ts` (`clinicCroRegistration`) — por decisão do cliente (22/09/2026), o rodapé NÃO exibe "em breve": a linha aparece automaticamente quando o nº for preenchido. Segue obrigatória pelo CFO — fornecer antes de divulgar o site | **Crítica para publicar** |
| CRO das Dras. Maine Sarmento, Anna Karoline e Carla Victória | `src/content/team.ts` | Alta |
| Confirmação de registro de especialista de cada profissional na área anunciada | Enquanto não confirmado, os cartões exibem "Atuação em ..." (CFO). Com a confirmação, mudar para o título da especialidade | Alta |
| Minicurrículo aprovado de cada profissional | `src/content/team.ts` (`bio`) | Média |
| Texto institucional aprovado ("Conheça mais sobre a Prisma") | `src/components/About.tsx` (diálogo) — hoje há rascunho neutro marcado como provisório | Média |
| ~~Confirmação dos recursos citados em "Na Prisma"~~ **Resolvido** — cliente confirmou em 22/09/2026 que a clínica oferece todos: planejamento digital, recursos digitais de diagnóstico, placas oclusais para bruxismo e cirurgia guiada. Flags `verificar` removidos | `src/content/weekly-content.json` | — |
| Razão social, CNPJ e e-mail do encarregado de dados (LGPD) | Páginas legais (`src/app/politica-de-privacidade/`, `src/app/termos-de-uso/`) | Alta |
| Revisão jurídica das páginas legais | Ambas estão marcadas como rascunho no código-fonte | Alta |
| Chave da Maps Embed API restrita (opcional) | `.env.local` — sem ela o site usa o embed público por endereço, que já funciona | Baixa |

## Designer

| Pendência | Onde entra |
|---|---|
| ~~Logomarca oficial~~ **Recebida** (PDF de identidade visual, 2026-09; extraída para `public/img/logo-*.png`) | Ainda bem-vindos: o arquivo vetorial editável (SVG/AI) e a variante horizontal oficial — hoje o arranjo horizontal é recomposto a partir dos recortes do arquivo oficial (ver DECISOES.md) |
| ~~Foto principal do hero~~ **Recebida e aplicada** (22/09/2026) — sala de espera; original com moldura decorativa em `referencias/fotos/originais/`, corte limpo em `referencias/fotos/hero.webp` | `src/components/Hero.tsx` |
| ~~Foto da recepção~~ **Recebida e aplicada** (22/09/2026) — idem, `referencias/fotos/recepcao.webp` | `src/components/About.tsx` |
| Fotos das 4 profissionais (`dra-priscilla.jpg`, `dra-maine.jpg`, `dra-anna.jpg`, `dra-carla.jpg`) | `referencias/fotos/` → `src/components/Team.tsx` |
| Ícones 3D definitivos das especialidades (cerâmica marfim, contorno champanhe) | `referencias/icones/` → substituem os SVGs provisórios de `src/components/SpecialtyIcon.tsx` |
| Arquivos da fonte Cocomat Pro (.woff2) com licença — o manual de identidade a confirma como fonte de títulos, mas os arquivos não vieram | `referencias/fontes/` → `src/app/layout.tsx` (hoje: Cormorant Garamond) |
| ~~Favicon~~ **Resolvido** — derivado do emblema oficial, sem redesenho (`src/app/icon.png`) | — |
| ~~Imagem Open Graph~~ **Resolvida** — gerada da foto do hero (`public/img/og.jpg`, 1200×630) | `src/app/layout.tsx` |

## Desenvolvedor (fases seguintes, após aprovação do design)

| Pendência | Referência |
|---|---|
| ~~Banco completo de 52 conjuntos semanais~~ **Concluído** (Fase 4) | `src/content/weekly-content.json` |
| ~~Verificação Playwright completa~~ **Concluída** (Fase 5) — resultados em `TESTES.md` | `scripts/verify.mjs` |
| ~~`sitemap.xml` e URL canônica~~ **Concluído** — gerados no build com o domínio real | `src/app/sitemap.ts` |
| Deploy e apontamento DNS (domínio já contratado: `odontologiaprisma.com.br`) | `DEPLOY.md` |

## Testes manuais após publicação (não podem ser feitos antes)

- Abrir o WhatsApp num celular real pelo botão do site.
- Testar o link de avaliação com o Place ID real.
- Testar o mapa com a chave restrita ao domínio.
