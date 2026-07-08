import Link from "next/link";
import { ArrowRight, MessageCircle, SearchX } from "lucide-react";
import { whatsappLink } from "@/constants/site";

export default function NotFound() {
  return (
    <div className="relative overflow-hidden bg-brand-950">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(700px circle at 50% 0%, rgba(13,102,93,0.5), transparent 55%)",
        }}
      />
      <div className="container-page relative flex min-h-[60vh] flex-col items-center justify-center gap-6 py-20 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-lg border border-accent-400/40 text-accent-400">
          <SearchX className="h-8 w-8" />
        </span>
        <div>
          <p className="font-display text-6xl font-black text-white/20">404</p>
          <h1 className="mt-2 font-display text-3xl font-black uppercase tracking-tight text-white">
            Página não <span className="text-accent-400">encontrada</span>
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-brand-200">
            O endereço pode ter mudado — mas a peça que você procura
            provavelmente está no nosso catálogo.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/produtos"
            className="group inline-flex items-center gap-2 rounded-lg bg-action-500 px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-white transition-all duration-300 hover:scale-[1.02] hover:bg-action-600 active:bg-action-700"
          >
            Ver catálogo
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <a
            href={whatsappLink("Olá! Não encontrei o que procurava no site.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:border-accent-400 hover:text-accent-400"
          >
            <MessageCircle className="h-4 w-4" />
            Falar com especialista
          </a>
        </div>
      </div>
    </div>
  );
}
