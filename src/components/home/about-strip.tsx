import Link from "next/link";
import { ArrowRight, BadgeCheck } from "lucide-react";
import { CountUp } from "@/components/shared/count-up";
import { Reveal } from "@/components/shared/reveal";

const STATS = [
  { value: 4000, suffix: "+", label: "itens em catálogo" },
  { value: 8, suffix: "", label: "categorias de produtos" },
  { value: 5, suffix: "", label: "linhas atendidas" },
  { value: 27, suffix: "", label: "estados com entrega" },
];

/**
 * Faixa institucional — autoridade da marca + contadores animados.
 */
export function AboutStrip() {
  return (
    <section
      aria-label="Sobre a Manguebras"
      className="relative overflow-hidden bg-brand-950"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(800px circle at 10% 20%, rgba(13,102,93,0.5), transparent 55%), radial-gradient(600px circle at 90% 90%, rgba(44,196,175,0.12), transparent 60%)",
        }}
      />
      <div className="container-page relative grid items-center gap-10 py-16 lg:grid-cols-2">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-accent-400/40 bg-accent-400/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-accent-300">
            <BadgeCheck className="h-3.5 w-3.5" />
            Por que a Manguebras
          </span>
          <h2 className="mt-4 font-display text-3xl font-black uppercase leading-tight tracking-tight text-white md:text-4xl">
            Especialistas na linha de{" "}
            <span className="text-accent-400">arrefecimento diesel</span>
          </h2>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-brand-200">
            Todas as mangueiras e peças do seu caminhão em um só lugar. Se a
            peça está adaptada e você não encontra a original em lugar nenhum,
            envie uma amostra — nossa equipe encontra a solução. É assim que
            atendemos oficinas, autopeças, transportadoras e frotas em todo o
            Brasil.
          </p>
          <Link
            href="/sobre"
            className="group mt-4 inline-flex items-center gap-2 py-2 text-xs font-bold uppercase tracking-widest text-accent-400 transition-colors hover:text-accent-300"
          >
            Conheça nossa história
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>

        <dl className="grid grid-cols-2 gap-4">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={0.1 + i * 0.07}>
            <div
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center"
            >
              <dt className="order-2 mt-1 block text-xs font-semibold uppercase tracking-wide text-brand-300">
                {stat.label}
              </dt>
              <dd className="font-display text-4xl font-black text-white">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </dd>
            </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
