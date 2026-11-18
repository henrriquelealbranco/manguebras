import { readFileSync, readdirSync } from 'node:fs';
import { resolve, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import sharp from 'sharp';

// Offline and read-only: stdout is the report; nonzero exit means unresolved photos.
export async function auditPhotos(products, root) {
  const issues = [], files = new Map(), used = new Set(), directories = new Map();
  let validProducts = 0, references = 0;
  for (const product of products) {
    let valid = 0;
    const fail = (kind, url, detail) => issues.push({ code: product.code, name: product.name, kind, url, detail });
    if (!Array.isArray(product.images) || !product.images.length) fail('empty', null, 'No image reference in catalog');
    for (const url of product.images || []) {
      references++;
      if (typeof url !== 'string' || !url.startsWith('/produtos/')) {
        fail('remote-unverified', url, 'Not a local product URL; no network requests made'); continue;
      }
      let relative;
      try { relative = decodeURIComponent(url); } catch { fail('unsafe-path', url, 'Malformed URL encoding'); continue; }
      if (relative.includes('\\') || relative.includes('?') || relative.includes('#') || relative.split('/').includes('..')) {
        fail('unsafe-path', url, 'Path traversal or non-static path'); continue;
      }
      const path = resolve(root, 'public', '.' + relative);
      let entries;
      if (!directories.has(dirname(path))) {
        try { directories.set(dirname(path), readdirSync(dirname(path))); } catch { directories.set(dirname(path), []); }
      }
      entries = directories.get(dirname(path));
      if (!entries.includes(basename(path))) {
        const similar = entries.find(n => n.normalize('NFC').toLowerCase() === basename(path).normalize('NFC').toLowerCase());
        fail(similar ? 'case-or-unicode' : 'missing', url, similar || 'File not found'); continue;
      }
      used.add(basename(path));
      if (!files.has(path)) {
        try {
          const bytes = readFileSync(path);
          const metadata = await sharp(bytes, { failOn: 'warning' }).metadata();
          // Force full pixel decoding, not just a permissive header check.
          await sharp(bytes, { failOn: 'warning' }).raw().toBuffer();
          if (!metadata.width || !metadata.height) throw new Error('No dimensions');
          const extension = basename(path).split('.').pop().toLowerCase();
          if (!({ jpg: 'jpeg', jpeg: 'jpeg', png: 'png', webp: 'webp', avif: 'avif', gif: 'gif' }[extension] === metadata.format)) throw new Error('Extension/content mismatch');
          files.set(path, { file: relative, bytes: bytes.length, format: metadata.format, width: metadata.width, height: metadata.height, sha256: createHash('sha256').update(bytes).digest('hex') });
        } catch (error) { files.set(path, { file: relative, error: error.message }); }
      }
      if (files.get(path).error) fail('invalid', url, files.get(path).error);
      else valid++;
    }
    if (valid) validProducts++;
  }
  const inventory = readdirSync(resolve(root, 'public/produtos'), { withFileTypes: true }).filter(f => f.isFile()).map(f => f.name);
  return {
    summary: { products: products.length, references, productsWithValidLocalPhotos: validProducts, productsWithoutValidLocalPhotos: products.length - validProducts, files: inventory.length, decodedFiles: [...files.values()].filter(f => !f.error).length, issues: issues.length },
    issues, unreferencedFiles: inventory.filter(f => !used.has(f)), files: [...files.values()],
  };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
  const report = await auditPhotos(JSON.parse(readFileSync(resolve(root, 'src/data/products.gen.json'), 'utf8')), root);
  console.log(JSON.stringify(report, null, 2));
  process.exitCode = report.issues.length ? 1 : 0;
}
