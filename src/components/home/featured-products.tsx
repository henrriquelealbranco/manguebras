import { ProductCarousel } from "@/components/product/product-carousel";
import type { Product } from "@/types/product";

interface FeaturedProductsProps {
  products: Product[];
}

/**
 * Seção "Produtos em destaque" da homepage.
 */
export function FeaturedProducts({ products }: FeaturedProductsProps) {
  return (
    <section aria-label="Produtos em destaque" className="bg-white">
      <div className="container-page py-14">
        <ProductCarousel
          products={products}
          pre="Produtos em"
          highlight="destaque"
          linkHref="/produtos"
          linkLabel="Ver todos os produtos"
        />
      </div>
    </section>
  );
}
