# Publicação — Prisma Odontologia

O site é 100% estático: o build gera a pasta `out/`, que pode ser hospedada em
qualquer serviço.

**Domínio contratado: `odontologiaprisma.com.br`** (Registro.br, 22/09/2026).
Canônico escolhido: **`https://www.odontologiaprisma.com.br`**, com o domínio
raiz redirecionando para www (já refletido em `clinic.ts`, sitemap e
robots.txt).

## Opção recomendada: Vercel

1. Suba o projeto para um repositório Git (GitHub, GitLab...).
2. Em vercel.com → Add New Project → importe o repositório.
   A Vercel detecta Next.js sozinha; nenhuma configuração extra é necessária
   (o `output: 'export'` já está no `next.config.mjs`).
3. Em Settings → Environment Variables, adicione
   `NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY` (se for usar a chave).
4. Cada push publica automaticamente.

**Domínio na Vercel:** Project → Settings → Domains → adicione
`www.odontologiaprisma.com.br` e `odontologiaprisma.com.br`. A Vercel mostra
os registros a criar no Registro.br:

- No painel do Registro.br, em DNS → "Modo avançado":
  - Registro **A** de `odontologiaprisma.com.br` → `76.76.21.21` (confirme o
    IP indicado pela Vercel na tela de Domains);
  - Registro **CNAME** de `www` → `cname.vercel-dns.com.`.
- HTTPS é emitido automaticamente (Let's Encrypt) após a propagação (até 48h,
  normalmente minutos).
- Em Domains, marque `www.odontologiaprisma.com.br` como principal e
  configure `odontologiaprisma.com.br` para **redirecionar para www** (é o
  canônico usado no site).

## Alternativa: Netlify

1. Em netlify.com → Add new site → Import an existing project.
2. Build command: `npm run build` · Publish directory: `out`.
3. Domínio: Site settings → Domain management → registros equivalentes no
   Registro.br (A → IP da Netlify; CNAME `www` → `<site>.netlify.app.`).

## Alternativa: hospedagem comum (cPanel etc.)

1. Rode `npm run build` localmente.
2. Envie **o conteúdo** da pasta `out/` para a raiz pública
   (`public_html/`), via FTP ou gerenciador de arquivos.
3. Aponte o domínio no Registro.br para os DNS da hospedagem (registros
   fornecidos pelo provedor) e ative HTTPS (AutoSSL/Let's Encrypt) no painel.
4. Configure o redirecionamento de `www` no painel da hospedagem (ou vice-versa).

## Depois de publicar (checklist)

- [x] ~~Preencher `siteUrl`~~ — feito: `https://www.odontologiaprisma.com.br`
      (canônica, Open Graph e `sitemap.xml` já gerados no build).
- [x] ~~Atualizar `public/robots.txt`~~ — feito, com a linha do sitemap.
- [ ] Conferir se `https://www.odontologiaprisma.com.br` responde e se o
      domínio raiz redireciona para www.
- [ ] Restringir a chave do Maps a `https://www.odontologiaprisma.com.br/*`
      (somente se for usar chave; sem ela o mapa já funciona).
- [ ] Cadastrar o site no Google Search Console e enviar o sitemap.
- [ ] Executar os testes manuais listados em `TESTES.md`.
