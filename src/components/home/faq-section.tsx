import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "@/components/shared/section-heading";
import { FAQ_ITEMS } from "@/data/faq";

/**
 * FAQ da homepage — 4 primeiras perguntas + link para a página completa.
 */
export function FaqSection() {
  return (
    <section aria-label="Perguntas frequentes" className="bg-graphite-50">
      <div className="container-page grid gap-10 py-14 lg:grid-cols-[380px_1fr]">
        <div>
          <SectionHeading pre="Perguntas" highlight="frequentes" />
          <p className="mt-4 text-sm leading-relaxed text-graphite-500">
            Reunimos as dúvidas mais comuns de oficinas, autopeças e frotas.
            Não achou a resposta? Chama a gente no WhatsApp.
          </p>
          <Link
            href="/faq"
            className="group mt-3 inline-flex items-center gap-2 py-2 text-xs font-bold uppercase tracking-widest text-brand-700 transition-colors hover:text-accent-600"
          >
            Ver todas as perguntas
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <Accordion
          type="single"
          collapsible
          className="rounded-2xl border border-graphite-200 bg-white px-5 shadow-soft"
        >
          {FAQ_ITEMS.slice(0, 4).map((item, i) => (
            <AccordionItem
              key={item.question}
              value={`faq-${i}`}
              className={i === 3 ? "border-none" : ""}
            >
              <AccordionTrigger className="py-4 text-left text-sm font-bold text-graphite-900 hover:text-brand-700 hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-graphite-600">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
