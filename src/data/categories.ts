import type { Category } from "@/types/product";

/**
 * Categorias definitivas do catálogo Manguebras (conforme catálogo impresso oficial).
 */
export const CATEGORIES: Category[] = [
  {
    slug: "mangueiras-caminhoes-onibus",
    name: "Mangueiras Caminhões e Ônibus",
    description:
      "Linha pesada de arrefecimento e fluidos para caminhões e ônibus.",
    image: "/produtos/capas/mangueiras-radiador.jpg",
    skuRange: "pesada",
  },
  {
    slug: "mangueiras-turbinas",
    name: "Mangueiras Turbinas",
    description:
      "Intercooler, turbo e mangueiras de alta pressão e temperatura.",
    image: "/produtos/capas/mangueiras-intercooler.jpg",
    skuRange: "turbo",
  },
  {
    slug: "mangueiras-pick-ups",
    name: "Mangueiras Pick-ups",
    description:
      "Mangueiras e arrefecimento para caminhonetes e pick-ups da linha diesel.",
    image: "/produtos/capas/mangueiras-moldadas.jpg",
    skuRange: "pick-ups",
  },
  {
    slug: "mangueiras-vans",
    name: "Mangueiras Vans",
    description:
      "Linha completa para vans, furgões e utilitários comerciais.",
    image: "/produtos/capas/mangueiras-silicone.jpg",
    skuRange: "vans",
  },
  {
    slug: "mangueiras-agricolas-empilhadeiras",
    name: "Mangueiras Agrícolas e Empilhadeiras",
    description:
      "Aplicações para tratores, máquinas agrícolas e empilhadeiras.",
    image: "/produtos/capas/mangueiras-radiador.jpg",
    skuRange: "agricola",
  },
  {
    slug: "mangueiras-geral",
    name: "Mangueiras Geral",
    description:
      "Mangueiras retas, lonadas, sucção, ar/água, combustível e flexíveis.",
    image: "/produtos/capas/mangueiras-silicone.jpg",
    skuRange: "geral",
  },
  {
    slug: "pecas-acessorios",
    name: "Peças e Acessórios",
    description:
      "Abraçadeiras, tanques de expansão, coxins, defletores, tampas e conexões.",
    image: "/produtos/capas/abracadeiras.jpg",
    skuRange: "acessorios",
  },
  {
    slug: "miudezas-diesel",
    name: "Miudezas Diesel",
    description:
      "Anéis de vedação, juntas, retentores, jet coolers e miudezas em geral.",
    image: "/produtos/capas/juntas-vedacao.jpg",
    skuRange: "miudezas",
  },
];

export function getCategory(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
