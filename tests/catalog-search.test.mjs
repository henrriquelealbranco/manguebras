import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire, Module } from 'node:module';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

// Transpile in memory: no generated files, framework mocks or new dependencies.
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);
const cache = new Map();
function load(relative) {
  const file = resolve(root, relative);
  if (cache.has(file)) return cache.get(file).exports;
  const mod = new Module(file);
  cache.set(file, mod);
  mod.filename = file;
  mod.paths = require.resolve.paths('react');
  mod.require = (id) => {
    if (id.startsWith('@/')) return load(`src/${id.slice(2)}.ts`);
    if (id.endsWith('.json')) return JSON.parse(readFileSync(resolve(dirname(file), id), 'utf8'));
    return require(id);
  };
  let source = readFileSync(file, 'utf8');
  // Exercise the component's actual selector without mounting a Next router.
  if (relative.endsWith('search-autocomplete.tsx')) source += '\nexport { searchLocal };';
  mod._compile(ts.transpileModule(source, {
    fileName: file,
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX },
  }).outputText, file);
  return mod.exports;
}
const { queryProducts, parseCatalogParams } = load('src/lib/catalog.ts');
const { searchLocal } = load('src/components/search/search-autocomplete.tsx');
const { PRODUCTS } = load('src/data/products.ts');
const codes = (products) => products.map((p) => p.code);
const query = (q, filters = {}) => queryProducts({ q, ordenar: 'relevancia', ...filters });

for (const q of ['1548', '001548', ' 001548 ', '000001548']) {
  test(`exact numeric SKU is exclusive for ${JSON.stringify(q)}`, () => {
    assert.deepEqual(codes(query(q)), ['1548']);
    assert.deepEqual(codes(searchLocal(q)), ['1548']);
  });
}

test('OEM fallback remains available in catalog and autocomplete', () => {
  for (const [q, expected] of [['1515481', ['2611']], ['20549855', ['1548']]]) {
    assert.deepEqual(codes(query(q)), expected);
    assert.deepEqual(codes(searchLocal(q)), expected);
  }
});

test('URL parsing preserves the entered code while results normalize it', () => {
  const parsed = parseCatalogParams({ q: [' 001548 ', 'other'] });
  assert.equal(parsed.q, '001548');
  assert.deepEqual(codes(queryProducts(parsed)), ['1548']);
});

test('SKU exclusivity respects each active filter and all sort modes', () => {
  for (const ordenar of ['relevancia', 'a-z', 'novidades']) {
    assert.deepEqual(codes(query('001548', { ordenar, categoria: 'mangueiras-caminhoes-onibus', montadora: 'mangueiras', linha: 'diesel' })), ['1548']);
    for (const filters of [{ categoria: 'pecas-acessorios' }, { montadora: 'scania' }]) {
      assert.deepEqual(query('1548', { ordenar, ...filters }), []);
      assert.deepEqual(query('001548', { ordenar, ...filters }), []);
    }
  }
});

// Controlled complete products allow edge cases absent from the real catalog.
function withProducts(products, run) {
  const original = PRODUCTS.slice();
  PRODUCTS.splice(0, PRODUCTS.length, ...products);
  try { run(); } finally { PRODUCTS.splice(0, PRODUCTS.length, ...original); }
}
const template = PRODUCTS.find((p) => p.code === '1548');
function product(code, overrides = {}) {
  return { ...template, code, slug: `test-${code}`, name: 'Mangueira Árvore', shortDescription: 'Radiador especial',
    montadora: 'Volvo', category: 'mangueiras-caminhoes-onibus', lines: ['diesel'], featured: false,
    ficha: { ...template.ficha, montadora: 'Volvo', aplicacao: 'Radiador', nOriginal: '' }, ...overrides };
}

test('excluded exact SKU never falls back to an OEM match in another filter', () => {
  withProducts([product('1548'), product('99', { lines: ['pesada'], ficha: { ...template.ficha, nOriginal: '001548' } })], () => {
    assert.deepEqual(query('001548', { linha: 'pesada' }), []);
    assert.deepEqual(query('1548', { linha: 'pesada' }), []);
  });
});

test('fallback retains original leading zeros and alphanumeric OEM references', () => {
  withProducts([product('80', { ficha: { ...template.ficha, nOriginal: '001234 AB-001234' } }),
    product('81', { ficha: { ...template.ficha, nOriginal: '1234' } })], () => {
    assert.deepEqual(codes(query('001234')), ['80']);
    assert.deepEqual(codes(searchLocal('001234')), ['80']);
    assert.deepEqual(codes(query('AB-001234')), ['80']);
  });
});

test('compound text, accents and case keep tolerant all-term matching', () => {
  withProducts([product('1548'), product('99', { name: 'Outra mangueira', ficha: { ...template.ficha, nOriginal: '1548' } })], () => {
    assert.deepEqual(codes(query('ARVORE radiador')), ['1548']);
    assert.deepEqual(codes(query('1548 Volvo')), ['1548', '99']);
    assert.deepEqual(codes(searchLocal('1548 Volvo')), ['1548', '99']);
  });
});

test('exact selection precedes the autocomplete limit and normalizes stored codes', () => {
  withProducts([...Array.from({ length: 8 }, (_, i) => product(`${i + 80}`, { ficha: { ...template.ficha, nOriginal: '1548' } })), product('001548')], () => {
    assert.deepEqual(codes(searchLocal('1548')), ['001548']);
    assert.deepEqual(codes(query('1548')), ['001548']);
    assert.equal(searchLocal('radiador').length, 6);
  });
});

test('zero, long numeric codes and nonnumeric queries are handled as strings', () => {
  const long = '900719925474099312345';
  withProducts([product('0'), product(long), product('AB001548')], () => {
    assert.deepEqual(codes(query('000')), ['0']);
    assert.deepEqual(codes(query(`00${long}`)), [long]);
    assert.deepEqual(codes(query('AB001548')), ['AB001548']);
    assert.deepEqual(query('999999999999999999999'), []);
    assert.deepEqual(searchLocal(''), []);
    assert.deepEqual(searchLocal(' '), []);
    assert.equal(query(' ').length, 3);
  });
});

test('fallback keeps catalog sorting without mutating source order', () => {
  withProducts([product('80', { name: 'Zulu', createdAt: '2025-01-01' }), product('81', { name: 'Alfa', createdAt: '2026-01-01' })], () => {
    assert.deepEqual(codes(query('radiador', { ordenar: 'a-z' })), ['81', '80']);
    assert.deepEqual(codes(query('radiador', { ordenar: 'novidades' })), ['81', '80']);
    assert.deepEqual(codes(PRODUCTS), ['80', '81']);
  });
});
