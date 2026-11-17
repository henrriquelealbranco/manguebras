/**
 * Eventos do site: encaminhados exclusivamente ao GTM DataLayer.
 *
 * - Container GTM: GTM-KRP4R7ZC
 * - As tags de mídia são administradas no GTM, sem disparos paralelos.
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
    contact_type: params.productCode ? "product" : "general",
    product_code: params.productCode || null,
    product_name: params.productName || null,
    montadora: params.montadora || null,
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
 * Dispara 'lead' no GTM ao encaminhar o formulário ao WhatsApp.
 * Não significa que a mensagem foi enviada ou que houve venda.
 */
export async function trackFormLead(data: LeadData): Promise<string> {
  const eventId = generateEventId("lead");

  // 1. Disparo no GTM DataLayer
  pushDataLayer({
    event: "lead",
    event_id: eventId,
    form_name: data.formName,
    product_code: data.productCode,
    timestamp: new Date().toISOString(),
  });

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
