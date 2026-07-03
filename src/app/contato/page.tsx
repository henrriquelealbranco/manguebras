import type { Metadata } from "next";
import {
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  type LucideIcon,
} from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { ContactForm } from "@/components/contact/contact-form";
import { SITE, whatsappLink } from "@/constants/site";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Fale com a equipe Manguebras: WhatsApp, telefone, e-mail. Atendimento especializado para oficinas, autopeças e frotas em todo o Brasil.",
};

interface Channel {
  icon: LucideIcon;
  title: string;
  value: string;
  href?: string;
  external?: boolean;
}

const CHANNELS: Channel[] = [
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: SITE.whatsapp,
    href: whatsappLink("Olá! Vim pelo site da Manguebras."),
    external: true,
  },
  {
    icon: Phone,
    title: "Telefone",
    value: SITE.phone,
    href: SITE.phoneHref,
  },
  {
    icon: Mail,
    title: "E-mail",
    value: SITE.email,
    href: `mailto:${SITE.email}`,
  },
  {
    icon: Clock,
    title: "Horário",
    value: "Seg–Sex, 8h às 18h",
  },
  {
    icon: MapPin,
    title: "Localização",
    value: `${SITE.address.city} – ${SITE.address.state}`,
  },
];

export default function ContatoPage() {
  return (
    <>
      <PageHeader
        crumb="Contato"
        pre="Fale com a"
        highlight="Manguebras"
        description="Atendimento especializado — resposta rápida no WhatsApp."
      />

      <div className="container-page grid gap-8 py-12 lg:grid-cols-[360px_1fr]">
        {/* Canais */}
        <div className="space-y-3">
          {CHANNELS.map((channel) => {
            const content = (
              <>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
                  <channel.icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs font-bold uppercase tracking-widest text-graphite-500">
                    {channel.title}
                  </span>
                  <span className="block text-sm font-semibold text-graphite-900">
                    {channel.value}
                  </span>
                </span>
              </>
            );
            return channel.href ? (
              <a
                key={channel.title}
                href={channel.href}
                {...(channel.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="flex items-center gap-4 rounded-2xl border border-graphite-200 bg-white p-4 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-card"
              >
                {content}
              </a>
            ) : (
              <div
                key={channel.title}
                className="flex items-center gap-4 rounded-2xl border border-graphite-200 bg-white p-4 shadow-soft"
              >
                {content}
              </div>
            );
          })}

          <div className="rounded-2xl bg-brand-950 p-5">
            <p className="text-xs font-bold uppercase tracking-widest text-accent-400">
              Dica rápida
            </p>
            <p className="mt-2 text-sm leading-relaxed text-brand-200">
              Tem uma mangueira na mão e não sabe o código? Envie uma{" "}
              <strong className="text-white">foto da amostra</strong> no
              WhatsApp com o modelo do caminhão — a gente identifica pra você.
            </p>
          </div>
        </div>

        <ContactForm />
      </div>
    </>
  );
}
