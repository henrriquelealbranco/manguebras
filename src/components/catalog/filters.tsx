"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState, useTransition } from "react";
import { Check, ListFilter, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CATEGORIES, getCategory } from "@/data/categories";
import { PRODUCTS } from "@/data/products";
import { LINE_LABELS, listMontadoras, montadoraName } from "@/lib/catalog";
import { cn } from "@/lib/utils";
import type { ProductLine } from "@/types/product";

/**
 * Estado ativo dos filtros — parseado no servidor (URL) e passado por props.
 * Evita useSearchParams no client (que suspende a hidratação da subárvore).
 */
export interface ActiveFilters {
  q?: string;
  categoria?: string;
  montadora?: string;
  linha?: string;
}

/** Atualiza um parâmetro da URL preservando os demais (com estado pendente). */
function useSetParam() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const setParam = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(window.location.search);
      if (value === null || value === "") params.delete(key);
      else params.set(key, value);
      const qs = params.toString();
      startTransition(() => {
        router.push(`/produtos${qs ? `?${qs}` : ""}`, { scroll: false });
      });
    },
    [router],
  );

  return { setParam, isPending };
}

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-graphite-200 pb-5">
      <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-graphite-900">
        {title}
      </h3>
      {children}
    </div>
  );
}

function FilterOption({
  active,
  label,
  count,
  onClick,
}: {
  active: boolean;
  label: string;
  count?: number;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors",
        active
          ? "bg-brand-50 font-semibold text-brand-800"
          : "text-graphite-600 hover:bg-graphite-100",
      )}
    >
      <span className="flex items-center gap-2">
        <span
          className={cn(
            "flex h-4 w-4 items-center justify-center rounded border transition-colors",
            active
              ? "border-accent-500 bg-accent-500 text-white"
              : "border-graphite-300 bg-white",
          )}
        >
          {active && <Check className="h-3 w-3" />}
        </span>
        {label}
      </span>
      {typeof count === "number" && (
        <span className="text-xs text-graphite-400">{count}</span>
      )}
    </button>
  );
}

/**
 * Painel de filtros do catálogo (categoria + linha).
 * O estado vive na URL — filtros são compartilháveis e indexáveis.
 */
export function FilterPanel({ active }: { active: ActiveFilters }) {
  const { setParam, isPending } = useSetParam();
  const activeCategoria = active.categoria ?? "";
  const activeMontadora = active.montadora ?? "";

  const montadoras = useMemo(() => listMontadoras(), []);

  const categoryCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of PRODUCTS) {
      counts.set(p.category, (counts.get(p.category) ?? 0) + 1);
    }
    return counts;
  }, []);

  return (
    <div
      aria-busy={isPending}
      className={cn(
        "space-y-5 transition-opacity duration-200",
        isPending && "pointer-events-none opacity-60",
      )}
    >
      <FilterGroup title="Categorias">
        <div className="space-y-0.5">
          {CATEGORIES.map((category) => (
            <FilterOption
              key={category.slug}
              label={category.name}
              count={categoryCounts.get(category.slug) ?? 0}
              active={activeCategoria === category.slug}
              onClick={() =>
                setParam(
                  "categoria",
                  activeCategoria === category.slug ? null : category.slug,
                )
              }
            />
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Montadoras">
        <div className="scrollbar-none max-h-72 space-y-0.5 overflow-y-auto pr-1">
          {montadoras.map((m) => (
            <FilterOption
              key={m.slug}
              label={m.name}
              count={m.count || undefined}
              active={activeMontadora === m.slug}
              onClick={() =>
                setParam("montadora", activeMontadora === m.slug ? null : m.slug)
              }
            />
          ))}
        </div>
      </FilterGroup>

      {(active.categoria || active.montadora || active.linha || active.q) && (
        <Link
          href="/produtos"
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-accent-600 hover:text-accent-500"
        >
          <X className="h-3.5 w-3.5" />
          Limpar filtros
        </Link>
      )}
    </div>
  );
}

/** Chips dos filtros ativos, com remoção individual. */
export function ActiveFilterChips({ active }: { active: ActiveFilters }) {
  const { setParam, isPending } = useSetParam();

  const chips: { key: string; label: string }[] = [];
  if (active.q) chips.push({ key: "q", label: `Busca: "${active.q}"` });
  if (active.montadora) {
    const nome = montadoraName(active.montadora);
    if (nome) chips.push({ key: "montadora", label: nome });
  }
  if (active.categoria) {
    const cat = getCategory(active.categoria);
    if (cat) chips.push({ key: "categoria", label: cat.name });
  }
  if (active.linha && active.linha in LINE_LABELS) {
    chips.push({
      key: "linha",
      label: LINE_LABELS[active.linha as ProductLine],
    });
  }

  if (chips.length === 0) return null;

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-2 transition-opacity duration-200",
        isPending && "pointer-events-none opacity-60",
      )}
    >
      {chips.map((chip) => (
        <button
          key={chip.key}
          type="button"
          onClick={() => setParam(chip.key, null)}
          className="group inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-800 transition-colors hover:border-brand-400"
          aria-label={`Remover filtro ${chip.label}`}
        >
          {chip.label}
          <X className="h-3 w-3 text-brand-500 transition-colors group-hover:text-brand-800" />
        </button>
      ))}
    </div>
  );
}

/** Botão + drawer de filtros para mobile. */
export function MobileFilters({
  active,
  activeCount,
}: {
  active: ActiveFilters;
  activeCount: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="inline-flex h-10 items-center gap-2 rounded-lg border border-graphite-300 bg-white px-4 text-sm font-semibold text-graphite-700 transition-colors hover:border-brand-400 lg:hidden">
        <ListFilter className="h-4 w-4" />
        Filtrar
        {activeCount > 0 && (
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent-500 text-[10px] font-bold text-white">
            {activeCount}
          </span>
        )}
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] overflow-y-auto p-5">
        <SheetHeader className="p-0 pb-4">
          <SheetTitle className="text-left font-display text-lg font-bold text-brand-900">
            Filtros
          </SheetTitle>
        </SheetHeader>
        <FilterPanel active={active} />
      </SheetContent>
    </Sheet>
  );
}

/** Seletor de ordenação (atualiza ?ordenar=). */
export function SortSelect({ current }: { current: string }) {
  const { setParam, isPending } = useSetParam();

  return (
    <label className="flex items-center gap-2 text-sm text-graphite-500">
      <span className="hidden sm:inline">Ordenar por</span>
      <select
        value={current}
        disabled={isPending}
        onChange={(e) =>
          setParam(
            "ordenar",
            e.target.value === "relevancia" ? null : e.target.value,
          )
        }
        className="h-10 cursor-pointer rounded-lg border border-graphite-300 bg-white px-3 text-sm font-semibold text-graphite-800 outline-none transition-colors hover:border-brand-400 focus:border-accent-500 disabled:opacity-60"
      >
        <option value="relevancia">Relevância</option>
        <option value="a-z">Nome (A–Z)</option>
        <option value="novidades">Novidades</option>
      </select>
    </label>
  );
}
