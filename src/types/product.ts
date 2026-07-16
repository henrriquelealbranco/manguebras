/**
 * Modelo de dados do CATÁLOGO VIRTUAL Manguebras (não é e-commerce).
 *
 * A Manguebras é distribuidora e não vende online. O site apresenta a peça
 * (foto + ficha técnica) e a conversão acontece por consulta ao representante.
 *
 * A organização segue o site atual do cliente: o cliente navega por
 * MONTADORA (marca do veículo) e por CATEGORIA (tipo de peça).
 */

export type CategorySlug =
  | "mangueiras-radiador"
  | "mangueiras-intercooler"
  | "mangueiras-moldadas"
  | "mangueiras-silicone"
  | "abracadeiras"
  | "juntas-vedacao"
  | "conexoes"
  | "acessorios";

/**
 * Linha de aplicação. A Manguebras trabalha apenas a linha diesel/pesada
 * (caminhões, pickups e vans) — NÃO trabalha linha leve.
 */
export type ProductLine = "diesel" | "pesada";

export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
  /** Foto de capa (código SKU de um produto representativo) */
  image: string;
  /** Faixa de códigos SKU correspondente no acervo de fotos */
  skuRange: string;
}

/**
 * Ficha técnica no formato do site atual do cliente — pensada para o vendedor
 * tirar um print e enviar ao cliente. A ordem dos campos espelha a tabela
 * "DESCRIÇÃO" usada pela Manguebras.
 */
export interface FichaTecnica {
  /** Montadora + série/modelo. Ex.: "Scania Série 4 / 124" */
  montadora: string;
  /** Número(s) de referência original (OEM). Ex.: "1524925 | 1442181" */
  nOriginal?: string;
  /** Aplicação da peça. Ex.: "Mangueira Inferior do Radiador" */
  aplicacao: string;
  /** Observações extras da aplicação (motor, variações). */
  aplicacaoNotas?: string[];
  /** Medidas/diâmetros. Ex.: "Ø 55 mm" */
  medidas?: string;
  /** Material. Ex.: "Borracha EPDM", "Silicone", "Aço zincado" */
  material: string;
  /** Unidade de venda. Ex.: "PÇ", "KIT" */
  unidade: string;
  /** Peso unitário. Ex.: "0,540 Kg" */
  peso?: string;
  /** Grupo no catálogo. Ex.: "011 – Mang. Scania" */
  grupo?: string;
}

export interface Product {
  /** Código SKU Manguebras — bate com o nome do arquivo da foto */
  code: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  category: CategorySlug;
  /** Montadora/marca para navegação e filtro. Ex.: "Scania", "Universal" */
  montadora: string;
  lines: ProductLine[];
  /** Caminhos das imagens em /public/produtos */
  images: string[];
  /** Ficha técnica exibida na página do produto (formato do cliente) */
  ficha: FichaTecnica;
  /** Códigos de produtos frequentemente relacionados */
  relatedCodes: string[];
  inStock: boolean;
  featured?: boolean;
  createdAt: string;
}
