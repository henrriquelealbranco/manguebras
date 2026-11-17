import { NextResponse } from "next/server";

// Conversions are managed in GTM. The former public CAPI relay is disabled
// to prevent duplicate conversions and unauthorized server-side submissions.
export async function POST() {
  return NextResponse.json({ error: "Conversões gerenciadas pelo GTM." }, { status: 410 });
}
