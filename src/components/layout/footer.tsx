import Link from "next/link";
import {
  Boxes,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { Logo } from "@/components/shared/logo";
import {
  FacebookIcon,
  InstagramIcon,
} from "@/components/shared/social-icons";
import { CATEGORIES } from "@/data/categories";
import { SITE, whatsappLink } from "@/constants/site";

const INSTITUTIONAL_LINKS = [
  { href: "/sobre", label: "Sobre a Manguebras" },
  { href: "/contato", label: "Contato" },
  { href: "/faq", label: "Perguntas frequentes" },
  { href: "/politica-de-troca", label: "Política de troca" },
  { href: "/privacidade", label: "Política de privacidade" },
  { href: "/termos", label: "Termos de uso" },
];

/**
 * Rodapé global — institucional, categorias, atendimento e selos.
 */
export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-brand-950 text-brand-200">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(800px circle at 90% -10%, rgba(13,102,93,0.4), transparent 60%)",
        }}
      />

      {/* Faixa de confiança */}
      <div className="relative border-b border-white/10">
        <div className="container-page grid gap-6 py-10 sm:grid-cols-3">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-white/10">
              <Truck className="h-5 w-5 text-accent-400" />
            </span>
            <div>
              <p className="text-sm font-semibold text-white">
                Entrega em todo o Brasil
              </p>
              <p className="text-xs text-brand-300">
                Logística ágil para oficinas e frotas
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-white/10">
              <ShieldCheck className="h-5 w-5 text-accent-400" />
            </span>
            <div>
              <p className="text-sm font-semibold text-white">
                Especialistas em linha diesel
              </p>
              <p className="text-xs text-brand-300">
                Identificamos a peça certa pela amostra
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-white/10">
              <MessageCircle className="h-5 w-5 text-accent-400" />
            </span>
            <div>
              <p className="text-sm font-semibold text-white">
                Atendimento próximo
              </p>
              <p className="text-xs text-brand-300">
                Resposta rápida via WhatsApp
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Colunas principais */}
      <div className="container-page relative grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div className="space-y-4">
          <Logo variant="white" />
          <p className="max-w-xs text-sm leading-relaxed text-brand-300">
            Especialista em mangueiras para linha de arrefecimento diesel.
            Atendemos oficinas, autopeças, transportadoras e frotas em todo o
            Brasil.
          </p>
          <div className="flex gap-2">
            <a
              href={SITE.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram da Manguebras"
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white transition-colors hover:bg-accent-500"
            >
              <InstagramIcon className="h-[18px] w-[18px]" />
            </a>
            <a
              href={SITE.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook da Manguebras"
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white transition-colors hover:bg-accent-500"
            >
              <FacebookIcon className="h-[18px] w-[18px]" />
            </a>
          </div>
        </div>

        <nav aria-label="Categorias">
          <h3 className="mb-4 font-display text-sm font-bold uppercase tracking-wider text-white">
            Categorias
          </h3>
          <ul className="space-y-1">
            {CATEGORIES.map((category) => (
              <li key={category.slug}>
                <Link
                  href={`/produtos?categoria=${category.slug}`}
                  className="inline-block py-1 text-sm text-brand-300 transition-colors hover:text-accent-400"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Institucional">
          <h3 className="mb-4 font-display text-sm font-bold uppercase tracking-wider text-white">
            Institucional
          </h3>
          <ul className="space-y-1">
            {INSTITUTIONAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-block py-1 text-sm text-brand-300 transition-colors hover:text-accent-400"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="mb-4 font-display text-sm font-bold uppercase tracking-wider text-white">
            Atendimento
          </h3>
          <ul className="space-y-3 text-sm">
            <li>
              <a
                href={whatsappLink("Olá! Vim pelo site da Manguebras.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 py-1 text-brand-300 transition-colors hover:text-accent-400"
              >
                <MessageCircle className="h-4 w-4 shrink-0 text-accent-400" />
                {SITE.whatsapp}
              </a>
            </li>
            <li>
              <a
                href={SITE.phoneHref}
                className="flex items-center gap-2.5 py-1 text-brand-300 transition-colors hover:text-accent-400"
              >
                <Phone className="h-4 w-4 shrink-0 text-accent-400" />
                {SITE.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${SITE.email}`}
                className="flex items-center gap-2.5 py-1 text-brand-300 transition-colors hover:text-accent-400"
              >
                <Mail className="h-4 w-4 shrink-0 text-accent-400" />
                {SITE.email}
              </a>
            </li>
            <li className="flex items-center gap-2.5 text-brand-300">
              <Clock className="h-4 w-4 shrink-0 text-accent-400" />
              Seg–Sex, 8h às 18h
            </li>
            <li className="flex items-center gap-2.5 text-brand-300">
              <MapPin className="h-4 w-4 shrink-0 text-accent-400" />
              {SITE.address.city} – {SITE.address.state}
            </li>
          </ul>
        </div>
      </div>

      {/* Barra final */}
      <div className="relative border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-4 py-6 text-xs text-brand-400 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {SITE.name}® — {SITE.tagline}. Todos
            os direitos reservados.
          </p>
          <p className="flex items-center gap-1.5 text-brand-300">
            <Boxes className="h-4 w-4 text-accent-400" />
            Catálogo virtual · Distribuidor da linha diesel
          </p>
        </div>
      </div>
    </footer>
  );
}
