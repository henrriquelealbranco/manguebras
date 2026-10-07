"use client";

import { MessageCircle } from "lucide-react";
import { trackWhatsAppClick } from "@/lib/tracking";

interface ConsultarWhatsappButtonProps {
  href: string;
  productCode: string;
  productName: string;
  montadora?: string;
}

export function ConsultarWhatsappButton({
  href,
  productCode,
  productName,
  montadora,
}: ConsultarWhatsappButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() =>
        trackWhatsAppClick({
          location: "product_detail",
          label: "Consultar esta peça",
          productCode,
          productName,
          montadora,
        })
      }
      className="mt-3.5 flex w-full items-center justify-center gap-2 rounded-lg bg-action-500 py-3 text-xs font-bold uppercase tracking-widest text-white transition-all duration-300 hover:scale-[1.01] hover:bg-action-600 active:bg-action-700"
    >
      <MessageCircle className="h-4 w-4" />
      Consultar esta peça
    </a>
  );
}
