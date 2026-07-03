import { z } from "zod";

/**
 * Validação do checkout (react-hook-form + zod).
 */
export const checkoutSchema = z.object({
  // Contato
  nome: z
    .string()
    .trim()
    .min(3, "Informe seu nome completo")
    .max(120, "Nome muito longo"),
  email: z.string().trim().email("E-mail inválido"),
  telefone: z
    .string()
    .regex(/^\(\d{2}\) \d{4,5}-\d{4}$/, "Telefone inválido — use (DD) 99999-9999"),
  documento: z
    .string()
    .trim()
    .optional()
    .refine(
      (v) =>
        !v ||
        /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(v) ||
        /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(v),
      "CPF ou CNPJ inválido",
    ),
  empresa: z.string().trim().max(120).optional(),

  // Endereço
  cep: z.string().regex(/^\d{5}-\d{3}$/, "CEP inválido — use 00000-000"),
  rua: z.string().trim().min(2, "Informe a rua"),
  numero: z.string().trim().min(1, "Informe o número"),
  complemento: z.string().trim().max(80).optional(),
  bairro: z.string().trim().min(2, "Informe o bairro"),
  cidade: z.string().trim().min(2, "Informe a cidade"),
  uf: z
    .string()
    .length(2, "UF inválida")
    .regex(/^[A-Za-z]{2}$/, "UF inválida"),

  // Pagamento
  pagamento: z.enum(["pix", "cartao", "whatsapp"], {
    message: "Escolha a forma de pagamento",
  }),
  observacoes: z.string().trim().max(500).optional(),
});

export type CheckoutData = z.infer<typeof checkoutSchema>;

export const PAYMENT_LABELS: Record<CheckoutData["pagamento"], string> = {
  pix: "Pix",
  cartao: "Cartão de crédito (até 6x sem juros)",
  whatsapp: "Combinar pelo WhatsApp",
};
