"use client";

import Image from "next/image";
import { useState } from "react";
import { Expand } from "lucide-react";
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
          className="group relative aspect-square overflow-hidden rounded-2xl border border-graphite-200 bg-white"
          onMouseEnter={() => setZooming(true)}
          onMouseLeave={() => setZooming(false)}
          onMouseMove={handleMove}
        >
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
