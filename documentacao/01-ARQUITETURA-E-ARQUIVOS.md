# 01 — Arquitetura e arquivos

## Visão geral

Landing page única, estática, sem framework e sem build. Três arquivos de JavaScript, um de CSS, um de HTML e imagens/fontes locais. Abrir `index.html` já funciona; para simular produção use um servidor estático simples.

```
site/
├── index.html                 página inteira (cerca de 1.000 linhas, seções em sequência)
├── manus-routes.json          rotas de publicação da hospedagem Manus (cache/headers)
└── assets/
    ├── css/styles.css         todos os estilos, organizados por seção (≈3.800 linhas)
    ├── js/
    │   ├── config.js          ÚNICO arquivo que o cliente precisa editar
    │   ├── app.js             menu, animações de entrada, contadores, carrossel, FAQ, header
    │   └── calculadora.js     calculadora de BTUs (validação, conta, mensagem do WhatsApp)
    ├── fonts/
    │   ├── inter-latin.woff2        texto corrido e títulos (variável, 100–900) — única fonte ativa
    │   └── didact-gothic-latin.woff2  arquivo herdado das primeiras versões, sem @font-face no CSS
    └── img/
        ├── hero-bg.jpg / -portrait / -mobile   fundo do topo nas três proporções
        ├── ac-unit.webp                        ar-condicionado realista da divisa dos blocos
        ├── servico-instalacao.jpg · servico-limpeza.jpg · servico-manutencao.jpg
        ├── servico-conserto.jpg · servico-recarga.jpg
        ├── como-tecnico.jpg/.webp · como-whats.jpg · tecnico-r22.webp
        ├── sinais-ac.jpg/.webp
        ├── tipos/ (split-parede, piso-teto, cassete, multi-split, dutado, vrf, janela)
        ├── marcas/ (12 logos: daikin, lg, fujitsu, samsung, midea, gree, carrier, elgin, consul, electrolux, tcl, philco)
        ├── pagamentos/ (visa, mastercard, amex, hipercard, diners, elo, pix)
        ├── icones/ (area, pessoas, janelas, eletronicos, sol — calculadora)
        ├── mapa-brasil.svg                      mapa com os pontos de atendimento
        ├── logo-r22-aco.png · logo-r22-branco.png · mascote-pinguim.png · favicon-256.png
```

## Ordem das seções no `index.html`

1. **Header fixo** — logo, menu (Início, Serviços, Calculadora, Equipamentos, Sinais, Sobre, Dúvidas), botão de WhatsApp e menu do celular.
2. **Hero** (`#topo`) — título “Instalação, manutenção e higienização de ar-condicionado”, botões de serviço e animação do ar saindo do aparelho.
3. **Serviços** (`#servicos`) — ar-condicionado realista na divisa, título “Soluções completas em ar-condicionado”, pílulas RESIDENCIAL / COMERCIAL / INDUSTRIAL e cinco cartões com foto.
4. **Calculadora de BTUs** (`#calculadora`) — coluna escura com a explicação da conta e cartão branco com o formulário.
5. **Equipamentos** (`#tipos`) — sete tipos de aparelho com foto de produto e cartão “Outro modelo?”.
6. **Como funciona** (`#como-funciona`) — cartão branco com o atendimento em três passos, com “GRATUITA” em destaque.
7. **Sinais** (`#sinais`) — dores e benefícios de manter o ar em dia, com foto e botão.
8. **Orçamento** (`#orcamento`) — faixa escura com o mapa de cobertura (capital, litoral e interior) e a chamada para o WhatsApp.
9. **Sobre** (`#sobre`) — história, números e valores da empresa.
10. **Marcas parceiras** (`.marcas`) — faixa com as 12 logos.
11. **Avaliações do Google** (`.google`) — nota 5,0 com contador e comentários em carrossel.
12. **Dúvidas** (`#duvidas`) — acordeão com as perguntas frequentes.
13. **Rodapé** (`#contato`) — navegação, contato, formas de pagamento, mascote pinguim e créditos.

## Comportamentos em `app.js`

- Menu do celular (abre/fecha, fecha ao clicar em um link).
- Header que muda de aparência ao rolar.
- Animações de entrada (`data-reveal`) com `IntersectionObserver`.
- Aba ativa do menu acompanhando a rolagem.
- Contador da nota do Google subindo de 0 até 5,0.
- Carrossel de comentários com setas.
- Acordeão das dúvidas frequentes.
- Botão fixo de WhatsApp.

## Convenções

- IDs e classes em português (`calc`, `campo`, `stepper`, `sol`, `mapa`, `rodape`).
- CSS em blocos comentados por seção, na mesma ordem do HTML.
- Nada de dependência externa: sem CDN, sem Google Fonts, sem jQuery.
- Imagens sempre com `width`/`height` ou proporção definida para não pular layout.
- `prefers-reduced-motion` respeitado nas animações principais.
1. **Header fixo** — logo, menu (Início, Serviços, Equipamentos, Como funciona, Sinais, Dúvidas, Contato), botão “Fale conosco” e menu do celular.
