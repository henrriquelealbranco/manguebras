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
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Slide {
  badge: string;
  /** Linhas do título; `accent: true` pinta a linha de verde vibrante */
  title: { text: string; accent?: boolean }[];
  text: string;
  image: string;
  imageAlt: string;
  /** cutout = foto fundo branco vira recorte no fundo escuro (blend multiply) */
  display: "cutout" | "card";
  href: string;
}

const SLIDES: Slide[] = [
  {
    badge: "Especialistas em diesel",
    title: [
      { text: "MANGUEIRAS" },
      { text: "QUE", accent: true },
      { text: "RESOLVEM." },
    ],
    text: "Especialistas em toda a linha de arrefecimento diesel para caminhões. Peça original e paralela.",
    image: "/produtos/5000.jpg",
    imageAlt: "Mangueira inferior do radiador para caminhões",
    display: "cutout",
    href: "/produtos",
  },
  {
    badge: "Linha intercooler",
    title: [
      { text: "PRESSÃO" },
      { text: "DE TURBO", accent: true },
      { text: "SOB CONTROLE." },
    ],
    text: "Mangueiras de intercooler em silicone com anéis metálicos, feitas para a pressão da linha pesada.",
    image: "/produtos/3000.jpg",
    imageAlt: "Mangueira de intercooler tipo gomo em silicone",
    display: "card",
    href: "/produtos?categoria=mangueiras-intercooler",
  },
  {
    badge: "Linha premium",
    title: [
      { text: "SILICONE" },
      { text: "QUE DURA", accent: true },
      { text: "MAIS." },
    ],
    text: "Linha azul de silicone premium: muito mais vida útil para o sistema do seu caminhão.",
    image: "/produtos/6000.jpg",
    imageAlt: "Mangueira de silicone azul premium",
    display: "card",
    href: "/produtos?categoria=mangueiras-silicone",
  },
];

const FEATURES = [
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
] as const;

const AUTOPLAY_MS = 6500;

/**
 * Hero da homepage — carrossel escuro com produto em destaque,
 * conforme o design aprovado.
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
      {/* Glow e textura de fundo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(900px circle at 15% 30%, rgba(13,102,93,0.55), transparent 55%), radial-gradient(700px circle at 70% 80%, rgba(44,196,175,0.12), transparent 60%)",
        }}
      />
      {/* Marca d'água do M */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-1/2 hidden h-[420px] w-[420px] -translate-y-1/2 opacity-[0.05] lg:block"
      >
        <Image
          src="/marca/logo-branca.png"
          alt=""
          fill
          className="object-contain"
        />
      </div>

      <div className="container-page relative grid min-h-[480px] items-center gap-10 py-14 lg:grid-cols-[1.1fr_1fr_320px] lg:py-16">
        {/* Texto */}
        <div className="relative z-10">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-accent-400/40 bg-accent-400/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-accent-300">
                <BadgeCheck className="h-3.5 w-3.5" />
                {slide.badge}
              </span>
              <h1 className="mt-5 font-display text-5xl font-black leading-[0.95] tracking-tight text-white md:text-6xl xl:text-7xl">
                {slide.title.map((line) => (
                  <span
                    key={line.text}
                    className={cn("block", line.accent && "text-accent-400")}
                  >
                    {line.text}
                  </span>
                ))}
              </h1>
              <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-brand-200">
                {slide.text}
              </p>
              <Link
                href={slide.href}
                className="group mt-7 inline-flex items-center gap-2.5 rounded-lg bg-action-500 px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-white shadow-elevated transition-all duration-300 hover:scale-[1.02] hover:bg-action-600 active:bg-action-700"
              >
                Ver produtos
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Produto em destaque */}
        <div className="relative z-10 flex items-center justify-center">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.92, x: 32 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95, x: -24 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "relative",
                slide.display === "card" &&
                  "rounded-lg bg-white p-6 shadow-elevated ring-1 ring-white/20",
              )}
            >
              <Image
                src={slide.image}
                alt={slide.imageAlt}
                width={440}
                height={440}
                priority={index === 0}
                sizes="(max-width: 768px) 300px, 440px"
                className={cn(
                  "h-auto w-[300px] md:w-[400px] xl:w-[440px]",
                  slide.display === "cutout" && "mix-blend-multiply",
                )}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Diferenciais */}
        <div className="relative z-10 hidden flex-col gap-7 border-l border-white/10 pl-8 lg:flex">
          {FEATURES.map((feature) => (
            <div key={feature.title} className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-accent-400/50 text-accent-400">
                <feature.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-[13px] font-bold uppercase tracking-wide text-white">
                  {feature.title}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-brand-300">
                  {feature.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots — área de toque ampliada (32px), visual compacto */}
      <div className="relative z-10 flex justify-center pb-4">
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
                "h-2 rounded-full transition-all duration-300",
                i === index
                  ? "w-7 bg-accent-400"
                  : "w-2 bg-white/25 group-hover/dot:bg-white/50",
              )}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
