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

const LINE_LINKS = [
  { href: "/produtos?linha=diesel", label: "Linha Diesel" },
  { href: "/produtos?linha=pesada", label: "Linha Pesada" },
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
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-accent-400/40 text-accent-400">
        <Icon className="h-5 w-5" />
      </span>
      <div className="leading-tight">
        <p className="text-xs font-bold uppercase tracking-wide text-white">
          {title}
        </p>
        <p className="mt-0.5 text-[11px] text-brand-300">{subtitle}</p>
      </div>
    </div>
  );
}

/**
 * Header global em 3 níveis — CATÁLOGO VIRTUAL (não é loja de venda online):
 * 1. barra utilitária — contatos e canal com representante
 * 2. faixa principal verde — logo, busca no catálogo, selos institucionais
 * 3. faixa de navegação — categorias + linhas
 */
export function Navbar() {
  return (
    <>
      {/* 1 ─ Barra utilitária */}
      <div className="bg-graphite-950 text-white">
        <div className="container-page flex h-10 items-center justify-between gap-4 text-[11px] font-semibold uppercase tracking-wide">
          <div className="flex min-w-0 items-center gap-2">
            <a
              href={whatsappLink(
                "Olá! Vim pelo site da Manguebras e quero um atendimento especializado.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 items-center gap-1.5 px-1.5 transition-colors hover:text-accent-400"
            >
              <MessageCircle className="h-3.5 w-3.5 text-accent-400" />
              <span className="hidden sm:inline">
                Atendimento especializado
              </span>
            </a>
            <a
              href={SITE.phoneHref}
              className="flex h-10 items-center gap-1.5 px-1.5 transition-colors hover:text-accent-400"
            >
              <Phone className="h-3.5 w-3.5 text-accent-400" />
              {SITE.phone}
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="hidden h-10 items-center gap-1.5 px-1.5 normal-case transition-colors hover:text-accent-400 lg:flex"
            >
              <Mail className="h-3.5 w-3.5 text-accent-400" />
              {SITE.email}
            </a>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <a
              href={whatsappLink(
                "Olá! Quero falar com um representante da Manguebras.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 items-center gap-1.5 px-1.5 transition-colors hover:text-accent-400"
            >
              <MessageCircle className="h-3.5 w-3.5 text-accent-400" />
              <span className="hidden sm:inline">Falar com um representante</span>
              <span className="sm:hidden">Representante</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2 ─ Faixa principal */}
      <div className="bg-brand-950">
        <div className="container-page flex flex-wrap items-center gap-x-8 gap-y-4 py-4 lg:flex-nowrap">
          <div className="flex flex-1 items-center justify-between lg:flex-none">
            <Logo variant="white" priority className="[&_img]:h-11 md:[&_img]:h-12" />
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
        className="glass-dark sticky top-0 z-50 border-b border-white/5 bg-brand-950/95"
      >
        <div className="container-page relative flex items-center gap-1">
          <CategoriesMenu />
          <div className="scrollbar-none flex items-center gap-1 overflow-x-auto">
            {LINE_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="whitespace-nowrap rounded-md px-3.5 py-3.5 text-xs font-bold uppercase tracking-wide text-white/85 transition-colors hover:text-accent-400"
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
