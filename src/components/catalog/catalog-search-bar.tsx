"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { trackCatalogSearch } from "@/lib/tracking";

interface CatalogSearchBarProps {
  initialQuery?: string;
}

export function CatalogSearchBar({ initialQuery = "" }: CatalogSearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [isPending, startTransition] = useTransition();

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = query.trim();
    const params = new URLSearchParams(window.location.search);
    if (trimmed) {
      params.set("q", trimmed);
      trackCatalogSearch(trimmed);
    } else {
      params.delete("q");
    }
    const qs = params.toString();
    startTransition(() => {
      router.push(`/produtos${qs ? `?${qs}` : ""}`, { scroll: false });
    });
  };

  const handleClear = () => {
    setQuery("");
    const params = new URLSearchParams(window.location.search);
    params.delete("q");
    const qs = params.toString();
    startTransition(() => {
      router.push(`/produtos${qs ? `?${qs}` : ""}`, { scroll: false });
    });
  };

  return (
    <form
      onSubmit={handleSearch}
      className="relative flex w-full items-center overflow-hidden rounded-xl border border-graphite-300 bg-white shadow-soft transition-all focus-within:border-accent-500 focus-within:ring-2 focus-within:ring-accent-500/20"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center text-graphite-400">
        <Search className="h-5 w-5" />
      </div>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Digite o código, nome ou referência da peça (ex.: 1548, Volvo, Radiador)..."
        className="h-12 w-full bg-transparent pr-3 text-sm text-graphite-900 outline-none placeholder:text-graphite-400"
      />
      {query && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Limpar busca"
          className="mr-2 flex h-8 w-8 items-center justify-center rounded-md text-graphite-400 hover:bg-graphite-100 hover:text-graphite-600"
        >
          <X className="h-4 w-4" />
        </button>
      )}
      <button
        type="submit"
        disabled={isPending}
        className="mr-1.5 flex h-9 items-center justify-center rounded-lg bg-brand-900 px-4 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-brand-800 disabled:opacity-50 sm:mr-2"
      >
        {isPending ? "Buscando..." : "Buscar"}
      </button>
    </form>
  );
}
