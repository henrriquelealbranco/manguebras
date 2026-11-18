import { writeFileSync, readFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { auditPhotos } from "./audit-photos.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const JSON_PATH = join(ROOT, "src", "data", "products.gen.json");
const PUBLIC_DIR = join(ROOT, "public", "produtos");
const BASE = "https://manguebras.com.br/wp-json/wc/store/v1/products";
const PER_PAGE = 100;

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

export function officialCode({ name, slug }) {
  const n = (name || '').match(/^(\d+)\s*[–—-]/)?.[1];
  const s = (slug || '').match(/^(\d+)-/)?.[1];
  return n && s && n !== s ? null : n || s || null;
}

export async function validatePhotoBytes(bytes) {
  const image = sharp(bytes, { failOn: 'warning' });
  const meta = await image.metadata();
  if (!['jpeg', 'png', 'webp', 'avif'].includes(meta.format) || !meta.width || !meta.height) throw new Error('Invalid photo');
  return image.jpeg({ quality: 95 }).toBuffer();
}

let lastRequest = 0;
async function officialFetch(value) {
  const url = new URL(value);
  if (url.protocol !== 'https:' || !(url.hostname === 'manguebras.com.br' || url.hostname.endsWith('.manguebras.com.br'))) throw new Error('Not an official HTTPS source');
  await sleep(Math.max(0, 1000 - (Date.now() - lastRequest)));
  lastRequest = Date.now();
  return fetch(url, { signal: AbortSignal.timeout(15000), redirect: 'error' });
}

async function fetchPage(page) {
  const url = `${BASE}?per_page=${PER_PAGE}&page=${page}`;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await officialFetch(url);
      if (res.ok) {
        return await res.json();
      }
      console.warn(`Página ${page} retornou status ${res.status}. Tentativa ${attempt}/3...`);
    } catch (err) {
      console.warn(`Erro na página ${page}: ${err.message}. Tentativa ${attempt}/3...`);
    }
    await sleep(1500 * attempt);
  }
  throw new Error(`Page ${page} unavailable: refusing incomplete catalog`);
}

async function fetchAllRemoteProducts() {
  console.log("▶ Verificando total de páginas na API do site antigo...");
  const cachePath = join(ROOT, 'scripts', '.cache-photos-catalog.json');
  if (existsSync(cachePath)) {
    const cache = JSON.parse(readFileSync(cachePath, 'utf8'));
    if (cache.source === BASE && Array.isArray(cache.products) && cache.products.length === cache.total) return cache.products;
  }
  const firstRes = await officialFetch(`${BASE}?per_page=${PER_PAGE}&page=1`);
  if (!firstRes.ok) throw new Error(`Official API HTTP ${firstRes.status}; source unavailable, not proof of absent photos`);
  const totalPages = Number(firstRes.headers.get("X-WP-TotalPages"));
  const total = Number(firstRes.headers.get("X-WP-Total"));
  if (!Number.isInteger(totalPages) || totalPages < 1 || totalPages > 100) throw new Error('Invalid API pagination');
  console.log(`Total reportado: ${total} produtos em ${totalPages} páginas.`);

  const firstBatch = await firstRes.json();
  if (!Array.isArray(firstBatch)) throw new Error('Invalid API catalog');
  let all = [...firstBatch];

  // Sequential requests; no concurrent pressure on the legacy server.
  for (let p = 2; p <= totalPages; p += 1) {
    const batchPages = [];
    for (let i = 0; i < 1 && p + i <= totalPages; i++) {
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
  if (all.length !== total) throw new Error('Incomplete API catalog');
  writeFileSync(cachePath, JSON.stringify({ source: BASE, checkedAt: new Date().toISOString(), total, products: all }));
  return all;
}

async function downloadImage(url, destPath) {
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await officialFetch(url);
      if (res.ok && res.headers.get('content-type')?.startsWith('image/')) {
        const buffer = Buffer.from(await res.arrayBuffer());
        if (buffer.length > 0 && buffer.length <= 10000000) {
          const validated = await validatePhotoBytes(buffer);
          writeFileSync(destPath, validated);
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
  const before = await auditPhotos(products, ROOT);
  const problemCodes = new Set(before.issues.map(i => i.code));
  const missing = products.filter(p => problemCodes.has(p.code));
  console.log('Audit before:', JSON.stringify(before.summary));

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
    const code = officialCode(r);
    if (code && r.images && r.images.length > 0) {
      const validUrls = r.images.map((img) => img.src).filter(Boolean);
      if (validUrls.length > 0) {
        // Duplicate official codes are ambiguous: never select a similar piece.
        codeToImages.set(code, codeToImages.has(code) ? [] : validUrls);
      }
    }
  }

  console.log(`Total de produtos remotos com imagens encontradas: ${codeToImages.size}`);

  // Baixa fotos para os produtos faltantes
  let downloadedCount = 0;
  let stillMissing = [];

  const queue = missing.filter((p) => codeToImages.get(p.code)?.length);
  console.log(`Encontradas fotos remotas para ${queue.length} produtos dos ${missing.length} faltantes.`);

  console.log(JSON.stringify({ estimatedBytes: queue.length * 150000, estimateBasis: '150KB per image, not measured', codes: queue.map(p => p.code) }));
  if (!process.argv.includes('--apply')) {
    console.log('Dry run only. Review estimate before --apply. Unresolved:', missing.filter(p => !queue.includes(p)).map(p => p.code));
    process.exitCode = missing.length ? 1 : 0;
    return;
  }
  if (queue.length > 50 && !process.argv.includes('--allow-large-download')) throw new Error('Large download requires --allow-large-download after estimate review');
  const CONCURRENCY = 1;
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
  const after = await auditPhotos(products, ROOT);
  const totalWithImages = after.summary.productsWithValidLocalPhotos;
  const totalWithoutImages = after.summary.productsWithoutValidLocalPhotos;
  const noPhotoCodes = [...new Set(after.issues.map(i => i.code))];

  console.log("==========================================");
  console.log(`RELATÓRIO FINAL:`);
  console.log(`Total de produtos no catálogo: ${products.length}`);
  console.log(`Produtos com foto comprovada: ${totalWithImages}`);
  console.log(`Produtos sem foto: ${totalWithoutImages}`);
  if (totalWithoutImages > 0) {
    console.log(`Códigos ainda sem foto comprovada (não implica ausência no acervo oficial):`, noPhotoCodes);
  }
  console.log("==========================================");
  process.exitCode = after.issues.length ? 1 : 0;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  run().catch(error => { console.error(error.message); process.exitCode = 1; });
}
