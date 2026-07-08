import { Quote, Star } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Caminhão parado é prejuízo. Mandei a foto de uma mangueira adaptada que ninguém tinha e em minutos eles acharam a peça certa. Resolveu de vez.",
    name: "Oficina de caminhões",
    role: "Cliente da linha diesel",
  },
  {
    quote:
      "Trabalho com autopeças e a Manguebras virou meu fornecedor fixo: catálogo enorme, resposta rápida no WhatsApp e entrega que chega no prazo.",
    name: "Autopeças parceira",
    role: "Revenda",
  },
  {
    quote:
      "Nossa frota não pode esperar. O atendimento entende do assunto e sempre indica o combo completo — mangueira, abraçadeira e junta de uma vez.",
    name: "Transportadora",
    role: "Gestão de frota",
  },
];

/**
 * Depoimentos de clientes — prova social no padrão do design.
 */
export function Testimonials() {
  return (
    <section aria-label="Depoimentos" className="bg-white">
      <div className="container-page py-14">
        <SectionHeading pre="O que dizem nossos" highlight="clientes" />
        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08} className="h-full">
            <figure
              className="relative flex h-full flex-col rounded-lg border border-graphite-200 bg-graphite-50/50 p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
            >
              <Quote
                aria-hidden
                className="absolute right-5 top-5 h-8 w-8 text-brand-100"
              />
              <div
                className="flex gap-0.5 text-accent-500"
                aria-label="5 de 5 estrelas"
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-graphite-600">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-4 border-t border-graphite-200 pt-3">
                <p className="text-sm font-bold text-graphite-900">{t.name}</p>
                <p className="text-xs text-graphite-500">{t.role}</p>
              </figcaption>
            </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
