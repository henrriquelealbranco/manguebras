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
  whatsapp: "(44) 99922-6668",
  whatsappNumber: "5544999226668",
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
export function whatsappLink(message: string): string {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
