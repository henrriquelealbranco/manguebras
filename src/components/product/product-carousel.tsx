"use client";

import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { ProductCard } from "@/components/product/product-card";
import type { Product } from "@/types/product";

interface ProductCarouselProps {
  products: Product[];
  /** Título no padrão "PRE <destaque>" */
  pre: string;
  highlight: string;
  linkHref?: string;
  linkLabel?: string;
}

/**
 * Carrossel de produtos padrão do site — setas + scroll-snap,
 * seguindo o design aprovado (seta esquerda escura, direita verde).
 */
export function ProductCarousel({
  products,
  pre,
  highlight,
  linkHref,
  linkLabel,
}: ProductCarouselProps) {
  const trackRef = useRef<HTMLUListElement>(null);

  const scrollBy = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({
      left: direction * track.clientWidth * 0.8,
      behavior: "smooth",
    });
  };

  if (products.length === 0) return null;

  return (
    <div>
      <SectionHeading
        pre={pre}
        highlight={highlight}
        linkHref={linkHref}
        linkLabel={linkLabel}
      />

      <div className="relative mt-7">
        <button
          type="button"
          aria-label="Produtos anteriores"
          onClick={() => scrollBy(-1)}
          className="absolute -left-4 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-graphite-900 text-white shadow-elevated transition-all duration-300 hover:scale-110 hover:bg-brand-900 md:flex"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          aria-label="Próximos produtos"
          onClick={() => scrollBy(1)}
          className="absolute -right-4 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-accent-500 text-white shadow-elevated transition-all duration-300 hover:scale-110 hover:bg-accent-600 md:flex"
        >
          <ArrowRight className="h-4 w-4" />
        </button>

        <ul
          ref={trackRef}
          className="scrollbar-none -mx-1 flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-2"
        >
          {products.map((product) => (
            <li
              key={product.code}
              className="w-[46%] shrink-0 snap-start sm:w-[240px]"
            >
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
