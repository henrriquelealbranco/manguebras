import { test } from 'node:test';
import assert from 'node:assert/strict';
import config from '../next.config.ts';
import { getImgProps } from 'next/dist/shared/lib/get-img-props.js';
import { imageConfigDefault } from 'next/dist/shared/lib/image-config.js';
import imageLoader from 'next/dist/shared/lib/image-loader.js';
import { readFileSync } from 'node:fs';

test('catalog pictures render direct static URLs instead of the payment-blocked optimizer', () => {
  const { props } = getImgProps(
    { src: '/produtos/2937.jpg', alt: 'Mangueira cotovelo 2937', width: 800, height: 800 },
    { imgConf: { ...imageConfigDefault, ...config.images }, defaultLoader: imageLoader.default },
  );
  assert.equal(props.src, '/produtos/2937.jpg');
  assert.equal(props.srcSet, undefined);
});

test('old JPG links for the relabelled WebP photos keep resolving to the correct photo', async () => {
  const products = JSON.parse(readFileSync(new URL('../src/data/products.gen.json', import.meta.url), 'utf8'));
  const redirects = await config.redirects?.() || [];
  for (const image of products.flatMap(p => p.images).filter(src => src.endsWith('.webp'))) {
    const legacyPath = image.replace(/\.webp$/, '.jpg');
    const redirect = redirects.find(entry => entry.source === legacyPath);
    assert.ok(redirect, `Missing compatibility for ${legacyPath}`);
    assert.equal(redirect.destination, image);
    assert.equal(redirect.permanent, true);
  }
});
