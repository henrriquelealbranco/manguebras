import type { Metadata } from "next";
import Link from "next/link";
import { CartView } from "@/components/cart/cart-view";

export const metadata: Metadata = {
  title: "Carrinho",
  description: "Seu carrinho de compras na Manguebras.",
};

export default function CarrinhoPage() {
  return (
    <>
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
            <span className="text-white">Carrinho</span>
          </nav>
          <h1 className="mt-3 font-display text-3xl font-black uppercase tracking-tight text-white md:text-4xl">
            Meu <span className="text-accent-400">carrinho</span>
          </h1>
        </div>
      </section>

      <div className="container-page py-10">
        <CartView />
      </div>
    </>
  );
}
