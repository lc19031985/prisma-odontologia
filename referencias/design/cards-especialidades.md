# Prompt para o Claude Code — Cards de Especialidades

Implemente, na página de especialidades do site da clínica, uma grade de 6 cards horizontais idênticos em estrutura (só mudam ícone, título e descrição). Use exatamente o HTML/CSS/SVG abaixo, adaptando apenas à estrutura de componentes do projeto (React, Vue, templates etc.). Não altere cores, proporções, tipografia nem os ícones.

## Especificação
- Grade: `grid-template-columns: repeat(auto-fit, minmax(min(100%, 380px), 1fr))`, `gap: 24px`, `max-width: 1400px`, centralizada → 3 × 2 no desktop, 1 coluna no mobile.
- Card: `aspect-ratio: 3.4/1`, fundo `#FBF8F5`, borda 1px `#E8DAC9`, `border-radius: 18px`, sem sombra. Hover: borda `#DCC7AE` + sombra `0 6px 24px -12px rgba(132,90,50,.18)`, transição .3s.
- O card é um container (`container-type: inline-size`); todas as medidas internas em `cqw` para escalar proporcionalmente.
- Layout interno: grid `15cqw | 1fr | 8.5cqw`, `column-gap: 3.5cqw`, `padding: 0 4.5cqw`, tudo centralizado verticalmente.
- Título: Cormorant Garamond 600, `3.9cqw`, line-height 1.2, cor `#843B3B`, **`white-space: nowrap`** (obrigatório: "Implantodontia e Reabilitação Oral" em uma linha).
- Descrição: Raleway 400, `3cqw`, line-height 1.45, cor `#827972`, `margin-top: 1.2cqw`.
- Botão: círculo `8.5cqw`, borda 1px `#EAD6CD`, fundo transparente, chevron-right (Lucide) `3.6cqw`, stroke `#843B3B` 1.5.
- Fontes: `https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=Raleway:wght@400&display=swap`
- Cada card é um link (`<a>`) para a página da especialidade; adicione `:focus-visible { outline: 2px solid #843B3B; outline-offset: 2px; }`.
- Ícones: SVG com gradientes de porcelana/dourado acetinado. Os `<defs>` compartilhados devem ser inseridos **uma única vez** na página (os ícones referenciam os ids `pc`, `pcShade`, `gd`, `gdV`, `rose`, `blur3`, `blur1`, `lift`). Se houver risco de conflito de ids, prefixe-os (ex.: `dc-pc`) em defs e ícones.

## CSS
```css
.spec-grid{max-width:1400px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,380px),1fr));gap:24px}
.spec-card{container-type:inline-size;display:block;aspect-ratio:3.4/1;background:#FBF8F5;border:1px solid #E8DAC9;border-radius:18px;text-decoration:none;transition:border-color .3s,box-shadow .3s}
.spec-card:hover{border-color:#DCC7AE;box-shadow:0 6px 24px -12px rgba(132,90,50,.18)}
.spec-card:focus-visible{outline:2px solid #843B3B;outline-offset:2px}
.spec-card__inner{height:100%;display:grid;grid-template-columns:15cqw minmax(0,1fr) 8.5cqw;column-gap:3.5cqw;align-items:center;padding:0 4.5cqw;box-sizing:border-box}
.spec-icon__svg{width:15cqw;height:15cqw;overflow:visible}
.spec-card__title{font-family:'Cormorant Garamond',serif;font-weight:600;font-size:3.9cqw;line-height:1.2;color:#843B3B;white-space:nowrap}
.spec-card__desc{font-family:'Raleway',sans-serif;font-weight:400;font-size:3cqw;line-height:1.45;color:#827972;margin-top:1.2cqw;text-wrap:pretty}
.spec-card__btn{width:8.5cqw;height:8.5cqw;border-radius:50%;border:1px solid #EAD6CD;display:flex;align-items:center;justify-content:center;box-sizing:border-box;transition:background .3s}
.spec-card:hover .spec-card__btn{background:rgba(132,59,59,.04)}
.spec-card__btn svg{width:3.6cqw;height:3.6cqw}
```

## Estrutura de um card
```html
<a class="spec-card" href="/especialidades/SLUG">
  <div class="spec-card__inner">
    <!-- ÍCONE SVG -->
    <div>
      <div class="spec-card__title">TÍTULO</div>
      <div class="spec-card__desc">DESCRIÇÃO</div>
    </div>
    <div class="spec-card__btn" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="#843B3B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
    </div>
  </div>
</a>
```

## Defs compartilhados (inserir uma vez)
```html
<svg width="0" height="0" style="position:absolute;" aria-hidden="true">
  <defs>
    <radialGradient id="pc" cx="0.38" cy="0.3" r="0.78">
      <stop offset="0" stop-color="#FFFDF9"></stop>
      <stop offset="0.45" stop-color="#F7EFE3"></stop>
      <stop offset="0.8" stop-color="#E8D9C3"></stop>
      <stop offset="1" stop-color="#D3BD9D"></stop>
    </radialGradient>
    <linearGradient id="pcShade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0.55" stop-color="#C4A67F" stop-opacity="0"></stop>
      <stop offset="1" stop-color="#B8976C" stop-opacity="0.35"></stop>
    </linearGradient>
    <linearGradient id="gd" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#B38F5B"></stop>
      <stop offset="0.28" stop-color="#E7D3AC"></stop>
      <stop offset="0.5" stop-color="#F6EAD0"></stop>
      <stop offset="0.72" stop-color="#D1B17D"></stop>
      <stop offset="1" stop-color="#A8854F"></stop>
    </linearGradient>
    <linearGradient id="gdV" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#F3E5C6"></stop>
      <stop offset="0.5" stop-color="#D0B07C"></stop>
      <stop offset="1" stop-color="#AE8B57"></stop>
    </linearGradient>
    <radialGradient id="rose" cx="0.5" cy="0.45" r="0.6">
      <stop offset="0" stop-color="#E3B9A8" stop-opacity="0.8"></stop>
      <stop offset="1" stop-color="#E9CDBE" stop-opacity="0"></stop>
    </radialGradient>
    <filter id="blur3" x="-50%" y="-200%" width="200%" height="500%"><feGaussianBlur stdDeviation="3"></feGaussianBlur></filter>
    <filter id="blur1" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="1.4"></feGaussianBlur></filter>
    <filter id="lift" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="1.6" stdDeviation="1.6" flood-color="#7A5A3A" flood-opacity="0.2"></feDropShadow></filter>
  </defs>
</svg>
```

## Conteúdo e ícones

### 1. Implantodontia e Reabilitação Oral
- Descrição: Reposição de dentes com planejamento individualizado.

```html
<svg viewBox="0 0 100 100" class="spec-icon__svg">
        <ellipse cx="50" cy="92" rx="16" ry="3" fill="#9C7B55" opacity="0.25" filter="url(#blur3)"></ellipse>
        <g filter="url(#lift)">
          <path d="M40,47 L60,47 L58,80 Q54,89 50,89 Q46,89 42,80 Z" fill="url(#gd)"></path>
          <path d="M40.4,54.5 L59.6,51.5 M40.7,60.5 L59.3,57.5 M41.1,66.5 L58.9,63.5 M41.5,72.5 L58.5,69.5 M41.8,78.5 L58.2,75.5" stroke="#9A7746" stroke-width="1.4" stroke-linecap="round" opacity="0.7" fill="none"></path>
          <path d="M40.6,55.8 L59.4,52.8 M40.9,61.8 L59.1,58.8 M41.3,67.8 L58.7,64.8 M41.7,73.8 L58.3,70.8" stroke="#F7ECD5" stroke-width="0.8" stroke-linecap="round" opacity="0.8" fill="none"></path>
          <rect x="41" y="40" width="18" height="8" rx="2" fill="url(#gd)"></rect>
          <path d="M34,13 C27,13 24,19 25,27 C26,35 30,40 36,41 L64,41 C70,40 74,35 75,27 C76,19 73,13 66,13 C60,13 56,17 50,17 C44,17 40,13 34,13 Z" fill="url(#pc)" stroke="#C9B08C" stroke-opacity="0.45" stroke-width="0.7"></path>
          <path d="M34,13 C27,13 24,19 25,27 C26,35 30,40 36,41 L64,41 C70,40 74,35 75,27 C76,19 73,13 66,13 C60,13 56,17 50,17 C44,17 40,13 34,13 Z" fill="url(#pcShade)"></path>
        </g>
        <ellipse cx="35" cy="23" rx="4" ry="6" transform="rotate(-25 35 23)" fill="#fff" opacity="0.85" filter="url(#blur1)"></ellipse>
      </svg>
```

### 2. Prótese e Odontologia Digital
- Descrição: Próteses planejadas com apoio de recursos digitais.

```html
<svg viewBox="0 0 100 100" class="spec-icon__svg">
        <ellipse cx="50" cy="84" rx="26" ry="3.5" fill="#9C7B55" opacity="0.22" filter="url(#blur3)"></ellipse>
        <path d="M10,46 A40,11 0 0 1 90,46" transform="rotate(-12 50 46)" fill="none" stroke="#C8A874" stroke-width="1" opacity="0.55"></path>
        <g filter="url(#lift)">
          <ellipse cx="50" cy="72" rx="26" ry="5.5" fill="url(#gd)"></ellipse>
          <ellipse cx="50" cy="70.6" rx="24" ry="4.2" fill="#F1E3C6" opacity="0.7"></ellipse>
          <path d="M30,24 C22,24 19,32 20,42 C21,54 26,64 34,67 L66,67 C74,64 79,54 80,42 C81,32 78,24 70,24 C62,24 58,29 50,29 C42,29 38,24 30,24 Z" fill="url(#pc)" stroke="#C9B08C" stroke-opacity="0.45" stroke-width="0.7"></path>
          <path d="M30,24 C22,24 19,32 20,42 C21,54 26,64 34,67 L66,67 C74,64 79,54 80,42 C81,32 78,24 70,24 C62,24 58,29 50,29 C42,29 38,24 30,24 Z" fill="url(#pcShade)"></path>
          <path d="M36,31 C41,34 45,36 50,36 C55,36 59,34 64,31" fill="none" stroke="#D6C2A2" stroke-width="0.9" opacity="0.6"></path>
        </g>
        <ellipse cx="31" cy="36" rx="4.5" ry="8" transform="rotate(-20 31 36)" fill="#fff" opacity="0.85" filter="url(#blur1)"></ellipse>
        <path d="M10,46 A40,11 0 0 0 90,46" transform="rotate(-12 50 46)" fill="none" stroke="url(#gd)" stroke-width="1.3"></path>
        <circle cx="52.3" cy="56.8" r="2" fill="url(#gd)" stroke="#A8854F" stroke-width="0.4"></circle>
        <circle cx="51.8" cy="56.2" r="0.7" fill="#fff" opacity="0.9"></circle>
      </svg>
```

### 3. Endodontia
- Descrição: Cuidado com a parte interna do dente.

```html
<svg viewBox="0 0 100 100" class="spec-icon__svg">
        <ellipse cx="50" cy="91" rx="24" ry="3" fill="#9C7B55" opacity="0.22" filter="url(#blur3)"></ellipse>
        <g filter="url(#lift)">
          <path d="M30,20 C22,20 18,28 19,38 C20,48 24,56 27,66 C29,74 30,86 35,86 C40,86 40,72 43,64 C45,60 47,58 50,58 C53,58 55,60 57,64 C60,72 60,86 65,86 C70,86 71,74 73,66 C76,56 80,48 81,38 C82,28 78,20 70,20 C62,20 58,25 50,25 C42,25 38,20 30,20 Z" fill="url(#pc)" stroke="#C9B08C" stroke-opacity="0.45" stroke-width="0.7"></path>
          <path d="M30,20 C22,20 18,28 19,38 C20,48 24,56 27,66 C29,74 30,86 35,86 C40,86 40,72 43,64 C45,60 47,58 50,58 C53,58 55,60 57,64 C60,72 60,86 65,86 C70,86 71,74 73,66 C76,56 80,48 81,38 C82,28 78,20 70,20 C62,20 58,25 50,25 C42,25 38,20 30,20 Z" fill="url(#pcShade)"></path>
        </g>
        <path d="M38,38 C38,32 43,31 50,33 C57,31 62,32 62,38 C62,45 57,50 50,50 C43,50 38,45 38,38 Z" fill="url(#rose)"></path>
        <path d="M44,45 C41,57 37,69 35.5,80 M56,45 C59,57 63,69 64.5,80" fill="none" stroke="#C6A26B" stroke-width="1.6" stroke-linecap="round" opacity="0.85"></path>
        <path d="M44.6,45 C41.8,56 38.4,67 36.6,77 M56.6,45 C59.6,56 62.6,66 63.8,75" fill="none" stroke="#F6EAD2" stroke-width="0.5" stroke-linecap="round" opacity="0.9"></path>
        <ellipse cx="30" cy="32" rx="4.5" ry="8" transform="rotate(-20 30 32)" fill="#fff" opacity="0.85" filter="url(#blur1)"></ellipse>
      </svg>
```

### 4. Ortodontia
- Descrição: Alinhamento dos dentes e da mordida.

```html
<svg viewBox="0 0 100 100" class="spec-icon__svg">
        <ellipse cx="50" cy="91" rx="24" ry="3" fill="#9C7B55" opacity="0.22" filter="url(#blur3)"></ellipse>
        <g filter="url(#lift)">
          <path d="M30,20 C22,20 18,28 19,38 C20,48 24,56 27,66 C29,74 30,86 35,86 C40,86 40,72 43,64 C45,60 47,58 50,58 C53,58 55,60 57,64 C60,72 60,86 65,86 C70,86 71,74 73,66 C76,56 80,48 81,38 C82,28 78,20 70,20 C62,20 58,25 50,25 C42,25 38,20 30,20 Z" fill="url(#pc)" stroke="#C9B08C" stroke-opacity="0.45" stroke-width="0.7"></path>
          <path d="M30,20 C22,20 18,28 19,38 C20,48 24,56 27,66 C29,74 30,86 35,86 C40,86 40,72 43,64 C45,60 47,58 50,58 C53,58 55,60 57,64 C60,72 60,86 65,86 C70,86 71,74 73,66 C76,56 80,48 81,38 C82,28 78,20 70,20 C62,20 58,25 50,25 C42,25 38,20 30,20 Z" fill="url(#pcShade)"></path>
        </g>
        <ellipse cx="30" cy="32" rx="4.5" ry="8" transform="rotate(-20 30 32)" fill="#fff" opacity="0.85" filter="url(#blur1)"></ellipse>
        <path d="M6,45 Q50,40 94,45" fill="none" stroke="#B9996A" stroke-width="1.8" stroke-linecap="round"></path>
        <path d="M6,44.4 Q50,39.4 94,44.4" fill="none" stroke="#F4E8CF" stroke-width="0.6" stroke-linecap="round" opacity="0.9"></path>
        <g filter="url(#lift)">
          <rect x="39" y="34" width="22" height="17" rx="3.5" fill="url(#gd)"></rect>
          <rect x="39" y="40.8" width="22" height="3" fill="#9E7C49" opacity="0.45"></rect>
          <rect x="41.5" y="35.5" width="17" height="2.6" rx="1.3" fill="#fff" opacity="0.55"></rect>
        </g>
      </svg>
```

### 5. Odontopediatria
- Descrição: Cuidado e confiança desde os primeiros sorrisos.

```html
<svg viewBox="0 0 100 100" class="spec-icon__svg">
        <ellipse cx="50" cy="88" rx="20" ry="2.8" fill="#9C7B55" opacity="0.22" filter="url(#blur3)"></ellipse>
        <g transform="translate(50 56) scale(0.86) translate(-50 -56)">
          <g filter="url(#lift)">
            <path d="M30,20 C22,20 18,28 19,38 C20,48 24,56 27,66 C29,74 30,86 35,86 C40,86 40,72 43,64 C45,60 47,58 50,58 C53,58 55,60 57,64 C60,72 60,86 65,86 C70,86 71,74 73,66 C76,56 80,48 81,38 C82,28 78,20 70,20 C62,20 58,25 50,25 C42,25 38,20 30,20 Z" fill="url(#pc)" stroke="#C9B08C" stroke-opacity="0.45" stroke-width="0.7"></path>
            <path d="M30,20 C22,20 18,28 19,38 C20,48 24,56 27,66 C29,74 30,86 35,86 C40,86 40,72 43,64 C45,60 47,58 50,58 C53,58 55,60 57,64 C60,72 60,86 65,86 C70,86 71,74 73,66 C76,56 80,48 81,38 C82,28 78,20 70,20 C62,20 58,25 50,25 C42,25 38,20 30,20 Z" fill="url(#pcShade)"></path>
          </g>
          <circle cx="36" cy="47" r="3.5" fill="#E4B6A6" opacity="0.35" filter="url(#blur1)"></circle>
          <circle cx="64" cy="47" r="3.5" fill="#E4B6A6" opacity="0.35" filter="url(#blur1)"></circle>
          <circle cx="42" cy="41" r="1.6" fill="#8E6457" opacity="0.7"></circle>
          <circle cx="58" cy="41" r="1.6" fill="#8E6457" opacity="0.7"></circle>
          <path d="M45,47.5 Q50,51.5 55,47.5" fill="none" stroke="#8E6457" stroke-width="1.4" stroke-linecap="round" opacity="0.7"></path>
          <ellipse cx="30" cy="32" rx="4.5" ry="8" transform="rotate(-20 30 32)" fill="#fff" opacity="0.85" filter="url(#blur1)"></ellipse>
        </g>
        <path d="M82,12 Q83,18 88,19 Q83,20 82,26 Q81,20 76,19 Q81,18 82,12 Z" fill="url(#gd)"></path>
      </svg>
```

### 6. Prevenção e cuidados gerais
- Descrição: Acompanhamento regular da saúde bucal.

```html
<svg viewBox="0 0 100 100" class="spec-icon__svg">
        <ellipse cx="50" cy="91" rx="24" ry="3" fill="#9C7B55" opacity="0.22" filter="url(#blur3)"></ellipse>
        <path d="M17,34 A36,36 0 0 0 62,89" fill="none" stroke="#C8A874" stroke-width="1" opacity="0.5" transform="translate(1.2 -1.2)"></path>
        <g transform="translate(52 53) scale(0.8) translate(-50 -53)">
          <g filter="url(#lift)">
            <path d="M30,20 C22,20 18,28 19,38 C20,48 24,56 27,66 C29,74 30,86 35,86 C40,86 40,72 43,64 C45,60 47,58 50,58 C53,58 55,60 57,64 C60,72 60,86 65,86 C70,86 71,74 73,66 C76,56 80,48 81,38 C82,28 78,20 70,20 C62,20 58,25 50,25 C42,25 38,20 30,20 Z" fill="url(#pc)" stroke="#C9B08C" stroke-opacity="0.45" stroke-width="0.7"></path>
            <path d="M30,20 C22,20 18,28 19,38 C20,48 24,56 27,66 C29,74 30,86 35,86 C40,86 40,72 43,64 C45,60 47,58 50,58 C53,58 55,60 57,64 C60,72 60,86 65,86 C70,86 71,74 73,66 C76,56 80,48 81,38 C82,28 78,20 70,20 C62,20 58,25 50,25 C42,25 38,20 30,20 Z" fill="url(#pcShade)"></path>
          </g>
          <ellipse cx="30" cy="32" rx="4.5" ry="8" transform="rotate(-20 30 32)" fill="#fff" opacity="0.85" filter="url(#blur1)"></ellipse>
        </g>
        <g filter="url(#lift)">
          <path d="M16,32 A37,37 0 0 0 63,90" fill="none" stroke="url(#gdV)" stroke-width="3.2" stroke-linecap="round"></path>
          <path d="M16.6,33.5 A36,36 0 0 0 58,88" fill="none" stroke="#F7ECD5" stroke-width="0.8" stroke-linecap="round" opacity="0.85"></path>
        </g>
        <path d="M80,12 Q81,18 86,19 Q81,20 80,26 Q79,20 74,19 Q79,18 80,12 Z" fill="url(#gd)"></path>
        <circle cx="87" cy="30" r="1.3" fill="url(#gd)"></circle>
      </svg>
```

## Critérios de aceite
- 6 cards alinhados em 3 × 2 no desktop, mesma altura, mesmas posições de ícone/texto/botão.
- Nenhum título quebra linha.
- Ícones renderizam com gradientes (confira se os defs estão no DOM).
