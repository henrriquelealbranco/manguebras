/**
 * Modelo de dados do CATÁLOGO VIRTUAL Manguebras (não é e-commerce).
 *
 * A Manguebras é distribuidora e não vende online. O site apresenta a peça
 * (foto + ficha técnica) e a conversão acontece por consulta ao representante.
 * `priceCents` é opcional e de uso interno — NÃO é exibido no site público.
 */

export type CategorySlug =
  | "mangueiras-radiador"
  | "mangueiras-intercooler"
  | "mangueiras-moldadas"
  | "mangueiras-silicone"
  | "abracadeiras"
  | "juntas-vedacao"
  | "conexoes"
  | "acessorios";

export type ProductLine =
  | "diesel"
  | "leve"
  | "pesada"
  | "agricola"
  | "industrial";

export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
  /** Foto de capa (código SKU de um produto representativo) */
  image: string;
  /** Faixa de códigos SKU correspondente no acervo de fotos */
  skuRange: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface VehicleApplication {
  /** Ex.: "Volvo FH 460" */
  vehicle: string;
  /** Ex.: "2015–2022" */
  years?: string;
  /** Código original de referência (OEM), quando houver */
  oemCode?: string;
}

export interface Product {
  /** Código SKU Manguebras — bate com o nome do arquivo da foto */
  code: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  category: CategorySlug;
  lines: ProductLine[];
  /** Caminhos das imagens em /public/produtos */
  images: string[];
  /** Preço em centavos; ausente = produto sob orçamento */
  priceCents?: number;
  /** Preço "de" para ancoragem (riscado), em centavos */
  compareAtCents?: number;
  specs: ProductSpec[];
  applications: VehicleApplication[];
  /** Códigos de produtos frequentemente comprados juntos (combos) */
  relatedCodes: string[];
  inStock: boolean;
  featured?: boolean;
  createdAt: string;
}

export interface CartItem {
  code: string;
  quantity: number;
}

export type SortOption =
  | "relevance"
  | "price-asc"
  | "price-desc"
  | "name-asc"
  | "newest";

export interface ProductFilters {
  category?: CategorySlug;
  lines?: ProductLine[];
  query?: string;
  onlyInStock?: boolean;
  onlyWithPrice?: boolean;
  sort?: SortOption;
}
