import { getProduct } from "@/data/products";
import type { CartItem, Product } from "@/types/product";

/** Cupons ativos — percentual de desconto sobre o subtotal. */
export const COUPONS: Record<string, number> = {
  BEMVINDO10: 10,
};

export interface CartEntry {
  product: Product;
  quantity: number;
  lineTotalCents: number;
}

export interface CartSummary {
  entries: CartEntry[];
  subtotalCents: number;
  discountCents: number;
  discountPercent: number;
  totalCents: number;
  totalItems: number;
}

/**
 * Resolve os itens do carrinho contra o catálogo e calcula os totais.
 * Itens cujo código não existe mais no catálogo são ignorados.
 */
export function summarizeCart(
  items: CartItem[],
  coupon: string | null,
): CartSummary {
  const entries: CartEntry[] = [];

  for (const item of items) {
    const product = getProduct(item.code);
    if (!product || !product.priceCents) continue;
    entries.push({
      product,
      quantity: item.quantity,
      lineTotalCents: product.priceCents * item.quantity,
    });
  }

  const subtotalCents = entries.reduce((acc, e) => acc + e.lineTotalCents, 0);
  const discountPercent = coupon ? (COUPONS[coupon.toUpperCase()] ?? 0) : 0;
  const discountCents = Math.round((subtotalCents * discountPercent) / 100);

  return {
    entries,
    subtotalCents,
    discountCents,
    discountPercent,
    totalCents: subtotalCents - discountCents,
    totalItems: entries.reduce((acc, e) => acc + e.quantity, 0),
  };
}

/** Sugestões de cross-sell: relacionados aos itens do carrinho, fora dele. */
export function crossSellFor(summary: CartSummary, max = 8): Product[] {
  const inCart = new Set(summary.entries.map((e) => e.product.code));
  const suggestions: Product[] = [];
  const seen = new Set<string>();

  for (const entry of summary.entries) {
    for (const code of entry.product.relatedCodes) {
      if (inCart.has(code) || seen.has(code)) continue;
      const product = getProduct(code);
      if (!product) continue;
      suggestions.push(product);
      seen.add(code);
      if (suggestions.length >= max) return suggestions;
    }
  }
  return suggestions;
}
