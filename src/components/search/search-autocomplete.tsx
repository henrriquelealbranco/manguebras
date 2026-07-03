"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { Search } from "lucide-react";
import { CATEGORIES } from "@/data/categories";
import { PRODUCTS } from "@/data/products";
import { formatBRL, cn } from "@/lib/utils";
import type { Product } from "@/types/product";

const MAX_RESULTS = 6;

function normalize(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

function searchLocal(query: string): Product[] {
  const q = normalize(query.trim());
  if (q.length < 2) return [];
  const terms = q.split(/\s+/);
  return PRODUCTS.filter((p) => {
    const haystack = normalize(
      `${p.name} ${p.code} ${p.applications.map((a) => a.vehicle).join(" ")}`,
    );
    return terms.every((t) => haystack.includes(t));
  }).slice(0, MAX_RESULTS);
}

/**
 * Busca do header com autocomplete instantâneo.
 * Digitou → sugestões locais; Enter → página de resultados.
 */
export function SearchAutocomplete() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(-1);
  const containerRef = useRef<HTMLFormElement>(null);

  const results = useMemo(() => searchLocal(query), [query]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const goToProduct = (product: Product) => {
    setOpen(false);
    setQuery("");
    router.push(`/produtos/${product.slug}`);
  };

  const submitSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (highlighted >= 0 && results[highlighted]) {
      goToProduct(results[highlighted]);
      return;
    }
    const q = query.trim();
    setOpen(false);
    router.push(q ? `/produtos?q=${encodeURIComponent(q)}` : "/produtos");
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open || results.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlighted((h) => (h + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlighted((h) => (h <= 0 ? results.length - 1 : h - 1));
    } else if (e.key === "Escape") {
      setOpen(false);
      setHighlighted(-1);
    }
  };

  return (
    <form
      ref={containerRef}
      onSubmit={submitSearch}
      role="search"
      className="relative"
    >
      <div className="flex h-12 w-full overflow-hidden rounded-lg bg-white shadow-soft">
        <input
          type="search"
          name="q"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            setHighlighted(-1);
          }}
          onFocus={() => query.trim().length >= 2 && setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder="O que você procura?"
          aria-label="Buscar produtos"
          aria-expanded={open && results.length > 0}
          aria-autocomplete="list"
          autoComplete="off"
          className="min-w-0 flex-1 bg-transparent px-4 text-sm text-graphite-800 outline-none placeholder:text-graphite-400"
        />
        <select
          name="categoria"
          aria-label="Filtrar por categoria"
          defaultValue=""
          onChange={(e) => {
            const categoria = e.target.value;
            router.push(
              categoria ? `/produtos?categoria=${categoria}` : "/produtos",
            );
          }}
          className="hidden max-w-44 cursor-pointer border-l border-graphite-200 bg-transparent px-3 text-sm text-graphite-500 outline-none md:block"
        >
          <option value="">Todas as categorias</option>
          {CATEGORIES.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          aria-label="Buscar"
          className="flex w-14 items-center justify-center bg-accent-500 text-white transition-colors hover:bg-accent-600"
        >
          <Search className="h-5 w-5" />
        </button>
      </div>

      {/* Sugestões */}
      {open && results.length > 0 && (
        <ul
          role="listbox"
          aria-label="Sugestões de produtos"
          className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-graphite-200 bg-white shadow-elevated"
        >
          {results.map((product, i) => (
            <li key={product.code} role="option" aria-selected={i === highlighted}>
              <button
                type="button"
                onClick={() => goToProduct(product)}
                onMouseEnter={() => setHighlighted(i)}
                className={cn(
                  "flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors",
                  i === highlighted ? "bg-brand-50" : "hover:bg-graphite-50",
                )}
              >
                <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg border border-graphite-100 bg-white">
                  <Image
                    src={product.images[0]}
                    alt=""
                    fill
                    sizes="44px"
                    className="object-contain p-1"
                  />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="line-clamp-1 text-sm font-semibold text-graphite-900">
                    {product.name}
                  </span>
                  <span className="text-[11px] text-graphite-500">
                    Cód. {product.code}
                  </span>
                </span>
                <span className="shrink-0 text-sm font-bold text-accent-600">
                  {product.priceCents
                    ? formatBRL(product.priceCents)
                    : "Sob orçamento"}
                </span>
              </button>
            </li>
          ))}
          <li className="border-t border-graphite-100">
            <button
              type="submit"
              className="w-full px-3 py-2.5 text-center text-xs font-bold uppercase tracking-widest text-brand-700 transition-colors hover:bg-brand-50"
            >
              Ver todos os resultados para “{query.trim()}”
            </button>
          </li>
        </ul>
      )}
    </form>
  );
}
