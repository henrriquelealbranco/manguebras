"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  AlignJustify,
  Boxes,
  Bus,
  Car,
  ChevronDown,
  Gauge,
  Spline,
  Tractor,
  Truck,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { CATEGORIES } from "@/data/categories";
import { listMontadoras } from "@/lib/catalog";
import { cn } from "@/lib/utils";
import type { CategorySlug } from "@/types/product";

const CATEGORY_ICONS: Record<CategorySlug, LucideIcon> = {
  "mangueiras-caminhoes-onibus": Truck,
  "mangueiras-turbinas": Gauge,
  "mangueiras-pick-ups": Car,
  "mangueiras-vans": Bus,
  "mangueiras-agricolas-empilhadeiras": Tractor,
  "mangueiras-geral": Spline,
  "pecas-acessorios": Wrench,
  "miudezas-diesel": Boxes,
};

/**
 * Menu "Todas as Categorias" da faixa de navegação.
 * Abre por hover ou clique; fecha com Escape, clique fora ou navegação.
 */
export function CategoriesMenu() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="shrink-0"
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex h-12 items-center gap-2.5 border-x border-graphite-200 px-4 text-xs font-bold uppercase tracking-wide text-graphite-800 transition-colors sm:px-5",
          open ? "bg-graphite-50" : "bg-white hover:bg-graphite-50",
        )}
      >
        <AlignJustify className="h-4 w-4 text-accent-600" />
        <span className="hidden sm:inline">Todas as categorias</span>
        <span className="sm:hidden">Categorias</span>
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>

      {/* Painel */}
      <div
        className={cn(
          "absolute left-0 right-0 top-full z-50 origin-top border-b border-graphite-200/70 bg-white shadow-elevated transition-all duration-200",
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-2 opacity-0",
        )}
      >
        <div className="container-page grid gap-8 py-8 lg:grid-cols-[1fr_360px]">
          <nav aria-label="Categorias de produtos">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-graphite-400">
              Categorias
            </p>
            <ul className="grid gap-1 sm:grid-cols-2">
              {CATEGORIES.map((category) => {
                const Icon = CATEGORY_ICONS[category.slug];
                return (
                  <li key={category.slug}>
                    <Link
                      href={`/produtos?categoria=${category.slug}`}
                      onClick={() => setOpen(false)}
                      className="group flex items-start gap-3 rounded-md p-3 transition-colors hover:bg-brand-50"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-100 text-brand-700 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="block text-sm font-semibold text-graphite-800 group-hover:text-brand-800">
                          {category.name}
                        </span>
                        <span className="mt-0.5 line-clamp-2 block text-xs leading-relaxed text-graphite-500">
                          {category.description}
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Montadoras — layout melhorado com linhas alternadas e contagem nítida */}
          <nav
            aria-label="Montadoras"
            className="hidden border-l border-graphite-200/70 pl-8 lg:block"
          >
            <div className="mb-3 flex items-center justify-between">
              <p className="text-[11px] font-bold uppercase tracking-widest text-graphite-400">
                Montadoras (Linha Diesel)
              </p>
              <Link
                href="/produtos"
                onClick={() => setOpen(false)}
                className="text-xs font-semibold text-brand-700 hover:text-brand-900"
              >
                Ver todas →
              </Link>
            </div>
            <ul className="scrollbar-none max-h-[340px] space-y-1 overflow-y-auto pr-1">
              {listMontadoras().map((m, idx) => (
                <li key={m.slug}>
                  <Link
                    href={`/produtos?montadora=${m.slug}`}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center justify-between gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-brand-100/70 hover:text-brand-900",
                      idx % 2 === 0
                        ? "bg-graphite-50/70 text-graphite-800"
                        : "bg-white text-graphite-700",
                    )}
                  >
                    <span>{m.name}</span>
                    {m.count > 0 && (
                      <span className="rounded-full bg-graphite-200/70 px-2 py-0.5 text-xs font-semibold text-graphite-600">
                        {m.count}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
