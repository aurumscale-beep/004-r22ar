/* ==========================================================================
   R22 Ar Condicionado — Configurações do site
   Altere aqui os dados de contato usados em todo o site.
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
     Ajuste os números abaixo para mudar a estimativa, sem mexer no resto.
     ------------------------------------------------------------------------ */
  btus: {
    // BTU/h por m² conforme a incidência de sol no ambiente.
    porMetroQuadrado: {
      pouco: 600, // pouco ou nenhum sol direto
      direto: 800, // sol direto por várias horas
    },
    // BTU/h somados por pessoa além da primeira.
    porPessoaExtra: 600,
    // BTU/h somados por eletrônico usado ao mesmo tempo.
    porEletronico: 600,
    // Capacidades comerciais, em BTU/h (ordem crescente).
    capacidades: [7000, 9000, 12000, 18000, 24000, 30000, 36000],
  },
};
