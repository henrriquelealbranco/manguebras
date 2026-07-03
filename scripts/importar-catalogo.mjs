/**
 * Importador de catálogo Manguebras — planilha ERP → src/data/products.gen.ts
 *
 * Uso:
 *   node scripts/importar-catalogo.mjs caminho/para/planilha.csv
 *
 * Formato esperado do CSV (separador ; ou ,) com cabeçalho:
 *   codigo;nome;preco;categoria;linhas;descricao;aplicacao;relacionados
 *
 *   - codigo        → SKU (deve bater com a foto em public/produtos/{codigo}.jpg)
 *   - preco         → em reais ("189,90"); vazio = produto sob orçamento
 *   - categoria     → um dos slugs: mangueiras-radiador, mangueiras-intercooler,
 *                     mangueiras-moldadas, mangueiras-silicone, abracadeiras,
 *                     juntas-vedacao, conexoes, acessorios
 *   - linhas        → separadas por | (diesel|pesada|leve|agricola|industrial)
 *   - aplicacao     → ex.: "Scania 124 (1998-2007)"
 *   - relacionados  → códigos separados por | (opcional)
 *
 * O script também copia as fotos correspondentes do acervo
 * (_materiais/fotos/Fotos Produtos Manguebras/JPG) para public/produtos.
 */

import { readFileSync, writeFileSync, existsSync, copyFileSync } from "node:fs";
import { join } from "node:path";

const CSV_PATH = process.argv[2];
if (!CSV_PATH) {
  console.error("Uso: node scripts/importar-catalogo.mjs planilha.csv");
  process.exit(1);
}

const ROOT = join(import.meta.dirname, "..");
const FOTOS_DIR = join(
  ROOT,
  "_materiais",
  "fotos",
  "Fotos Produtos Manguebras",
  "JPG",
);
const PUBLIC_DIR = join(ROOT, "public", "produtos");
const OUT_PATH = join(ROOT, "src", "data", "products.gen.ts");

const VALID_CATEGORIES = new Set([
  "mangueiras-radiador",
  "mangueiras-intercooler",
  "mangueiras-moldadas",
  "mangueiras-silicone",
  "abracadeiras",
  "juntas-vedacao",
  "conexoes",
  "acessorios",
]);
const VALID_LINES = new Set([
  "diesel",
  "leve",
  "pesada",
  "agricola",
  "industrial",
]);

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

function parsePrice(raw) {
  const clean = String(raw ?? "").trim();
  if (!clean) return undefined;
  const cents = Math.round(
    parseFloat(clean.replace(/\./g, "").replace(",", ".")) * 100,
  );
  return Number.isFinite(cents) && cents > 0 ? cents : undefined;
}

// ── Parse CSV ────────────────────────────────────────────────
const raw = readFileSync(CSV_PATH, "utf-8").replace(/^﻿/, "");
const lines = raw.split(/\r?\n/).filter((l) => l.trim());
const sep = lines[0].includes(";") ? ";" : ",";
const header = lines[0].split(sep).map((h) => slugify(h));

const idx = (name) => header.indexOf(name);
for (const required of ["codigo", "nome", "categoria"]) {
  if (idx(required) === -1) {
    console.error(`Coluna obrigatória ausente no CSV: ${required}`);
    process.exit(1);
  }
}

const products = [];
const problems = [];

for (let i = 1; i < lines.length; i++) {
  const cols = lines[i].split(sep).map((c) => c.trim().replace(/^"|"$/g, ""));
  const get = (name) => (idx(name) >= 0 ? (cols[idx(name)] ?? "") : "");

  const code = get("codigo");
  const name = get("nome");
  const categoria = slugify(get("categoria"));

  if (!code || !name) {
    problems.push(`Linha ${i + 1}: código ou nome vazio — pulada`);
    continue;
  }
  if (!VALID_CATEGORIES.has(categoria)) {
    problems.push(`Linha ${i + 1} (${code}): categoria inválida "${categoria}" — pulada`);
    continue;
  }

  // Foto: copia do acervo se ainda não estiver em public/
  const publicPhoto = join(PUBLIC_DIR, `${code}.jpg`);
  if (!existsSync(publicPhoto)) {
    const sourcePhoto = join(FOTOS_DIR, `${code}.jpg`);
    if (existsSync(sourcePhoto)) {
      copyFileSync(sourcePhoto, publicPhoto);
    } else {
      problems.push(`(${code}) foto não encontrada no acervo — produto sem imagem`);
    }
  }

  const productLines = get("linhas")
    .split("|")
    .map((l) => slugify(l))
    .filter((l) => VALID_LINES.has(l));

  const aplicacao = get("aplicacao");

  products.push({
    code,
    slug: slugify(`${name} ${code}`),
    name,
    shortDescription: get("descricao") || name,
    description: get("descricao") || name,
    category: categoria,
    lines: productLines.length ? productLines : ["diesel"],
    images: [`/produtos/${code}.jpg`],
    priceCents: parsePrice(get("preco")),
    specs: [],
    applications: aplicacao ? [{ vehicle: aplicacao }] : [],
    relatedCodes: get("relacionados")
      ? get("relacionados").split("|").map((c) => c.trim()).filter(Boolean)
      : [],
    inStock: true,
    createdAt: new Date().toISOString().slice(0, 10),
  });
}

// ── Emit TypeScript ──────────────────────────────────────────
const banner = `/**
 * GERADO por scripts/importar-catalogo.mjs — NÃO EDITAR À MÃO.
 * Fonte: ${CSV_PATH.split(/[\\/]/).pop()}
 * Para usar: em src/data/products.ts, importe e exporte PRODUCTS daqui.
 */
import type { Product } from "@/types/product";

export const PRODUCTS_GERADOS: Product[] = `;

writeFileSync(
  OUT_PATH,
  banner + JSON.stringify(products, null, 2) + ";\n",
  "utf-8",
);

console.log(`✔ ${products.length} produtos gerados em src/data/products.gen.ts`);
if (problems.length) {
  console.log(`⚠ ${problems.length} avisos:`);
  problems.slice(0, 20).forEach((p) => console.log("  - " + p));
}
