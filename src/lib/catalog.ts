import { PRODUCTS } from "@/data/products";
import { getCategory } from "@/data/categories";
import type { CategorySlug, Product, ProductLine } from "@/types/product";

export type SortKey = "relevancia" | "a-z" | "novidades";

export interface CatalogQuery {
  q?: string;
  categoria?: CategorySlug;
  linha?: ProductLine;
  ordenar: SortKey;
}

export const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "relevancia", label: "Relevância" },
  { value: "a-z", label: "Nome (A–Z)" },
  { value: "novidades", label: "Novidades" },
];

export const LINE_LABELS: Record<ProductLine, string> = {
  diesel: "Linha Diesel",
  leve: "Linha Leve",
  pesada: "Linha Pesada",
  agricola: "Linha Agrícola",
  industrial: "Linha Industrial",
};

const VALID_LINES = Object.keys(LINE_LABELS) as ProductLine[];
const VALID_SORTS = SORT_OPTIONS.map((o) => o.value);

/** Remove acentos e baixa a caixa para busca tolerante. */
function normalize(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

type RawParams = Record<string, string | string[] | undefined>;

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

/** Interpreta os searchParams da URL em uma consulta de catálogo validada. */
export function parseCatalogParams(params: RawParams): CatalogQuery {
  const q = first(params.q)?.trim() || undefined;

  const categoriaRaw = first(params.categoria);
  const categoria = getCategory(categoriaRaw ?? "")?.slug;

  const linhaRaw = first(params.linha) as ProductLine | undefined;
  const linha =
    linhaRaw && VALID_LINES.includes(linhaRaw) ? linhaRaw : undefined;

  const ordenarRaw = first(params.ordenar) as SortKey | undefined;
  const ordenar =
    ordenarRaw && VALID_SORTS.includes(ordenarRaw) ? ordenarRaw : "relevancia";

  return { q, categoria, linha, ordenar };
}

function matchesQuery(product: Product, q: string): boolean {
  const needle = normalize(q);
  const haystack = normalize(
    [
      product.name,
      product.code,
      product.shortDescription,
      getCategory(product.category)?.name ?? "",
      ...product.applications.map((a) => a.vehicle),
    ].join(" "),
  );
  return needle
    .split(/\s+/)
    .every((term) => haystack.includes(term));
}

function sortProducts(products: Product[], sort: SortKey): Product[] {
  const sorted = [...products];
  switch (sort) {
    case "a-z":
      return sorted.sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
    case "novidades":
      return sorted.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    case "relevancia":
    default:
      return sorted.sort(
        (a, b) =>
          Number(b.featured ?? false) - Number(a.featured ?? false) ||
          a.name.localeCompare(b.name, "pt-BR"),
      );
  }
}

/** Aplica busca, filtros e ordenação sobre o catálogo. */
export function queryProducts(query: CatalogQuery): Product[] {
  let result = PRODUCTS;

  if (query.categoria) {
    result = result.filter((p) => p.category === query.categoria);
  }
  if (query.linha) {
    result = result.filter((p) => p.lines.includes(query.linha!));
  }
  if (query.q) {
    result = result.filter((p) => matchesQuery(p, query.q!));
  }

  return sortProducts(result, query.ordenar);
}

/** Produtos relacionados: os declarados + complemento da mesma categoria. */
export function relatedProductsFor(product: Product, max = 8): Product[] {
  const related = product.relatedCodes
    .map((code) => PRODUCTS.find((p) => p.code === code))
    .filter((p): p is Product => Boolean(p));

  const seen = new Set([product.code, ...related.map((p) => p.code)]);
  for (const candidate of PRODUCTS) {
    if (related.length >= max) break;
    if (seen.has(candidate.code)) continue;
    if (candidate.category !== product.category) continue;
    related.push(candidate);
    seen.add(candidate.code);
  }
  return related.slice(0, max);
}
