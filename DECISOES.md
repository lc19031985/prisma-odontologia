# Decisões — Prisma Odontologia

Registro dos conflitos design × prompt e das decisões tomadas, conforme a
seção 2 do prompt.

## Tipografia

- **Cocomat Pro não está disponível/licenciada** (referencias/fontes/ vazia).
  Substituída por **Cormorant Garamond 500–600** (Google Fonts), a serifada de
  alto contraste mais próxima do design. Troca reversível em
  `src/app/layout.tsx`.
- Manuscrita: **Allura**. Texto corrido: **Raleway** — ambas conforme sugestão
  do prompt.

## Cores

- **Dourado `#C8AE84`**: usado o ponto de partida sugerido no prompt; o design
  JPEG comprimido não permite extração mais fiel. Ajustar quando a logomarca
  vetorial chegar.
- **Marsala escuro `#7A4143`** (hover/texto sobre bege) e **marsala profundo
  `#5F3234`** (títulos grandes): derivados do marsala `#9C5A5C` para garantir
  contraste AA sobre bege/branco.

## Divergências design × prompt já decididas no prompt (aplicadas)

- Faixa de novidades: 3 chamadas lado a lado no desktop; uma por vez com
  rotação de 7 s no tablet/celular, com pausa visível.
- Textos decorativos mantidos e ocultos de leitores de tela.
- Ano do rodapé dinâmico (componente `CurrentYear`, atualiza no navegador).
- Mapa ilustrativo substituído por embed real do Google Maps.
- Legendas das especialidades reescritas sem promessa de resultado:
  - "Soluções previsíveis" → "Recursos modernos a serviço do seu cuidado"
    (diferencial "Tecnologia e planejamento").
  - "Tratamentos precisos para salvar o seu sorriso" → "Cuidado com a parte
    interna do dente" (Endodontia).
  - "Soluções personalizadas com tecnologia de ponta" → "Próteses planejadas
    com apoio de recursos digitais" (evita superlativo "de ponta").
  - "Saúde bucal para um futuro mais saudável" → "Acompanhamento regular da
    saúde bucal".

## Logomarca oficial (recebida em 2026-09 via PDF de identidade visual)

- Fonte: `PRISMA_material_grafico.pdf` (ArthDesignn, Identidade Visual 2025),
  página "Logo Principal – Opção 1". Cópia em `referencias/logo/`.
- **Método de extração, sem redesenho**: a página foi renderizada em alta
  resolução (pdfjs + canvas, `scripts/extract-logo.mjs`) e o traço original
  foi separado do fundo bege por decomposição de cor (alfa proporcional à
  distância bege→marsala), preservando o anti-aliasing do desenho original.
  Nenhum vetor foi redesenhado e nenhuma cor foi alterada.
- Arquivos gerados: `public/img/logo-completa.png` (lockup vertical oficial),
  `logo-emblema.png` e `logo-wordmark.png` (recortes do mesmo arquivo).
- **Arranjo horizontal no cabeçalho/rodapé**: o design aprovado mostra a
  logomarca em arranjo horizontal (emblema à esquerda do wordmark). Como o PDF
  traz apenas o lockup vertical, o site posiciona os dois recortes oficiais
  lado a lado via CSS — sem alterar o desenho. Quando a variante horizontal
  oficial for fornecida, basta substituir os arquivos.
- **Favicon** (`src/app/icon.png`): recorte do emblema oficial, sem redesenho.
- O manual confirma a paleta já usada no site (`#F3EBE7`, `#C0988E`,
  `#9C5A5C`) e a tipografia Cocomat Pro (títulos) + Raleway (textos). Os
  arquivos da Cocomat Pro seguem indisponíveis → substituta Cormorant
  Garamond mantida (os títulos do design aprovado são serifados).

## Decisões próprias desta implementação

- **Áreas da equipe como "Atuação em ..."** enquanto o registro de especialista
  de cada profissional não for confirmado no CRO (prompt, seção 16). Com a
  confirmação, trocar em `src/content/team.ts`.
- **Controles da faixa de novidades no desktop**: com as três chamadas sempre
  visíveis, os pontos indicam a chamada em destaque e a seta avança o destaque
  (no celular/tablet eles controlam a rotação de fato). O botão pausar/retomar
  existe em todas as larguras, como exige o prompt.
- **Banco semanal provisório com 4 conjuntos** (Fase 3). Enquanto houver menos
  de 52, a seleção usa `semana % conjuntos disponíveis` para nunca quebrar.
  Fase 4 completa os 52.
- **Texto vertical decorativo do hero** ("Saúde • Estética • ...") oculto
  abaixo de 1320 px — sem espaço lateral livre ele colidiria com o conteúdo
  (simplificação prevista na seção 8 do prompt).
- **Ordem estrutura/mapa no celular**: a coluna de informações vem antes do
  mapa (ordem de leitura mais útil; no desktop segue o design: mapa à
  esquerda).
- **JSON-LD**: emitido só com dados reais (nome, endereço, telefone, horários,
  Instagram). `url`, `geo`, `logo` e `image` ficam de fora até existirem.

## Decisões da verificação (Fase 5, 22/09/2026)

- **Contraste AA em todos os textos** (exigência do prompt, seção 17): o
  cinza secundário foi escurecido (`#857770` → `#6F625C`) e os textos
  decorativos ("Sorrisos que acompanham...", textos verticais, separadores)
  passaram de rosé para **marsala** — o rosé `#C0988E` sobre bege não atinge
  AA e fica reservado a elementos gráficos (fios, ícones, bordas). O rótulo
  "NOVIDADES" ganhou fundo escurecido e os botões pendentes trocaram a
  opacidade por fundo bege com borda tracejada.
- **Mapa sob demanda (`MapEmbed`)**: o `loading="lazy"` nativo não impede o
  Chrome de carregar o iframe do Maps cedo (~1s de scripts de terceiros na
  thread principal — Performance 60 no Lighthouse). O iframe agora entra via
  IntersectionObserver quando o visitante chega a 600px da seção, com botão
  "Mostrar o mapa" como alternativa. Performance foi a 93 e os cookies do
  Google só entram para quem chega ao mapa (alinhado à política de cookies).
- **Apontamento axe aceito**: `region` (moderate) — o botão flutuante de
  WhatsApp fica fora de landmarks, comportamento padrão desse tipo de botão.
