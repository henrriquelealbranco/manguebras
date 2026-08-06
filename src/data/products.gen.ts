/**
 * GERADO por scripts/scrape-catalogo-antigo.mjs — NÃO EDITAR À MÃO.
 * Fonte: manguebras.com.br (WooCommerce Store API), 2026-08-06
 * 3565 produtos, 2922 com foto.
 *
 * Os dados ficam em products.gen.json (array puro) — importados aqui via
 * JSON para não estourar o verificador de tipos do TypeScript com um
 * literal de milhares de objetos.
 */
import type { Product } from "@/types/product";
import raw from "./products.gen.json";

export const PRODUCTS_GERADOS = raw as unknown as Product[];
