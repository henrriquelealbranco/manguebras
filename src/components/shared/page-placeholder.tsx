import { Construction, MessageCircle } from "lucide-react";
import { PageBreadcrumb } from "@/components/shared/page-breadcrumb";
import { whatsappLink } from "@/constants/site";

interface PagePlaceholderProps {
  title: string;
  description: string;
}

/**
 * Placeholder temporário para rotas em construção.
 * Substituído pelo conteúdo real nas próximas etapas.
 */
export function PagePlaceholder({ title, description }: PagePlaceholderProps) {
  return (
    <div className="container-page section-padding">
      <PageBreadcrumb items={[{ label: title }]} className="mb-10" />
      <div className="mx-auto flex max-w-lg flex-col items-center gap-5 rounded-3xl border border-dashed border-graphite-300 bg-graphite-50/60 px-8 py-16 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-100 text-brand-700">
          <Construction className="h-7 w-7" />
        </span>
        <h1 className="font-display text-3xl font-extrabold text-brand-900">
          {title}
        </h1>
        <p className="text-graphite-500">{description}</p>
        <a
          href={whatsappLink("Olá! Vim pelo site da Manguebras.")}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center gap-2 rounded-xl bg-brand-900 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:bg-brand-800"
        >
          <MessageCircle className="h-4 w-4" />
          Enquanto isso, fale conosco no WhatsApp
        </a>
      </div>
    </div>
  );
}
