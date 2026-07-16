import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { whatsappLink } from "@/constants/site";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

/**
 * Card de produto do catálogo virtual (sem venda online).
 * Leva à página de detalhes (foto + ficha técnica) e oferece
 * consulta direta com um representante via WhatsApp.
 * Estética industrial: bordas retas, sombra nítida, altura igual.
 */
export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group flex h-full flex-col rounded-md border border-graphite-200 bg-white p-4 shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-400 hover:shadow-card">
      <Link
        href={`/produtos/${product.slug}`}
        className="relative mx-auto flex aspect-square w-full max-w-44 items-center justify-center overflow-hidden rounded-sm"
      >
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 45vw, 200px"
          className="object-contain p-1 transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      <div className="mt-3 flex flex-1 flex-col">
        <Link href={`/produtos/${product.slug}`}>
          <h3 className="line-clamp-2 min-h-[2.5rem] text-xs font-bold uppercase leading-snug tracking-wide text-graphite-900 transition-colors group-hover:text-brand-700">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-wide text-graphite-500">
          Cód. {product.code}
          {product.montadora !== "Universal" && (
            <span className="text-brand-600"> · {product.montadora}</span>
          )}
        </p>
        <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-graphite-500">
          {product.shortDescription}
        </p>

        <div className="mt-auto flex flex-col gap-2 border-t border-graphite-100 pt-3">
          <Link
            href={`/produtos/${product.slug}`}
            className="flex min-h-10 w-full items-center justify-center gap-2 rounded-sm bg-action-500 py-2.5 text-[11px] font-bold uppercase tracking-widest text-white transition-colors duration-200 hover:bg-action-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-action-500 active:bg-action-700"
          >
            Ver detalhes
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <a
            href={whatsappLink(
              `Olá! Tenho interesse na peça: ${product.name} (Cód. ${product.code}). Podem me passar mais informações?`,
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-9 w-full items-center justify-center gap-2 rounded-sm border border-brand-700 py-2 text-[11px] font-bold uppercase tracking-widest text-brand-800 transition-colors duration-200 hover:bg-brand-900 hover:text-white active:bg-brand-950"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            Consultar
          </a>
        </div>
      </div>
    </article>
  );
}
