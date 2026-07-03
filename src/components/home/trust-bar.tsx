import {
  Headset,
  Lock,
  ShieldCheck,
  Truck,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/shared/reveal";

interface TrustItem {
  icon: LucideIcon;
  title: string;
  text: string;
}

const TRUST_ITEMS: TrustItem[] = [
  {
    icon: ShieldCheck,
    title: "Qualidade garantida",
    text: "Peças testadas e aprovadas para máxima durabilidade.",
  },
  {
    icon: Truck,
    title: "Envio rápido",
    text: "Agilidade na entrega para todo o Brasil.",
  },
  {
    icon: Headset,
    title: "Atendimento especializado",
    text: "Nossa equipe entende do que você precisa.",
  },
  {
    icon: Lock,
    title: "Compra segura",
    text: "Ambiente 100% seguro para suas compras.",
  },
];

/**
 * Faixa de confiança — 4 selos institucionais.
 */
export function TrustBar() {
  return (
    <section
      aria-label="Nossos diferenciais"
      className="border-t border-graphite-200 bg-graphite-50"
    >
      <div className="container-page grid gap-8 py-12 sm:grid-cols-2 xl:grid-cols-4">
      {TRUST_ITEMS.map((item, i) => (
        <Reveal key={item.title} delay={i * 0.06}>
        <div className="flex items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-brand-600/30 text-brand-700">
            <item.icon className="h-5 w-5" />
          </span>
          <div>
            <p className="text-[13px] font-bold uppercase tracking-wide text-graphite-900">
              {item.title}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-graphite-500">
              {item.text}
            </p>
          </div>
        </div>
        </Reveal>
      ))}
      </div>
    </section>
  );
}
