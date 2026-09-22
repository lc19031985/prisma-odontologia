# Plano — Prisma Odontologia (Fase 1, registrado)

Análise do design aprovado (`referencias/design-aprovado.jpeg`) e decomposição
usada na implementação. As Fases 2–3 já foram executadas a partir deste plano;
ele fica registrado para consulta.

## Decomposição do layout em componentes

| Seção do design | Componente | Observações |
|---|---|---|
| Cabeçalho fino fixo | `Header` | logo à esquerda, 5 âncoras, botão marsala, menu móvel acessível |
| Hero com oval orgânico | `Hero` | rótulo, H1, texto, 2 botões, linha de especialidades, foto com fio dourado, decorativos aria-hidden |
| Faixa marsala de novidades | `NewsTicker` | 3 chamadas (desktop) / rotação 7s (mobile), pausa visível, `<dialog>` por chamada, semana ISO no navegador |
| "Uma experiência integrada de cuidado" | `About` | 3 diferenciais com ícone de linha, foto da recepção, diálogo institucional |
| Grade de especialidades 3×2 | `Specialties` + `SpecialtyIcon` | cartões compactos, ícones cerâmica em SVG, `<dialog>` com "Agendar avaliação" |
| Faixa marsala da equipe | `Team` | 4 cartões de foto, diálogos com CRO/minicurrículo |
| Faixa de avaliação | `GoogleReview` | balão, 5 estrelas decorativas, G oficial, botão pendente até haver link |
| Mapa + estrutura | `Location` | iframe Maps embed, endereço/horários do `clinic.ts`, 3 botões |
| Rodapé | `Footer` | logo, manuscrita, contatos, responsável técnica, legais, ano dinâmico |
| Flutuantes | `FloatingWhatsApp`, `BackToTop` | topo só após ~600px |
| Transversais | `Button`, `Dialog`, `Logo`, `OrganicShape` (Wave/Blob/GoldLine), `Icons`, `CookieNotice`, `CurrentYear` | |

## Tokens extraídos

Paleta: bege `#F3EBE7`, rosé `#C0988E`, marsala `#9C5A5C` (+ derivados
`#7A4143` e `#5F3234` para AA), dourado `#C8AE84` (fios/estrelas apenas),
neutros quentes `#FDFBF9`/`#5F544F`. Raios 10/18/28 px, sombras suaves,
rótulos em caixa alta com tracking 0.22em, títulos serifados com itálico
pontual, muito espaço em branco. Ondas suaves entre seções e fios dourados de
1px. Detalhe completo em `src/styles/tokens.css` e `DECISOES.md`.

## Arquivos de referência

Encontrados: `design-aprovado.jpeg`. **Ausentes:** logomarca, todas as fotos
(hero, recepção, 4 profissionais), fontes Cocomat Pro, ícones 3D — tudo em
`PENDENCIAS.md` com o placeholder correspondente no código.

## Divergências design × prompt

As cinco divergências já decididas no prompt (faixa de novidades, textos
decorativos, ano dinâmico, mapa real, legendas sem promessa) foram aplicadas;
decisões adicionais desta implementação estão em `DECISOES.md`.

## Pendências iniciais

Ver `PENDENCIAS.md` (gerável a qualquer momento com `npm run check:pendencias`).
