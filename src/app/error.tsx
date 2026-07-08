"use client";

import { RotateCcw, TriangleAlert } from "lucide-react";

/**
 * Error boundary global — recuperação amigável sem perder a identidade.
 */
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container-page flex min-h-[50vh] flex-col items-center justify-center gap-5 py-20 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-lg bg-red-50 text-red-600">
        <TriangleAlert className="h-7 w-7" />
      </span>
      <div>
        <h1 className="font-display text-2xl font-extrabold uppercase text-graphite-900">
          Algo deu <span className="text-red-600">errado</span>
        </h1>
        <p className="mx-auto mt-2 max-w-md text-sm text-graphite-500">
          Um erro inesperado aconteceu. Tente novamente — se persistir, fale
          com a gente no WhatsApp.
        </p>
      </div>
      <button
        type="button"
        onClick={reset}
        className="inline-flex items-center gap-2 rounded-lg bg-brand-900 px-6 py-3 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-brand-800"
      >
        <RotateCcw className="h-4 w-4" />
        Tentar novamente
      </button>
    </div>
  );
}
