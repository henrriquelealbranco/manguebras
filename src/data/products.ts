import type { Product } from "@/types/product";

/**
 * Catálogo curado Manguebras — produtos reais do acervo de fotos,
 * nomeados a partir da análise visual de cada SKU.
 *
 * Modelo híbrido: `priceCents` ausente = produto sob orçamento (WhatsApp).
 * Quando a planilha completa do ERP chegar, este arquivo passa a ser
 * gerado pelo script de importação.
 */
export const PRODUCTS: Product[] = [
  // ─────────────── Mangueiras de Radiador ───────────────
  {
    code: "5000",
    slug: "mangueira-inferior-radiador-scania-124",
    name: "Mangueira Inferior do Radiador Scania 124",
    shortDescription:
      "Curva inferior em EPDM de alta resistência para linha Scania.",
    description:
      "Mangueira inferior do radiador desenvolvida para a linha Scania 124. Produzida em borracha EPDM com reforço têxtil, suporta altas temperaturas e pressões do sistema de arrefecimento diesel, garantindo vedação perfeita e longa vida útil.",
    category: "mangueiras-radiador",
    lines: ["diesel", "pesada"],
    images: ["/produtos/5000.jpg"],
    priceCents: 18990,
    compareAtCents: 21990,
    specs: [
      { label: "Material", value: "EPDM com reforço têxtil" },
      { label: "Temperatura de trabalho", value: "-40 °C a +125 °C" },
      { label: "Aplicação", value: "Sistema de arrefecimento" },
    ],
    applications: [{ vehicle: "Scania 124", years: "1998–2007" }],
    relatedCodes: ["1029", "1002", "4014"],
    inStock: true,
    featured: true,
    createdAt: "2026-06-01",
  },
  {
    code: "4052",
    slug: "mangueira-inferior-radiador-volvo-fh",
    name: "Mangueira Inferior do Radiador Volvo FH",
    shortDescription:
      "Curva moldada em EPDM para o sistema de arrefecimento Volvo FH.",
    description:
      "Mangueira inferior do radiador moldada no formato original para a linha Volvo FH. Borracha EPDM multicamadas com reforço, resistente a fluidos de arrefecimento e picos de temperatura do motor diesel.",
    category: "mangueiras-radiador",
    lines: ["diesel", "pesada"],
    images: ["/produtos/4052.jpg"],
    priceCents: 20590,
    specs: [
      { label: "Material", value: "EPDM multicamadas" },
      { label: "Temperatura de trabalho", value: "-40 °C a +125 °C" },
      { label: "Aplicação", value: "Sistema de arrefecimento" },
    ],
    applications: [{ vehicle: "Volvo FH 12/460", years: "2004–2015" }],
    relatedCodes: ["1029", "1049", "5000"],
    inStock: true,
    featured: true,
    createdAt: "2026-06-01",
  },
  {
    code: "6001",
    slug: "mangueira-superior-radiador-mb-atego",
    name: "Mangueira Superior do Radiador Mercedes-Benz Atego",
    shortDescription:
      "Mangueira superior moldada para caminhões Mercedes-Benz Atego.",
    description:
      "Mangueira superior do radiador para a linha Mercedes-Benz Atego. Moldada em EPDM no formato original de fábrica, assegura encaixe perfeito e vedação confiável no circuito de arrefecimento.",
    category: "mangueiras-radiador",
    lines: ["diesel", "pesada"],
    images: ["/produtos/6001.jpg"],
    priceCents: 14990,
    specs: [
      { label: "Material", value: "EPDM com reforço têxtil" },
      { label: "Temperatura de trabalho", value: "-40 °C a +125 °C" },
      { label: "Aplicação", value: "Sistema de arrefecimento" },
    ],
    applications: [{ vehicle: "Mercedes-Benz Atego", years: "2012–2020" }],
    relatedCodes: ["1001", "1029", "4014"],
    inStock: true,
    featured: true,
    createdAt: "2026-06-05",
  },

  // ─────────────── Mangueiras Moldadas ───────────────
  {
    code: "2000",
    slug: "mangueira-moldada-derivacao-vw-constellation",
    name: "Mangueira Moldada com Derivação VW Constellation",
    shortDescription:
      "Moldada com derivações 22/15/48/55 mm — formato original de fábrica.",
    description:
      "Mangueira moldada com múltiplas derivações (22 mm, 15 mm, 48 mm e 55 mm) para a linha VW Constellation. Reproduz fielmente o formato original, eliminando adaptações e garantindo o fluxo correto do sistema de arrefecimento.",
    category: "mangueiras-moldadas",
    lines: ["diesel", "pesada"],
    images: ["/produtos/2000.jpg"],
    priceCents: 25990,
    specs: [
      { label: "Material", value: "EPDM com reforço têxtil" },
      { label: "Derivações", value: "22 / 15 / 48 / 55 mm" },
      { label: "Temperatura de trabalho", value: "-40 °C a +125 °C" },
    ],
    applications: [{ vehicle: "VW Constellation", years: "2006–2018" }],
    relatedCodes: ["1001", "1002", "1004"],
    inStock: true,
    featured: true,
    createdAt: "2026-06-05",
  },

  // ─────────────── Mangueiras de Intercooler ───────────────
  {
    code: "3000",
    slug: "mangueira-intercooler-gomo-mb-axor",
    name: "Mangueira de Intercooler Gomo Mercedes-Benz Axor",
    shortDescription:
      "Silicone gomo com anéis metálicos — projetada para pressão de turbo.",
    description:
      "Mangueira de intercooler tipo gomo em silicone de alta performance com anéis metálicos de reforço. Desenvolvida para suportar a pressão e a temperatura do sistema de turbo dos caminhões Mercedes-Benz Axor.",
    category: "mangueiras-intercooler",
    lines: ["diesel", "pesada"],
    images: ["/produtos/3000.jpg"],
    priceCents: 15990,
    specs: [
      { label: "Material", value: "Silicone com anéis metálicos" },
      { label: "Temperatura de trabalho", value: "-50 °C a +180 °C" },
      { label: "Aplicação", value: "Intercooler / turbo" },
    ],
    applications: [{ vehicle: "Mercedes-Benz Axor", years: "2005–2019" }],
    relatedCodes: ["1049", "3001", "3005"],
    inStock: true,
    featured: true,
    createdAt: "2026-06-08",
  },
  {
    code: "3001",
    slug: "mangueira-intercooler-gomo-scania-serie-4",
    name: "Mangueira de Intercooler Gomo Scania Série 4",
    shortDescription:
      "Gomo de silicone reforçado para o circuito de turbo Scania.",
    description:
      "Mangueira de intercooler tipo gomo em silicone reforçado com anéis metálicos, dimensionada para o circuito de ar pressurizado da linha Scania Série 4.",
    category: "mangueiras-intercooler",
    lines: ["diesel", "pesada"],
    images: ["/produtos/3001.jpg"],
    priceCents: 17990,
    specs: [
      { label: "Material", value: "Silicone com anéis metálicos" },
      { label: "Temperatura de trabalho", value: "-50 °C a +180 °C" },
      { label: "Aplicação", value: "Intercooler / turbo" },
    ],
    applications: [{ vehicle: "Scania Série 4", years: "1998–2007" }],
    relatedCodes: ["1049", "3000", "3005"],
    inStock: true,
    createdAt: "2026-06-08",
  },
  {
    code: "3005",
    slug: "mangueira-intercooler-gomo-iveco-stralis",
    name: "Mangueira de Intercooler Gomo Iveco Stralis",
    shortDescription:
      "Silicone gomo de alta resistência térmica para linha Iveco.",
    description:
      "Mangueira de intercooler tipo gomo em silicone com anéis metálicos para caminhões Iveco Stralis. Alta resistência térmica e à pressão do sistema de turbo.",
    category: "mangueiras-intercooler",
    lines: ["diesel", "pesada"],
    images: ["/produtos/3005.jpg"],
    priceCents: 16990,
    specs: [
      { label: "Material", value: "Silicone com anéis metálicos" },
      { label: "Temperatura de trabalho", value: "-50 °C a +180 °C" },
      { label: "Aplicação", value: "Intercooler / turbo" },
    ],
    applications: [{ vehicle: "Iveco Stralis", years: "2007–2021" }],
    relatedCodes: ["1049", "3000", "3001"],
    inStock: true,
    createdAt: "2026-06-10",
  },

  // ─────────────── Silicone Premium ───────────────
  {
    code: "6000",
    slug: "mangueira-silicone-azul-respiro-motor-iveco",
    name: "Mangueira de Silicone Azul — Respiro do Motor Iveco",
    shortDescription:
      "Linha premium de silicone azul: máxima durabilidade e performance.",
    description:
      "Mangueira de respiro do motor em silicone azul premium para a linha Iveco. O silicone oferece vida útil muito superior à borracha convencional, com excelente resistência térmica e química.",
    category: "mangueiras-silicone",
    lines: ["diesel", "pesada"],
    images: ["/produtos/6000.jpg"],
    priceCents: 12990,
    specs: [
      { label: "Material", value: "Silicone premium" },
      { label: "Temperatura de trabalho", value: "-50 °C a +180 °C" },
      { label: "Cor", value: "Azul" },
    ],
    applications: [{ vehicle: "Iveco Daily / Stralis" }],
    relatedCodes: ["1000", "1001", "6001"],
    inStock: true,
    featured: true,
    createdAt: "2026-06-10",
  },

  // ─────────────── Abraçadeiras ───────────────
  {
    code: "1000",
    slug: "abracadeira-rosca-sem-fim-micro-10-16",
    name: "Abraçadeira Rosca Sem Fim Micro 10–16 mm",
    shortDescription: "Fixação precisa para mangueiras de pequeno diâmetro.",
    description:
      "Abraçadeira tipo rosca sem fim (micro) para mangueiras de 10 a 16 mm. Fita zincada com parafuso de aperto, ideal para linhas de combustível, respiro e vácuo.",
    category: "abracadeiras",
    lines: ["diesel", "leve", "pesada", "agricola", "industrial"],
    images: ["/produtos/1000.jpg"],
    priceCents: 690,
    specs: [
      { label: "Faixa de aperto", value: "10–16 mm" },
      { label: "Material", value: "Aço zincado" },
      { label: "Tipo", value: "Rosca sem fim" },
    ],
    applications: [{ vehicle: "Uso universal" }],
    relatedCodes: ["1001", "1002", "1004"],
    inStock: true,
    createdAt: "2026-06-01",
  },
  {
    code: "1001",
    slug: "abracadeira-rosca-sem-fim-14-22",
    name: "Abraçadeira Rosca Sem Fim 14–22 mm",
    shortDescription: "Aperto firme e uniforme para mangueiras de 14 a 22 mm.",
    description:
      "Abraçadeira tipo rosca sem fim para mangueiras de 14 a 22 mm. Fita de aço zincado com rosca de precisão para aperto uniforme sem danificar a mangueira.",
    category: "abracadeiras",
    lines: ["diesel", "leve", "pesada", "agricola", "industrial"],
    images: ["/produtos/1001.jpg"],
    priceCents: 790,
    specs: [
      { label: "Faixa de aperto", value: "14–22 mm" },
      { label: "Material", value: "Aço zincado" },
      { label: "Tipo", value: "Rosca sem fim" },
    ],
    applications: [{ vehicle: "Uso universal" }],
    relatedCodes: ["1000", "1002", "1004"],
    inStock: true,
    createdAt: "2026-06-01",
  },
  {
    code: "1002",
    slug: "abracadeira-rosca-sem-fim-19-27",
    name: "Abraçadeira Rosca Sem Fim 19–27 mm",
    shortDescription: "Para mangueiras de arrefecimento e ar de 19 a 27 mm.",
    description:
      "Abraçadeira tipo rosca sem fim para mangueiras de 19 a 27 mm. Indicada para linhas de arrefecimento, ar e combustível em veículos leves e pesados.",
    category: "abracadeiras",
    lines: ["diesel", "leve", "pesada", "agricola", "industrial"],
    images: ["/produtos/1002.jpg"],
    priceCents: 890,
    specs: [
      { label: "Faixa de aperto", value: "19–27 mm" },
      { label: "Material", value: "Aço zincado" },
      { label: "Tipo", value: "Rosca sem fim" },
    ],
    applications: [{ vehicle: "Uso universal" }],
    relatedCodes: ["1000", "1001", "1004"],
    inStock: true,
    createdAt: "2026-06-01",
  },
  {
    code: "1004",
    slug: "abracadeira-rosca-sem-fim-32-44",
    name: "Abraçadeira Rosca Sem Fim 32–44 mm",
    shortDescription: "Fixação segura para mangueiras de radiador até 44 mm.",
    description:
      "Abraçadeira tipo rosca sem fim para mangueiras de 32 a 44 mm, dimensionada para mangueiras de radiador e tubulações de maior diâmetro.",
    category: "abracadeiras",
    lines: ["diesel", "leve", "pesada", "agricola", "industrial"],
    images: ["/produtos/1004.jpg"],
    priceCents: 1090,
    specs: [
      { label: "Faixa de aperto", value: "32–44 mm" },
      { label: "Material", value: "Aço zincado" },
      { label: "Tipo", value: "Rosca sem fim" },
    ],
    applications: [{ vehicle: "Uso universal" }],
    relatedCodes: ["1029", "5000", "4052"],
    inStock: true,
    createdAt: "2026-06-01",
  },
  {
    code: "1029",
    slug: "abracadeira-rosca-sem-fim-inox-22-32",
    name: "Abraçadeira Rosca Sem Fim Inox 22–32 mm",
    shortDescription: "Aço inox resistente à corrosão para uso severo.",
    description:
      "Abraçadeira tipo rosca sem fim em aço inox para mangueiras de 22 a 32 mm. Máxima resistência à corrosão — ideal para aplicações severas e ambientes agressivos.",
    category: "abracadeiras",
    lines: ["diesel", "leve", "pesada", "agricola", "industrial"],
    images: ["/produtos/1029.jpg"],
    priceCents: 1290,
    specs: [
      { label: "Faixa de aperto", value: "22–32 mm" },
      { label: "Material", value: "Aço inox" },
      { label: "Tipo", value: "Rosca sem fim" },
    ],
    applications: [{ vehicle: "Uso universal" }],
    relatedCodes: ["1000", "1001", "1002"],
    inStock: true,
    featured: true,
    createdAt: "2026-06-12",
  },
  {
    code: "1049",
    slug: "abracadeira-v-band-turbina",
    name: "Abraçadeira V-Band da Turbina",
    shortDescription:
      "Perfil V de alta pressão para conexão da turbina e escapamento.",
    description:
      "Abraçadeira tipo V-Band em aço para fixação da turbina e tubos de escapamento. Suporta alta pressão e temperatura, com aperto por parafuso que garante vedação uniforme em todo o flange.",
    category: "abracadeiras",
    lines: ["diesel", "pesada"],
    images: ["/produtos/1049.jpg"],
    priceCents: 8990,
    specs: [
      { label: "Tipo", value: "V-Band" },
      { label: "Material", value: "Aço" },
      { label: "Aplicação", value: "Turbina / escapamento" },
    ],
    applications: [{ vehicle: "Linha pesada diesel" }],
    relatedCodes: ["3000", "3001", "3005"],
    inStock: true,
    featured: true,
    createdAt: "2026-06-12",
  },
  {
    code: "1054",
    slug: "abracadeira-estampada-trava-100",
    name: "Abraçadeira Estampada com Trava 100 mm",
    shortDescription: "Perfil estampado com parafuso para tubos de 100 mm.",
    description:
      "Abraçadeira estampada com fechamento por parafuso e porca para tubos e mangotes de aproximadamente 100 mm. Construção robusta para fixações estruturais.",
    category: "abracadeiras",
    lines: ["diesel", "pesada", "industrial"],
    images: ["/produtos/1054.jpg"],
    priceCents: 2490,
    specs: [
      { label: "Diâmetro nominal", value: "100 mm" },
      { label: "Material", value: "Aço zincado" },
      { label: "Tipo", value: "Estampada com trava" },
    ],
    applications: [{ vehicle: "Linha pesada / industrial" }],
    relatedCodes: ["1049", "1055", "1056"],
    inStock: true,
    createdAt: "2026-06-12",
  },
  {
    code: "1055",
    slug: "abracadeira-estampada-trava-110",
    name: "Abraçadeira Estampada com Trava 110 mm",
    shortDescription: "Versão 110 mm para mangotes de maior diâmetro.",
    description:
      "Abraçadeira estampada com fechamento por parafuso e porca para tubos e mangotes de aproximadamente 110 mm.",
    category: "abracadeiras",
    lines: ["diesel", "pesada", "industrial"],
    images: ["/produtos/1055.jpg"],
    priceCents: 2690,
    specs: [
      { label: "Diâmetro nominal", value: "110 mm" },
      { label: "Material", value: "Aço zincado" },
      { label: "Tipo", value: "Estampada com trava" },
    ],
    applications: [{ vehicle: "Linha pesada / industrial" }],
    relatedCodes: ["1054", "1056", "1049"],
    inStock: true,
    createdAt: "2026-06-12",
  },
  {
    code: "1056",
    slug: "abracadeira-estampada-trava-120",
    name: "Abraçadeira Estampada com Trava 120 mm",
    shortDescription: "Fixação robusta para mangotes de 120 mm.",
    description:
      "Abraçadeira estampada com fechamento por parafuso e porca para tubos e mangotes de aproximadamente 120 mm.",
    category: "abracadeiras",
    lines: ["diesel", "pesada", "industrial"],
    images: ["/produtos/1056.jpg"],
    priceCents: 2890,
    specs: [
      { label: "Diâmetro nominal", value: "120 mm" },
      { label: "Material", value: "Aço zincado" },
      { label: "Tipo", value: "Estampada com trava" },
    ],
    applications: [{ vehicle: "Linha pesada / industrial" }],
    relatedCodes: ["1054", "1055", "1049"],
    inStock: true,
    createdAt: "2026-06-12",
  },

  // ─────────────── Juntas & Vedação ───────────────
  {
    code: "4013",
    slug: "kit-juntas-motor",
    name: "Kit de Juntas do Motor",
    shortDescription:
      "Jogo completo de juntas e anéis para retífica do motor — sob orçamento.",
    description:
      "Kit completo de juntas do motor com juntas de tampa, carcaça e anéis o-ring. Como as especificações variam por motor, este item é vendido sob orçamento: fale com nossa equipe informando o modelo do veículo/motor.",
    category: "juntas-vedacao",
    lines: ["diesel", "pesada"],
    images: ["/produtos/4013.jpg"],
    specs: [
      { label: "Conteúdo", value: "Juntas + anéis o-ring" },
      { label: "Aplicação", value: "Conforme motor (consultar)" },
    ],
    applications: [{ vehicle: "Consultar modelo do motor" }],
    relatedCodes: ["4014", "5000", "2000"],
    inStock: true,
    createdAt: "2026-06-15",
  },

  // ─────────────── Acessórios ───────────────
  {
    code: "4014",
    slug: "coxim-borracha-radiador",
    name: "Coxim de Borracha do Radiador",
    shortDescription:
      "Amortece vibrações e protege a fixação do radiador.",
    description:
      "Coxim de borracha para fixação do radiador. Absorve vibrações do chassi, evitando trincas e desgaste prematuro do radiador e das mangueiras.",
    category: "acessorios",
    lines: ["diesel", "leve", "pesada"],
    images: ["/produtos/4014.jpg"],
    priceCents: 1990,
    specs: [
      { label: "Material", value: "Borracha de alta densidade" },
      { label: "Aplicação", value: "Fixação do radiador" },
    ],
    applications: [{ vehicle: "Diversos modelos (consultar)" }],
    relatedCodes: ["5000", "4052", "6001"],
    inStock: true,
    createdAt: "2026-06-15",
  },
];

// ─────────────────────── Helpers ───────────────────────

export function getProduct(code: string): Product | undefined {
  return PRODUCTS.find((p) => p.code === code);
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter((p) => p.featured);
}

export function getRelatedProducts(product: Product): Product[] {
  return product.relatedCodes
    .map((code) => getProduct(code))
    .filter((p): p is Product => Boolean(p));
}

/** Valor da parcela em 6x sem juros (em centavos). */
export function installmentCents(priceCents: number, times = 6): number {
  return Math.ceil(priceCents / times);
}
