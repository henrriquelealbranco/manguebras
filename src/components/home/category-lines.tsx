import Link from "next/link";
import { ArrowRight, Boxes, Truck } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { listMontadoras } from "@/lib/catalog";

/**
 * Seção "Navegue pela sua montadora" — o cliente encontra a peça pela marca
 * do veículo (Scania, Volvo, Mercedes-Benz…), como no site atual da Manguebras.
 */
export function CategoryLines() {
  // Montadoras reais (exclui "Universal") + card do catálogo completo.
  const montadoras = listMontadoras().filter((m) => m.name !== "Universal");

  return (
    <section aria-label="Navegue pela montadora" className="bg-brand-950">
      <div className="container-page py-12">
        <SectionHeading
          dark
          pre="Navegue pela sua"
          highlight="montadora"
          linkHref="/produtos"
          linkLabel="Ver catálogo completo"
        />
        <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {montadoras.map((m, i) => (
            <Reveal key={m.slug} delay={i * 0.06}>
              <Link
                href={`/produtos?montadora=${m.slug}`}
                className="group relative flex h-full items-center gap-4 overflow-hidden rounded-md border border-white/10 bg-white/[0.04] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent-400/50 hover:bg-white/[0.07] hover:shadow-elevated"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(240px circle at 85% 15%, rgba(44,196,175,0.15), transparent 60%)",
                  }}
                />
                <span className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-accent-400/50 text-accent-400 transition-colors duration-300 group-hover:bg-accent-500 group-hover:text-white">
                  <Truck className="h-6 w-6" />
                </span>
                <div className="relative">
                  <p className="text-sm font-bold uppercase tracking-wide text-white">
                    {m.name}
                  </p>
                  <p className="mt-1 inline-flex items-center gap-1.5 text-xs font-semibold text-accent-400">
                    Ver peças
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}

          {/* Card do catálogo completo */}
          <Reveal delay={montadoras.length * 0.06}>
            <Link
              href="/produtos"
              className="group relative flex h-full items-center gap-4 overflow-hidden rounded-md border border-accent-400/30 bg-accent-500/10 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent-400/60 hover:bg-accent-500/15 hover:shadow-elevated"
            >
              <span className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-accent-400/60 text-accent-300 transition-colors duration-300 group-hover:bg-accent-500 group-hover:text-white">
                <Boxes className="h-6 w-6" />
              </span>
              <div className="relative">
                <p className="text-sm font-bold uppercase tracking-wide text-white">
                  Todo o catálogo
                </p>
                <p className="mt-1 inline-flex items-center gap-1.5 text-xs font-semibold text-accent-300">
                  Ver todos os produtos
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </p>
              </div>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
