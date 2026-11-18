import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import sharp from 'sharp';
import { auditPhotos } from '../scripts/audit-photos.mjs';
import { officialCode, validatePhotoBytes } from '../scripts/download-missing-photos.mjs';

test('recovery requires an unambiguous official code, never a similar product', () => {
  assert.equal(officialCode({ name: '1069 - Abraçadeira', slug: '1069-abracadeira' }), '1069');
  assert.equal(officialCode({ name: '1069 - Abraçadeira', slug: '1070-abracadeira' }), null);
  assert.equal(officialCode({ name: 'Abraçadeira 1069mm', slug: 'abracadeira' }), null);
});

test('recovery rejects HTML and truncated images instead of accepting file size', async () => {
  await assert.rejects(validatePhotoBytes(Buffer.from('<html>' + 'error'.repeat(200) + '</html>')));
  const jpeg = await sharp({ create: { width: 2, height: 2, channels: 3, background: 'red' } }).jpeg().toBuffer();
  assert.equal((await sharp(await validatePhotoBytes(jpeg)).metadata()).format, 'jpeg');
  await assert.rejects(validatePhotoBytes(jpeg.subarray(0, jpeg.length - 30)));
});

test('audits actual URLs, exact case, empty lists, remote URLs and corrupt bytes', async () => {
  const root = mkdtempSync(join(tmpdir(), 'manguebras-photo-'));
  try {
    mkdirSync(join(root, 'public/produtos'), { recursive: true });
    const jpeg = await sharp({ create: { width: 2, height: 2, channels: 3, background: 'red' } }).jpeg().toBuffer();
    writeFileSync(join(root, 'public/produtos/Á.jpg'), jpeg);
    writeFileSync(join(root, 'public/produtos/bad.jpg'), '<html>error</html>');
    writeFileSync(join(root, 'public/produtos/wrong.jpg'), await sharp(jpeg).webp().toBuffer());
    const report = await auditPhotos([
      { code: '1', images: ['/produtos/%C3%81.jpg'] },
      { code: '2', images: [] },
      { code: '3', images: ['/produtos/á.jpg'] },
      { code: '4', images: ['/produtos/missing.jpg'] },
      { code: '5', images: ['/produtos/bad.jpg'] },
      { code: '6', images: ['https://example.com/photo.jpg'] },
      { code: '7', images: ['/produtos/%2e%2e/%2e%2e/secret.jpg'] },
      { code: '8', images: ['/produtos/wrong.jpg'] },
    ], root);
    assert.equal(report.summary.products, 8);
    assert.equal(report.summary.productsWithValidLocalPhotos, 1);
    assert.deepEqual(report.issues.map(i => i.kind), ['empty', 'case-or-unicode', 'missing', 'invalid', 'remote-unverified', 'unsafe-path', 'invalid']);
  } finally { rmSync(root, { recursive: true, force: true }); }
});
