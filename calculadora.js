/* ==========================================================================
   R22 Ar Condicionado — Calculadora de BTUs
   A conta é a mesma da calculadora da Climatize:
     área × 600 + pessoas × 600 + eletrônicos × 600 + (sol ? 800 : 0)
   Janelas aparecem no resumo, mas não somam BTU/h.
   Os coeficientes e a lista de capacidades ficam em config.js.
   ========================================================================== */

(function () {
  "use strict";

  var form = document.getElementById("calc-form");
  if (!form) return;

  var config = window.R22_CONFIG || {};
  var whatsapp = config.whatsapp || {};
  var regra = config.btus || {};

  var COEF_M2 = numero(regra.porMetroQuadrado, 600);
  var COEF_PESSOA = numero(regra.porPessoa, 600);
  var COEF_ELETRONICO = numero(regra.porEletronico, 600);
  var COEF_JANELA = numero(regra.porJanela, 0);
  var ADICIONAL_SOL = numero(regra.adicionalSol, 800);
  var CAPACIDADES = (regra.capacidades || [7000, 9000, 12000, 18000, 22000, 24000, 30000, 36000])
    .map(function (v) {
      return numero(v, 0);
    })
    .filter(function (v) {
      return v > 0;
    })
    .sort(function (a, b) {
      return a - b;
    });

  var campoArea = document.getElementById("calc-area");
  var campoPessoas = document.getElementById("calc-pessoas");
  var campoJanelas = document.getElementById("calc-janelas");
  var campoEletronicos = document.getElementById("calc-eletronicos");
  var campoSol = document.getElementById("calc-sol");
  var resultado = document.getElementById("calc-resultado");
  var saidaBtu = document.getElementById("calc-btu");
  var saidaCap = document.getElementById("calc-cap");
  var linhaCap = document.getElementById("calc-cap-linha");
  var saidaObs = document.getElementById("calc-obs");
  var botaoWhats = document.getElementById("calc-wa");

  function numero(valor, padrao) {
    var n = parseFloat(valor);
    return isFinite(n) ? n : padrao;
  }

  function formatar(valor) {
    return Math.round(valor).toLocaleString("pt-BR");
  }

  function erro(id, mensagem) {
    var alvo = document.getElementById(id);
    if (alvo) alvo.textContent = mensagem || "";
    var campo = document.getElementById(id.replace("-erro", ""));
    var bloco = campo ? campo.closest(".campo") : null;
    if (bloco) bloco.classList.toggle("campo--invalido", Boolean(mensagem));
    if (campo && campo.setAttribute) {
      if (mensagem) campo.setAttribute("aria-invalid", "true");
      else campo.removeAttribute("aria-invalid");
    }
    return Boolean(mensagem);
  }

  /* Lê a área aceitando vírgula ou ponto */
  function lerArea(texto) {
    var limpo = String(texto || "")
      .replace(/\s/g, "")
      .replace(/[^\d.,-]/g, "");
    if (!limpo) return { erro: "Informe a área do ambiente (ex.: 15,5)." };
    if (limpo.indexOf("-") > -1) return { erro: "A área não pode ser negativa." };
    if (limpo.indexOf(",") > -1 && limpo.indexOf(".") > -1) {
      limpo = limpo.replace(/\./g, "").replace(",", ".");
    } else {
      limpo = limpo.replace(",", ".");
    }
    if (!/^\d*\.?\d*$/.test(limpo) || limpo === ".") {
      return { erro: "Use apenas números, com vírgula ou ponto (ex.: 15,5)." };
    }
    var valor = parseFloat(limpo);
    if (!isFinite(valor)) return { erro: "Use apenas números, com vírgula ou ponto (ex.: 15,5)." };
    if (valor <= 0) return { erro: "A área precisa ser maior que zero." };
    if (valor > 2000) return { erro: "Confira a área: o valor parece alto demais." };
    return { valor: valor };
  }

  function lerInteiro(campo, minimo, mensagem) {
    var bruto = String(campo.value || "").trim();
    if (!bruto) return { erro: mensagem };
    if (!/^\d+$/.test(bruto)) return { erro: "Use apenas números inteiros." };
    var valor = parseInt(bruto, 10);
    if (valor < minimo) return { erro: mensagem };
    return { valor: valor };
  }

  /* Botões de menos e mais dos campos de quantidade */
  Array.prototype.forEach.call(document.querySelectorAll(".stepper__btn"), function (botao) {
    botao.addEventListener("click", function () {
      var campo = document.getElementById(botao.getAttribute("data-alvo"));
      if (!campo) return;
      var passo = parseInt(botao.getAttribute("data-passo"), 10) || 0;
      var minimo = parseInt(campo.getAttribute("min"), 10);
      if (!isFinite(minimo)) minimo = 0;
      var atual = parseInt(campo.value, 10);
      if (!isFinite(atual)) atual = minimo;
      var novo = atual + passo;
      if (novo < minimo) novo = minimo;
      campo.value = String(novo);
      campo.dispatchEvent(new Event("input", { bubbles: true }));
    });
  });

  /* Normaliza os campos de quantidade ao sair */
  [campoPessoas, campoJanelas, campoEletronicos].forEach(function (campo) {
    if (!campo) return;
    campo.addEventListener("blur", function () {
      var minimo = parseInt(campo.getAttribute("min"), 10);
      if (!isFinite(minimo)) minimo = 0;
      var bruto = String(campo.value || "").trim();
      // Só corrige quando o campo fica vazio ou com algo que não é número.
      // Valores abaixo do mínimo continuam visíveis para a validação avisar.
      if (!bruto || !/^-?\d+$/.test(bruto)) {
        campo.value = String(minimo);
      }
    });
  });

  var ROTULOS_SOL = {
    "nao-tem": "não tem sol direto",
    manha: "sol pela manhã",
    tarde: "sol pela tarde",
    "dia-todo": "sol o dia todo",
  };

  function textoDoSol(valor) {
    return ROTULOS_SOL[valor] || "incidência solar não informada";
  }

  function montarMensagem(dados) {
    var partes = [];
    partes.push("Ambiente: " + dados.areaTexto + " m²");
    partes.push(dados.pessoas + (dados.pessoas === 1 ? " pessoa" : " pessoas"));
    partes.push(dados.eletronicos + (dados.eletronicos === 1 ? " eletrônico" : " eletrônicos"));
    partes.push(dados.janelas + (dados.janelas === 1 ? " janela" : " janelas"));
    partes.push(dados.solTexto);
    var texto =
      "Olá! Fiz a simulação no site e gostaria de um orçamento de instalação. " +
      partes.join(", ") +
      ". Estimativa: " +
      formatar(dados.btu) +
      " BTU/h.";
    if (dados.capacidade) {
      texto += " Capacidade sugerida: " + formatar(dados.capacidade) + " BTU/h.";
    } else {
      texto += " Preciso de uma avaliação técnica para definir a capacidade.";
    }
    return texto;
  }

  function linkWhatsApp(mensagem) {
    var numero = String(whatsapp.number || "").replace(/\D/g, "");
    var base = numero ? "https://wa.me/" + numero : "https://wa.me/";
    return base + "?text=" + encodeURIComponent(mensagem);
  }

  form.addEventListener("submit", function (evento) {
    evento.preventDefault();

    var area = lerArea(campoArea.value);
    var pessoas = lerInteiro(campoPessoas, 1, "Informe pelo menos 1 pessoa.");
    var janelas = lerInteiro(campoJanelas, 0, "O número não pode ser negativo.");
    var eletronicos = lerInteiro(campoEletronicos, 0, "O número não pode ser negativo.");
    var sol = String(campoSol.value || "");

    var temErro = false;
    temErro = erro("calc-area-erro", area.erro) || temErro;
    temErro = erro("calc-pessoas-erro", pessoas.erro) || temErro;
    temErro = erro("calc-janelas-erro", janelas.erro) || temErro;
    temErro = erro("calc-eletronicos-erro", eletronicos.erro) || temErro;
    temErro = erro("calc-sol-erro", sol ? "" : "Escolha a incidência solar do ambiente.") || temErro;

    if (temErro) {
      resultado.hidden = true;
      var primeiroInvalido = form.querySelector(".campo--invalido input, .campo--invalido select");
      if (primeiroInvalido) primeiroInvalido.focus();
      return;
    }

    // Mesma conta da Climatize: sol soma um valor fixo, exceto quando não tem sol.
    var btu =
      area.valor * COEF_M2 +
      pessoas.valor * COEF_PESSOA +
      eletronicos.valor * COEF_ELETRONICO +
      janelas.valor * COEF_JANELA +
      (sol !== "nao-tem" ? ADICIONAL_SOL : 0);

    // Recomenda a menor capacidade acima da estimativa (como na Climatize).
    var capacidade = null;
    for (var i = 0; i < CAPACIDADES.length; i += 1) {
      if (CAPACIDADES[i] > btu) {
        capacidade = CAPACIDADES[i];
        break;
      }
    }

    var maior = CAPACIDADES.length ? CAPACIDADES[CAPACIDADES.length - 1] : 0;

    saidaBtu.textContent = formatar(btu);

    if (capacidade) {
      saidaCap.textContent = formatar(capacidade) + " BTU/h";
      linhaCap.hidden = false;
      saidaObs.hidden = true;
    } else {
      linhaCap.hidden = true;
      saidaObs.hidden = false;
      saidaObs.textContent =
        "Acima da maior capacidade da lista (" +
        formatar(maior) +
        " BTU/h). Fale com a gente para uma avaliação técnica.";
    }

    var dados = {
      areaTexto: area.valor.toLocaleString("pt-BR", { maximumFractionDigits: 1 }),
      pessoas: pessoas.valor,
      eletronicos: eletronicos.valor,
      janelas: janelas.valor,
      solTexto: textoDoSol(sol),
      btu: btu,
      capacidade: capacidade,
    };

    botaoWhats.setAttribute("href", linkWhatsApp(montarMensagem(dados)));

    resultado.hidden = false;
    if (resultado.scrollIntoView) {
      var reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      resultado.scrollIntoView({ behavior: reduzir ? "auto" : "smooth", block: "nearest" });
    }
  });

  /* Limpa o erro do campo assim que a pessoa corrige */
  [campoArea, campoPessoas, campoJanelas, campoEletronicos, campoSol].forEach(function (campo) {
    if (!campo) return;
    campo.addEventListener("input", function () {
      var bloco = campo.closest(".campo");
      if (!bloco) return;
      var idErro = bloco.querySelector(".campo__erro");
      if (idErro) idErro.textContent = "";
      bloco.classList.remove("campo--invalido");
      campo.removeAttribute("aria-invalid");
    });
  });

  if (campoSol) {
    campoSol.addEventListener("change", function () {
      erro("calc-sol-erro", "");
    });
  }
})();
