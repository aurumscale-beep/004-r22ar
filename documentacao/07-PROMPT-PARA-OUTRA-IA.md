# 07 — Prompt para outra IA

Copie o bloco abaixo inteiro e envie para a outra IA **junto com o ZIP deste pacote** (ou com a pasta `site/` descompactada). Ele é autossuficiente: explica o projeto, o que não pode mudar e como conferir o resultado.

---

## PROMPT

Você vai assumir a manutenção de uma landing page já pronta e publicada. Ela está no pacote anexado, na pasta `site/`, e no ar em https://r22arcondicionados.com.br (domínio próprio) e https://r22ar-jvjug8gs.manus.space (Manus).

**Contexto do negócio.** R22 Ar Condicionado: instalação, higienização, manutenção, conserto, recarga de gás e venda de ar-condicionado. Atende a cidade de São Paulo, o litoral paulista e o interior de São Paulo. Único contato: WhatsApp (11) 94241-8489. Não existe endereço, horário de funcionamento, e-mail, CNPJ nem redes sociais no site — **não invente nenhum desses dados**.

**Tecnologia.** HTML, CSS e JavaScript puro. Sem framework, sem build, sem npm, sem CDN, sem Google Fonts. Uma única página (`index.html`) com âncoras. A fonte Inter está embutida em `assets/fonts/inter-latin.woff2`. Para testar: `cd site && python3 -m http.server 3000`.

**Estrutura.** Leia `documentos/01-ARQUITETURA-E-ARQUIVOS.md` para a árvore de arquivos e a ordem das seções. Tudo que muda com frequência está em `assets/js/config.js` (número do WhatsApp, mensagem padrão, coeficientes de BTU). Não espalhe esses valores pelo HTML.

**Calculadora de BTUs — não altere a conta.** A fórmula foi copiada da calculadora da Climatize e precisa dar exatamente o mesmo resultado:

```
btu = área × 600 + pessoas × 600 + eletrônicos × 600 + (sol !== "nao-tem" ? 800 : 0)
```

Janelas têm coeficiente 0 (aparecem no resumo, não somam). Pessoas contam todas, inclusive a primeira. O sol soma 800 fixos para manhã, tarde ou dia todo. A capacidade sugerida é a **menor da lista estritamente acima** da estimativa, na lista 7000, 9000, 12000, 18000, 22000, 24000, 30000, 36000, 48000, 60000. Acima de 60.000, mostrar convite para avaliação técnica. Detalhes, identificadores e mensagens de erro estão em `documentos/02-CALCULADORA-BTUS.md`.

**Identidade visual.** Azul `#1a6f9c` e branco como base, fundo claro `#eef3f6`, faixas escuras `#071620` apenas no hero, na calculadora e na chamada de orçamento, verde `#22c55e` **exclusivamente** em botão de WhatsApp. Cartões brancos com borda `#dde6ec` e raio de 18 a 24 px. Nada de traço decorativo antes de rótulo, nada de emoji no lugar de ícone, nada de gradiente colorido. Paleta completa e componentes em `documentos/03-IDENTIDADE-VISUAL.md`.

**Textos.** Use exatamente os textos de `documentos/04-CONTEUDO-E-TEXTOS.md`. O tom é curto e direto. Não acrescente subtítulos dentro dos cartões de serviço (o cliente pediu para tirar). A palavra GRATUITA fica em caixa alta no passo da visita. O rodapé precisa manter as bandeiras de pagamento (Visa, Mastercard, American Express, Hipercard, Diners, Elo, Pix).

**Regras que o cliente já estabeleceu e que não podem ser desfeitas:**

1. Branco é cor predominante ao lado do azul.
2. Animações leves; nada que trave a rolagem ou demore a aparecer. Respeitar `prefers-reduced-motion`.
3. O ar-condicionado na divisa entre hero e serviços é uma imagem realista (não ilustração, não anime), com o nome “R22 Ar Condicionado” aplicado como se estivesse impresso no aparelho, em azul.
4. O pinguim mascote fica pequeno, no fim da página.
5. O site informa em vários pontos que a empresa trabalha com **todas as marcas** e **todos os tipos** de aparelho.
6. A calculadora aceita área digitada com vírgula ou ponto; o cliente não quer apertar botão para digitar metros quadrados.
7. Publicar sempre nas duas frentes: Manus e GitHub Pages. Nenhuma alteração fica só em uma.

**Ao alterar CSS ou JS, suba a versão na URL** em `index.html` (`styles.css?v=48`, `config.js?v=3`, `calculadora.js?v=2`), senão o navegador do cliente mantém o arquivo antigo em cache.

**Publicação.** Instruções completas em `documentos/05-PUBLICACAO-E-DOMINIO.md`. No GitHub, o repositório é `aurumscale-beep/004-r22ar`, branch `main`, e os arquivos ficam **achatados na raiz** com prefixo no nome (`img-*`, `img-marcas-*`, `img-pag-*`, `img-tipos-*`, `img-icone-*`, `fonts-*`, `styles.css`, `app.js`, `config.js`, `calculadora.js`) mais o `CNAME` com `r22arcondicionados.com.br`. A versão já achatada está em `site-github-pages/`; copie o conteúdo dela para a raiz do repositório em vez de refazer a transformação à mão.

**Antes de dizer que terminou, confira:**

- A página abre sem erro no console e sem rolagem horizontal em 1440 px, 1200 px e 390 px.
- Todos os botões de WhatsApp abrem `wa.me/5511942418489` com mensagem preenchida.
- A calculadora reproduz estes resultados: 15/2/0/0 sem sol = 10.200 → 12.000; 15/2/0/0 manhã = 11.000 → 12.000; 15/2/0/1 dia todo = 11.600 → 12.000; 20/3/2/1 tarde = 15.200 → 18.000; 15,5 sem sol = 10.500; 60/4/3/2 = 40.400 → 48.000.
- As validações aparecem em português nos campos vazios, com zero, negativos, texto e sol não escolhido.
- Todas as imagens carregam (nenhum 404) e o domínio abre em HTTPS sem aviso, com e sem `www`.
- As duas frentes estão publicadas com o mesmo conteúdo.

Se algo no pedido do cliente conflitar com estas regras, pergunte antes de mudar.

---

## Dicas de uso

- Se a outra IA não conseguir abrir o ZIP, envie a pasta `site/` e os arquivos de `documentos/` separadamente.
- Para uma reconstrução do zero, o caminho mais seguro é pedir que ela **parta do código existente** e altere só o que foi pedido. Reproduzir do zero costuma perder detalhes de layout.
- Se ela for publicar em outra conta, o domínio e o repositório mudam: o `CNAME` e os registros DNS precisam ser refeitos (ver `05-PUBLICACAO-E-DOMINIO.md`).
