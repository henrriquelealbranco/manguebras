import Script from "next/script";

/**
 * Integração global de rastreamento via Google Tag Manager (GTM).
 *
 * Container padrão: GTM-KRP4R7ZC
 * Todos os eventos (GA4, Google Ads, Pixel da Meta) são gerenciados dentro do container GTM.
 */
export function Analytics() {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID || "GTM-KRP4R7ZC";

  return (
    <>
      <Script id="gtm" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`}
      </Script>
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>
    </>
  );
}

/**
 * JSON-LD da organização — presente em todas as páginas.
 */
export function OrganizationJsonLd({
  name,
  url,
  logo,
  phone,
  city,
  state,
}: {
  name: string;
  url: string;
  logo: string;
  phone: string;
  city: string;
  state: string;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AutoPartsStore",
    name,
    url,
    logo,
    telephone: phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: city,
      addressRegion: state,
      addressCountry: "BR",
    },
    areaServed: "BR",
    priceRange: "$$",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
