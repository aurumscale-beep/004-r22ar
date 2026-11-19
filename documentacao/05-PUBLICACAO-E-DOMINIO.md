# 05 — Publicação e domínio

O site é publicado em duas frentes, com o mesmo conteúdo:

| Frente | Endereço | O que é |
|---|---|---|
| Manus | https://r22ar-jvjug8gs.manus.space | hospedagem do projeto Manus, deploy automático a cada publicação |
| GitHub Pages | https://r22arcondicionados.com.br | repositório `aurumscale-beep/004-r22ar`, domínio próprio com HTTPS |

A fonte da verdade é sempre a pasta `site/`. As duas frentes são geradas a partir dela.

---

## Frente 1 — Manus

O projeto Manus guarda o site em `public/`. Para publicar:

```bash
cd <projeto>
git add -A
git commit -m "descrição da mudança"
git fetch origin main
git merge --ff-only origin/main
git push origin main
```

Depois, a publicação é disparada pela ferramenta do projeto (POST `publish` com corpo `{}`). O modo de publicação é manual: nada vai ao ar só por ter commitado.

**Cuidado com cache:** os arquivos são referenciados com versão na URL (`styles.css?v=48`, `config.js?v=3`, `calculadora.js?v=2`). Ao alterar CSS ou JS, **subir o número da versão** no `index.html`, senão o navegador do cliente continua com o arquivo antigo.

---

## Frente 2 — GitHub Pages

### Repositório

- Conta: `aurumscale-beep`
- Repositório: `004-r22ar`
- Branch publicada: `main`, pasta raiz
- Configuração: Pages → Source “Deploy from a branch” → `main` / `/ (root)`
- Custom domain: `r22arcondicionados.com.br`
- **Enforce HTTPS** ligado

### Por que os arquivos são “achatados”

O site original usa subpastas (`assets/css/`, `assets/img/marcas/`…). No repositório do GitHub, todos os arquivos ficam na raiz com prefixo no nome. Isso foi feito para simplificar o caminho público e evitar erro de caminho relativo em subpasta. Regra de renomeação:

| Origem | Nome no repositório |
|---|---|
| `index.html`, `manus-routes.json` | mesmo nome |
| `assets/css/styles.css` | `styles.css` |
| `assets/js/app.js` | `app.js` (idem `config.js`, `calculadora.js`) |
| `assets/fonts/inter-latin.woff2` | `fonts-inter-latin.woff2` |
| `assets/img/marcas/lg.png` | `img-marcas-lg.png` |
| `assets/img/pagamentos/pix.png` | `img-pag-pix.png` |
| `assets/img/tipos/cassete.webp` | `img-tipos-cassete.webp` |
| `assets/img/icones/icone-sol.svg` | `img-icone-icone-sol.svg` |
| `assets/img/hero-bg.jpg` | `img-hero-bg.jpg` |

Ao copiar, as referências dentro de HTML, CSS e JS também são reescritas (`assets/img/marcas/` → `img-marcas-`, `url("../fonts/` → `url("fonts-`, etc.). A cópia pronta está em `site-github-pages/` — não precisa refazer a transformação, basta copiar o conteúdo dela para a raiz do repositório.

### Arquivo CNAME

```
r22arcondicionados.com.br
```

Sem `www`, sem barra, sem `https://`. É o que o GitHub Pages lê para saber qual domínio servir.

### DNS

O domínio está registrado no **Registro.br** e o DNS é gerenciado no próprio Registro.br (não há Cloudflare no meio).

| Tipo | Nome | Valor | Observação |
|---|---|---|---|
| A | `@` (vazio) | `185.199.108.153` | IPs do GitHub Pages |
| A | `@` (vazio) | `185.199.109.153` | |
| A | `@` (vazio) | `185.199.110.153` | |
| A | `@` (vazio) | `185.199.111.153` | |
| CNAME | `www` | `aurumscale-beep.github.io` | com ponto final no Registro.br |

Não usar ALIAS/ANAME para `aurumscale-beep.github.io` no apex: o GitHub recomenda os quatro registros A. Se o DNS for migrado para Cloudflare, os registros A viram “DNS only” (nuvem cinza), nunca “proxied”.

### HTTPS

O certificado é emitido pelo GitHub Pages (Let's Encrypt) depois que o DNS aponta para os IPs corretos. Leva de minutos a algumas horas. Para forçar a renovação: Pages → Custom domain → remover o domínio → salvar → adicionar de novo → salvar → marcar **Enforce HTTPS**.

### Checklist de verificação

```bash
# 1. DNS
dig +short r22arcondicionados.com.br A        # deve listar os 4 IPs 185.199.10x.153
dig +short www.r22arcondicionados.com.br       # deve apontar para aurumscale-beep.github.io

# 2. HTTPS sem aviso, com e sem www
curl -sI https://r22arcondicionados.com.br | head -3
curl -sI https://www.r22arcondicionados.com.br | head -3

# 3. HTTP redirecionando para HTTPS
curl -sI http://r22arcondicionados.com.br | grep -i location
```

Resultado esperado: `200` nos dois endereços HTTPS e `301` com `location: https://r22arcondicionados.com.br/` no HTTP.

### Problemas já enfrentados

- **Página em branco com CSS quebrado:** causado por referência a caminho antigo (`assets/css/styles.css`) depois da cópia achatada. Sempre validar as referências depois de copiar (contar quantas URLs existem no HTML e quantas faltam no disco — o valor correto é 0 faltando).
- **Aviso de segurança no domínio:** DNS ainda propagando ou certificado não emitido. Resolvido removendo e re-adicionando o custom domain e ligando o Enforce HTTPS.
- **Cache antigo no navegador do cliente:** resolvido com `?v=` nos arquivos e recarga forçada.

---

## Publicar uma alteração (rotina completa)

1. Editar em `site/` (fonte da verdade).
2. Testar localmente com `python3 -m http.server 3000` dentro de `site/`.
3. Publicar no Manus (commit + publish) e conferir a URL do Manus.
4. Regerar a cópia achatada e copiar para o repositório do GitHub.
5. `git add -A && git commit && git push` no repositório `004-r22ar`.
6. Esperar o build do Pages (Actions → “pages build and deployment”) e conferir o domínio com recarga forçada.
