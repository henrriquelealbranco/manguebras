"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { MessageCircle, Minus, Plus, ShoppingCart, Zap } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/hooks/use-cart";
import { whatsappLink } from "@/constants/site";
import { formatBRL } from "@/lib/utils";
import { installmentCents } from "@/data/products";
import type { Product } from "@/types/product";

interface BuyBoxProps {
  product: Product;
}

/**
 * Bloco de compra do PDP — modelo híbrido:
 * com preço → quantidade + carrinho + compra direta;
 * sem preço → orçamento via WhatsApp.
 */
export function BuyBox({ product }: BuyBoxProps) {
  const router = useRouter();
  const addItem = useCart((s) => s.addItem);
  const [quantity, setQuantity] = useState(1);

  const orcamentoHref = whatsappLink(
    `Olá! Quero um orçamento do produto: ${product.name} (Cód. ${product.code}).`,
  );

  if (!product.priceCents) {
    return (
      <div className="rounded-2xl border border-graphite-200 bg-white p-6 shadow-soft">
        <p className="text-xs font-bold uppercase tracking-widest text-graphite-400">
          Venda sob orçamento
        </p>
        <p className="mt-2 font-display text-2xl font-extrabold text-brand-800">
          Consulte nossa equipe
        </p>
        <p className="mt-1 text-sm text-graphite-500">
          As especificações variam por modelo — informe o veículo/motor e
          respondemos rapidinho.
        </p>
        <a
          href={orcamentoHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-accent-500 py-3.5 text-xs font-bold uppercase tracking-widest text-white transition-all duration-300 hover:scale-[1.01] hover:bg-accent-600"
        >
          <MessageCircle className="h-4 w-4" />
          Solicitar orçamento
        </a>
      </div>
    );
  }

  const add = () => addItem(product.code, quantity);

  const handleAddToCart = () => {
    add();
    toast.success("Adicionado ao carrinho", { description: product.name });
  };

  const handleBuyNow = () => {
    add();
    router.push("/carrinho");
  };

  return (
    <div className="rounded-2xl border border-graphite-200 bg-white p-6 shadow-soft">
      <div className="flex items-baseline gap-3">
        <p className="font-display text-3xl font-black text-accent-600">
          {formatBRL(product.priceCents)}
        </p>
        {product.compareAtCents && (
          <p className="text-sm text-graphite-400 line-through">
            {formatBRL(product.compareAtCents)}
          </p>
        )}
      </div>
      <p className="mt-1 text-sm text-graphite-500">
        Em até <strong>6x de {formatBRL(installmentCents(product.priceCents))}</strong>{" "}
        sem juros no cartão, ou via Pix
      </p>

      <div className="mt-5 flex items-center gap-3">
        <div
          className="flex h-12 items-center rounded-lg border border-graphite-300"
          role="group"
          aria-label="Quantidade"
        >
          <button
            type="button"
            aria-label="Diminuir quantidade"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="flex h-full w-10 items-center justify-center text-graphite-500 transition-colors hover:text-brand-700 disabled:opacity-40"
            disabled={quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </button>
          <span
            aria-live="polite"
            className="w-10 text-center text-sm font-bold text-graphite-900"
          >
            {quantity}
          </span>
          <button
            type="button"
            aria-label="Aumentar quantidade"
            onClick={() => setQuantity((q) => Math.min(99, q + 1))}
            className="flex h-full w-10 items-center justify-center text-graphite-500 transition-colors hover:text-brand-700"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        <button
          type="button"
          onClick={handleBuyNow}
          className="flex h-12 flex-1 items-center justify-center gap-2 rounded-lg bg-accent-500 px-4 text-xs font-bold uppercase tracking-widest text-white transition-all duration-300 hover:scale-[1.01] hover:bg-accent-600"
        >
          <Zap className="h-4 w-4" />
          Comprar agora
        </button>
      </div>

      <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
        <button
          type="button"
          onClick={handleAddToCart}
          className="flex h-11 items-center justify-center gap-2 rounded-lg bg-brand-900 px-4 text-[11px] font-bold uppercase tracking-widest text-white transition-colors duration-300 hover:bg-brand-800"
        >
          <ShoppingCart className="h-4 w-4" />
          Adicionar ao carrinho
        </button>
        <a
          href={orcamentoHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-11 items-center justify-center gap-2 rounded-lg border border-brand-700 px-4 text-[11px] font-bold uppercase tracking-widest text-brand-800 transition-colors duration-300 hover:bg-brand-900 hover:text-white"
        >
          <MessageCircle className="h-4 w-4" />
          Comprar no WhatsApp
        </a>
      </div>
    </div>
  );
}
