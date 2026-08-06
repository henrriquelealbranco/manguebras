import type { Product } from "@/types/product";
import { PRODUCTS_GERADOS } from "@/data/products.gen";

/**
 * Catálogo completo Manguebras — importado do site atual (manguebras.com.br)
 * via scripts/scrape-catalogo-antigo.mjs. Fotos casadas com o acervo local
 * (_materiais/fotos) por código SKU.
 *
 * Para atualizar o catálogo, rode o script novamente (ele reusa o cache
 * salvo em scripts/.cache-catalogo-bruto.json; apague esse arquivo pra
 * forçar uma nova busca no site antigo).
 */
export const PRODUCTS: Product[] = PRODUCTS_GERADOS;

// ─────────────────────── Helpers ───────────────────────

export function getProduct(code: string): Product | undefined {
  return PRODUCTS.find((p) => p.code === code);
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter((p) => p.featured);
}

export function getRelatedProducts(product: Product): Product[] {
  return product.relatedCodes
    .map((code) => getProduct(code))
    .filter((p): p is Product => Boolean(p));
}
