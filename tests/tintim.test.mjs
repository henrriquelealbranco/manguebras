import { test } from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';

const pixel = await import('../src/lib/tintim.ts').catch(() => ({}));

test('official loader sets the account before requesting the async HTTPS script', () => {
  assert.equal(typeof pixel.TINTIM_INITIALIZER, 'string');
  const window = {};
  const scripts = [];
  const document = {
    querySelector: () => null,
    createElement: () => ({}),
    head: { appendChild: (script) => {
      assert.equal(window.tt.accountCode, '893db8f7-97bb-43b2-a908-97fc95741ca0');
      scripts.push(script);
    } },
  };
  vm.runInNewContext(pixel.TINTIM_INITIALIZER, { window, document });
  assert.equal(scripts.length, 1);
  assert.equal(scripts[0].src, 'https://s.tintim.app/static/core/tintim-1.0.js');
  assert.equal(scripts[0].async, true);
  vm.runInNewContext(pixel.TINTIM_INITIALIZER, { window, document });
  assert.equal(scripts.length, 1, 'reinitialization must not duplicate the pixel');
});

test('existing Tintim runtime is preserved without another download', () => {
  assert.equal(typeof pixel.TINTIM_INITIALIZER, 'string');
  const runtime = { loaded: true };
  const window = { tt: runtime };
  vm.runInNewContext(pixel.TINTIM_INITIALIZER, { window, document: {} });
  assert.equal(window.tt, runtime);
  assert.equal(window.tt.accountCode, '893db8f7-97bb-43b2-a908-97fc95741ca0');
});
