import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/constants/site";

/**
 * Botão flutuante de WhatsApp — presente em todas as páginas.
 * Canal principal de conversão B2B da Manguebras.
 */
export function WhatsAppFab() {
  return (
    <a
      href={whatsappLink(
        "Olá! Vim pelo site da Manguebras e preciso de ajuda com mangueiras.",
      )}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com um especialista no WhatsApp"
      className="group fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-elevated transition-transform duration-300 hover:scale-110 active:scale-95"
    >
      <span
        aria-hidden
        className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-20 [animation-duration:2.5s]"
      />
      <MessageCircle className="relative h-7 w-7 text-white" />
      <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-lg bg-graphite-900 px-3 py-1.5 text-sm font-medium text-white opacity-0 shadow-card transition-opacity duration-200 group-hover:opacity-100 md:block">
        Fale com um especialista
      </span>
    </a>
  );
}
