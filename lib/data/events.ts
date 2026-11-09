import { createClient } from "@supabase/supabase-js";
import { isSupabaseConfigured, supabaseKey, supabaseUrl } from "@/lib/supabase/env";

export interface SiteEvent {
  id: string;
  title: string;
  summary: string | null;
  body: string | null;
  location: string | null;
  startsAt: string;
  endsAt: string | null;
}

interface Row {
  id: string;
  title: string;
  summary: string | null;
  body: string | null;
  location: string | null;
  starts_at: string;
  ends_at: string | null;
}

/** Published events that have not ended yet, soonest first. */
export async function getUpcomingEvents(limit = 6): Promise<SiteEvent[]> {
  if (!isSupabaseConfigured) return [];
  try {
    const db = createClient(supabaseUrl!, supabaseKey!, { auth: { persistSession: false } });
    const now = new Date().toISOString();
    const { data, error } = await db
      .from("events")
      .select("id, title, summary, body, location, starts_at, ends_at")
      .eq("published", true)
      .or(`starts_at.gte.${now},ends_at.gte.${now}`)
      .order("starts_at", { ascending: true })
      .limit(limit);
    if (error || !data) return [];
    return (data as Row[]).map((r) => ({
      id: r.id,
      title: r.title,
      summary: r.summary,
      body: r.body,
      location: r.location,
      startsAt: r.starts_at,
      endsAt: r.ends_at,
    }));
  } catch {
    return [];
  }
}

export function formatEventDate(iso: string) {
  return new Date(iso).toLocaleString("en-ZA", {
    timeZone: "Africa/Johannesburg",
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}