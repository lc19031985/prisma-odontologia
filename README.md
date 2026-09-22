# Prisma Odontologia — site institucional

Site estático (Next.js App Router + TypeScript, `output: 'export'`) da Prisma
Odontologia, Imperatriz – MA. Publicável em qualquer hospedagem (pasta `out/`).

## Rodar localmente

```bash
npm install
npm run dev
```

Abra http://localhost:3000. Para gerar a versão de publicação:

```bash
npm run build        # gera a pasta out/
npm run build:prod   # idem, mas falha se houver pendência crítica
```

## Como trocar as fotos

1. Coloque os arquivos em `referencias/fotos/` com estes nomes:
   `hero.jpg`, `recepcao.jpg`, `dra-priscilla.jpg`, `dra-maine.jpg`,
   `dra-anna.jpg`, `dra-carla.jpg` (JPG ou PNG).
2. Rode `npm run images` — o script gera versões AVIF e WebP em 3 larguras em
   `public/img/`.
3. Atualize o componente correspondente trocando o placeholder pelo
   `<picture>` (os pontos estão comentados com `PENDENTE:` em
   `Hero.tsx`, `About.tsx` e `Team.tsx`).

## Como editar os dados da clínica

Tudo fica em **`src/config/clinic.ts`** — telefone, WhatsApp, endereço,
horários, Instagram, responsável técnica, links do Google e domínio. Nenhum
outro arquivo contém esses dados. Campos ainda não fornecidos usam o formato
`[PENDENTE: descrição]`; ao preenchê-los, os botões correspondentes passam a
funcionar automaticamente (ex.: "Avaliar no Google").

`npm run check:pendencias` lista o que ainda falta, com arquivo e linha.

## Como editar as novidades semanais

`src/content/weekly-content.json` contém os conjuntos semanais (um por semana
ISO do ano; hoje há 4 conjuntos provisórios — os 52 chegam na Fase 4). Cada
conjunto tem 3 itens (Dica da semana, Entenda, Na Prisma) com `titulo`,
`subtitulo`, `texto`, `icone` e `verificar`.

Regras de conteúdo: linguagem para leigos, sem diagnóstico individual, sem
promessa de resultado, sem preço/promoção, e todo texto termina orientando a
avaliação profissional. Itens "Na Prisma" que citam equipamento/serviço só
podem ir ao ar depois de confirmados pela clínica (campo `verificar`).

A semana exibida é calculada no navegador (semana ISO, fuso America/Fortaleza,
vira segunda 00h; semana 53 usa o conjunto 52) — ver `src/lib/week.ts` e os
testes em `npm test`.

## Chave do Google Maps (opcional)

Sem chave, o mapa usa o embed público por endereço e **já funciona**. Para usar
a Maps Embed API com Place ID:

1. Copie `.env.example` para `.env.local` e preencha
   `NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY`.
2. **Importante:** num site estático toda chave fica visível ao público. No
   Google Cloud, restrinja a chave por **referenciador HTTP** (somente o
   domínio da clínica) e por **API** (somente a Maps Embed API).

## Documentos do projeto

- `PENDENCIAS.md` — o que falta, por responsável.
- `DECISOES.md` — substituições de fonte, cores derivadas e conflitos
  design × prompt.
- `DEPLOY.md` — publicação e apontamento de domínio.
- `TESTES.md` — o que foi verificado e o que exige teste manual.
- `CLAUDE.md` — regras para manutenção futura.
