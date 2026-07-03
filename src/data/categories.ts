import type { Category } from "@/types/product";

/**
 * Categorias do catálogo Manguebras.
 * As faixas de SKU correspondem à organização do acervo de fotos do cliente.
 */
export const CATEGORIES: Category[] = [
  {
    slug: "mangueiras-radiador",
    name: "Mangueiras de Radiador",
    description:
      "Curvas e retas para o sistema de arrefecimento de caminhões, ônibus e máquinas.",
    image: "/produtos/capas/mangueiras-radiador.jpg",
    skuRange: "5000–5999",
  },
  {
    slug: "mangueiras-intercooler",
    name: "Mangueiras de Intercooler",
    description:
      "Silicone gomo com anéis metálicos, projetadas para a pressão do turbo.",
    image: "/produtos/capas/mangueiras-intercooler.jpg",
    skuRange: "3000–3999",
  },
  {
    slug: "mangueiras-moldadas",
    name: "Mangueiras Moldadas",
    description:
      "EPDM moldadas no formato original de cada veículo — encaixe perfeito.",
    image: "/produtos/capas/mangueiras-moldadas.jpg",
    skuRange: "2000–2999",
  },
  {
    slug: "mangueiras-silicone",
    name: "Silicone Premium",
    description:
      "Linha azul de alta temperatura para máxima durabilidade e performance.",
    image: "/produtos/capas/mangueiras-silicone.jpg",
    skuRange: "6000–6999",
  },
  {
    slug: "abracadeiras",
    name: "Abraçadeiras",
    description:
      "Rosca sem fim, T-bolt e mola — fixação segura para qualquer diâmetro.",
    image: "/produtos/capas/abracadeiras.jpg",
    skuRange: "1000–1999",
  },
  {
    slug: "juntas-vedacao",
    name: "Juntas & Vedação",
    description:
      "Kits de juntas e retentores para motor, câmbio e diferencial.",
    image: "/produtos/capas/juntas-vedacao.jpg",
    skuRange: "4000–4999",
  },
  {
    slug: "conexoes",
    name: "Conexões & Adaptadores",
    description:
      "Terminais, engates rápidos e adaptadores para linhas de fluido.",
    image: "/produtos/capas/conexoes.jpg",
    skuRange: "diversos",
  },
  {
    slug: "acessorios",
    name: "Acessórios",
    description:
      "Tanques de expansão, coxins, defletores, tampas e purificadores.",
    image: "/produtos/capas/acessorios.jpg",
    skuRange: "diversos",
  },
];

export function getCategory(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
