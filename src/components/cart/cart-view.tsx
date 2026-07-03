"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  MessageCircle,
  Minus,
  Plus,
  ShoppingCart,
  Tag,
  Trash2,
  Truck,
} from "lucide-react";
import { toast } from "sonner";
import { ProductCarousel } from "@/components/product/product-carousel";
import { useCart } from "@/hooks/use-cart";
import { COUPONS, crossSellFor, summarizeCart } from "@/lib/cart";
import { formatBRL } from "@/lib/utils";
import { whatsappLink } from "@/constants/site";

function EmptyCart() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-5 rounded-3xl border border-dashed border-graphite-300 bg-graphite-50/60 px-8 py-16 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-100 text-brand-700">
        <ShoppingCart className="h-7 w-7" />
      </span>
      <div>
        <h2 className="font-display text-xl font-extrabold uppercase text-graphite-900">
          Seu carrinho está <span className="text-accent-500">vazio</span>
        </h2>
        <p className="mt-2 text-sm text-graphite-500">
          Explore o catálogo e encontre as mangueiras e peças certas para o seu
          veículo.
        </p>
      </div>
      <Link
        href="/produtos"
        className="inline-flex items-center gap-2 rounded-lg bg-brand-900 px-6 py-3 text-xs font-bold uppercase tracking-widest text-white transition-all duration-300 hover:scale-[1.02] hover:bg-brand-800"
      >
        Ver produtos
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

/**
 * Conteúdo do carrinho — itens, cupom, resumo e cross-sell.
 * Client component: o carrinho vive em localStorage.
 */
export function CartView() {
  const { items, coupon, setQuantity, removeItem, setCoupon } = useCart();
  const [couponInput, setCouponInput] = useState("");
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Evita mismatch de hidratação (localStorage só existe no client)
  if (!mounted) {
    return <div className="min-h-[420px]" aria-busy="true" />;
  }

  const summary = summarizeCart(items, coupon);
  const crossSell = crossSellFor(summary);

  if (summary.entries.length === 0) return <EmptyCart />;

  const applyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    if (!code) return;
    if (COUPONS[code]) {
      setCoupon(code);
      toast.success(`Cupom ${code} aplicado!`, {
        description: `${COUPONS[code]}% de desconto no subtotal.`,
      });
    } else {
      toast.error("Cupom inválido", {
        description: "Confira o código e tente novamente.",
      });
    }
    setCouponInput("");
  };

  const orcamentoMessage = [
    "Olá! Quero um orçamento dos itens do meu carrinho:",
    ...summary.entries.map(
      (e) => `• ${e.quantity}x ${e.product.name} (Cód. ${e.product.code})`,
    ),
  ].join("\n");

  return (
    <>
      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        {/* Itens */}
        <ul className="space-y-3">
          {summary.entries.map(({ product, quantity, lineTotalCents }) => (
            <li
              key={product.code}
              className="flex gap-4 rounded-2xl border border-graphite-200 bg-white p-4 shadow-soft"
            >
              <Link
                href={`/produtos/${product.slug}`}
                className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-graphite-100 bg-white"
              >
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  sizes="96px"
                  className="object-contain p-1.5"
                />
              </Link>

              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <Link
                      href={`/produtos/${product.slug}`}
                      className="line-clamp-2 text-sm font-bold text-graphite-900 transition-colors hover:text-brand-700"
                    >
                      {product.name}
                    </Link>
                    <p className="mt-0.5 text-[11px] text-graphite-500">
                      Cód. {product.code} ·{" "}
                      {formatBRL(product.priceCents ?? 0)} un.
                    </p>
                  </div>
                  <button
                    type="button"
                    aria-label={`Remover ${product.name}`}
                    onClick={() => {
                      removeItem(product.code);
                      toast("Item removido", { description: product.name });
                    }}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-graphite-400 transition-colors hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-auto flex items-center justify-between gap-3 pt-2">
                  <div
                    className="flex h-9 items-center rounded-lg border border-graphite-300"
                    role="group"
                    aria-label={`Quantidade de ${product.name}`}
                  >
                    <button
                      type="button"
                      aria-label="Diminuir"
                      onClick={() => setQuantity(product.code, quantity - 1)}
                      className="flex h-full w-8 items-center justify-center text-graphite-500 transition-colors hover:text-brand-700"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm font-bold text-graphite-900">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      aria-label="Aumentar"
                      onClick={() => setQuantity(product.code, quantity + 1)}
                      className="flex h-full w-8 items-center justify-center text-graphite-500 transition-colors hover:text-brand-700"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <p className="text-base font-extrabold text-accent-600">
                    {formatBRL(lineTotalCents)}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Resumo */}
        <aside className="h-fit space-y-4 lg:sticky lg:top-16">
          <div className="rounded-2xl border border-graphite-200 bg-white p-6 shadow-soft">
            <h2 className="font-display text-sm font-bold uppercase tracking-widest text-graphite-900">
              Resumo do pedido
            </h2>

            {/* Cupom */}
            <div className="mt-4">
              {coupon ? (
                <div className="flex items-center justify-between rounded-lg border border-accent-500/40 bg-accent-500/10 px-3 py-2.5">
                  <p className="flex items-center gap-2 text-sm font-semibold text-accent-600">
                    <Tag className="h-4 w-4" />
                    {coupon} (−{summary.discountPercent}%)
                  </p>
                  <button
                    type="button"
                    onClick={() => setCoupon(null)}
                    className="text-xs font-bold uppercase text-graphite-400 hover:text-red-600"
                  >
                    Remover
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && applyCoupon()}
                    placeholder="Cupom de desconto"
                    aria-label="Cupom de desconto"
                    className="h-10 min-w-0 flex-1 rounded-lg border border-graphite-300 px-3 text-sm uppercase outline-none transition-colors placeholder:normal-case focus:border-accent-500"
                  />
                  <button
                    type="button"
                    onClick={applyCoupon}
                    className="h-10 rounded-lg bg-graphite-900 px-4 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-brand-900"
                  >
                    Aplicar
                  </button>
                </div>
              )}
            </div>

            <dl className="mt-4 space-y-2 border-t border-graphite-200 pt-4 text-sm">
              <div className="flex justify-between text-graphite-600">
                <dt>
                  Subtotal ({summary.totalItems}{" "}
                  {summary.totalItems === 1 ? "item" : "itens"})
                </dt>
                <dd className="font-semibold">
                  {formatBRL(summary.subtotalCents)}
                </dd>
              </div>
              {summary.discountCents > 0 && (
                <div className="flex justify-between text-accent-600">
                  <dt>Desconto</dt>
                  <dd className="font-semibold">
                    −{formatBRL(summary.discountCents)}
                  </dd>
                </div>
              )}
              <div className="flex justify-between text-graphite-600">
                <dt className="flex items-center gap-1.5">
                  <Truck className="h-4 w-4" /> Frete
                </dt>
                <dd className="text-xs">calculado no checkout</dd>
              </div>
              <div className="flex justify-between border-t border-graphite-200 pt-3 text-base font-extrabold text-graphite-900">
                <dt>Total</dt>
                <dd className="text-accent-600">
                  {formatBRL(summary.totalCents)}
                </dd>
              </div>
            </dl>

            <Link
              href="/checkout"
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-accent-500 py-3.5 text-xs font-bold uppercase tracking-widest text-white transition-all duration-300 hover:scale-[1.01] hover:bg-accent-600"
            >
              Finalizar compra
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={whatsappLink(orcamentoMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg border border-brand-700 py-3 text-[11px] font-bold uppercase tracking-widest text-brand-800 transition-colors hover:bg-brand-900 hover:text-white"
            >
              <MessageCircle className="h-4 w-4" />
              Fechar pelo WhatsApp
            </a>
            <Link
              href="/produtos"
              className="mt-3 block text-center text-xs font-semibold text-graphite-500 transition-colors hover:text-brand-700"
            >
              ← Continuar comprando
            </Link>
          </div>
        </aside>
      </div>

      {/* Cross-sell */}
      {crossSell.length > 0 && (
        <div className="mt-14">
          <ProductCarousel
            products={crossSell}
            pre="Você também pode"
            highlight="precisar"
          />
        </div>
      )}
    </>
  );
}
