import type { Product } from "@/types/product";

/**
 * Catálogo curado Manguebras — produtos reais do acervo de fotos,
 * nomeados a partir da análise visual de cada SKU.
 *
 * A ficha técnica segue o formato do site atual do cliente (tabela DESCRIÇÃO),
 * pensada para o vendedor tirar um print e enviar ao cliente.
 * Quando a planilha completa do ERP chegar, este arquivo passa a ser gerado
 * pelo script de importação (os N.Original abaixo são exemplos de demonstração).
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
    montadora: "Scania",
    lines: ["diesel", "pesada"],
    images: ["/produtos/5000.jpg"],
    ficha: {
      montadora: "Scania Série 4 / 124",
      nOriginal: "1524925 | 1442181",
      aplicacao: "Mangueira Inferior do Radiador",
      aplicacaoNotas: ["Motor DC / DSC", "c/ bocal"],
      medidas: "Ø 55 mm",
      material: "Borracha EPDM",
      unidade: "PÇ",
      peso: "0,540 Kg",
      grupo: "011 – Mang. Scania",
    },
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
    montadora: "Volvo",
    lines: ["diesel", "pesada"],
    images: ["/produtos/4052.jpg"],
    ficha: {
      montadora: "Volvo FH12 / 460",
      nOriginal: "20516407 | 3979773",
      aplicacao: "Mangueira Inferior do Radiador",
      aplicacaoNotas: ["Motor D12"],
      medidas: "Ø 60 mm",
      material: "Borracha EPDM",
      unidade: "PÇ",
      peso: "0,610 Kg",
      grupo: "021 – Mang. Volvo",
    },
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
    montadora: "Mercedes-Benz",
    lines: ["diesel", "pesada"],
    images: ["/produtos/6001.jpg"],
    ficha: {
      montadora: "Mercedes-Benz Atego",
      nOriginal: "9705010182 | 9425010082",
      aplicacao: "Mangueira Superior do Radiador",
      aplicacaoNotas: ["Motor OM 906 LA"],
      medidas: "Ø 50 mm",
      material: "Borracha EPDM",
      unidade: "PÇ",
      peso: "0,430 Kg",
      grupo: "031 – Mang. Mercedes-Benz",
    },
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
    montadora: "Volkswagen",
    lines: ["diesel", "pesada"],
    images: ["/produtos/2000.jpg"],
    ficha: {
      montadora: "VW Constellation",
      nOriginal: "2T0121055 | 2T0121101",
      aplicacao: "Mangueira Moldada com Derivação",
      aplicacaoNotas: ["Derivações 22 / 15 / 48 / 55 mm"],
      medidas: "22 / 15 / 48 / 55 mm",
      material: "Borracha EPDM",
      unidade: "PÇ",
      peso: "0,720 Kg",
      grupo: "041 – Mang. Volkswagen",
    },
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
    montadora: "Mercedes-Benz",
    lines: ["diesel", "pesada"],
    images: ["/produtos/3000.jpg"],
    ficha: {
      montadora: "Mercedes-Benz Axor",
      nOriginal: "9425282382",
      aplicacao: "Mangueira de Intercooler (Gomo)",
      aplicacaoNotas: ["Motor OM 457 LA", "c/ anéis metálicos"],
      medidas: "Ø 80 mm",
      material: "Silicone c/ reforço têxtil",
      unidade: "PÇ",
      peso: "0,380 Kg",
      grupo: "032 – Interc. Mercedes-Benz",
    },
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
    montadora: "Scania",
    lines: ["diesel", "pesada"],
    images: ["/produtos/3001.jpg"],
    ficha: {
      montadora: "Scania Série 4",
      nOriginal: "1526603",
      aplicacao: "Mangueira de Intercooler (Gomo)",
      aplicacaoNotas: ["c/ anéis metálicos"],
      medidas: "Ø 80 mm",
      material: "Silicone c/ reforço têxtil",
      unidade: "PÇ",
      peso: "0,395 Kg",
      grupo: "012 – Interc. Scania",
    },
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
    montadora: "Iveco",
    lines: ["diesel", "pesada"],
    images: ["/produtos/3005.jpg"],
    ficha: {
      montadora: "Iveco Stralis / Cursor",
      nOriginal: "504086689",
      aplicacao: "Mangueira de Intercooler (Gomo)",
      aplicacaoNotas: ["Motor Cursor", "c/ anéis metálicos"],
      medidas: "Ø 75 mm",
      material: "Silicone c/ reforço têxtil",
      unidade: "PÇ",
      peso: "0,360 Kg",
      grupo: "052 – Interc. Iveco",
    },
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
    montadora: "Iveco",
    lines: ["diesel", "pesada"],
    images: ["/produtos/6000.jpg"],
    ficha: {
      montadora: "Iveco Daily / Stralis",
      nOriginal: "Sob consulta",
      aplicacao: "Mangueira de Respiro do Motor",
      aplicacaoNotas: ["Silicone azul premium"],
      medidas: "Ø 18 mm",
      material: "Silicone premium",
      unidade: "PÇ",
      peso: "0,120 Kg",
      grupo: "051 – Silicone Iveco",
    },
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
    montadora: "Universal",
    lines: ["diesel", "pesada"],
    images: ["/produtos/1000.jpg"],
    ficha: {
      montadora: "Universal",
      aplicacao: "Abraçadeira Rosca Sem Fim (Micro)",
      medidas: "10–16 mm",
      material: "Aço zincado",
      unidade: "PÇ",
      peso: "0,015 Kg",
      grupo: "001 – Abraçadeiras",
    },
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
    montadora: "Universal",
    lines: ["diesel", "pesada"],
    images: ["/produtos/1001.jpg"],
    ficha: {
      montadora: "Universal",
      aplicacao: "Abraçadeira Rosca Sem Fim",
      medidas: "14–22 mm",
      material: "Aço zincado",
      unidade: "PÇ",
      peso: "0,020 Kg",
      grupo: "001 – Abraçadeiras",
    },
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
      "Abraçadeira tipo rosca sem fim para mangueiras de 19 a 27 mm. Indicada para linhas de arrefecimento, ar e combustível em veículos da linha diesel.",
    category: "abracadeiras",
    montadora: "Universal",
    lines: ["diesel", "pesada"],
    images: ["/produtos/1002.jpg"],
    ficha: {
      montadora: "Universal",
      aplicacao: "Abraçadeira Rosca Sem Fim",
      medidas: "19–27 mm",
      material: "Aço zincado",
      unidade: "PÇ",
      peso: "0,028 Kg",
      grupo: "001 – Abraçadeiras",
    },
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
    montadora: "Universal",
    lines: ["diesel", "pesada"],
    images: ["/produtos/1004.jpg"],
    ficha: {
      montadora: "Universal",
      aplicacao: "Abraçadeira Rosca Sem Fim",
      medidas: "32–44 mm",
      material: "Aço zincado",
      unidade: "PÇ",
      peso: "0,045 Kg",
      grupo: "001 – Abraçadeiras",
    },
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
    montadora: "Universal",
    lines: ["diesel", "pesada"],
    images: ["/produtos/1029.jpg"],
    ficha: {
      montadora: "Universal",
      aplicacao: "Abraçadeira Rosca Sem Fim (Inox)",
      medidas: "22–32 mm",
      material: "Aço inox",
      unidade: "PÇ",
      peso: "0,032 Kg",
      grupo: "001 – Abraçadeiras",
    },
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
    montadora: "Universal",
    lines: ["diesel", "pesada"],
    images: ["/produtos/1049.jpg"],
    ficha: {
      montadora: "Universal (Linha Pesada)",
      aplicacao: "Abraçadeira V-Band da Turbina",
      aplicacaoNotas: ["Turbina / escapamento"],
      medidas: 'Ø 3"',
      material: "Aço",
      unidade: "PÇ",
      peso: "0,180 Kg",
      grupo: "002 – Abraç. V-Band",
    },
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
    montadora: "Universal",
    lines: ["diesel", "pesada"],
    images: ["/produtos/1054.jpg"],
    ficha: {
      montadora: "Universal (Linha Pesada)",
      aplicacao: "Abraçadeira Estampada com Trava",
      medidas: "Ø 100 mm",
      material: "Aço zincado",
      unidade: "PÇ",
      peso: "0,210 Kg",
      grupo: "003 – Abraç. Estampada",
    },
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
    montadora: "Universal",
    lines: ["diesel", "pesada"],
    images: ["/produtos/1055.jpg"],
    ficha: {
      montadora: "Universal (Linha Pesada)",
      aplicacao: "Abraçadeira Estampada com Trava",
      medidas: "Ø 110 mm",
      material: "Aço zincado",
      unidade: "PÇ",
      peso: "0,235 Kg",
      grupo: "003 – Abraç. Estampada",
    },
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
    montadora: "Universal",
    lines: ["diesel", "pesada"],
    images: ["/produtos/1056.jpg"],
    ficha: {
      montadora: "Universal (Linha Pesada)",
      aplicacao: "Abraçadeira Estampada com Trava",
      medidas: "Ø 120 mm",
      material: "Aço zincado",
      unidade: "PÇ",
      peso: "0,260 Kg",
      grupo: "003 – Abraç. Estampada",
    },
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
      "Jogo completo de juntas e anéis para retífica do motor — sob consulta.",
    description:
      "Kit completo de juntas do motor com juntas de tampa, carcaça e anéis o-ring. Como as especificações variam por motor, este item é fornecido sob consulta: fale com nossa equipe informando o modelo do veículo/motor.",
    category: "juntas-vedacao",
    montadora: "Universal",
    lines: ["diesel", "pesada"],
    images: ["/produtos/4013.jpg"],
    ficha: {
      montadora: "Diversas (consultar motor)",
      aplicacao: "Kit de Juntas do Motor",
      aplicacaoNotas: ["Sob consulta — informar motor"],
      material: "Multimaterial",
      unidade: "KIT",
      grupo: "040 – Juntas & Vedação",
    },
    relatedCodes: ["4014", "5000", "2000"],
    inStock: true,
    createdAt: "2026-06-15",
  },

  // ─────────────── Acessórios ───────────────
  {
    code: "4014",
    slug: "coxim-borracha-radiador",
    name: "Coxim de Borracha do Radiador",
    shortDescription: "Amortece vibrações e protege a fixação do radiador.",
    description:
      "Coxim de borracha para fixação do radiador. Absorve vibrações do chassi, evitando trincas e desgaste prematuro do radiador e das mangueiras.",
    category: "acessorios",
    montadora: "Universal",
    lines: ["diesel", "pesada"],
    images: ["/produtos/4014.jpg"],
    ficha: {
      montadora: "Diversas (consultar)",
      aplicacao: "Coxim de Borracha do Radiador",
      aplicacaoNotas: ["Fixação do radiador"],
      material: "Borracha de alta densidade",
      unidade: "PÇ",
      peso: "0,060 Kg",
      grupo: "042 – Acessórios",
    },
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
