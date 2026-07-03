import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SITE } from "@/constants/site";

interface LogoProps {
  /** "color" para fundos claros, "white" para fundos escuros */
  variant?: "color" | "white";
  className?: string;
  priority?: boolean;
}

/**
 * Logotipo oficial Manguebras (proporção 2.5:1).
 */
export function Logo({
  variant = "color",
  className,
  priority = false,
}: LogoProps) {
  return (
    <Link
      href="/"
      aria-label={`${SITE.name} — página inicial`}
      className={cn("inline-flex shrink-0 items-center", className)}
    >
      <Image
        src={variant === "white" ? "/marca/logo-branca.png" : "/marca/logo.png"}
        alt={`${SITE.name} — ${SITE.tagline}`}
        width={150}
        height={60}
        priority={priority}
        className="h-10 w-auto md:h-11"
      />
    </Link>
  );
}
