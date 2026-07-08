"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  PackageCheck,
  ShieldCheck,
  Thermometer,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

/** Parte do título — `soft` usa peso mais fino + cor de destaque. */
interface TitlePart {
  text: string;
  soft?: boolean;
}

interface Slide {
  badge: string;
  title: TitlePart[];
  text: string;
  /** PNG com fundo transparente (produto recortado) */
  image: string;
  imageAlt: string;
  href: string;
}

const SLIDES: Slide[] = [
  {
    badge: "Especialistas em diesel",
    title: [{ text: "MANGUEIRAS" }, { text: "QUE RESOLVEM.", soft: true }],
    text: "Especialistas em toda a linha de arrefecimento diesel para caminhões. Peça original e paralela.",
    image: "/hero/radiador.png",
    imageAlt: "Mangueira inferior do radiador para caminhões",
    href: "/produtos",
  },
  {
    badge: "Linha intercooler",
    title: [{ text: "PRESSÃO DE TURBO" }, { text: "SOB CONTROLE.", soft: true }],
    text: "Mangueiras de intercooler em silicone com anéis metálicos, feitas para a pressão da linha pesada.",
    image: "/hero/intercooler.png",
    imageAlt: "Mangueira de intercooler em silicone com anéis metálicos",
    href: "/produtos?categoria=mangueiras-intercooler",
  },
  {
    badge: "Linha premium",
    title: [{ text: "SILICONE" }, { text: "QUE DURA MAIS.", soft: true }],
    text: "Linha azul de silicone premium: muito mais vida útil para o sistema do seu caminhão.",
    image: "/hero/silicone.png",
    imageAlt: "Mangueira de silicone azul premium",
    href: "/produtos?categoria=mangueiras-silicone",
  },
];

interface Benefit {
  icon: LucideIcon;
  title: string;
  text: string;
}

const BENEFITS: Benefit[] = [
  {
    icon: ShieldCheck,
    title: "Alta resistência",
    text: "Materiais de qualidade para máxima durabilidade.",
  },
  {
    icon: Thermometer,
    title: "Desempenho térmico",
    text: "Mantém o motor na temperatura ideal.",
  },
  {
    icon: PackageCheck,
    title: "Encaixe perfeito",
    text: "Peças originais e paralelas para diversos modelos.",
  },
];

const AUTOPLAY_MS = 6500;

/**
 * Hero premium — catálogo automotivo de luxo.
 * Grid assimétrico: texto · produto flutuante · benefícios técnicos.
 * Produtos recortados (PNG transparente) sobre iluminação de estúdio.
 */
export function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const slide = SLIDES[index];

  const goTo = useCallback((i: number) => {
    setIndex((i + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    timer.current = setInterval(
      () => setIndex((i) => (i + 1) % SLIDES.length),
      AUTOPLAY_MS,
    );
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused]);

  return (
    <section
      aria-label="Destaques"
      className="relative overflow-hidden bg-brand-950"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Ambiente: gradiente profundo + textura sutil */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px circle at 8% 0%, #0e4a41 0%, transparent 55%), radial-gradient(900px circle at 100% 100%, rgba(0,242,154,0.06), transparent 55%)",
        }}
      />
      {/* Linha de luz superior */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-400/40 to-transparent"
      />
      {/* Marca d'água do M */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-28 top-1/2 hidden h-[460px] w-[460px] -translate-y-1/2 opacity-[0.04] lg:block"
      >
        <Image
          src="/marca/logo-branca.png"
          alt=""
          fill
          className="object-contain"
        />
      </div>

      <div className="container-page relative grid min-h-[520px] items-center gap-10 py-16 lg:min-h-[600px] lg:grid-cols-[1.05fr_0.95fr_308px] lg:gap-14 lg:py-24">
        {/* ── Coluna 1 — Texto ── */}
        <div className="relative z-10">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="inline-flex items-center gap-2 rounded-sm border border-accent-400/30 bg-accent-400/[0.07] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-accent-300 backdrop-blur-sm">
                <BadgeCheck className="h-3.5 w-3.5" />
                {slide.badge}
              </span>

              <h1 className="mt-6 font-display text-5xl leading-[0.94] tracking-tight text-white md:text-6xl xl:text-[4.4rem]">
                {slide.title.map((part) => (
                  <span
                    key={part.text}
                    className={cn(
                      "block",
                      part.soft ? "font-medium text-accent-400" : "font-black",
                    )}
                  >
                    {part.text}
                  </span>
                ))}
              </h1>

              <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-brand-200">
                {slide.text}
              </p>

              <Link
                href={slide.href}
                className="group relative mt-9 inline-flex items-center gap-3 overflow-hidden rounded-sm border border-white/15 bg-gradient-to-b from-[#12564c] to-[#072a25] px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] text-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.7)] transition-all duration-300 hover:border-accent-400/50 hover:shadow-[0_0_34px_-8px_rgba(44,196,175,0.55)]"
              >
                {/* brilho que passa no hover */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                />
                <span className="relative">Ver produtos</span>
                <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Coluna 2 — Produto flutuante ── */}
        <div className="relative z-10 flex min-h-[300px] items-center justify-center">
          {/* Brilho radial de estúdio (atrás do produto) */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-[125%] w-[125%] -translate-x-1/2 -translate-y-1/2"
            style={{
              background:
                "radial-gradient(circle, rgba(0,242,154,0.10) 0%, rgba(0,0,0,0) 70%)",
            }}
          />
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: -8 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <Image
                src={slide.image}
                alt={slide.imageAlt}
                width={460}
                height={460}
                priority={index === 0}
                sizes="(max-width: 1024px) 320px, 440px"
                className="h-auto w-[280px] md:w-[380px] xl:w-[440px]"
                style={{
                  filter:
                    "drop-shadow(0 26px 30px rgba(0,0,0,0.55)) drop-shadow(0 2px 6px rgba(0,0,0,0.4))",
                }}
              />
              {/* sombra projetada no "chão" */}
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-4 left-1/2 h-8 w-3/4 -translate-x-1/2 rounded-[50%] bg-black/45 blur-xl"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Coluna 3 — Benefícios técnicos (micro-cards) ── */}
        <div className="relative z-10 flex flex-col gap-3">
          <p className="mb-1 hidden text-[10px] font-bold uppercase tracking-[0.25em] text-brand-400 lg:block">
            Engenharia
          </p>
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {BENEFITS.map((benefit) => (
              <div
                key={benefit.title}
                className="group rounded-sm border border-white/10 bg-white/[0.05] p-4 backdrop-blur-sm transition-colors duration-300 hover:border-accent-400/30 hover:bg-white/[0.08]"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-sm border border-white/10 bg-brand-950/40 text-accent-400 transition-colors group-hover:border-accent-400/40">
                  <benefit.icon className="h-[18px] w-[18px]" />
                </span>
                <p className="mt-3 text-xs font-bold uppercase tracking-wide text-white">
                  {benefit.title}
                </p>
                <p className="mt-1 text-[11px] leading-relaxed text-brand-300">
                  {benefit.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="relative z-10 flex justify-center pb-8">
        {SLIDES.map((s, i) => (
          <button
            key={s.badge}
            type="button"
            aria-label={`Ir para o destaque ${i + 1}`}
            aria-current={i === index}
            onClick={() => goTo(i)}
            className="group/dot flex h-8 min-w-6 items-center justify-center px-2"
          >
            <span
              className={cn(
                "h-[3px] rounded-full transition-all duration-300",
                i === index
                  ? "w-8 bg-accent-400"
                  : "w-4 bg-white/20 group-hover/dot:bg-white/45",
              )}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
