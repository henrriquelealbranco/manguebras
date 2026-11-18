"""Read-only visual regression for the previously broken product photo."""
import json
import os
from pathlib import Path
from playwright.sync_api import sync_playwright

base = os.environ.get('IMAGE_TEST_URL', 'https://www.manguebras.com.br')
with sync_playwright() as p:
    browser = p.chromium.launch(headless=True, channel='chrome')
    page = browser.new_page(viewport={'width': 1440, 'height': 1000})
    page.set_default_timeout(60000)
    page.route('https://www.googletagmanager.com/**', lambda route: route.abort())
    page.route('https://s.tintim.app/**', lambda route: route.abort())
    response = page.goto(base + '/produtos/mangueira-cotovelo-90-57x57mm-2937', wait_until='networkidle')
    assert response.status == 200
    image = page.locator('main img[alt="Mangueira Cotovelo (90°) 57x57mm Mangueiras"]').first
    image.wait_for()
    src = image.get_attribute('src')
    assert src == '/produtos/2937.jpg', src
    page.wait_for_function("""() => {
      const image = document.querySelector('main img[alt="Mangueira Cotovelo (90°) 57x57mm Mangueiras"]');
      return image?.complete && image.naturalWidth > 0;
    }""")
    image_info = image.evaluate('(i) => ({src:i.currentSrc,width:i.naturalWidth,height:i.naturalHeight})')
    output = Path(__file__).resolve().parents[1] / 'qa-output'
    output.mkdir(exist_ok=True)
    page.screenshot(path=str(output / 'produto-2937-foto.png'), full_page=False)
    print(json.dumps({'passed': True, 'image': image_info}))
    browser.close()
