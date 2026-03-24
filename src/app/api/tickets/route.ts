import { NextResponse } from "next/server";

const SUPABASE_URL = "https://dzlmtvodpyhetvektfuo.supabase.co";
const SUPABASE_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6bG10dm9kcHloZXR2ZWt0ZnVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA4NTk2NTQsImV4cCI6MjA1NjQzNTY1NH0.L5t3EM0hMLEVkMhJGCFwhMJGmxX5b1GCTchPMiTGCaI";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");

  try {
    // Get tiers
    const tiersRes = await fetch(`${SUPABASE_URL}/rest/v1/ff_ticket_tiers?is_active=eq.true&order=sort_order`, {
      headers: { apikey: SUPABASE_ANON, Authorization: `Bearer ${SUPABASE_ANON}` }
    });
    const tiers = await tiersRes.json();

    // Get slots for date
    let slots: any[] = [];
    if (date) {
      const slotsRes = await fetch(`${SUPABASE_URL}/rest/v1/ff_time_slots?slot_date=eq.${date}&is_active=eq.true&order=slot_time`, {
        headers: { apikey: SUPABASE_ANON, Authorization: `Bearer ${SUPABASE_ANON}` }
      });
      slots = await slotsRes.json();
    }

    return NextResponse.json({ tiers, slots, dates: { start: "2026-06-11", end: "2026-07-19" } });
  } catch (e) {
    return NextResponse.json({ error: "Failed to fetch tickets" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { tier_code, slot_id, name, email, phone, quantity } = body;

    // Create order in Supabase
    const orderRes = await fetch(`${SUPABASE_URL}/rest/v1/ff_ticket_orders`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_ANON,
        Authorization: `Bearer ${SUPABASE_ANON}`,
        "Content-Type": "application/json",
        Prefer: "return=representation"
      },
      body: JSON.stringify({
        tier_code, time_slot_id: slot_id,
        customer_name: name, customer_email: email, customer_phone: phone,
        quantity: quantity || 1, status: "pending",
        total_amount: 0 // Will be calculated
      })
    });

    if (!orderRes.ok) {
      return NextResponse.json({ error: "Failed to create order" }, { status: 400 });
    }

    const order = await orderRes.json();

    // Create GHL contact
    try {
      await fetch("https://services.leadconnectorhq.com/contacts/upsert", {
        method: "POST",
        headers: {
          Authorization: "Bearer pit-4fa7a823-ef6c-457e-b77b-c160660373e9",
          "Content-Type": "application/json",
          Version: "2021-07-28"
        },
        body: JSON.stringify({
          locationId: "GbG9KQGmgIDSvPuYIUf9",
          email, phone, firstName: name.split(" ")[0],
          lastName: name.split(" ").slice(1).join(" ") || "",
          name, source: "ticket_purchase",
          tags: ["ff_ticket", tier_code, "world_cup_2026"]
        })
      });
    } catch {}

    // Fire webhook for notification
    try {
      await fetch("https://dorsey.app.n8n.cloud/webhook/khg-form-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...body, form_type: "ticket_purchase", brand_key: "forever_futbol" })
      });
    } catch {}

    return NextResponse.json({ success: true, order: order[0] || order });
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
