import { writeFileSync, readFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const JSON_PATH = join(ROOT, "src", "data", "products.gen.json");
const PUBLIC_DIR = join(ROOT, "public", "produtos");
const BASE = "https://manguebras.com.br/wp-json/wc/store/v1/products";
const PER_PAGE = 100;

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function extractCode(name, slug) {
  if (!name) return null;
  const match = name.match(/^(\d+)\s*[–-]/) || (slug || "").match(/^(\d+)-/);
  return match ? match[1] : null;
}

async function fetchPage(page) {
  const url = `${BASE}?per_page=${PER_PAGE}&page=${page}`;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(url, { headers: { "User-Agent": "ManguebrasDownloader/1.0" } });
      if (res.ok) {
        return await res.json();
      }
      console.warn(`Página ${page} retornou status ${res.status}. Tentativa ${attempt}/3...`);
    } catch (err) {
      console.warn(`Erro na página ${page}: ${err.message}. Tentativa ${attempt}/3...`);
    }
    await sleep(1500 * attempt);
  }
  return [];
}

async function fetchAllRemoteProducts() {
  console.log("▶ Verificando total de páginas na API do site antigo...");
  const firstRes = await fetch(`${BASE}?per_page=${PER_PAGE}&page=1`);
  const totalPages = Number(firstRes.headers.get("X-WP-TotalPages") || "38");
  const total = Number(firstRes.headers.get("X-WP-Total") || "3707");
  console.log(`Total reportado: ${total} produtos em ${totalPages} páginas.`);

  const firstBatch = await firstRes.json();
  let all = [...firstBatch];

  // Baixa as páginas restantes em lotes de 4 concorrentes
  for (let p = 2; p <= totalPages; p += 4) {
    const batchPages = [];
    for (let i = 0; i < 4 && p + i <= totalPages; i++) {
      batchPages.push(p + i);
    }
    const results = await Promise.all(batchPages.map((pg) => fetchPage(pg)));
    for (const r of results) {
      all = all.concat(r);
    }
    process.stdout.write(`  Carregadas ${Math.min(p + 3, totalPages)}/${totalPages} páginas...\r`);
    await sleep(300);
  }
  console.log(`\n✔ Total de ${all.length} produtos carregados do site antigo.`);
  return all;
}

async function downloadImage(url, destPath) {
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(url);
      if (res.ok) {
        const buffer = Buffer.from(await res.arrayBuffer());
        if (buffer.length > 500) { // arquivo válido não vazio
          writeFileSync(destPath, buffer);
          return true;
        }
      }
    } catch (err) {
      // ignore retry
    }
    await sleep(500 * attempt);
  }
  return false;
}

async function run() {
  mkdirSync(PUBLIC_DIR, { recursive: true });

  const products = JSON.parse(readFileSync(JSON_PATH, "utf-8"));
  console.log(`Carregados ${products.length} produtos locais.`);

  // Identifica produtos sem imagem ou com arquivo ausente
  const missing = [];
  for (const p of products) {
    let hasLocalFile = false;
    if (p.images && p.images.length > 0) {
      const imgPath = join(PUBLIC_DIR, `${p.code}.jpg`);
      if (existsSync(imgPath)) {
        hasLocalFile = true;
      }
    }
    if (!hasLocalFile) {
      missing.push(p);
    }
  }

  console.log(`Produtos locais sem foto: ${missing.length}`);
  if (missing.length === 0) {
    console.log("Todos os produtos já possuem fotos válidas!");
    return;
  }

  // Busca catálogo antigo completo
  const remote = await fetchAllRemoteProducts();

  // Mapeia código -> lista de URLs de imagem
  const codeToImages = new Map();
  for (const r of remote) {
    const code = extractCode(r.name, r.slug);
    if (code && r.images && r.images.length > 0) {
      const validUrls = r.images.map((img) => img.src).filter(Boolean);
      if (validUrls.length > 0) {
        codeToImages.set(code, validUrls);
      }
    }
  }

  console.log(`Total de produtos remotos com imagens encontradas: ${codeToImages.size}`);

  // Baixa fotos para os produtos faltantes
  let downloadedCount = 0;
  let stillMissing = [];

  const queue = missing.filter((p) => codeToImages.has(p.code));
  console.log(`Encontradas fotos remotas para ${queue.length} produtos dos ${missing.length} faltantes.`);

  const CONCURRENCY = 8;
  for (let i = 0; i < queue.length; i += CONCURRENCY) {
    const chunk = queue.slice(i, i + CONCURRENCY);
    await Promise.all(
      chunk.map(async (prod) => {
        const urls = codeToImages.get(prod.code);
        const mainUrl = urls[0];
        const dest = join(PUBLIC_DIR, `${prod.code}.jpg`);
        const ok = await downloadImage(mainUrl, dest);
        if (ok) {
          downloadedCount++;
          prod.images = [`/produtos/${prod.code}.jpg`];
        } else {
          stillMissing.push(prod.code);
        }
      })
    );
    process.stdout.write(`  Baixadas ${downloadedCount}/${queue.length} fotos...\r`);
  }

  console.log(`\n✔ Download finalizado: ${downloadedCount} novas fotos salvas em public/produtos/`);

  // Atualiza o JSON
  writeFileSync(JSON_PATH, JSON.stringify(products, null, 2), "utf-8");
  console.log("✔ products.gen.json atualizado!");

  // Verificação final
  let totalWithImages = 0;
  let totalWithoutImages = 0;
  const noPhotoCodes = [];
  for (const p of products) {
    const dest = join(PUBLIC_DIR, `${p.code}.jpg`);
    if (existsSync(dest) && p.images && p.images.length > 0) {
      totalWithImages++;
    } else {
      totalWithoutImages++;
      noPhotoCodes.push(p.code);
    }
  }

  console.log("==========================================");
  console.log(`RELATÓRIO FINAL:`);
  console.log(`Total de produtos no catálogo: ${products.length}`);
  console.log(`Produtos com foto comprovada: ${totalWithImages}`);
  console.log(`Produtos sem foto: ${totalWithoutImages}`);
  if (totalWithoutImages > 0) {
    console.log(`Códigos dos produtos sem foto (nem no site antigo tinham):`, noPhotoCodes.slice(0, 30));
  }
  console.log("==========================================");
}

run().catch(console.error);
