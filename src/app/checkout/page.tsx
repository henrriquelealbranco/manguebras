import type { Metadata } from "next";
import Link from "next/link";
import { Lock } from "lucide-react";
import { CheckoutForm } from "@/components/checkout/checkout-form";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Finalize sua compra na Manguebras.",
  robots: { index: false },
};

export default function CheckoutPage() {
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
        <div className="container-page relative flex items-end justify-between gap-4 py-10">
          <div>
            <nav aria-label="Breadcrumb" className="text-xs text-brand-300">
              <Link
                href="/carrinho"
                className="transition-colors hover:text-accent-400"
              >
                Carrinho
              </Link>
              <span className="mx-2">/</span>
              <span className="text-white">Checkout</span>
            </nav>
            <h1 className="mt-3 font-display text-3xl font-black uppercase tracking-tight text-white md:text-4xl">
              Finalizar <span className="text-accent-400">compra</span>
            </h1>
          </div>
          <p className="hidden items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-200 sm:flex">
            <Lock className="h-4 w-4 text-accent-400" />
            Ambiente seguro
          </p>
        </div>
      </section>

      <div className="container-page py-10">
        <CheckoutForm />
      </div>
    </>
  );
}
