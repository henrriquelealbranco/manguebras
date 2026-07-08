import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { whatsappLink } from "@/constants/site";
import { Reveal } from "@/components/shared/reveal";

/**
 * CTA final da homepage — última chance de conversão antes do rodapé.
 */
export function FinalCta() {
  return (
    <section aria-label="Fale conosco" className="relative overflow-hidden bg-brand-950">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(700px circle at 50% 120%, rgba(44,196,175,0.25), transparent 60%)",
        }}
      />
      <Reveal className="container-page relative flex flex-col items-center gap-6 py-16 text-center">
        <h2 className="max-w-2xl font-display text-3xl font-black uppercase leading-tight tracking-tight text-white md:text-4xl">
          Precisa de uma mangueira{" "}
          <span className="text-accent-400">agora?</span>
        </h2>
        <p className="max-w-xl text-sm leading-relaxed text-brand-200">
          Envie uma foto da amostra ou o modelo do caminhão. Nossa equipe
          identifica a peça e responde rapidinho — caminhão parado não espera.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href={whatsappLink(
              "Olá! Preciso de uma mangueira — posso enviar uma foto da amostra?",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-lg bg-action-500 px-7 py-3.5 text-xs font-bold uppercase tracking-widest text-white shadow-elevated transition-all duration-300 hover:scale-[1.02] hover:bg-action-600 active:bg-action-700"
          >
            <MessageCircle className="h-4 w-4" />
            Falar no WhatsApp
          </a>
          <Link
            href="/produtos"
            className="group inline-flex items-center gap-2.5 rounded-lg border border-white/20 px-7 py-3.5 text-xs font-bold uppercase tracking-widest text-white transition-all duration-300 hover:border-accent-400 hover:text-accent-400"
          >
            Ver catálogo
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
