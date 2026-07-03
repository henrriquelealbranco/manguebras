import Link from "next/link";

interface PageHeaderProps {
  /** Trilha simples: rótulo da página atual */
  crumb: string;
  pre: string;
  highlight?: string;
  description?: string;
}

/**
 * Faixa de título padrão das páginas internas (verde escuro + glow).
 */
export function PageHeader({
  crumb,
  pre,
  highlight,
  description,
}: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden bg-brand-950">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(700px circle at 85% 0%, rgba(13,102,93,0.5), transparent 55%)",
        }}
      />
      <div className="container-page relative py-10">
        <nav aria-label="Breadcrumb" className="text-xs text-brand-300">
          <Link href="/" className="transition-colors hover:text-accent-400">
            Início
          </Link>
          <span className="mx-2">/</span>
          <span className="text-white">{crumb}</span>
        </nav>
        <h1 className="mt-3 font-display text-3xl font-black uppercase tracking-tight text-white md:text-4xl">
          {pre}{" "}
          {highlight && <span className="text-accent-400">{highlight}</span>}
        </h1>
        {description && (
          <p className="mt-2 max-w-xl text-sm text-brand-200">{description}</p>
        )}
      </div>
    </section>
  );
}
