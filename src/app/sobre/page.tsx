import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Compass,
  Eye,
  Handshake,
  HeartHandshake,
  MessageCircle,
  Target,
  Wrench,
} from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { CountUp } from "@/components/shared/count-up";
import { whatsappLink } from "@/constants/site";

export const metadata: Metadata = {
  title: "Sobre a Manguebras",
  description:
    "Conheça a Manguebras: especialista em mangueiras para a linha de arrefecimento diesel, atendendo oficinas, autopeças, transportadoras e frotas em todo o Brasil.",
};

const VALORES = [
  {
    icon: Wrench,
    title: "Especialização",
    text: "Vivemos mangueiras. Conhecemos cada aplicação da linha diesel como ninguém.",
  },
  {
    icon: HeartHandshake,
    title: "Atendimento próximo",
    text: "Conversa direta, sem burocracia. Você fala com quem entende do assunto.",
  },
  {
    icon: Handshake,
    title: "Parceria de verdade",
    text: "Oficina, autopeça ou frota: crescemos junto com o negócio dos nossos clientes.",
  },
];

export default function SobrePage() {
  return (
    <>
      <PageHeader
        crumb="Sobre"
        pre="Sobre a"
        highlight="Manguebras"
        description="Especialistas em mangueiras automotivas para a linha de arrefecimento diesel."
      />

      {/* História */}
      <div className="container-page grid gap-10 py-14 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl font-extrabold uppercase text-graphite-900">
            Todas as peças do seu caminhão{" "}
            <span className="text-accent-500">em um só lugar</span>
          </h2>
          <div className="mt-4 space-y-4 text-sm leading-relaxed text-graphite-600">
            <p>
              A Manguebras nasceu para resolver um problema que todo dono de
              caminhão conhece: a dificuldade de encontrar a mangueira certa —
              principalmente quando a peça original saiu de linha ou o veículo
              está rodando com uma adaptação.
            </p>
            <p>
              Somos especialistas na <strong>linha de arrefecimento diesel</strong>:
              mangueiras de radiador, intercooler, turbina e filtro de ar, além
              de abraçadeiras, juntas, tanques de expansão, coxins e acessórios.
              São milhares de itens em catálogo para atender oficinas,
              revendedores, autopeças, transportadoras e frotas.
            </p>
            <p>
              Nosso diferencial é o atendimento técnico: se você não sabe o
              código da peça, basta enviar uma foto da amostra pelo WhatsApp.
              Nossa equipe identifica o item e encontra a solução — original ou
              paralela — para o caminhão voltar a rodar.
            </p>
          </div>
          <a
            href={whatsappLink("Olá! Quero conhecer melhor a Manguebras.")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-brand-900 px-6 py-3 text-xs font-bold uppercase tracking-widest text-white transition-all duration-300 hover:scale-[1.02] hover:bg-brand-800"
          >
            <MessageCircle className="h-4 w-4" />
            Falar com a equipe
          </a>
        </div>

        {/* Números */}
        <dl className="grid h-fit grid-cols-2 gap-4">
          {[
            { value: 4000, suffix: "+", label: "itens em catálogo" },
            { value: 8, suffix: "", label: "categorias de produtos" },
            { value: 5, suffix: "", label: "linhas atendidas" },
            { value: 27, suffix: "", label: "estados com entrega" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg border border-graphite-200 bg-graphite-50/60 p-6 text-center shadow-soft"
            >
              <dd className="font-display text-4xl font-black text-brand-900">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </dd>
              <dt className="mt-1 text-xs font-semibold uppercase tracking-wide text-graphite-500">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>

      {/* Missão / Visão */}
      <section className="relative overflow-hidden bg-brand-950">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(700px circle at 15% 50%, rgba(13,102,93,0.5), transparent 55%)",
          }}
        />
        <div className="container-page relative grid gap-4 py-14 md:grid-cols-2">
          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-7">
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-accent-400/50 text-accent-400">
              <Target className="h-5 w-5" />
            </span>
            <h2 className="mt-4 font-display text-lg font-bold uppercase tracking-wide text-white">
              Missão
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-brand-200">
              Manter caminhões rodando: entregar a mangueira certa, no prazo
              certo, com atendimento que entende do assunto.
            </p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-7">
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-accent-400/50 text-accent-400">
              <Eye className="h-5 w-5" />
            </span>
            <h2 className="mt-4 font-display text-lg font-bold uppercase tracking-wide text-white">
              Visão
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-brand-200">
              Ser a referência nacional em mangueiras para a linha diesel — o
              primeiro nome que vem à cabeça quando o assunto é arrefecimento.
            </p>
          </div>
        </div>
      </section>

      {/* Valores */}
      <div className="container-page py-14">
        <h2 className="font-display text-2xl font-extrabold uppercase text-graphite-900">
          Nossos <span className="text-accent-500">valores</span>
        </h2>
        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {VALORES.map((valor) => (
            <div
              key={valor.title}
              className="rounded-lg border border-graphite-200 bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-md bg-brand-100 text-brand-700">
                <valor.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-sm font-bold uppercase tracking-wide text-graphite-900">
                {valor.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-graphite-600">
                {valor.text}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-brand-200 bg-brand-50 p-6">
          <div className="flex items-center gap-3">
            <Compass className="h-6 w-6 text-brand-700" />
            <p className="text-sm font-semibold text-brand-900">
              Quer conhecer o catálogo completo?
            </p>
          </div>
          <Link
            href="/produtos"
            className="group inline-flex items-center gap-2 rounded-lg bg-brand-900 px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-brand-800"
          >
            Ver produtos
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </>
  );
}
