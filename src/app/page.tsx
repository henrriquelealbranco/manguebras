import { Hero } from "@/components/home/hero";
import { CategoryLines } from "@/components/home/category-lines";
import { FeaturedProducts } from "@/components/home/featured-products";
import { AboutStrip } from "@/components/home/about-strip";
import { Testimonials } from "@/components/home/testimonials";
import { FaqSection } from "@/components/home/faq-section";
import { FinalCta } from "@/components/home/final-cta";
import { TrustBar } from "@/components/home/trust-bar";
import { getFeaturedProducts } from "@/data/products";

/**
 * Homepage Manguebras — hero, linhas, destaques, autoridade,
 * prova social, FAQ e CTA final.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryLines />
      <FeaturedProducts products={getFeaturedProducts()} />
      <AboutStrip />
      <Testimonials />
      <FaqSection />
      <FinalCta />
      <TrustBar />
    </>
  );
}
