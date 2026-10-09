"use client";

import Image from "next/image";
import { useState } from "react";
import { Expand, PackageSearch } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface GalleryProps {
  images: string[];
  alt: string;
}

/**
 * Galeria do produto — imagem principal com zoom no hover
 * (lupa segue o cursor), miniaturas e ampliação em modal.
 */
export function Gallery({ images, alt }: GalleryProps) {
  const [active, setActive] = useState(0);
  const [zooming, setZooming] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");

  const hasImages = Boolean(images && images.length > 0 && images[active]);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setOrigin(`${x}% ${y}%`);
  };

  return (
    <div>
      <Dialog>
        <div
          className="group relative aspect-square overflow-hidden rounded-lg border border-graphite-200 bg-white"
          onMouseEnter={() => hasImages && setZooming(true)}
          onMouseLeave={() => setZooming(false)}
          onMouseMove={hasImages ? handleMove : undefined}
        >
          {hasImages ? (
            <>
              <Image
                src={images[active]}
                alt={alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 560px"
                className={cn(
                  "object-contain p-6 transition-transform duration-200 ease-out",
                  zooming && "scale-[1.8]",
                )}
                style={{ transformOrigin: origin }}
              />
              <DialogTrigger
                aria-label="Ampliar imagem"
                className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-graphite-700 opacity-0 shadow-card backdrop-blur transition-all duration-200 hover:bg-brand-900 hover:text-white group-hover:opacity-100"
              >
                <Expand className="h-4 w-4" />
              </DialogTrigger>
            </>
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center text-graphite-400">
              <PackageSearch className="h-16 w-16 text-graphite-300" />
              <span className="mt-3 font-display text-xs font-bold uppercase tracking-wider text-graphite-600">
                Foto sob consulta técnica
              </span>
              <span className="mt-1 max-w-xs text-xs text-graphite-400">
                Solicite imagens e detalhes desta peça com nossa equipe comercial
              </span>
            </div>
          )}
        </div>

        <DialogContent className="max-w-3xl border-none bg-white p-2">
          <DialogTitle className="sr-only">{alt}</DialogTitle>
          <div className="relative aspect-square w-full">
            <Image
              src={images[active]}
              alt={alt}
              fill
              sizes="90vw"
              className="object-contain"
            />
          </div>
        </DialogContent>
      </Dialog>

      {images.length > 1 && (
        <div className="mt-3 flex gap-2">
          {images.map((image, i) => (
            <button
              key={image}
              type="button"
              aria-label={`Imagem ${i + 1}`}
              aria-current={i === active}
              onClick={() => setActive(i)}
              className={cn(
                "relative h-18 w-18 overflow-hidden rounded-lg border-2 bg-white transition-colors",
                i === active
                  ? "border-accent-500"
                  : "border-graphite-200 hover:border-brand-400",
              )}
            >
              <Image
                src={image}
                alt=""
                fill
                sizes="80px"
                className="object-contain p-1.5"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
