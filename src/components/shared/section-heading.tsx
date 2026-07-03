import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  /** Parte inicial do título (cor neutra) */
  pre: string;
  /** Palavra de destaque (verde vibrante) */
  highlight: string;
  linkHref?: string;
  linkLabel?: string;
  dark?: boolean;
  className?: string;
}

/**
 * Título de seção padrão: "ENCONTRE POR CATEGORIA" com
 * a última palavra em verde vibrante, e link opcional à direita.
 */
export function SectionHeading({
  pre,
  highlight,
  linkHref,
  linkLabel,
  dark = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-4",
        className,
      )}
    >
      <h2
        className={cn(
          "font-display text-xl font-extrabold uppercase tracking-wide md:text-2xl",
          dark ? "text-white" : "text-graphite-900",
        )}
      >
        {pre} <span className="text-accent-500">{highlight}</span>
      </h2>
      {linkHref && linkLabel && (
        <Link
          href={linkHref}
          className={cn(
            "group -my-2 inline-flex items-center gap-2 py-2 text-xs font-bold uppercase tracking-widest transition-colors",
            dark
              ? "text-white/80 hover:text-accent-400"
              : "text-graphite-600 hover:text-accent-600",
          )}
        >
          {linkLabel}
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}
