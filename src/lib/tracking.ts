/**
 * Módulo de Rastreamento (GTM DataLayer + Meta CAPI)
 *
 * - Container GTM: GTM-KRP4R7ZC
 * - Meta Pixel / Dataset ID: 2163255911232071
 * - Deduplicação entre Web (GTM) e Server-side (Meta CAPI) via event_id
 */

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/** Gera um ID de evento único para deduplicação entre Pixel/GTM e CAPI */
export function generateEventId(prefix = "evt"): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 9);
  return `${prefix}_${timestamp}_${random}`;
}

/** Envia eventos diretamente para a camada de dados (dataLayer) do Google Tag Manager */
export function pushDataLayer(payload: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
}

export interface TrackWhatsAppParams {
  location: string;
  label?: string;
  productCode?: string;
  productName?: string;
  montadora?: string;
}

/** Rastreia cliques em botões e links do WhatsApp */
export function trackWhatsAppClick(params: TrackWhatsAppParams) {
  const eventId = generateEventId("wa");

  pushDataLayer({
    event: "whatsapp_click",
    event_id: eventId,
    click_location: params.location,
    button_label: params.label || "WhatsApp",
    product_code: params.productCode,
    product_name: params.productName,
    montadora: params.montadora,
    timestamp: new Date().toISOString(),
  });

  return eventId;
}

export interface LeadData {
  formName: string;
  name: string;
  phone: string;
  email?: string;
  assunto?: string;
  mensagem?: string;
  productCode?: string;
}

/**
 * Rastreia envio concluído de formulário (Lead).
 * Dispara evento 'lead' / 'form_submit' no GTM e envia em paralelo para a Meta CAPI com o mesmo event_id.
 */
export async function trackFormLead(data: LeadData): Promise<string> {
  const eventId = generateEventId("lead");

  // 1. Disparo no GTM DataLayer
  pushDataLayer({
    event: "lead",
    event_id: eventId,
    form_name: data.formName,
    lead_name: data.name,
    lead_phone: data.phone,
    lead_assunto: data.assunto,
    product_code: data.productCode,
    timestamp: new Date().toISOString(),
  });

  // 2. Envio paralelo para Meta CAPI (Server-Side)
  try {
    fetch("/api/meta-capi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_name: "Lead",
        event_id: eventId,
        event_source_url: typeof window !== "undefined" ? window.location.href : undefined,
        user_data: {
          name: data.name,
          phone: data.phone,
          email: data.email,
        },
        custom_data: {
          form_name: data.formName,
          assunto: data.assunto,
          product_code: data.productCode,
        },
      }),
    }).catch((err) => {
      console.warn("[Meta CAPI] Erro em segundo plano ao enviar evento:", err);
    });
  } catch (err) {
    console.warn("[Meta CAPI] Falha no disparo assíncrono:", err);
  }

  return eventId;
}

/** Rastreia buscas no catálogo */
export function trackCatalogSearch(query: string, resultsCount?: number) {
  pushDataLayer({
    event: "search",
    search_term: query,
    results_count: resultsCount,
    timestamp: new Date().toISOString(),
  });
}

/** Rastreia aplicação de filtros */
export function trackFilterApplied(filterType: "montadora" | "categoria" | "linha", value: string) {
  pushDataLayer({
    event: "filter_applied",
    filter_type: filterType,
    filter_value: value,
    timestamp: new Date().toISOString(),
  });
}
