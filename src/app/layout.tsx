import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsAppFab } from "@/components/layout/whatsapp-fab";
import {
  Analytics,
  OrganizationJsonLd,
} from "@/components/shared/analytics";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SITE } from "@/constants/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["500", "600", "700", "800", "900"],
  display: "swap",
});

export const viewport = {
  themeColor: "#05221E",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Mangueiras Automotivas para Linha Diesel`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "mangueiras automotivas",
    "mangueiras diesel",
    "mangueira de radiador",
    "mangueira de intercooler",
    "abraçadeiras",
    "linha de arrefecimento",
    "peças para caminhão",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — Mangueiras Automotivas para Linha Diesel`,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="flex min-h-screen flex-col">
        <OrganizationJsonLd
          name={SITE.name}
          url={SITE.url}
          logo={`${SITE.url}/marca/logo.png`}
          phone={SITE.phone}
          city={SITE.address.city}
          state={SITE.address.state}
        />
        <Analytics />
        <TooltipProvider delayDuration={200}>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppFab />
          <Toaster position="top-center" richColors />
        </TooltipProvider>
      </body>
    </html>
  );
}
