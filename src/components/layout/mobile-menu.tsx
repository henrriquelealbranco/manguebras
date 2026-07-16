"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ChevronRight,
  Mail,
  Menu,
  MessageCircle,
  Phone,
  Search,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { CATEGORIES } from "@/data/categories";
import { listMontadoras } from "@/lib/catalog";
import { SITE, whatsappLink } from "@/constants/site";

const NAV_LINKS = [
  { href: "/", label: "Início" },
  { href: "/sobre", label: "Sobre a Manguebras" },
  { href: "/contato", label: "Contato" },
];

/**
 * Menu mobile em drawer lateral.
 */
export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label="Abrir menu"
        className="flex h-10 w-10 items-center justify-center rounded-lg text-graphite-700 transition-colors hover:bg-graphite-100 lg:hidden"
      >
        <Menu className="h-6 w-6" />
      </SheetTrigger>
      <SheetContent side="right" className="flex w-[320px] flex-col gap-0 p-0">
        <SheetHeader className="border-b border-graphite-200 p-4">
          <SheetTitle className="text-left font-display text-lg font-bold text-brand-900">
            Menu
          </SheetTitle>
        </SheetHeader>

        <nav className="flex-1 overflow-y-auto p-4" aria-label="Menu principal">
          <Link
            href="/busca"
            onClick={() => setOpen(false)}
            className="mb-4 flex items-center gap-3 rounded-md border border-graphite-200 bg-graphite-50 px-4 py-3 text-sm text-graphite-500"
          >
            <Search className="h-4 w-4" />
            Buscar produtos…
          </Link>

          <ul className="space-y-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold text-graphite-800 transition-colors hover:bg-brand-50 hover:text-brand-800"
                >
                  {link.label}
                  <ChevronRight className="h-4 w-4 text-graphite-400" />
                </Link>
              </li>
            ))}
          </ul>

          <Accordion type="single" collapsible className="mt-2">
            <AccordionItem value="montadoras" className="border-none">
              <AccordionTrigger className="rounded-lg px-3 py-2.5 text-sm font-semibold text-graphite-800 hover:bg-brand-50 hover:no-underline">
                Montadoras
              </AccordionTrigger>
              <AccordionContent className="pb-0">
                <ul className="space-y-0.5 pl-3">
                  {listMontadoras().map((m) => (
                    <li key={m.slug}>
                      <Link
                        href={`/produtos?montadora=${m.slug}`}
                        onClick={() => setOpen(false)}
                        className="block rounded-lg px-3 py-2 text-sm text-graphite-600 transition-colors hover:bg-brand-50 hover:text-brand-800"
                      >
                        {m.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="categorias" className="border-none">
              <AccordionTrigger className="rounded-lg px-3 py-2.5 text-sm font-semibold text-graphite-800 hover:bg-brand-50 hover:no-underline">
                Categorias
              </AccordionTrigger>
              <AccordionContent className="pb-0">
                <ul className="space-y-0.5 pl-3">
                  {CATEGORIES.map((category) => (
                    <li key={category.slug}>
                      <Link
                        href={`/produtos?categoria=${category.slug}`}
                        onClick={() => setOpen(false)}
                        className="block rounded-lg px-3 py-2 text-sm text-graphite-600 transition-colors hover:bg-brand-50 hover:text-brand-800"
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      href="/produtos"
                      onClick={() => setOpen(false)}
                      className="block rounded-lg px-3 py-2 text-sm font-semibold text-brand-600"
                    >
                      Ver todos os produtos →
                    </Link>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </nav>

        <div className="space-y-3 border-t border-graphite-200 p-4">
          <a
            href={whatsappLink(
              "Olá! Vim pelo site da Manguebras e preciso de ajuda.",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-sm bg-action-500 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-action-600 active:bg-action-700"
          >
            <MessageCircle className="h-4 w-4" />
            Falar no WhatsApp
          </a>
          <div className="flex flex-col gap-1.5 text-xs text-graphite-500">
            <a
              href={SITE.phoneHref}
              className="flex items-center gap-2 hover:text-brand-700"
            >
              <Phone className="h-3.5 w-3.5" /> {SITE.phone}
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="flex items-center gap-2 hover:text-brand-700"
            >
              <Mail className="h-3.5 w-3.5" /> {SITE.email}
            </a>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
