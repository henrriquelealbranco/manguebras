/**
 * GERADO por scripts/scrape-catalogo-antigo.mjs — NÃO EDITAR À MÃO.
 * Fonte: manguebras.com.br (WooCommerce Store API), 2026-08-06
 * 3565 produtos, 3555 com foto local (auditoria 2026-11-18).
 * 39 URLs corrigidas para .webp conforme formato real, sem reencode.
 * 10 fichas sem fonte de foto comprovada: scripts/photo-audit-report.md.
 *
 * Os dados ficam em products.gen.json (array puro) — importados aqui via
 * JSON para não estourar o verificador de tipos do TypeScript com um
 * literal de milhares de objetos.
 */
import type { Product } from "@/types/product";
import raw from "./products.gen.json";

export const PRODUCTS_GERADOS = raw as unknown as Product[];
