import Link from "next/link";
import { ArrowRight, Boxes, Truck } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { listMontadoras } from "@/lib/catalog";

/**
 * Seção "Navegue pela sua montadora" — o cliente encontra a peça pela marca
 * do veículo, com TODAS as montadoras atendidas pela Manguebras (mesma
 * organização do site atual). Tiles compactos para caber a lista completa.
 */
export function CategoryLines() {
  const montadoras = listMontadoras();

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
        <p className="mt-2 max-w-xl text-sm text-brand-200">
          Encontre a peça certa pela marca do seu veículo — atendemos as
          principais montadoras da linha diesel/pesada.
        </p>

        <Reveal>
          <div className="mt-7 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {montadoras.map((m) => (
              <Link
                key={m.slug}
                href={`/produtos?montadora=${m.slug}`}
                className="group flex items-center gap-2.5 rounded-md border border-white/10 bg-white/[0.04] px-3.5 py-3 text-sm font-semibold text-white/90 transition-all duration-200 hover:border-accent-400/50 hover:bg-white/[0.08] hover:text-white"
              >
                <Truck className="h-4 w-4 shrink-0 text-accent-400" />
                <span className="truncate">{m.name}</span>
              </Link>
            ))}

            {/* Catálogo completo */}
            <Link
              href="/produtos"
              className="group flex items-center gap-2.5 rounded-md border border-accent-400/40 bg-accent-500/10 px-3.5 py-3 text-sm font-bold text-white transition-all duration-200 hover:border-accent-400/70 hover:bg-accent-500/20"
            >
              <Boxes className="h-4 w-4 shrink-0 text-accent-300" />
              <span className="truncate">Todo o catálogo</span>
              <ArrowRight className="ml-auto h-3.5 w-3.5 text-accent-300 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
