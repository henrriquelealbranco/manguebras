import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BadgeCheck, Headset, ShieldCheck, Truck } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Gallery } from "@/components/product/gallery";
import { BuyBox } from "@/components/product/buy-box";
import { ProductCarousel } from "@/components/product/product-carousel";
import { PageBreadcrumb } from "@/components/shared/page-breadcrumb";
import { getProductBySlug, PRODUCTS } from "@/data/products";
import { getCategory } from "@/data/categories";
import { relatedProductsFor } from "@/lib/catalog";
import { SITE } from "@/constants/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: product.images,
    },
  };
}

/**
 * PDP — página completa do produto no padrão do design aprovado.
 */
export default async function ProdutoPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const category = getCategory(product.category);
  const related = relatedProductsFor(product);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    sku: product.code,
    image: product.images.map((i) => `${SITE.url}${i}`),
    description: product.shortDescription,
    brand: { "@type": "Brand", name: SITE.name },
    ...(product.priceCents
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: "BRL",
            price: (product.priceCents / 100).toFixed(2),
            availability: product.inStock
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
            url: `${SITE.url}/produtos/${product.slug}`,
          },
        }
      : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container-page py-5">
        <PageBreadcrumb
          items={[
            { label: "Produtos", href: "/produtos" },
            ...(category
              ? [
                  {
                    label: category.name,
                    href: `/produtos?categoria=${category.slug}`,
                  },
                ]
              : []),
            { label: product.name },
          ]}
        />
      </div>

      {/* Bloco principal */}
      <div className="container-page grid gap-10 pb-14 lg:grid-cols-2">
        <Gallery images={product.images} alt={product.name} />

        <div>
          {category && (
            <Link
              href={`/produtos?categoria=${category.slug}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-brand-700 transition-colors hover:border-brand-400"
            >
              {category.name}
            </Link>
          )}

          <h1 className="mt-3 font-display text-2xl font-extrabold leading-tight text-graphite-900 md:text-3xl">
            {product.name}
          </h1>

          <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-graphite-500">
            <span>
              Cód. <strong className="text-graphite-700">{product.code}</strong>
            </span>
            {product.inStock ? (
              <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-accent-600">
                <BadgeCheck className="h-4 w-4" />
                Em estoque
              </span>
            ) : (
              <span className="text-xs font-bold uppercase tracking-wide text-graphite-400">
                Sob consulta
              </span>
            )}
          </div>

          <p className="mt-4 text-sm leading-relaxed text-graphite-600">
            {product.shortDescription}
          </p>

          <div className="mt-5">
            <BuyBox product={product} />
          </div>

          {/* Selos de confiança */}
          <ul className="mt-5 space-y-2.5 text-sm text-graphite-600">
            <li className="flex items-center gap-2.5">
              <Truck className="h-4.5 w-4.5 shrink-0 text-accent-600" />
              Enviamos para <strong>todo o Brasil</strong>
            </li>
            <li className="flex items-center gap-2.5">
              <ShieldCheck className="h-4.5 w-4.5 shrink-0 text-accent-600" />
              Compra segura — seus dados protegidos
            </li>
            <li className="flex items-center gap-2.5">
              <Headset className="h-4.5 w-4.5 shrink-0 text-accent-600" />
              Dúvida na aplicação? Nossa equipe confere para você
            </li>
          </ul>
        </div>
      </div>

      {/* Abas de detalhes */}
      <section className="border-t border-graphite-200 bg-graphite-50">
        <div className="container-page py-12">
          <Tabs defaultValue="descricao">
            <TabsList className="h-auto w-full justify-start gap-1 overflow-x-auto rounded-xl bg-white p-1.5 shadow-soft">
              <TabsTrigger
                value="descricao"
                className="rounded-lg px-5 py-2.5 text-xs font-bold uppercase tracking-widest data-[state=active]:bg-brand-900 data-[state=active]:text-white"
              >
                Descrição
              </TabsTrigger>
              <TabsTrigger
                value="especificacoes"
                className="rounded-lg px-5 py-2.5 text-xs font-bold uppercase tracking-widest data-[state=active]:bg-brand-900 data-[state=active]:text-white"
              >
                Especificações
              </TabsTrigger>
              <TabsTrigger
                value="compatibilidade"
                className="rounded-lg px-5 py-2.5 text-xs font-bold uppercase tracking-widest data-[state=active]:bg-brand-900 data-[state=active]:text-white"
              >
                Compatibilidade
              </TabsTrigger>
            </TabsList>

            <TabsContent value="descricao" className="mt-5">
              <div className="rounded-2xl border border-graphite-200 bg-white p-6 shadow-soft md:p-8">
                <p className="max-w-3xl text-sm leading-relaxed text-graphite-600">
                  {product.description}
                </p>
              </div>
            </TabsContent>

            <TabsContent value="especificacoes" className="mt-5">
              <div className="overflow-hidden rounded-2xl border border-graphite-200 bg-white shadow-soft">
                <table className="w-full text-sm">
                  <tbody>
                    {product.specs.map((spec, i) => (
                      <tr
                        key={spec.label}
                        className={i % 2 === 0 ? "bg-graphite-50/60" : ""}
                      >
                        <th
                          scope="row"
                          className="w-1/3 px-6 py-3.5 text-left font-semibold text-graphite-800"
                        >
                          {spec.label}
                        </th>
                        <td className="px-6 py-3.5 text-graphite-600">
                          {spec.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="compatibilidade" className="mt-5">
              <div className="overflow-hidden rounded-2xl border border-graphite-200 bg-white shadow-soft">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-brand-950 text-left text-[11px] font-bold uppercase tracking-widest text-white">
                      <th className="px-6 py-3">Veículo</th>
                      <th className="px-6 py-3">Anos</th>
                      <th className="px-6 py-3">Cód. original</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.applications.map((app, i) => (
                      <tr
                        key={`${app.vehicle}-${i}`}
                        className={i % 2 === 0 ? "" : "bg-graphite-50/60"}
                      >
                        <td className="px-6 py-3.5 font-semibold text-graphite-800">
                          {app.vehicle}
                        </td>
                        <td className="px-6 py-3.5 text-graphite-600">
                          {app.years ?? "—"}
                        </td>
                        <td className="px-6 py-3.5 text-graphite-600">
                          {app.oemCode ?? "Sob consulta"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="border-t border-graphite-200 px-6 py-4 text-xs text-graphite-500">
                  Não achou seu modelo? Envie uma foto da amostra no WhatsApp
                  que nossa equipe confirma a aplicação.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Relacionados */}
      {related.length > 0 && (
        <section aria-label="Produtos relacionados" className="bg-white">
          <div className="container-page py-14">
            <ProductCarousel
              products={related}
              pre="Produtos"
              highlight="relacionados"
              linkHref={
                category ? `/produtos?categoria=${category.slug}` : "/produtos"
              }
              linkLabel="Ver categoria"
            />
          </div>
        </section>
      )}
    </>
  );
}
