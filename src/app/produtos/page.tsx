import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle, PackageSearch } from "lucide-react";
import {
  ActiveFilterChips,
  FilterPanel,
  MobileFilters,
  SortSelect,
} from "@/components/catalog/filters";
import { ProductCard } from "@/components/product/product-card";
import { getCategory } from "@/data/categories";
import { LINE_LABELS, parseCatalogParams, queryProducts } from "@/lib/catalog";
import { whatsappLink } from "@/constants/site";

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function pageTitle(query: ReturnType<typeof parseCatalogParams>): {
  pre: string;
  highlight: string;
  description: string;
} {
  if (query.q) {
    return {
      pre: "Resultados para",
      highlight: `"${query.q}"`,
      description: "Veja o que encontramos no catálogo Manguebras.",
    };
  }
  if (query.categoria) {
    const category = getCategory(query.categoria)!;
    const words = category.name.split(" ");
    return {
      pre: words.slice(0, -1).join(" ") || category.name,
      highlight: words.length > 1 ? words[words.length - 1] : "",
      description: category.description,
    };
  }
  if (query.linha) {
    const label = LINE_LABELS[query.linha];
    return {
      pre: label.split(" ")[0],
      highlight: label.split(" ").slice(1).join(" "),
      description:
        "Mangueiras, abraçadeiras e acessórios selecionados para esta linha.",
    };
  }
  return {
    pre: "Catálogo",
    highlight: "completo",
    description:
      "Mangueiras, abraçadeiras, juntas e acessórios para a linha diesel — tudo em um só lugar.",
  };
}

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const query = parseCatalogParams(await searchParams);
  if (query.categoria) {
    const category = getCategory(query.categoria)!;
    return { title: category.name, description: category.description };
  }
  if (query.linha) {
    return {
      title: LINE_LABELS[query.linha],
      description: `Produtos da ${LINE_LABELS[query.linha]} Manguebras.`,
    };
  }
  if (query.q) {
    return { title: `Busca: ${query.q}` };
  }
  return {
    title: "Produtos",
    description:
      "Catálogo completo de mangueiras automotivas, abraçadeiras e acessórios para linha diesel.",
  };
}

/**
 * PLP — listagem de produtos com filtros, busca e ordenação via URL.
 */
export default async function ProdutosPage({ searchParams }: PageProps) {
  const query = parseCatalogParams(await searchParams);
  const products = queryProducts(query);
  const { pre, highlight, description } = pageTitle(query);
  const active = {
    q: query.q,
    categoria: query.categoria,
    linha: query.linha,
  };
  const activeCount =
    Number(Boolean(query.categoria)) +
    Number(Boolean(query.linha)) +
    Number(Boolean(query.q));

  return (
    <>
      {/* Faixa de título — padrão escuro do design */}
      <section className="relative overflow-hidden bg-brand-950">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(700px circle at 85% 0%, rgba(13,102,93,0.5), transparent 55%)",
          }}
        />
        <div className="container-page relative py-10">
          <nav aria-label="Breadcrumb" className="text-xs text-brand-300">
            <Link href="/" className="transition-colors hover:text-accent-400">
              Início
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">Produtos</span>
          </nav>
          <h1 className="mt-3 font-display text-3xl font-black uppercase tracking-tight text-white md:text-4xl">
            {pre}{" "}
            {highlight && <span className="text-accent-400">{highlight}</span>}
          </h1>
          <p className="mt-2 max-w-xl text-sm text-brand-200">{description}</p>
        </div>
      </section>

      <div className="container-page grid gap-8 py-10 lg:grid-cols-[260px_1fr]">
        {/* Sidebar de filtros (desktop) */}
        <aside className="hidden lg:block" aria-label="Filtros">
          <div className="sticky top-16 rounded-lg border border-graphite-200 bg-white p-5 shadow-soft">
            <FilterPanel active={active} />
          </div>
        </aside>

        <div>
          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <MobileFilters active={active} activeCount={activeCount} />
              <p className="text-sm text-graphite-500">
                <strong className="font-bold text-graphite-900">
                  {products.length}
                </strong>{" "}
                {products.length === 1
                  ? "produto encontrado"
                  : "produtos encontrados"}
              </p>
            </div>
            <SortSelect current={query.ordenar} />
          </div>

          <div className="mt-4">
            <ActiveFilterChips active={active} />
          </div>

          {/* Grid de produtos */}
          {products.length > 0 ? (
            <ul className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <li key={product.code}>
                  <ProductCard product={product} />
                </li>
              ))}
            </ul>
          ) : (
            /* Estado vazio — canaliza para o WhatsApp (dor nº 1 do cliente) */
            <div className="mt-10 flex flex-col items-center gap-5 rounded-lg border border-dashed border-graphite-300 bg-graphite-50/60 px-8 py-16 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-lg bg-brand-100 text-brand-700">
                <PackageSearch className="h-7 w-7" />
              </span>
              <div>
                <h2 className="font-display text-xl font-extrabold uppercase text-graphite-900">
                  Nenhum produto <span className="text-accent-500">aqui</span>
                </h2>
                <p className="mx-auto mt-2 max-w-md text-sm text-graphite-500">
                  Não encontrou o que procura? Nosso catálogo completo tem
                  milhares de itens. Envie uma foto da amostra e a nossa equipe
                  encontra a peça certa para o seu veículo.
                </p>
              </div>
              <a
                href={whatsappLink(
                  `Olá! Procurei por "${query.q ?? "um produto"}" no site e não encontrei. Podem me ajudar?`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-action-500 px-6 py-3 text-xs font-bold uppercase tracking-widest text-white transition-all duration-300 hover:scale-[1.02] hover:bg-action-600 active:bg-action-700"
              >
                <MessageCircle className="h-4 w-4" />
                Falar com especialista
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
