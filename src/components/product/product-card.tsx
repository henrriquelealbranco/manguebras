"use client";

import Image from "next/image";
import Link from "next/link";
import { MessageCircle, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/hooks/use-cart";
import { whatsappLink } from "@/constants/site";
import { formatBRL } from "@/lib/utils";
import { installmentCents } from "@/data/products";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

/**
 * Card de produto padrão do catálogo.
 * Modelo híbrido: com preço → COMPRAR (carrinho);
 * sem preço → ORÇAMENTO (WhatsApp).
 */
export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCart((s) => s.addItem);

  const handleBuy = () => {
    addItem(product.code);
    toast.success("Adicionado ao carrinho", {
      description: product.name,
    });
  };

  return (
    <article className="group flex h-full flex-col rounded-xl border border-graphite-200 bg-white p-4 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-card">
      <Link
        href={`/produtos/${product.slug}`}
        className="relative mx-auto block aspect-square w-full max-w-44 overflow-hidden"
      >
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 45vw, 200px"
          className="object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      <div className="mt-3 flex flex-1 flex-col">
        <Link href={`/produtos/${product.slug}`}>
          <h3 className="line-clamp-2 min-h-8 text-xs font-bold uppercase leading-snug tracking-wide text-graphite-900 transition-colors group-hover:text-brand-700">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1.5 text-[11px] text-graphite-500">
          Cód. {product.code}
        </p>

        {product.priceCents ? (
          <>
            <div className="mt-2 flex items-baseline gap-2">
              <p className="text-lg font-extrabold text-accent-600">
                {formatBRL(product.priceCents)}
              </p>
              {product.compareAtCents && (
                <p className="text-xs text-graphite-400 line-through">
                  {formatBRL(product.compareAtCents)}
                </p>
              )}
            </div>
            <p className="text-[11px] text-graphite-500">
              Em até 6x de {formatBRL(installmentCents(product.priceCents))}
            </p>
            <button
              type="button"
              onClick={handleBuy}
              className="mt-auto flex min-h-10 w-full items-center justify-center gap-2 rounded-md bg-brand-900 py-2.5 text-[11px] font-bold uppercase tracking-widest text-white transition-colors duration-300 hover:bg-accent-600"
            >
              <ShoppingCart className="h-3.5 w-3.5" />
              Comprar
            </button>
          </>
        ) : (
          <>
            <p className="mt-2 text-sm font-bold text-brand-700">
              Sob orçamento
            </p>
            <p className="text-[11px] text-graphite-500">
              Consulte para seu modelo
            </p>
            <a
              href={whatsappLink(
                `Olá! Quero um orçamento do produto: ${product.name} (Cód. ${product.code}).`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto flex min-h-10 w-full items-center justify-center gap-2 rounded-md border border-brand-700 py-2.5 text-[11px] font-bold uppercase tracking-widest text-brand-800 transition-colors duration-300 hover:bg-brand-900 hover:text-white"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              Orçamento
            </a>
          </>
        )}
      </div>
    </article>
  );
}
