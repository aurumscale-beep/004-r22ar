# 06 — Histórico das rodadas

Resumo do que foi pedido e entregue em cada rodada, na ordem em que aconteceu. Serve para entender por que o site está assim e para não desfazer decisões antigas sem saber.

## Blocos iniciais (1 a 5)

**Bloco 1 — Home.** Hero em tela cheia com foto de ambiente climatizado, cabeçalho sobreposto, título “Instalação, manutenção e higienização de ar-condicionado”, botões de serviço e faixa inferior. A animação do ar saindo do aparelho passou por várias iterações até ficar visível: virou linhas curvas em SVG com movimento contínuo. Textos entram com deslocamento e opacidade, fonte mais comportada (Inter), botões menores no desktop.

**Bloco 2 — Serviços.** Cinco serviços em cartões com foto, organizados em grade, com o ar-condicionado realista na divisa entre o hero e o bloco, com “R22 Ar Condicionado” escrito sobre o aparelho em azul. Informação de atendimento residencial, comercial e industrial. Primeiro as fotos eram ilustrações; o cliente pediu fotos realistas de técnico com uniforme, com cara de registro de obra feito no celular — foram geradas nesse padrão. Títulos internos dos cartões (“Preventiva em dia”, “Carga e vazamentos”) foram removidos: só nome do serviço e uma linha de descrição.

**Bloco 3 — Como funciona.** Simplificado ao máximo: contato no WhatsApp e visita para orçamento, com **GRATUITA** em caixa alta. Botão de WhatsApp maior.

**Bloco 4 — Orçamento e área atendida.** Faixa escura de chamada e mapa do estado de São Paulo com pontos de atendimento (capital e litoral, depois interior).

**Bloco 5 — Dúvidas e rodapé.** Acordeão com cinco perguntas, rodapé com navegação, contato e créditos.

## Rodada de renovação visual (branco + azul)

O cliente pediu mais branco no site. As seções de conteúdo passaram a ser cartões brancos sobre fundo cinza-azulado claro; o azul ficou em títulos, ícones e detalhes; o escuro só nas faixas de impacto. Nessa rodada entraram: sinais de manutenção, “Sobre nós” enxuto, faixa de marcas parceiras e botão fixo de WhatsApp.

## Rodada 2 — WhatsApp, sinais, marcas e Google

- Número de WhatsApp confirmado: **(11) 94241-8489**.
- Seção de sinais redesenhada em versão enxuta, com referência visual enviada pelo cliente.
- Marcas parceiras só com as logos (sem nome embaixo).
- Bloco de avaliações do Google: símbolo do Google, nota subindo de 0,0 a 5,0, cinco estrelas e comentários em carrossel com setas.
- “Sobre nós” reduzido.

## Rodada 3 — benefícios, mascote e aparelho realista

- Benefícios (“Conta de luz menor”, “Ar mais limpo em casa”, “Aparelho dura mais”) voltaram para a seção de sinais, ao lado das dores.
- Pinguim mascote pequeno no rodapé.
- O ar-condicionado da divisa deixou de ser ilustração e virou imagem realista de aparelho split.

## Rodada 4 — pagamentos e cabeçalho fixo

- Formas de pagamento no rodapé: Visa, Mastercard, American Express, Hipercard, Diners, Elo e Pix.
- Cabeçalho fixo com fundo translúcido e mudança de estado ao rolar.

## Rodada 5 — GitHub Pages

- Repositório público na conta `aurumscale-beep`, primeiro como `r22ar`, depois renomeado para **`004-r22ar`**.
- Publicação a partir da branch `main`, na raiz.
- Como o envio achatava as pastas, o repositório passou a ter todos os arquivos na raiz com prefixos (`img-*`, `img-marcas-*`, `img-pag-*`, `fonts-*`) e as referências foram reescritas.
- `README.md` explicando a estrutura.

## Rodada 6 — Equipamentos e todas as marcas

- Nova seção `#tipos`: “Todos os tipos de ar-condicionado, em todas as marcas”, com split de parede, piso-teto, cassete, multi-split, dutado, VRF/VRV, janela e o cartão escuro “Outro modelo?”.
- Nova aba “Equipamentos” no menu e no rodapé, com aba ativa acompanhando a rolagem.
- Faixa de marcas reordenada começando em Daikin, LG e Fujitsu, com nota “Trabalhamos com todas as marcas do mercado”.

## Rodada 7 — fotos nos cartões de equipamento

- Os ícones desenhados foram trocados por fotos de produto (aparelho branco, fundo claro, 16:10, webp).
- Publicado no Manus e no GitHub Pages.

## Rodada 8 — domínio próprio e HTTPS

- Diagnóstico: DNS correto no Registro.br (quatro registros A no apex e CNAME `www`), mas a verificação do GitHub Pages estava travada em “in progress” desde 17/11, então o certificado nunca foi emitido e o site servia o certificado `*.github.io` — daí o aviso de segurança.
- Correção: domínio personalizado removido e adicionado de novo (verificação passou para “DNS check successful”), o que disparou a emissão do certificado Let's Encrypt (válido até 16/02/2027, com `www` no SAN). “Enforce HTTPS” ligado e deploy reexecutado.
- Testes finais: apex em HTTPS 200 sem aviso, `www` redirecionando, HTTP redirecionando para HTTPS.

## Rodada 9 — interior de São Paulo e calculadora de BTUs

- Mapa ganhou 11 pontos no interior (São José do Rio Preto, Ribeirão Preto, Franca, Araçatuba, Bauru, Marília, Presidente Prudente, Piracicaba, Campinas, Sorocaba e São José dos Campos) e o rótulo “Interior de São Paulo”. Todos os textos de cobertura passaram a citar capital, litoral e interior.
- Primeira versão da calculadora de BTUs, com coeficientes em `config.js` e validações em português.

## Rodada 10 — calculadora com a identidade do site

- Seção em duas colunas: explicação editorial sobre fundo escuro e cartão branco com o formulário.
- Campos numerados de 01 a 05, resultado em ficha escura com estimativa grande e capacidade em pílula azul.
- Responsivo em 1080 px e 760 px, alvos de toque de 56 px.

## Rodada 11 — conta igual à da Climatize

- Fórmula copiada do componente `CalculadoraBTU` do site da Climatize, extraída do bundle Vue.
- Pessoas passaram a contar todas; sol virou valor fixo de 800 BTU/h; janelas ficaram com coeficiente zero.
- Incidência solar virou `<select>` com as opções deles e ícones extraídos do site da Climatize, recoloridos no azul da marca.
- Lista de capacidades ampliada até 60.000 BTU/h.
- Publicado no Manus (deploy 70549729) e no GitHub Pages (commit 450d006).

## Pendências de conteúdo (com o cliente)

- Os depoimentos do Google são genéricos; trocar por avaliações reais quando o cliente enviar.
- Confirmar o que entra exatamente no serviço de manutenção.
- Confirmar se as marcas são parceiras oficiais ou apenas marcas com as quais a empresa trabalha.
- Não há endereço, horário de funcionamento nem e-mail no site — se o cliente quiser, é conteúdo novo a incluir.

## Rodada 12 — pacote completo para download

O cliente pediu um pacote para guardar e para outra IA reproduzir o projeto. Foram montadas as pastas `site/`, `site-github-pages/`, `documentos/`, `capturas/` e `originais/`, com oito documentos técnicos, capturas do site, um vídeo de navegação e o ZIP final.

## Rodada 13 — capacidade sugerida presa na tela

O cliente reparou que, ao simular um ambiente grande (estimativa 67.200 BTU/h), o cartão mostrava **ao mesmo tempo** “Capacidade sugerida 9.000 BTU/h” e o aviso de que a estimativa passava de 60.000 BTU/h. Era um bug real, não só estética.

Causa: a pílula da capacidade tem `display: inline-flex` na classe `.calc__res-cap`, e o `display` da classe vence o `[hidden]` do navegador. Resultado: ela continuava visível com o valor do cálculo anterior, porque o JavaScript só escondia via atributo e nunca limpava o texto.

Correção: regra global `[hidden] { display: none !important; }` no topo do `styles.css`; `calculadora.js` passou a limpar `calc-cap` e `calc-obs` na troca de estado; e entrou uma nota discreta embaixo da pílula (“Menor capacidade da linha que cobre a estimativa.”) para deixar claro por que 15.200 BTU/h viram 18.000. Versões novas: `styles.css?v=49` e `calculadora.js?v=3`. Publicado no Manus (deploy 70404607) e no GitHub Pages (commit 4b05149).
