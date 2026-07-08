import type { Metadata } from "next";
import { MessageCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PageHeader } from "@/components/shared/page-header";
import { FAQ_ITEMS } from "@/data/faq";
import { whatsappLink } from "@/constants/site";

export const metadata: Metadata = {
  title: "Perguntas Frequentes",
  description:
    "Dúvidas sobre identificação de mangueiras, prazos de entrega, pagamento e trocas na Manguebras.",
};

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHeader
        crumb="FAQ"
        pre="Perguntas"
        highlight="frequentes"
        description="Respostas diretas para as dúvidas mais comuns de oficinas, autopeças e frotas."
      />

      <div className="container-page max-w-3xl py-12">
        <Accordion
          type="single"
          collapsible
          className="rounded-lg border border-graphite-200 bg-white px-6 shadow-soft"
        >
          {FAQ_ITEMS.map((item, i) => (
            <AccordionItem
              key={item.question}
              value={`faq-${i}`}
              className={i === FAQ_ITEMS.length - 1 ? "border-none" : ""}
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

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-lg bg-brand-950 p-6">
          <p className="text-sm font-semibold text-white">
            Não achou sua resposta?
          </p>
          <a
            href={whatsappLink("Olá! Tenho uma dúvida que não está no FAQ.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-action-500 px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-action-600 active:bg-action-700"
          >
            <MessageCircle className="h-4 w-4" />
            Perguntar no WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}
