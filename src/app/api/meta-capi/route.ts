import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const DEFAULT_PIXEL_ID = "2163255911232071";
const DEFAULT_CAPI_TOKEN =
  "EAAe3zPLq5yABSnQx7ebkiZCd41Lkl1OsJ4yjZCSqroXW5Koe69XGIZBjLwaWRyYFlpf18hZA19257kBMoCZBSpdtAROB3chyMf8oTiSsy4DNoToYF3ZBMQAQ26SmcWQe4xthvCyBaANYZALFbjLZCt9GkKDKyZBlH6Bm8uC8jewAsejCNUuPCZAxauCNVG6pAZBpFJA8gZDZD";

function sha256(value: string): string {
  return crypto.createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  // Se for número brasileiro sem código do país (10 ou 11 dígitos), adiciona 55
  if (digits.length === 10 || digits.length === 11) {
    return `55${digits}`;
  }
  return digits;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      event_name = "Lead",
      event_id,
      event_source_url,
      user_data = {},
      custom_data = {},
    } = body;

    const pixelId = process.env.META_PIXEL_ID || DEFAULT_PIXEL_ID;
    const accessToken = process.env.META_CAPI_ACCESS_TOKEN || DEFAULT_CAPI_TOKEN;

    // Extrai IP e User-Agent para enriquecer a CAPI e aumentar a pontuação de qualidade
    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      undefined;
    const userAgent = req.headers.get("user-agent") || undefined;

    const userDataPayload: Record<string, unknown> = {};

    if (clientIp) userDataPayload.client_ip_address = clientIp;
    if (userAgent) userDataPayload.client_user_agent = userAgent;

    if (user_data.phone) {
      const cleanPhone = normalizePhone(user_data.phone);
      userDataPayload.ph = [sha256(cleanPhone)];
    }

    if (user_data.name) {
      const nameParts = user_data.name.trim().split(/\s+/);
      const firstName = nameParts[0];
      const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : undefined;
      userDataPayload.fn = [sha256(firstName)];
      if (lastName) {
        userDataPayload.ln = [sha256(lastName)];
      }
    }

    if (user_data.email) {
      userDataPayload.em = [sha256(user_data.email)];
    }

    const payload = {
      data: [
        {
          event_name,
          event_time: Math.floor(Date.now() / 1000),
          event_id: event_id || `srv_${Date.now()}`,
          event_source_url: event_source_url || "https://www.manguebras.com.br",
          action_source: "website",
          user_data: userDataPayload,
          custom_data,
        },
      ],
    };

    const endpoint = `https://graph.facebook.com/v21.0/${pixelId}/events?access_token=${accessToken}`;
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("[Meta CAPI Error]", data);
      return NextResponse.json(
        { success: false, error: data },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      events_received: data.events_received,
      event_id,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[Meta CAPI Exception]", message);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
