# Testes — Prisma Odontologia

Relatório honesto do que foi verificado (Fases 2–5, concluídas em 22/09/2026)
e do que só pode ser testado manualmente.

## Verificação NO SITE PUBLICADO (22/09/2026)

Site no ar em **https://www.odontologiaprisma.com.br** (Vercel; domínio raiz
redireciona com 308 para o www; HTTPS ativo).

- Bateria completa (`node scripts/verify.mjs https://www.odontologiaprisma.com.br`):
  **26/26 passando** — os mesmos resultados do build local, agora em produção.
- Lighthouse mobile no domínio real: **Performance 92, Acessibilidade 97,
  Boas práticas 100, SEO 100** (duas medições: 89 e 92 — variação normal do
  Lighthouse em rede real; média acima da meta de 90).
- `HOST_RESOLVER` (variável de ambiente aceita por verify.mjs/lighthouse.mjs)
  força a resolução DNS no Chromium — usada porque o cache DNS local ainda
  apontava para a página de estacionamento da Hostinger na hora do teste.

## Como reproduzir

```bash
npm run build          # gera out/
npm run serve:out      # serve out/ com gzip em http://localhost:3011
npm run verify         # bateria Playwright + axe (26 checagens)
npm run lighthouse     # Lighthouse mobile
npm test               # testes unitários de week.ts
```

## Verificado automaticamente — TUDO PASSANDO

### Bateria Playwright (`scripts/verify.mjs`) — 26/26 ✔

- **Sem rolagem horizontal** em 320, 390, 768 e 1440 px.
- **Teclado**: o primeiro Tab foca o link "Pular para o conteúdo"; a navegação
  por Tab alcança menu, botões do hero, especialidades, rota e links legais
  (42 paradas distintas).
- **Diálogos** (10 testados: novidade, institucional, 6 especialidades,
  equipe completa e perfil individual): abrem, fecham com Esc e devolvem o
  foco ao gatilho.
- **Links**: as 8 ocorrências de WhatsApp usam
  `https://wa.me/5599982630549?text=` com a mensagem corretamente codificada;
  a rota usa `maps/dir/?api=1` sem `destination_place_id` (pendente); os dois
  botões "Avaliar no Google" pendentes ficam com `aria-disabled="true"` e
  "em breve"; todos os links externos têm `rel="noopener noreferrer"`.
- **Mapa**: o iframe do Google entra sob demanda ao se aproximar da seção
  (componente `MapEmbed`) e usa o embed por endereço.
- **Carrossel de novidades** (celular): roda sozinho a cada ~7 s; o botão de
  pausa interrompe; com `prefers-reduced-motion` não há rotação automática.
- **axe-core** (desktop e celular): **nenhuma violação serious/critical**.
  Resta 1 apontamento moderate (`region`: o botão flutuante de WhatsApp fica
  fora de landmarks) — aceito e documentado.

### Lighthouse mobile (build estático servido com gzip)

| Categoria | Nota | Meta |
|---|---|---|
| Performance | **93** | ≥ 90 ✔ |
| Acessibilidade | **97** | ≥ 90 ✔ |
| Boas práticas | **100** | ≥ 90 ✔ |
| SEO | **100** | ≥ 90 ✔ |

Observações: a medição usa o servidor local com gzip (como qualquer
hospedagem real). O maior ganho de performance veio de adiar o embed do
Google Maps até o visitante se aproximar da seção (antes: Performance 60–66).
As notas devem ser reconferidas no domínio final após a publicação.

### Testes unitários (`npm test`) — 4/4 ✔

Virada de semana (domingo→segunda no fuso de Fortaleza), semana ISO 53 → 
conjunto 52, virada de ano e sanidade de meio de ano.

### Conteúdo

- `weekly-content.json` validado por script: 52 conjuntos, numeração 1–52,
  3 itens por conjunto nas 3 categorias corretas; 5 itens com `verificar`
  pendente de confirmação da clínica (listados em PENDENCIAS.md).
- Build de produção sem erros de tipo; 7 rotas estáticas exportadas.

## Correções feitas a partir da verificação

- Contraste AA: cinza secundário escurecido (`#857770` → `#6F625C`); textos
  decorativos rosé → marsala; rótulo "NOVIDADES" com fundo escurecido;
  subtítulos da faixa com opacidade 0,95; placeholders de foto com texto mais
  escuro; botões pendentes sem opacidade (fundo bege + tracejado).
- Performance: mapa do Google adiado até a aproximação (MapEmbed).

## Testes manuais — realizados pelo cliente (22/09/2026)

- Celular real: site aberto, botão de agendamento abrindo o WhatsApp com a
  mensagem correta e "Traçar rota" abrindo o mapa — **"tudo certo"**,
  conforme relato do cliente.

## Ainda NÃO testado — exige dados reais

- O link "Avaliar no Google" com o **Place ID real** (hoje pendente).
- O mapa com a **chave restrita** ao domínio (somente se for usar chave).
- Leitores de tela reais (NVDA/VoiceOver) — a verificação automática não
  substitui esse teste.
