import { Download } from "lucide-react";

/** Link nativo para o arquivo estático: sem prefetch nem rota de API. */
export function CatalogDownload({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  return (
    <a
      href="/catalogos/catalogo-manguebras-2026.pdf"
      download="catalogo-manguebras-2026.pdf"
      title="Catálogo Manguebras 2026 — PDF, 226 páginas, 38,3 MB"
      className={className}
      onClick={onClick}
    >
      <Download className="h-4 w-4 shrink-0" aria-hidden="true" />
      <span>Baixar catálogo 2026</span>
    </a>
  );
}
