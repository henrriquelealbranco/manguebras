"use client";

import Link from "next/link";
import {
  Boxes,
  Mail,
  MessageCircle,
  Phone,
  Truck,
} from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { CategoriesMenu } from "@/components/layout/mega-menu";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { SearchAutocomplete } from "@/components/search/search-autocomplete";
import { SITE, whatsappLink } from "@/constants/site";
import { trackWhatsAppClick } from "@/lib/tracking";

const LINE_LINKS = [
  { href: "/produtos", label: "Produtos" },
  { href: "/produtos?ordenar=novidades", label: "Lançamentos" },
  { href: "/sobre", label: "Quem Somos" },
  { href: "/contato", label: "Contato" },
];

function TrustBadge({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: typeof Truck;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-accent-500/40 text-accent-600">
        <Icon className="h-5 w-5" />
      </span>
      <div className="leading-tight">
        <p className="text-xs font-bold uppercase tracking-wide text-graphite-900">
          {title}
        </p>
        <p className="mt-0.5 text-[11px] text-graphite-500">{subtitle}</p>
      </div>
    </div>
  );
}

/**
 * Header global em 3 níveis com hierarquia visual e contraste claros:
 * 1. Barra utilitária — contatos em graphite suave
 * 2. Faixa principal — branca (bg-white) destacando logo, busca e selos
 * 3. Faixa de navegação — com categorias e links de catálogo
 */
export function Navbar() {
  return (
    <>
      {/* 1 ─ Barra utilitária */}
      <div className="border-b border-graphite-200 bg-graphite-100 text-graphite-600">
        <div className="container-page flex h-10 items-center justify-between gap-4 text-[11px] font-semibold uppercase tracking-wide">
          <div className="flex min-w-0 items-center gap-2">
            <a
              href={whatsappLink(
                "Olá! Vim pelo site da Manguebras e quero um atendimento especializado.",
              )}
              onClick={() =>
                trackWhatsAppClick({
                  location: "navbar_top",
                  label: "Atendimento especializado",
                })
              }
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 items-center gap-1.5 px-1.5 transition-colors hover:text-brand-700"
            >
              <MessageCircle className="h-3.5 w-3.5 text-accent-600" />
              <span className="hidden sm:inline">
                Atendimento especializado
              </span>
            </a>
            <a
              href={SITE.phoneHref}
              className="flex h-10 items-center gap-1.5 px-1.5 transition-colors hover:text-brand-700"
            >
              <Phone className="h-3.5 w-3.5 text-accent-600" />
              {SITE.phone}
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="hidden h-10 items-center gap-1.5 px-1.5 normal-case transition-colors hover:text-brand-700 lg:flex"
            >
              <Mail className="h-3.5 w-3.5 text-accent-600" />
              {SITE.email}
            </a>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <a
              href={whatsappLink(
                "Olá! Quero falar com um representante da Manguebras.",
              )}
              onClick={() =>
                trackWhatsAppClick({
                  location: "navbar_top",
                  label: "Falar com um representante",
                })
              }
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 items-center gap-1.5 px-1.5 transition-colors hover:text-brand-700"
            >
              <MessageCircle className="h-3.5 w-3.5 text-accent-600" />
              <span className="hidden sm:inline">Falar com um representante</span>
              <span className="sm:hidden">Representante</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2 ─ Faixa principal (fundo branco para contraste com o topo) */}
      <div className="border-b border-graphite-200/80 bg-white">
        <div className="container-page flex flex-wrap items-center gap-x-8 gap-y-4 py-4 lg:flex-nowrap">
          <div className="flex flex-1 items-center justify-between lg:flex-none">
            <Logo variant="color" priority className="[&_img]:h-11 md:[&_img]:h-12" />
            <MobileMenu />
          </div>
          <div className="order-3 w-full lg:order-none lg:max-w-2xl lg:flex-1">
            <SearchAutocomplete />
          </div>
          <div className="hidden shrink-0 items-center gap-8 xl:flex">
            <TrustBadge
              icon={Truck}
              title="Distribuição nacional"
              subtitle="Atendemos todo o Brasil"
            />
            <TrustBadge
              icon={Boxes}
              title="Catálogo completo"
              subtitle="Milhares de itens diesel"
            />
          </div>
        </div>
      </div>

      {/* 3 ─ Faixa de navegação */}
      <nav
        aria-label="Navegação principal"
        className="sticky top-0 z-50 border-b border-graphite-200 bg-[#f9fafb]/95 backdrop-blur supports-[backdrop-filter]:bg-[#f9fafb]/85"
      >
        <div className="container-page relative flex items-center gap-1">
          <CategoriesMenu />
          <div className="scrollbar-none flex items-center gap-1 overflow-x-auto">
            {LINE_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="whitespace-nowrap rounded-md px-3.5 py-3.5 text-xs font-bold uppercase tracking-wide text-graphite-700 transition-colors hover:text-brand-700"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
