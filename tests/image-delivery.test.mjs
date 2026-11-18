import { test } from 'node:test';
import assert from 'node:assert/strict';
import config from '../next.config.ts';
import { getImgProps } from 'next/dist/shared/lib/get-img-props.js';
import { imageConfigDefault } from 'next/dist/shared/lib/image-config.js';
import imageLoader from 'next/dist/shared/lib/image-loader.js';

test('catalog pictures render direct static URLs instead of the payment-blocked optimizer', () => {
  const { props } = getImgProps(
    { src: '/produtos/2937.jpg', alt: 'Mangueira cotovelo 2937', width: 800, height: 800 },
    { imgConf: { ...imageConfigDefault, ...config.images }, defaultLoader: imageLoader.default },
  );
  assert.equal(props.src, '/produtos/2937.jpg');
  assert.equal(props.srcSet, undefined);
});
