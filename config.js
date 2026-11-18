/* ==========================================================================
   R22 Ar Condicionado — Configurações do site
   Altere aqui os dados de contato e a regra da calculadora de BTUs.
   ========================================================================== */

window.R22_CONFIG = {
  whatsapp: {
    // Número no formato internacional, apenas dígitos: 55 + DDD + número.
    // (11) 94241-8489 → 5511942418489
    number: "5511942418489",
    message: "Olá! Gostaria de solicitar um orçamento de ar-condicionado.",
  },

  /* ------------------------------------------------------------------------
     Calculadora de BTUs — regra de cálculo
     Mesma conta usada pela calculadora da Climatize:
       área × 600 + pessoas × 600 + eletrônicos × 600 + (sol ? 800 : 0)
     Janelas entram no resumo do WhatsApp, mas não somam BTU/h.
     ------------------------------------------------------------------------ */
  btus: {
    porMetroQuadrado: 600,
    porPessoa: 600,
    porEletronico: 600,
    porJanela: 0,
    adicionalSol: 800,
    // Capacidades comerciais, em BTU/h (ordem crescente).
    capacidades: [7000, 9000, 12000, 18000, 22000, 24000, 30000, 36000, 48000, 60000],
  },
};
