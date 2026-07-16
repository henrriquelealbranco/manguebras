/**
 * Montadoras/marcas atendidas pela Manguebras — lista mestre.
 *
 * Extraída da organização do site atual do cliente (barra "Categorias de
 * produto"). É a fonte de verdade para a navegação por montadora (home,
 * mega-menu, filtros). Produtos referenciam a montadora pelo `name`.
 *
 * Enquanto o catálogo completo do ERP não chega, várias montadoras ainda
 * não têm produtos cadastrados — aparecem na navegação e populam com a
 * importação da planilha.
 */
export interface Montadora {
  slug: string;
  name: string;
}

export const MONTADORAS: Montadora[] = [
  { slug: "agrale", name: "Agrale" },
  { slug: "asia-motors", name: "Asia Motors" },
  { slug: "bmw", name: "BMW" },
  { slug: "chevrolet", name: "Chevrolet" },
  { slug: "citroen-peugeot", name: "Citroën / Peugeot" },
  { slug: "daf", name: "DAF" },
  { slug: "dodge-ram", name: "Dodge RAM" },
  { slug: "fiat", name: "Fiat" },
  { slug: "ford", name: "Ford" },
  { slug: "foton", name: "Foton" },
  { slug: "hyundai", name: "Hyundai" },
  { slug: "hyster", name: "Hyster" },
  { slug: "international", name: "International" },
  { slug: "iveco", name: "Iveco" },
  { slug: "kia", name: "Kia" },
  { slug: "land-rover", name: "Land Rover" },
  { slug: "mercedes-benz", name: "Mercedes-Benz" },
  { slug: "mitsubishi", name: "Mitsubishi" },
  { slug: "nissan", name: "Nissan" },
  { slug: "randon", name: "Randon" },
  { slug: "renault", name: "Renault" },
  { slug: "scania", name: "Scania" },
  { slug: "sinotruk", name: "Sinotruk" },
  { slug: "toyota", name: "Toyota" },
  { slug: "troller", name: "Troller" },
  { slug: "volare", name: "Volare" },
  { slug: "volksbus", name: "VolksBus" },
  { slug: "volkswagen", name: "Volkswagen" },
  { slug: "volvo", name: "Volvo" },
  { slug: "yale", name: "Yale" },
];

export function getMontadora(slug: string): Montadora | undefined {
  return MONTADORAS.find((m) => m.slug === slug);
}
