/**
 * Dados institucionais da Manguebras.
 * Fonte: materiais oficiais da marca (assinatura de e-mail + briefing).
 */
export const SITE = {
  name: "Manguebras",
  legalName: "Manguebras Mangueiras Automotivas",
  tagline: "Mangueiras Automotivas",
  description:
    "Especialista em mangueiras para linha de arrefecimento diesel: radiador, intercooler, turbina, filtro de ar, abraçadeiras e acessórios. Atendemos oficinas, autopeças, transportadoras e frotas em todo o Brasil.",
  url: "https://www.manguebras.com.br",
  phone: "(44) 3023-7100",
  phoneHref: "tel:+554430237100",
  whatsapp: "(44) 3023-7100",
  whatsappNumber: "554430237100",
  email: "vendas@manguebras.com.br",
  address: {
    city: "Maringá",
    state: "PR",
    country: "BR",
  },
  social: {
    instagram: "https://www.instagram.com/manguebras",
    facebook: "https://www.facebook.com/manguebras",
  },
} as const;

/**
 * Gera um link de WhatsApp com mensagem pré-preenchida.
 */
export const TINTIM_BASE = "https://tintim.link/whatsapp/893db8f7-97bb-43b2-a908-97fc95741ca0/c2b21e7b-42a9-4adc-9f81-a98660775b8f";
export const WHATSAPP_MESSAGES = {
  general: "Olá. Visitei seu site e gostaria de falar com um atendente.",
  product: "Olá. Gostaria de mais informações sobre um produto que vi no site.",
} as const;

// Legacy callers may still supply copy; the approved greeting must remain exact.
export function whatsappLink(_legacyMessage?: string): string {
  return `${TINTIM_BASE}?text=${encodeURIComponent(WHATSAPP_MESSAGES.general)}`;
}

export function productWhatsappLink(): string {
  return `${TINTIM_BASE}?text=${encodeURIComponent(WHATSAPP_MESSAGES.product)}`;
}
