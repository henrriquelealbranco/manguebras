import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as site from '../src/constants/site.ts';
import { trackFormLead, trackWhatsAppClick } from '../src/lib/tracking.ts';

test('general links use Tintim and the prescribed greeting, not legacy copy', () => {
  const link = new URL(site.whatsappLink('Mensagem antiga'));
  assert.equal(link.origin, 'https://tintim.link');
  assert.equal(link.pathname, '/whatsapp/893db8f7-97bb-43b2-a908-97fc95741ca0/c2b21e7b-42a9-4adc-9f81-a98660775b8f');
  assert.equal(link.searchParams.get('text'), 'Olá. Visitei seu site e gostaria de falar com um atendente.');
  assert.equal(site.SITE.whatsappNumber, '554430237100');
});
test('product links keep the exact product greeting', () => {
  assert.equal(typeof site.productWhatsappLink, 'function');
  const link = new URL(site.productWhatsappLink());
  assert.equal(link.searchParams.get('text'), 'Olá. Gostaria de mais informações sobre um produto que vi no site.');
});
test('WhatsApp click includes product context and clears it for general clicks', () => {
  globalThis.window = { dataLayer: [] };
  trackWhatsAppClick({location: 'product_card', productCode: '5000'});
  trackWhatsAppClick({location: 'footer'});
  assert.equal(window.dataLayer[0].contact_type, 'product');
  assert.equal(window.dataLayer[0].product_code, '5000');
  assert.equal(window.dataLayer[1].contact_type, 'general');
  assert.equal(window.dataLayer[1].product_code, null);
});
test('form leads go only to GTM and do not expose personal information', async () => {
  globalThis.window = { dataLayer: [] };
  let requests = 0;
  const previousFetch = globalThis.fetch;
  globalThis.fetch = async () => { requests++; };
  try {
    await trackFormLead({formName: 'contact_form', name: 'Pessoa', phone: '44999999999', assunto: 'Texto privado'});
    assert.equal(requests, 0);
    assert.equal(window.dataLayer[0].event, 'lead');
    assert.ok(!JSON.stringify(window.dataLayer).includes('Pessoa'));
    assert.ok(!JSON.stringify(window.dataLayer).includes('44999999999'));
    assert.ok(!JSON.stringify(window.dataLayer).includes('Texto privado'));
  } finally { globalThis.fetch = previousFetch; }
});
