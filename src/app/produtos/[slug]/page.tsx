import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BadgeCheck,
  Factory,
  Headset,
  MessageCircle,
  Phone,
  Truck,
} from "lucide-react";
import { Gallery } from "@/components/product/gallery";
import { ProductCarousel } from "@/components/product/product-carousel";
import { PageBreadcrumb } from "@/components/shared/page-breadcrumb";
import { getProductBySlug, PRODUCTS } from "@/data/products";
import { getCategory } from "@/data/categories";
import { montadoraSlug, relatedProductsFor } from "@/lib/catalog";
import { cn } from "@/lib/utils";
import { SITE, whatsappLink } from "@/constants/site";

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
 * Página de produto do CATÁLOGO VIRTUAL:
 * foto de um lado, ficha técnica do outro — sem preço nem venda online.
 * A conversão acontece por consulta ao representante (WhatsApp/telefone).
 */
export default async function ProdutoPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const category = getCategory(product.category);
  const related = relatedProductsFor(product);

  // Linhas da ficha técnica, na ordem da tabela "DESCRIÇÃO" do cliente.
  const f = product.ficha;
  const fichaRows: { label: string; value: ReactNode }[] = [
    { label: "Código Manguebras", value: product.code },
    { label: "Montadora", value: f.montadora },
    ...(f.nOriginal ? [{ label: "N. Original", value: f.nOriginal }] : []),
    {
      label: "Aplicação",
      value: (
        <>
          <span>{f.aplicacao}</span>
          {f.aplicacaoNotas?.length ? (
            <span className="mt-1 block font-normal text-graphite-500">
              {f.aplicacaoNotas.map((n) => (
                <span key={n} className="block">
                  {n}
                </span>
              ))}
            </span>
          ) : null}
        </>
      ),
    },
    ...(f.medidas ? [{ label: "Medidas", value: f.medidas }] : []),
    { label: "Material", value: f.material },
    { label: "Unidade", value: f.unidade },
    ...(f.peso ? [{ label: "Peso", value: f.peso }] : []),
    ...(f.grupo ? [{ label: "Grupo", value: f.grupo }] : []),
  ];

  // JSON-LD de catálogo (Product, sem Offer/preço — não há venda online)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    sku: product.code,
    image: product.images.map((i) => `${SITE.url}${i}`),
    description: product.shortDescription,
    brand: { "@type": "Brand", name: SITE.name },
    ...(product.montadora !== "Universal"
      ? {
          manufacturer: {
            "@type": "Organization",
            name: product.montadora,
          },
        }
      : {}),
    ...(category ? { category: category.name } : {}),
  };

  const consultaHref = whatsappLink(
    `Olá! Tenho interesse na peça: ${product.name} (Cód. ${product.code}). Podem me passar disponibilidade e mais informações?`,
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container-page py-3">
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

      {/* Bloco principal — foto | ficha técnica */}
      <div className="container-page grid gap-8 pb-10 lg:grid-cols-[minmax(0,0.9fr)_1fr]">
        <Gallery images={product.images} alt={product.name} />

        <div>
          <div className="flex flex-wrap items-center gap-2">
            {product.montadora !== "Universal" && (
              <Link
                href={`/produtos?montadora=${montadoraSlug(product.montadora)}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-brand-700 bg-brand-900 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white transition-colors hover:bg-brand-800"
              >
                <Factory className="h-3.5 w-3.5" />
                {product.montadora}
              </Link>
            )}
            {category && (
              <Link
                href={`/produtos?categoria=${category.slug}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-brand-700 transition-colors hover:border-brand-400"
              >
                {category.name}
              </Link>
            )}
          </div>

          <h1 className="mt-2 font-display text-xl font-extrabold leading-tight text-graphite-900 md:text-2xl">
            {product.name}
          </h1>

          <div className="mt-1.5 flex flex-wrap items-center gap-3 text-sm text-graphite-500">
            <span>
              Cód. <strong className="text-graphite-700">{product.code}</strong>
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-accent-600">
              <BadgeCheck className="h-4 w-4" />
              Disponível no catálogo
            </span>
          </div>

          <p className="mt-2.5 text-sm leading-relaxed text-graphite-600">
            {product.shortDescription}
          </p>

          {/* DESCRIÇÃO — ficha técnica no formato do cliente (print-friendly) */}
          <div className="mt-3.5 overflow-hidden rounded-lg border border-graphite-300 bg-white shadow-soft">
            <div className="flex items-center justify-between border-b-2 border-brand-900 bg-graphite-50 px-4 py-2">
              <h2 className="font-display text-sm font-extrabold uppercase tracking-widest text-brand-900">
                Descrição
              </h2>
              <span className="hidden text-[11px] font-bold uppercase tracking-wide text-accent-600 sm:inline">
                Ficha técnica
              </span>
            </div>
            <table className="w-full text-sm">
              <tbody>
                {fichaRows.map((row) => (
                  <tr
                    key={row.label}
                    className="border-b border-graphite-100 last:border-0"
                  >
                    <th
                      scope="row"
                      className="w-[42%] bg-graphite-50/70 px-4 py-2 text-left align-top text-[11px] font-bold uppercase tracking-wide text-graphite-500"
                    >
                      {row.label}
                    </th>
                    <td
                      className={cn(
                        "px-4 py-2 align-top font-semibold text-graphite-900",
                        row.label === "Código Manguebras" &&
                          "font-display text-base font-extrabold text-brand-900",
                      )}
                    >
                      {row.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bloco de consulta (sem venda) */}
          <div className="mt-4 rounded-lg border border-brand-200 bg-brand-50/60 p-5">
            <p className="font-display text-base font-extrabold text-brand-900">
              Consulte disponibilidade e condições
            </p>
            <p className="mt-1 text-sm text-graphite-600">
              A Manguebras é distribuidora. Fale com nossa equipe para preço,
              disponibilidade e onde encontrar esta peça.
            </p>
            <a
              href={consultaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3.5 flex w-full items-center justify-center gap-2 rounded-lg bg-action-500 py-3 text-xs font-bold uppercase tracking-widest text-white transition-all duration-300 hover:scale-[1.01] hover:bg-action-600 active:bg-action-700"
            >
              <MessageCircle className="h-4 w-4" />
              Consultar esta peça
            </a>
            <a
              href={SITE.phoneHref}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg border border-brand-700 py-3 text-[11px] font-bold uppercase tracking-widest text-brand-800 transition-colors duration-300 hover:bg-brand-900 hover:text-white"
            >
              <Phone className="h-4 w-4" />
              {SITE.phone}
            </a>
          </div>

          {/* Selos institucionais */}
          <ul className="mt-4 space-y-2 text-sm text-graphite-600">
            <li className="flex items-center gap-2.5">
              <Truck className="h-4.5 w-4.5 shrink-0 text-accent-600" />
              Distribuição para <strong>todo o Brasil</strong>
            </li>
            <li className="flex items-center gap-2.5">
              <Headset className="h-4.5 w-4.5 shrink-0 text-accent-600" />
              Dúvida na aplicação? Nossa equipe confere para você
            </li>
            <li className="flex items-center gap-2.5">
              <MessageCircle className="h-4.5 w-4.5 shrink-0 text-accent-600" />
              Envie uma foto da amostra e identificamos a peça certa
            </li>
          </ul>
        </div>
      </div>

      {/* Sobre a peça */}
      <section className="border-t border-graphite-200 bg-graphite-50">
        <div className="container-page py-12">
          <h2 className="font-display text-lg font-extrabold uppercase tracking-wide text-graphite-900">
            Sobre a <span className="text-accent-500">peça</span>
          </h2>
          <div className="mt-4 rounded-lg border border-graphite-200 bg-white p-6 shadow-soft md:p-8">
            <p className="max-w-3xl text-sm leading-relaxed text-graphite-600">
              {product.description}
            </p>
            <p className="mt-5 border-t border-graphite-100 pt-5 text-xs text-graphite-500">
              Não tem certeza se é a peça certa para o seu veículo? Envie uma
              foto da amostra no WhatsApp com o modelo do caminhão — nossa
              equipe confirma a aplicação para você.
            </p>
          </div>
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
