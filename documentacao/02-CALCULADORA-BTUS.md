# 02 — Calculadora de BTUs

## De onde veio a conta

A calculadora foi copiada da calculadora de BTUs da **Climatize** (https://www.lojaclimatize.com.br/climatizacao/btus/). O site deles é feito em Vue 3; a lógica do componente `CalculadoraBTU` foi extraída do bundle `index-DMNEnpEa.js`, e o código equivalente é este:

```js
// lógica original da Climatize, sem as camadas de interface
const area = parseFloat(areaInformada);       // m²
const pessoas = parseInt(qtdPessoas, 10);
const eletronicos = parseInt(qtdEletronicos, 10);

let btu = area * 600;                          // 600 BTU/h por m²
btu += pessoas * 600;                          // 600 BTU/h por pessoa
btu += eletronicos * 600;                      // 600 BTU/h por eletrônico
if (sol !== "nao-tem") btu += 800;             // sol (manhã, tarde ou dia todo) soma 800

// janelas não entram na conta
```

Pontos que costumam ser implementados errado e aqui estão iguais aos deles:

- **Janelas não somam BTU.** O campo existe, aparece no resumo e na mensagem, mas o coeficiente é `0`.
- **Sol é um valor fixo de 800 BTU/h**, não um percentual, e **só quando existe** incidência. “Não tem” não soma nada; “Manhã”, “Tarde” e “Dia todo” somam os mesmos 800.
- **Pessoas contam todas**, inclusive a primeira. Não existe “a primeira pessoa não conta”.
- **O resultado não é arredondado para a capacidade comercial.** Primeiro calcula-se o número exato (ex.: 10.200 BTU/h) e só depois escolhe-se a capacidade.

## Regra de escolha da capacidade

Percorre-se a lista de capacidades comerciais em ordem crescente e escolhe-se a **primeira estritamente maior** que a estimativa:

```js
var capacidade = null;
for (var i = 0; i < CAPACIDADES.length; i += 1) {
  if (CAPACIDADES[i] > btu) { capacidade = CAPACIDADES[i]; break; }
}
```

Lista usada (`config.js` → `btus.capacidades`):

```
7000 · 9000 · 12000 · 18000 · 22000 · 24000 · 30000 · 36000 · 48000 · 60000
```

Se a estimativa passar de 60.000 BTU/h, nenhuma capacidade é sugerida e aparece: “Acima da maior capacidade da lista (60.000 BTU/h). Fale com a gente para uma avaliação técnica.”

## Coeficientes em `config.js`

```js
btus: {
  porMetroQuadrado: 600,
  porPessoa: 600,
  porEletronico: 600,
  porJanela: 0,
  adicionalSol: 800,
  capacidades: [7000, 9000, 12000, 18000, 22000, 24000, 30000, 36000, 48000, 60000]
}
```

## Campos e identificadores (contrato com o HTML)

| Campo | `id` | Tipo | Regra |
|---|---|---|---|
| Área | `calc-area` | texto | aceita vírgula ou ponto, até 1 casa decimal na mensagem, 0 < área ≤ 2000 |
| Pessoas | `calc-pessoas` | número + stepper | mínimo 1 |
| Janelas | `calc-janelas` | número + stepper | mínimo 0 |
| Eletrônicos | `calc-eletronicos` | número + stepper | mínimo 0 |
| Incidência solar | `calc-sol` | `<select>` | obrigatório, não pode ficar no valor vazio |
| Erro de cada campo | `calc-<campo>-erro` | `<p>` | texto vazio = campo válido |
| Resultado | `calc-resultado` | bloco | `hidden` até o primeiro cálculo válido |
| Estimativa | `calc-btu` | texto | número com separador de milhar pt-BR |
| Capacidade | `calc-cap` | texto | “12.000 BTU/h” |
| Linha da capacidade | `calc-cap-linha` | bloco | escondida quando não há sugestão |
| Observação | `calc-obs` | texto | aviso de avaliação técnica |
| Botão do WhatsApp | `calc-wa` | `<a>` | `href` recriado a cada cálculo |

Formulário: `id="calc-form"`. Botões de mais e menos: `.stepper__btn` com `data-alvo` (id do campo) e `data-passo` (+1 / −1).

Opções do select de sol (valor → rótulo exibido):

```
""          → Selecione a incidência
nao-tem     → Não tem
manha       → Manhã
tarde       → Tarde
dia-todo    → Dia todo
```

## Validações e mensagens

| Situação | Mensagem |
|---|---|
| Área vazia | Informe a área do ambiente (ex.: 15,5). |
| Área negativa | A área não pode ser negativa. |
| Área com letras/símbolos | Use apenas números, com vírgula ou ponto (ex.: 15,5). |
| Área zero | A área precisa ser maior que zero. |
| Área acima de 2000 | Confira a área: o valor parece alto demais. |
| Pessoas vazia ou 0 | Informe pelo menos 1 pessoa. |
| Janelas/eletrônicos negativos | O número não pode ser negativo. |
| Quantidade com decimal | Use apenas números inteiros. |
| Sol não escolhido | Escolha a incidência solar do ambiente. |

Comportamentos de apoio:

- Ao sair de um campo de quantidade vazio ou com texto, o valor volta para o mínimo (0, ou 1 em pessoas).
- O erro some assim que a pessoa digita ou troca o select.
- Com erro, o resultado anterior é escondido e o foco vai para o primeiro campo inválido.
- `aria-invalid="true"` é aplicado no campo com erro e a classe `.campo--invalido` pinta a borda.

## Mensagem enviada ao WhatsApp

Modelo montado em `montarMensagem()`:

```
Olá! Fiz a simulação no site e gostaria de um orçamento de instalação. Ambiente: 15 m², 2 pessoas, 0 eletrônicos, 0 janelas, sol pela manhã. Estimativa: 11.000 BTU/h. Capacidade sugerida: 12.000 BTU/h.
```

Sem capacidade sugerida, a última frase vira: “Preciso de uma avaliação técnica para definir a capacidade.”

O link é `https://wa.me/5511942418489?text=<mensagem codificada>`; o número vem de `config.js` → `whatsapp.number`.

## Testes de referência

Todos executados no domínio publicado:

| Área | Pessoas | Janelas | Eletrônicos | Sol | Estimativa | Capacidade |
|---|---|---|---|---|---|---|
| 15 | 2 | 0 | 0 | não tem | 10.200 | 12.000 |
| 15 | 2 | 0 | 0 | manhã | 11.000 | 12.000 |
| 15 | 2 | 0 | 1 | dia todo | 11.600 | 12.000 |
| 20 | 3 | 2 | 1 | tarde | 15.200 | 18.000 |
| 15,5 | 2 | 0 | 0 | não tem | 10.500 | 12.000 |
| 60 | 4 | 3 | 2 | — | 40.400 | 48.000 |

Conferência da primeira linha: `15×600 = 9.000` + `2×600 = 1.200` → 10.200, sem adicional de sol. A capacidade é 12.000 porque é a primeira da lista acima de 10.200 (9.000 não serve).

## Ícones

Os cinco ícones dos campos (área, pessoas, janelas, eletrônicos, sol) foram extraídos do site da Climatize e recolori­dos de `#414141` para o azul da marca, `#1a6f9c`. Estão em `site/assets/img/icones/` como SVG e os originais ficam em `originais/referencias/`.
