/**
 * Integração Mercado Pago — PREPARADA, não ativa.
 *
 * Para ativar o checkout transparente:
 * 1. Preencha MERCADOPAGO_ACCESS_TOKEN e NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY
 *    no .env.local (obtidos em https://www.mercadopago.com.br/developers).
 * 2. `npm install mercadopago`
 * 3. Crie a rota `src/app/api/checkout/route.ts` chamando
 *    `createPreference` abaixo e redirecione para `init_point`.
 * 4. No CheckoutForm, troque o envio via WhatsApp pela chamada à rota.
 */

export interface PreferenceItem {
  title: string;
  quantity: number;
  /** Preço unitário em reais (não centavos) */
  unit_price: number;
}

export async function createPreference(items: PreferenceItem[]): Promise<{
  id: string;
  init_point: string;
}> {
  const token = process.env.MERCADOPAGO_ACCESS_TOKEN;
  if (!token) {
    throw new Error(
      "MERCADOPAGO_ACCESS_TOKEN não configurado — checkout via WhatsApp permanece ativo.",
    );
  }

  const res = await fetch("https://api.mercadopago.com/checkout/preferences", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      items,
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout?status=sucesso`,
        failure: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout?status=erro`,
      },
      auto_return: "approved",
    }),
  });

  if (!res.ok) {
    throw new Error(`Mercado Pago respondeu ${res.status}`);
  }
  return res.json();
}
