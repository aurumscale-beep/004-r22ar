# R22 Ar Condicionado — pacote completo do site

Este pacote contém tudo o que é necessário para guardar o site e recriá-lo, sem alterações, em outra conta ou em outra IA (Manus, Claude, ChatGPT, Cursor, etc.).

**Site no ar:**
- Domínio próprio: https://r22arcondicionados.com.br
- Manus: https://r22ar-jvjug8gs.manus.space
- Repositório GitHub Pages: `aurumscale-beep/004-r22ar`

---

## O que tem dentro

```
r22-ar-condicionado-pacote/
├── LEIA-ME.md                  ← este arquivo
├── site/                       ← SITE COMPLETO, na estrutura original (é esta a fonte da verdade)
│   ├── index.html
│   ├── manus-routes.json
│   └── assets/
│       ├── css/styles.css
│       ├── js/config.js  · app.js · calculadora.js
│       ├── fonts/ (Inter variável em .woff2)
│       └── img/ (hero, serviços, marcas, pagamentos, tipos, ícones, mapa, mascote)
├── site-github-pages/          ← a mesma coisa achatada, como está no repositório do GitHub
│   ├── CNAME (r22arcondicionados.com.br)
│   └── README.md
├── documentos/
│   ├── 01-ARQUITETURA-E-ARQUIVOS.md
│   ├── 02-CALCULADORA-BTUS.md
│   ├── 03-IDENTIDADE-VISUAL.md
│   ├── 04-CONTEUDO-E-TEXTOS.md
│   ├── 05-PUBLICACAO-E-DOMINIO.md
│   ├── 06-HISTORICO-RODADAS.md
│   └── 07-PROMPT-PARA-OUTRA-IA.md
├── capturas/                   ← prints do site final (desktop e celular)
└── originais/                  ← materiais que o cliente enviou
    ├── marca/ (logos R22 em várias versões)
    ├── fotos/ (fotos de serviço e do técnico)
    └── referencias/ (referências visuais e os ícones originais da calculadora)
```

## Como abrir o site localmente

Não precisa de build, npm nem servidor especial. Basta abrir `site/index.html` no navegador.

Para servir como em produção (recomendado, porque alguns navegadores bloqueiam fontes via `file://`):

```bash
cd site
python3 -m http.server 3000
# abra http://localhost:3000
```

## Como trocar dados sem mexer no código

Tudo que muda com frequência está em `site/assets/js/config.js`:

- `whatsapp.number` — número que recebe os orçamentos (formato 55 + DDD + número, só dígitos).
- `whatsapp.message` — mensagem padrão dos botões genéricos.
- `btus.*` — coeficientes da calculadora e lista de capacidades comerciais.

## Como publicar

Passo a passo nas duas frentes está em `documentos/05-PUBLICACAO-E-DOMINIO.md`.

## Como usar em outra IA

Copie o texto de `documentos/07-PROMPT-PARA-OUTRA-IA.md` e anexe este pacote. Ele explica o projeto, as regras que não podem mudar e o que conferir antes de publicar.

---

## Ficha rápida

| Item | Valor |
|---|---|
| Segmento | Instalação, higienização, manutenção, conserto e venda de ar-condicionado |
| Região | Cidade de São Paulo, litoral paulista e interior de São Paulo |
| WhatsApp | (11) 94241-8489 — `5511942418489` |
| Tecnologia | HTML, CSS e JavaScript puro, sem framework e sem etapa de build |
| Fontes | Inter (texto) e Didact Gothic (logotipo em texto), ambas embutidas em `.woff2` |
| Cor principal | Azul `#1a6f9c` sobre branco `#ffffff`, com fundo escuro `#071620` nas seções de impacto |
| CTA | Botões verdes de WhatsApp `#22c55e` |
| Páginas | Uma única landing page (`index.html`) com âncoras |
| Analytics | Nenhum script de terceiros no código do site |
| Fontes | Inter variável embutida em `.woff2`; o logotipo é imagem PNG, sem fonte especial |
├── capturas/                   ← 11 prints do site + vídeo de navegação (demo-navegacao.mp4)
