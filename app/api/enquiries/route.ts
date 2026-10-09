import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { enquirySchema } from "@/lib/validation";

// Basic in-memory limiter for a single instance. Replace with Vercel KV / Upstash before launch (spec 6.4).
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_HITS;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limited(ip))
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 },
    );

  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  // Bots fill the hidden field; pretend success.
  if (typeof body.website === "string" && body.website.length > 0)
    return NextResponse.json({ ok: true });

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const i of parsed.error.issues) fieldErrors[String(i.path[0])] ??= i.message;
    return NextResponse.json({ fieldErrors }, { status: 422 });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    return NextResponse.json({ error: "Enquiries are not available yet." }, { status: 503 });
  }

  const data = { ...parsed.data } as Partial<typeof parsed.data>;
  delete data.consent;
  const supabase = createClient(url, key, { auth: { persistSession: false } });
  const { error } = await supabase.from("enquiries").insert({
    ...data,
    phone: data.phone || null,
    organisation: data.organisation || null,
    source_page: typeof body.sourcePage === "string" ? body.sourcePage.slice(0, 200) : null,
  });
  if (error)
    return NextResponse.json({ error: "We could not save your enquiry." }, { status: 500 });
  return NextResponse.json({ ok: true });
}
