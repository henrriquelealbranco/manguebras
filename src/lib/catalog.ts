import { PRODUCTS } from "@/data/products";
import { getCategory } from "@/data/categories";
import type { CategorySlug, Product, ProductLine } from "@/types/product";

export type SortKey = "relevancia" | "a-z" | "novidades";

export interface CatalogQuery {
  q?: string;
  categoria?: CategorySlug;
  /** Slug da montadora (ex.: "scania"), quando filtrado */
  montadora?: string;
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
  pesada: "Linha Pesada",
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

/** Slug estável para uma montadora (ex.: "Mercedes-Benz" → "mercedes-benz"). */
export function montadoraSlug(name: string): string {
  return normalize(name)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export interface MontadoraEntry {
  slug: string;
  name: string;
  count: number;
}

/** Lista de montadoras do catálogo, com contagem, em ordem alfabética. */
export function listMontadoras(): MontadoraEntry[] {
  const map = new Map<string, MontadoraEntry>();
  for (const p of PRODUCTS) {
    const slug = montadoraSlug(p.montadora);
    const entry = map.get(slug) ?? { slug, name: p.montadora, count: 0 };
    entry.count += 1;
    map.set(slug, entry);
  }
  return [...map.values()].sort((a, b) => {
    // "Universal" sempre por último; demais em ordem alfabética.
    if (a.name === "Universal") return 1;
    if (b.name === "Universal") return -1;
    return a.name.localeCompare(b.name, "pt-BR");
  });
}

/** Nome de exibição de uma montadora a partir do slug. */
export function montadoraName(slug: string): string | undefined {
  return listMontadoras().find((m) => m.slug === slug)?.name;
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

  const montadoraRaw = first(params.montadora);
  const montadora =
    montadoraRaw && listMontadoras().some((m) => m.slug === montadoraRaw)
      ? montadoraRaw
      : undefined;

  const linhaRaw = first(params.linha) as ProductLine | undefined;
  const linha =
    linhaRaw && VALID_LINES.includes(linhaRaw) ? linhaRaw : undefined;

  const ordenarRaw = first(params.ordenar) as SortKey | undefined;
  const ordenar =
    ordenarRaw && VALID_SORTS.includes(ordenarRaw) ? ordenarRaw : "relevancia";

  return { q, categoria, montadora, linha, ordenar };
}

function matchesQuery(product: Product, q: string): boolean {
  const needle = normalize(q);
  const haystack = normalize(
    [
      product.name,
      product.code,
      product.shortDescription,
      product.montadora,
      product.ficha.montadora,
      product.ficha.aplicacao,
      product.ficha.nOriginal ?? "",
      product.ficha.grupo ?? "",
      getCategory(product.category)?.name ?? "",
    ].join(" "),
  );
  return needle.split(/\s+/).every((term) => haystack.includes(term));
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
  if (query.montadora) {
    result = result.filter((p) => montadoraSlug(p.montadora) === query.montadora);
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
