/**
 * Importa o catálogo COMPLETO do site antigo (manguebras.com.br, WooCommerce)
 * via API pública Store API, casa com as fotos já baixadas do acervo local,
 * e gera src/data/products.gen.ts no formato atual do Product/FichaTecnica.
 *
 * Uso: node scripts/scrape-catalogo-antigo.mjs
 */
import { readdirSync, existsSync, copyFileSync, mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(import.meta.dirname, "..");
const FOTOS_DIR = join(ROOT, "_materiais", "fotos", "Fotos Produtos Manguebras", "JPG");
const PUBLIC_DIR = join(ROOT, "public", "produtos");
const OUT_PATH = join(ROOT, "src", "data", "products.gen.ts");
const OUT_JSON_PATH = join(ROOT, "src", "data", "products.gen.json");
const CACHE_PATH = join(ROOT, "scripts", ".cache-catalogo-bruto.json");

const BASE = "https://manguebras.com.br/wp-json/wc/store/v1/products";
const PER_PAGE = 100;

const VALID_CATEGORIES = [
  "mangueiras-radiador",
  "mangueiras-intercooler",
  "mangueiras-moldadas",
  "mangueiras-silicone",
  "abracadeiras",
  "juntas-vedacao",
  "conexoes",
  "acessorios",
];

const MONTADORAS_CONHECIDAS = [
  "Agrale", "Asia Motors", "BMW", "Chevrolet", "Citroën", "Peugeot", "DAF",
  "Dodge", "Fiat", "Ford", "Foton", "Hyundai", "Hyster", "International",
  "Iveco", "Kia", "Land Rover", "Mercedes-Benz", "Mitsubishi", "Nissan",
  "Randon", "Renault", "Scania", "Sinotruk", "Toyota", "Troller", "Volare",
  "VolksBus", "Volkswagen", "Volvo", "Yale", "Sprinter",
];

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

const NAMED_ENTITIES = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ",
  aacute: "á", Aacute: "Á", agrave: "à", Agrave: "À", acirc: "â", Acirc: "Â",
  atilde: "ã", Atilde: "Ã", auml: "ä", Auml: "Ä",
  eacute: "é", Eacute: "É", egrave: "è", Egrave: "È", ecirc: "ê", Ecirc: "Ê",
  euml: "ë", Euml: "Ë",
  iacute: "í", Iacute: "Í", igrave: "ì", Igrave: "Ì", icirc: "î", Icirc: "Î",
  oacute: "ó", Oacute: "Ó", ograve: "ò", Ograve: "Ò", ocirc: "ô", Ocirc: "Ô",
  otilde: "õ", Otilde: "Õ", ouml: "ö", Ouml: "Ö",
  uacute: "ú", Uacute: "Ú", ugrave: "ù", Ugrave: "Ù", ucirc: "û", Ucirc: "Û",
  uuml: "ü", Uuml: "Ü",
  ccedil: "ç", Ccedil: "Ç", ntilde: "ñ", Ntilde: "Ñ",
  ordm: "º", ordf: "ª", deg: "°", times: "×", divide: "÷",
  mdash: "—", ndash: "–", hellip: "…",
  lsquo: "'", rsquo: "'", ldquo: '"', rdquo: '"',
};

function decodeEntities(str) {
  if (!str) return "";
  return str
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(parseInt(dec, 10)))
    .replace(/&([a-zA-Z]+);/g, (m, name) => (name in NAMED_ENTITIES ? NAMED_ENTITIES[name] : m));
}

function slugify(text) {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function titleCase(str) {
  const lower = new Set(["de", "do", "da", "dos", "das", "e", "com", "para", "a", "o"]);
  return str
    .toLowerCase()
    .split(" ")
    .map((w, i) => {
      if (i > 0 && lower.has(w)) return w;
      if (/^[a-z]$/.test(w)) return w.toUpperCase();
      return w.charAt(0).toUpperCase() + w.slice(1);
    })
    .join(" ");
}

function parseDescription(html) {
  if (!html) return null;
  const text = decodeEntities(html.replace(/<[^>]+>/g, "|")).replace(/\|+/g, "|").trim();
  const grab = (label, nextLabels) => {
    const re = new RegExp(`${label}\\s*:\\s*\\|?([\\s\\S]*?)(?=\\|(?:${nextLabels.join("|")})\\s*:|$)`, "i");
    const m = text.match(re);
    return m ? m[1].replace(/\|/g, " ").replace(/\s+/g, " ").trim() : "";
  };
  const allLabels = [
    "MONTADORA", "N\\.ORIGINAL", "APLICA[ÇC][ÃA]O", "MEDIDAS", "MATERIAL",
    "UNIDADE", "PESO", "P[ÁA]GINA CAT[ÁA]LOGO", "GRUPO",
  ];
  const montadora = grab("MONTADORA", allLabels);
  const nOriginal = grab("N\\.ORIGINAL", allLabels);
  const aplicacaoRaw = grab("APLICA[ÇC][ÃA]O", allLabels);
  const medidas = grab("MEDIDAS", allLabels);
  const material = grab("MATERIAL", allLabels);
  const unidade = grab("UNIDADE", allLabels);
  const peso = grab("PESO", allLabels);

  const aplicacaoParts = aplicacaoRaw.split(/\s{2,}|(?<=[a-z0-9])\s(?=[A-Z0-9][a-z0-9]*\/|Motor\b)/).map((s) => s.trim()).filter(Boolean);
  const aplicacao = aplicacaoParts[0] || aplicacaoRaw;
  const aplicacaoNotas = aplicacaoParts.slice(1);

  return { montadora, nOriginal, aplicacao, aplicacaoNotas, medidas, material, unidade, peso };
}

function pickCategorySlug({ aplicacao, material, subcats }) {
  const hay = `${aplicacao} ${material} ${subcats.join(" ")}`.toUpperCase();
  if (/ABRA[ÇC]ADEIRA/.test(hay)) return "abracadeiras";
  if (/JUNTA|VEDA[ÇC][ÃA]O|ANEL|CASTANHA|RETENTOR/.test(hay)) return "juntas-vedacao";
  if (/CONEX[ÃA]O|CONEX[ÕO]ES|V[ÁA]LVULA/.test(hay)) return "conexoes";
  if (/INTERCOOLER|TURBINA|TURBO/.test(hay)) return "mangueiras-intercooler";
  if (/RADIADOR/.test(hay)) return "mangueiras-radiador";
  if (/SILICONE/.test(hay)) return "mangueiras-silicone";
  if (/MANGUEIRA/.test(hay)) return "mangueiras-moldadas";
  return "acessorios";
}

function pickMontadora(categories) {
  if (!categories || !categories.length) return "Universal";
  const top = decodeEntities(categories[0]?.name || "");
  for (const m of MONTADORAS_CONHECIDAS) {
    if (top.toUpperCase().startsWith(m.toUpperCase())) return m;
  }
  // pega a primeira palavra "significativa" como fallback
  const firstWord = top.split(/[\s/]/)[0];
  return titleCase(firstWord || "Universal");
}

async function fetchAllProducts() {
  if (existsSync(CACHE_PATH)) {
    console.log("↺ Usando cache local de", CACHE_PATH);
    return JSON.parse(readFileSync(CACHE_PATH, "utf-8"));
  }
  const first = await fetch(`${BASE}?per_page=${PER_PAGE}&page=1`);
  const totalPages = Number(first.headers.get("X-WP-TotalPages") || "1");
  const total = Number(first.headers.get("X-WP-Total") || "0");
  console.log(`Total: ${total} produtos em ${totalPages} páginas`);
  let all = await first.json();
  for (let page = 2; page <= totalPages; page++) {
    await sleep(350);
    const res = await fetch(`${BASE}?per_page=${PER_PAGE}&page=${page}`);
    if (!res.ok) {
      console.warn(`  ⚠ página ${page} falhou (${res.status}), tentando de novo em 3s...`);
      await sleep(3000);
      const retry = await fetch(`${BASE}?per_page=${PER_PAGE}&page=${page}`);
      all = all.concat(await retry.json());
      continue;
    }
    const batch = await res.json();
    all = all.concat(batch);
    console.log(`  página ${page}/${totalPages} ok (${all.length} acumulados)`);
  }
  writeFileSync(CACHE_PATH, JSON.stringify(all), "utf-8");
  return all;
}

async function main() {
  const raw = await fetchAllProducts();
  console.log(`✔ ${raw.length} produtos brutos recebidos`);

  mkdirSync(PUBLIC_DIR, { recursive: true });
  const fotosDisponiveis = new Set(
    existsSync(FOTOS_DIR) ? readdirSync(FOTOS_DIR).map((f) => f.replace(/\.jpe?g$/i, "")) : [],
  );

  const byCode = new Map();
  const semSpec = [];
  const semFoto = [];

  for (const p of raw) {
    const nameDecoded = decodeEntities(p.name || "");
    const codeMatch = nameDecoded.match(/^(\d+)\s*[–-]/) || (p.slug || "").match(/^(\d+)-/);
    const code = codeMatch ? codeMatch[1] : null;
    if (!code) continue;

    const spec = parseDescription(p.description);
    if (!spec || !spec.montadora) {
      semSpec.push(code);
    }

    const subcats = (p.categories || []).slice(1).map((c) => decodeEntities(c.name));
    const topCatName = decodeEntities(p.categories?.[0]?.name || "");
    const rawTitle = nameDecoded.replace(/^\d+\s*[–-]\s*/, "").trim();
    const niceName = titleCase(rawTitle.toLowerCase());
    const montadora = pickMontadora(p.categories);
    const aplicacao = spec?.aplicacao || rawTitle;
    const category = pickCategorySlug({
      aplicacao,
      material: spec?.material || "",
      subcats: [...subcats, topCatName],
    });

    const hasFoto = fotosDisponiveis.has(code);
    if (!hasFoto) semFoto.push(code);

    const fichaMontadora = [montadora, ...(spec?.aplicacaoNotas || []).filter((n) => /^[A-Z0-9]/.test(n) && !/^Motor\b/i.test(n))]
      .filter(Boolean)
      .slice(0, 1)
      .join(" ") || montadora;

    const grupoParts = [subcats[0], topCatName].filter(Boolean);
    const grupo = grupoParts.length ? grupoParts.join(" – ") : undefined;

    const product = {
      code,
      slug: slugify(`${niceName}-${code}`),
      name: `${niceName} ${montadora}`.trim(),
      shortDescription: `${niceName} — ${montadora}${spec?.medidas ? `, ${spec.medidas}` : ""}.`,
      description: `${niceName} para ${montadora}${aplicacao && aplicacao !== niceName ? ` — ${aplicacao}` : ""}.${(spec?.aplicacaoNotas || []).length ? " " + spec.aplicacaoNotas.join(", ") + "." : ""}`,
      category,
      montadora,
      lines: ["diesel", "pesada"],
      images: hasFoto ? [`/produtos/${code}.jpg`] : [],
      ficha: {
        montadora: spec?.montadora ? decodeEntities(spec.montadora) : montadora,
        nOriginal: spec?.nOriginal || undefined,
        aplicacao: aplicacao || niceName,
        aplicacaoNotas: (spec?.aplicacaoNotas || []).filter(Boolean),
        medidas: spec?.medidas || undefined,
        material: spec?.material || "Não informado",
        unidade: spec?.unidade || "PÇ",
        peso: spec?.peso || undefined,
        grupo,
      },
      relatedCodes: [],
      inStock: true,
      createdAt: new Date().toISOString().slice(0, 10),
    };

    byCode.set(code, product);
  }

  // copia fotos disponíveis
  let copiadas = 0;
  for (const [code, prod] of byCode) {
    if (!prod.images.length) continue;
    const dest = join(PUBLIC_DIR, `${code}.jpg`);
    if (!existsSync(dest)) {
      const src = join(FOTOS_DIR, `${code}.jpg`);
      if (existsSync(src)) {
        copyFileSync(src, dest);
        copiadas++;
      }
    }
  }

  const products = Array.from(byCode.values()).sort((a, b) => a.code.localeCompare(b.code, "pt", { numeric: true }));

  // marca alguns destaques (com foto, variando montadora) pra seção da home
  const montadorasVistas = new Set();
  let destacados = 0;
  for (const p of products) {
    if (destacados >= 16) break;
    if (!p.images.length) continue;
    if (montadorasVistas.has(p.montadora)) continue;
    p.featured = true;
    montadorasVistas.add(p.montadora);
    destacados++;
  }

  writeFileSync(OUT_JSON_PATH, JSON.stringify(products), "utf-8");

  const wrapper = `/**
 * GERADO por scripts/scrape-catalogo-antigo.mjs — NÃO EDITAR À MÃO.
 * Fonte: manguebras.com.br (WooCommerce Store API), ${new Date().toISOString().slice(0, 10)}
 * ${products.length} produtos, ${products.filter((p) => p.images.length).length} com foto.
 *
 * Os dados ficam em products.gen.json (array puro) — importados aqui via
 * JSON para não estourar o verificador de tipos do TypeScript com um
 * literal de milhares de objetos.
 */
import type { Product } from "@/types/product";
import raw from "./products.gen.json";

export const PRODUCTS_GERADOS = raw as unknown as Product[];
`;

  writeFileSync(OUT_PATH, wrapper, "utf-8");

  console.log(`\n✔ ${products.length} produtos gerados em src/data/products.gen.ts`);
  console.log(`✔ ${copiadas} fotos copiadas para public/produtos/`);
  console.log(`⚠ ${semFoto.length} produtos sem foto no acervo`);
  console.log(`⚠ ${semSpec.length} produtos sem ficha técnica reconhecida`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
