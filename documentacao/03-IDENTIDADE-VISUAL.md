# 03 — Identidade visual

## Conceito

Climatização profissional com cara de serviço de confiança, não de catálogo de loja. A base é **branco e cinza-azulado claro**, o azul da marca entra em títulos, ícones e detalhes, e o **azul-petróleo muito escuro** aparece em poucas faixas para dar peso (hero, calculadora, orçamento). Verde é reservado exclusivamente para ação de WhatsApp.

## Paleta

Tokens do tema claro (a partir da linha ~1010 do `styles.css`):

| Token | Valor | Uso |
|---|---|---|
| `--paper` | `#eef3f6` | fundo geral da página |
| `--paper-2` | `#e4ecf1` | fundo alternado de seção |
| `--white` | `#ffffff` | cartões, faixas, blocos de conteúdo |
| `--ink` | `#081a24` | texto principal |
| `--ink-2` | `#162b36` | texto em blocos escuros |
| `--ink-soft` | `#566974` | parágrafos |
| `--ink-mute` | `#7d8f99` | legendas e apoio |
| `--line` | `#dde6ec` | bordas e divisórias |
| `--line-strong` | `#c9d7df` | bordas de campos e botões secundários |
| `--azul` | `#1a6f9c` | cor principal da marca |
| `--azul-2` | `#2c8fbd` | realce, gradientes, hover |
| `--azul-suave` | `#e2f0f7` | fundo de pílulas, ícones e destaques |
| `--verde` | `#22c55e` | botões de WhatsApp |

Tokens do tema escuro (topo do arquivo): `--deep #071620` como fundo, `--ink #ffffff` como texto, `--glass-line rgba(255,255,255,.24)` para bordas de vidro.

Regra de proporção: aproximadamente **60% branco/claro, 30% azul (texto e detalhes), 10% escuro**. O cliente pediu explicitamente “um pouco mais da cor branca” no site inteiro — por isso as seções de conteúdo são cartões brancos sobre fundo claro.

## Tipografia

- **Inter variável** (`inter-latin.woff2`, `font-weight: 100 900`), embutida localmente, sem Google Fonts.
- Títulos: peso 600 a 800, `letter-spacing` levemente negativo (`-0.02em` a `-0.035em`), entrelinha 1,05 a 1,15.
- Texto: peso 400, `line-height` 1,6 a 1,75, largura máxima de 60 a 70 caracteres.
- Rótulos e pílulas: 11 a 13 px, `text-transform: uppercase`, `letter-spacing: .08em`.
- Sem traços ou linhas decorativas antes de rótulos (pedido do cliente).

## Componentes

**Botão primário (WhatsApp)** — pílula, fundo `--verde`, texto branco, peso 600, sombra suave, ícone do WhatsApp à esquerda. No hero e nas faixas de chamada fica maior.

**Botão secundário** — fundo branco, borda `--line-strong`, texto `--ink`, hover com borda azul.

**Cartão branco** — fundo branco, raio 18 a 24 px, borda `--line`, sombra discreta (`0 1px 2px` + `0 18px 40px -30px`), padding de 24 a 40 px.

**Pílula de categoria** — fundo `--azul-suave`, texto `--azul`, raio total, 11 px em caixa alta.

**Cartão de serviço** — foto em cima com cantos arredondados, nome do serviço em peso 600 e uma linha de descrição. Sem subtítulos, sem excesso de informação (pedido do cliente).

**Faixa de marcas** — fundo branco, logos em escala de cinza com opacidade 0,55 que sobem para cor cheia no hover.

**Acordeão de dúvidas** — item branco, borda fina, `+` que gira para `×` ao abrir.

**Stepper da calculadora** — campo com botões − e + quadrados, borda `--line`, foco com anel azul.

**Ar-condicionado da divisa** — imagem realista (`ac-unit.webp`) sobreposta entre o hero e a seção de serviços, com o nome “R22 Ar Condicionado” aplicado como se estivesse impresso no aparelho, em azul. Não usar ilustração estilo anime.

**Mascote** — pinguim pequeno, no rodapé, sem protagonismo.

## Movimento

- Entrada de texto do hero: `translateY` de 24 px + opacidade, escalonada por 60 a 90 ms entre linhas, `cubic-bezier(.16,1,.3,1)`.
- Ar saindo do aparelho: linhas curvas em SVG com `stroke-dasharray` animado, ciclo de 3 a 4 s, opacidade baixa; leve, sem chamar mais atenção que o título.
- Revelação por rolagem: `IntersectionObserver`, 12 px de deslocamento, uma vez por elemento.
- Contador da nota do Google: 0 → 5,0 em ~1,2 s quando a seção entra na tela.
- Tudo desligado quando `prefers-reduced-motion: reduce`.

## O que evitar

- Emoji no lugar de ícone, “carinhas” de IA, brilhos e gradientes coloridos.
- Preto puro como fundo de texto; o escuro é `#071620` (azul-petróleo).
- Fotos com aparência de banco de imagens: as fotos de serviço são de técnico com uniforme da R22, em situação real de obra.
- Excesso de informação nos cartões de serviço.
- Traços decorativos, numeração gigante e outros enfeites que não existam no restante do site.
