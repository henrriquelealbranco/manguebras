import json
from urllib.parse import urlparse, parse_qs
from playwright.sync_api import sync_playwright

GENERAL = 'Olá. Visitei seu site e gostaria de falar com um atendente.'
PRODUCT = 'Olá. Gostaria de mais informações sobre um produto que vi no site.'

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True, channel='chrome')
    page = browser.new_page()
    page.set_default_timeout(90000)
    # Verify the site's queue and script insertion without firing live ad pixels.
    page.route('https://www.googletagmanager.com/**', lambda route: route.abort())
    # No real redirects/conversations: inspect links and events only.
    page.route('https://tintim.link/**', lambda route: route.abort())
    page.goto('http://localhost:3097', wait_until='networkidle')
    page.wait_for_function("window.dataLayer?.some(e => e.event === 'site_page_view')")
    assert page.locator('script[src*="googletagmanager.com/gtm.js?id=GTM-KRP4R7ZC"]').count() == 1
    assert '99922-6668' not in page.inner_text('body')

    def check_click(selector, kind):
        link = page.locator(selector).first
        href = link.get_attribute('href')
        assert urlparse(href).hostname == 'tintim.link'
        assert parse_qs(urlparse(href).query)['text'][0] == (PRODUCT if kind == 'product' else GENERAL)
        before = page.evaluate("window.dataLayer.filter(e=>e.event==='whatsapp_click').length")
        link.evaluate("a=>a.addEventListener('click',e=>e.preventDefault(),{once:true})")
        link.click(force=True)
        events = page.evaluate("window.dataLayer.filter(e=>e.event==='whatsapp_click')")
        assert len(events) == before + 1, events
        assert events[-1]['contact_type'] == kind, events[-1]
        if kind == 'product':
            assert events[-1]['product_code']

    check_click('a[data-product-code]', 'product')
    check_click('a[aria-label="Falar com um especialista no WhatsApp"]', 'general')
    check_click('footer a[href*="tintim.link"]', 'general')
    check_click('a[data-gtm-tracked="true"]', 'general')
    product_href = page.locator('main a[href^="/produtos/"]').first.get_attribute('href')
    page.locator('main a[href^="/produtos/"]').first.click()
    page.wait_for_url('**' + product_href)
    page.wait_for_load_state('networkidle')
    check_click('a[data-gtm-tracked="true"]:has-text("Consultar esta peça")', 'product')
    paths = page.evaluate("window.dataLayer.filter(e=>e.event==='site_page_view').map(e=>e.page_path)")
    assert paths == ['/', product_href], paths
    response = page.request.post('http://localhost:3097/api/meta-capi', data={})
    assert response.status == 410
    print(json.dumps({'passed': True, 'page_paths': paths, 'whatsapp_clicks': 5, 'gtm_container': 'GTM-KRP4R7ZC'}))
    browser.close()
