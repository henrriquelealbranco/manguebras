"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { pushDataLayer, trackWhatsAppClick } from "@/lib/tracking";

/** Delegation covers server-rendered links, mobile menus and future CTAs. */
export function SiteEvents() {
  const pathname = usePathname();
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;
    pushDataLayer({ event: "site_page_view", page_path: pathname,
      page_location: window.location.origin + pathname, page_title: document.title });
  }, [pathname]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest<HTMLAnchorElement>("a[href]");
      if (!link || link.dataset.gtmTracked === "true") return;
      const url = new URL(link.href, window.location.origin);
      if (url.hostname !== "tintim.link" || !url.pathname.startsWith("/whatsapp/")) return;
      trackWhatsAppClick({
        location: link.dataset.clickLocation || (link.closest("footer") ? "footer" : pathname),
        label: link.getAttribute("aria-label") || link.textContent?.trim() || "WhatsApp",
        productCode: link.dataset.productCode,
        productName: link.dataset.productName,
        montadora: link.dataset.montadora,
      });
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [pathname]);
  return null;
}
