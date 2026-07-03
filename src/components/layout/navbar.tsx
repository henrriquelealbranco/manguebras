"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Lock,
  Mail,
  MessageCircle,
  Package,
  Phone,
  ShoppingCart,
  Truck,
  User,
} from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { CategoriesMenu } from "@/components/layout/mega-menu";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { SearchAutocomplete } from "@/components/search/search-autocomplete";
import { useCartCount } from "@/hooks/use-cart";
import { SITE, whatsappLink } from "@/constants/site";

const LINE_LINKS = [
  { href: "/produtos?linha=diesel", label: "Linha Diesel" },
  { href: "/produtos?linha=leve", label: "Linha Leve" },
  { href: "/produtos?linha=pesada", label: "Linha Pesada" },
  { href: "/produtos?ordenar=novidades", label: "Lançamentos" },
  { href: "/sobre", label: "Quem Somos" },
  { href: "/contato", label: "Contato" },
];

/**
 * Badge de itens do carrinho (contagem só após montar,
 * pois o carrinho vive em localStorage).
 */
function CartButton() {
  const count = useCartCount();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <Link
      href="/carrinho"
      aria-label={`Carrinho de compras${mounted && count > 0 ? ` — ${count} itens` : ""}`}
      className="relative flex h-9 w-9 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/10"
    >
      <ShoppingCart className="h-5 w-5" />
      <span className="absolute -right-1 -top-1 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-accent-500 px-1 text-[10px] font-bold text-white">
        {mounted ? (count > 99 ? "99+" : count) : 0}
      </span>
    </Link>
  );
}

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
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-accent-400/40 text-accent-400">
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
 * Header global em 3 níveis (estilo marketplace):
 * 1. barra utilitária preta — contatos, pedido, conta, carrinho
 * 2. faixa principal verde — logo, busca central, selos
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
              href={whatsappLink("Olá! Quero acompanhar meu pedido.")}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden h-10 items-center gap-1.5 px-1.5 transition-colors hover:text-accent-400 md:flex"
            >
              <Package className="h-3.5 w-3.5" />
              Acompanhe seu pedido
            </a>
            <Link
              href="/conta"
              className="hidden h-10 items-center gap-1.5 px-1.5 transition-colors hover:text-accent-400 sm:flex"
            >
              <User className="h-3.5 w-3.5" />
              Entre ou Cadastre-se
            </Link>
            <CartButton />
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
              title="Envio rápido"
              subtitle="para todo o Brasil"
            />
            <TrustBadge
              icon={Lock}
              title="Compra segura"
              subtitle="Seus dados protegidos"
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
