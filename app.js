/* ==========================================================================
   R22 Ar Condicionado — Home
   ========================================================================== */

(function () {
  "use strict";

  const config = window.R22_CONFIG || {};
  const whatsapp = config.whatsapp || {};

  /* ---------------------------------------------------------------------
     WhatsApp: monta o link com a mensagem padrão
     --------------------------------------------------------------------- */
  function buildWhatsAppUrl() {
    const number = String(whatsapp.number || "").replace(/\D/g, "");
    const text = encodeURIComponent(whatsapp.message || "");
    const base = number ? "https://wa.me/" + number : "https://wa.me/";
    return text ? base + "?text=" + text : base;
  }

  document.querySelectorAll("[data-whatsapp]").forEach(function (link) {
    link.setAttribute("href", buildWhatsAppUrl());
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer");
  });

  /* ---------------------------------------------------------------------
     Rolagem suave para âncoras existentes (blocos futuros)
     --------------------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]:not([data-whatsapp])').forEach(function (link) {
    link.addEventListener("click", function (event) {
      const id = link.getAttribute("href");
      if (!id || id === "#") {
        event.preventDefault();
        return;
      }
      const target = document.querySelector(id);
      if (!target) {
        event.preventDefault();
        return;
      }
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      closeMenu();
    });
  });

  /* ---------------------------------------------------------------------
     Menu móvel
     --------------------------------------------------------------------- */
  const burger = document.querySelector(".burger");
  const mobileMenu = document.getElementById("mobileMenu");

  function closeMenu() {
    if (!burger || !mobileMenu) return;
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Abrir menu");
    mobileMenu.hidden = true;
  }

  if (burger && mobileMenu) {
    burger.addEventListener("click", function () {
      const open = burger.getAttribute("aria-expanded") === "true";
      burger.setAttribute("aria-expanded", String(!open));
      burger.setAttribute("aria-label", open ? "Abrir menu" : "Fechar menu");
      mobileMenu.hidden = open;
    });

    mobileMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    window.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeMenu();
    });
  }

  /* ---------------------------------------------------------------------
     Ar animado alinhado à foto (object-fit: cover)
     --------------------------------------------------------------------- */
  const photo = document.querySelector(".hero__photo");
  const air = document.getElementById("heroAir");

  function fitAirLayer() {
    if (!photo || !air || !photo.naturalWidth) return;

    const box = photo.getBoundingClientRect();
    const nw = photo.naturalWidth;
    const nh = photo.naturalHeight;
    if (!box.width || !box.height) return;

    const scale = Math.max(box.width / nw, box.height / nh);
    const dw = nw * scale;
    const dh = nh * scale;

    const position = getComputedStyle(photo).objectPosition.split(" ");
    const px = parseFloat(position[0]) / 100;
    const py = parseFloat(position[1] || position[0]) / 100;
    const ratioX = Number.isFinite(px) ? px : 0.5;
    const ratioY = Number.isFinite(py) ? py : 0.5;

    air.style.left = (box.left - air.parentElement.getBoundingClientRect().left) + (box.width - dw) * ratioX + "px";
    air.style.top = (box.top - air.parentElement.getBoundingClientRect().top) + (box.height - dh) * ratioY + "px";
    air.style.width = dw + "px";
    air.style.height = dh + "px";
  }

  if (photo) {
    photo.addEventListener("load", fitAirLayer);
    if (photo.complete) {
      fitAirLayer();
    } else {
      photo.addEventListener("load", fitAirLayer);
    }

    window.addEventListener("resize", fitAirLayer);
    window.addEventListener("orientationchange", fitAirLayer);

    if ("ResizeObserver" in window) {
      const observer = new ResizeObserver(fitAirLayer);
      observer.observe(photo);
    }
  }
})();


/* Revelação dos blocos ao rolar a página */
(function () {
  var itens = document.querySelectorAll("[data-reveal]");
  if (!itens.length) return;

  var reduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduzido || !("IntersectionObserver" in window)) {
    itens.forEach(function (el) { el.classList.add("is-in"); });
    return;
  }

  var observador = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada) {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("is-in");
        observador.unobserve(entrada.target);
      }
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.01 });

  itens.forEach(function (el) { observador.observe(el); });
})();

/* Dúvidas frequentes — acordeão com uma resposta aberta por vez */
(function () {
  var botoes = document.querySelectorAll(".faq__btn");
  if (!botoes.length) return;

  var reduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function painelDe(botao) {
    return document.getElementById(botao.getAttribute("aria-controls"));
  }

  function abrir(botao) {
    var painel = painelDe(botao);
    if (!painel) return;
    botao.setAttribute("aria-expanded", "true");
    painel.style.height = painel.scrollHeight + "px";
    if (reduzido) {
      painel.style.height = "auto";
      return;
    }
    painel.addEventListener("transitionend", function fim(evento) {
      if (evento.target !== painel || evento.propertyName !== "height") return;
      painel.removeEventListener("transitionend", fim);
      if (botao.getAttribute("aria-expanded") === "true") painel.style.height = "auto";
    });
  }

  function fechar(botao) {
    var painel = painelDe(botao);
    if (!painel) return;
    botao.setAttribute("aria-expanded", "false");
    if (reduzido) {
      painel.style.height = "";
      return;
    }
    painel.style.height = painel.scrollHeight + "px";
    void painel.offsetHeight;
    painel.style.height = "0px";
    painel.addEventListener("transitionend", function fim(evento) {
      if (evento.target !== painel || evento.propertyName !== "height") return;
      painel.removeEventListener("transitionend", fim);
      if (botao.getAttribute("aria-expanded") === "false") painel.style.height = "";
    });
  }

  botoes.forEach(function (botao) {
    botao.addEventListener("click", function () {
      var aberto = botao.getAttribute("aria-expanded") === "true";
      botoes.forEach(function (outro) {
        if (outro !== botao && outro.getAttribute("aria-expanded") === "true") fechar(outro);
      });
      if (aberto) {
        fechar(botao);
      } else {
        abrir(botao);
      }
    });
  });

  /* Mantém a altura correta se a largura mudar com uma resposta aberta */
  window.addEventListener("resize", function () {
    botoes.forEach(function (botao) {
      var painel = painelDe(botao);
      if (painel && botao.getAttribute("aria-expanded") === "true") painel.style.height = "auto";
    });
  });
})();

/* Ano automático no rodapé */
(function () {
  var anos = document.querySelectorAll(".rodape__ano");
  if (!anos.length) return;
  var ano = String(new Date().getFullYear());
  anos.forEach(function (el) {
    el.textContent = ano;
  });
})();

/* ==========================================================================
   Avaliações do Google — contador da nota e roleta de comentários
   ========================================================================== */
(function () {
  var numero = document.querySelector(".google__numero");
  var cheia = document.querySelector(".google__estrelas-cheia");
  if (!numero) return;

  var alvo = parseFloat(numero.getAttribute("data-nota") || "5");
  var reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var animou = false;

  function formatar(v) {
    return v.toFixed(1).replace(".", ",");
  }

  function animar() {
    if (animou) return;
    animou = true;
    if (reduzir) {
      numero.textContent = formatar(alvo);
      if (cheia) cheia.style.width = "100%";
      return;
    }
    var inicio = null;
    var duracao = 1400;
    function passo(ts) {
      if (inicio === null) inicio = ts;
      var t = Math.min(1, (ts - inicio) / duracao);
      var suave = 1 - Math.pow(1 - t, 3);
      var valor = alvo * suave;
      numero.textContent = formatar(valor);
      if (cheia) cheia.style.width = (suave * 100).toFixed(2) + "%";
      if (t < 1) {
        requestAnimationFrame(passo);
      } else {
        numero.textContent = formatar(alvo);
        if (cheia) cheia.style.width = "100%";
      }
    }
    requestAnimationFrame(passo);
  }

  if ("IntersectionObserver" in window) {
    var obs = new IntersectionObserver(
      function (entradas) {
        entradas.forEach(function (e) {
          if (e.isIntersecting) {
            animar();
            obs.disconnect();
          }
        });
      },
      { threshold: 0.35 }
    );
    obs.observe(numero);
  } else {
    animar();
  }

  /* Roleta de comentários */
  var janela = document.querySelector(".google__janela");
  var setas = document.querySelectorAll(".google__seta");
  if (!janela || !setas.length) return;

  function passoAtual() {
    var card = janela.querySelector(".comentario");
    if (!card) return 0;
    var estilo = getComputedStyle(janela.querySelector(".google__trilha"));
    var gap = parseFloat(estilo.columnGap || estilo.gap || "0") || 0;
    return card.getBoundingClientRect().width + gap;
  }

  function ir(direcao) {
    var passo = passoAtual();
    var max = janela.scrollWidth - janela.clientWidth;
    var destino = janela.scrollLeft + direcao * passo;
    if (destino > max + 4) destino = 0;
    if (destino < -4) destino = max;
    janela.scrollTo({ left: destino, behavior: reduzir ? "auto" : "smooth" });
  }

  setas.forEach(function (seta) {
    seta.addEventListener("click", function () {
      ir(parseInt(seta.getAttribute("data-dir"), 10) || 1);
    });
  });

  if (reduzir) return;
  var timer = null;
  function iniciar() {
    parar();
    timer = setInterval(function () {
      ir(1);
    }, 6000);
  }
  function parar() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }
  janela.addEventListener("mouseenter", parar);
  janela.addEventListener("mouseleave", iniciar);
  janela.addEventListener("focusin", parar);
  janela.addEventListener("touchstart", parar, { passive: true });
  if ("IntersectionObserver" in window) {
    var obsRoleta = new IntersectionObserver(
      function (entradas) {
        entradas.forEach(function (e) {
          if (e.isIntersecting) iniciar();
          else parar();
        });
      },
      { threshold: 0.3 }
    );
    obsRoleta.observe(janela);
  } else {
    iniciar();
  }
  /* ---------------------------------------------------------------------
     Cabeçalho fixo: fundo translúcido ao rolar e aba ativa
     --------------------------------------------------------------------- */
  const cabecalho = document.querySelector(".header");
  const botaoFixo = document.querySelector(".wa-fixo");
  const abas = Array.prototype.slice.call(document.querySelectorAll(".nav__link"));
  const secoes = abas
    .map(function (aba) {
      const id = aba.getAttribute("href") || "";
      const alvo = id.length > 1 ? document.querySelector(id) : null;
      return alvo ? { aba: aba, alvo: alvo } : null;
    })
    .filter(Boolean);
  let pedidoPendente = false;

  function marcarAbaAtiva() {
    if (!secoes.length) return;
    const limite = window.scrollY + window.innerHeight * 0.35;
    let atual = secoes[0];
    secoes.forEach(function (item) {
      if (item.alvo.offsetTop <= limite) atual = item;
    });
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8) {
      atual = secoes[secoes.length - 1];
    }
    secoes.forEach(function (item) {
      const ativo = item === atual;
      item.aba.classList.toggle("is-active", ativo);
      if (ativo) item.aba.setAttribute("aria-current", "true");
      else item.aba.removeAttribute("aria-current");
    });
  }

  function atualizarCabecalho() {
    if (cabecalho) cabecalho.classList.toggle("is-scrolled", window.scrollY > 24);
    if (botaoFixo) botaoFixo.classList.toggle("is-visivel", window.scrollY > window.innerHeight * 0.55);
    marcarAbaAtiva();
    pedidoPendente = false;
  }

  window.addEventListener(
    "scroll",
    function () {
      if (pedidoPendente) return;
      pedidoPendente = true;
      window.requestAnimationFrame(atualizarCabecalho);
    },
    { passive: true }
  );
  window.addEventListener("resize", atualizarCabecalho);
  atualizarCabecalho();
})();
