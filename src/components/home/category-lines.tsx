import Link from "next/link";
import {
  ArrowRight,
  CarFront,
  Fuel,
  Sparkles,
  Truck,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";

interface LineCard {
  icon: LucideIcon;
  title: string;
  href: string;
}

const LINE_CARDS: LineCard[] = [
  { icon: Fuel, title: "Linha Diesel", href: "/produtos?linha=diesel" },
  { icon: CarFront, title: "Linha Leve", href: "/produtos?linha=leve" },
  { icon: Truck, title: "Linha Pesada", href: "/produtos?linha=pesada" },
  {
    icon: Sparkles,
    title: "Lançamentos",
    href: "/produtos?ordenar=novidades",
  },
];

/**
 * Seção "Encontre por categoria" — cards escuros das linhas de produto.
 */
export function CategoryLines() {
  return (
    <section aria-label="Linhas de produto" className="bg-brand-950">
      <div className="container-page py-12">
        <SectionHeading
          dark
          pre="Encontre por"
          highlight="categoria"
          linkHref="/produtos"
          linkLabel="Ver todas as categorias"
        />
        <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {LINE_CARDS.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.07}>
            <Link
              href={card.href}
              className="group relative overflow-hidden rounded-md border border-white/10 bg-white/[0.04] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent-400/50 hover:bg-white/[0.07] hover:shadow-elevated"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(240px circle at 85% 15%, rgba(44,196,175,0.15), transparent 60%)",
                }}
              />
              <div className="relative flex items-center gap-4">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-accent-400/50 text-accent-400 transition-colors duration-300 group-hover:bg-accent-500 group-hover:text-white">
                  <card.icon className="h-6 w-6" />
                </span>
                <div>
                  <p className="text-sm font-bold uppercase tracking-wide text-white">
                    {card.title}
                  </p>
                  <p className="mt-1 inline-flex items-center gap-1.5 text-xs font-semibold text-accent-400">
                    Ver produtos
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </p>
                </div>
              </div>
            </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
