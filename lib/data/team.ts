import { createClient } from "@supabase/supabase-js";
import { isSupabaseConfigured, supabaseKey, supabaseUrl } from "@/lib/supabase/env";

export interface TeamEntry {
  id: string;
  kind: "team" | "partner";
  name: string;
  title: string | null;
  bio: string | null;
  photoUrl: string | null;
  linkUrl: string | null;
}

interface Row {
  id: string;
  kind: "team" | "partner";
  name: string;
  title: string | null;
  bio: string | null;
  photo_url: string | null;
  link_url: string | null;
}

/** Published team members and partners. RLS limits the anonymous client to published rows. */
export async function getTeamAndPartners(): Promise<TeamEntry[]> {
  if (!isSupabaseConfigured) return [];
  try {
    const db = createClient(supabaseUrl!, supabaseKey!, { auth: { persistSession: false } });
    const { data, error } = await db
      .from("team_partners")
      .select("id, kind, name, title, bio, photo_url, link_url")
      .eq("published", true)
      .order("sort_order", { ascending: true })
      .order("name", { ascending: true });
    if (error || !data) return [];
    return (data as Row[]).map((r) => ({
      id: r.id,
      kind: r.kind,
      name: r.name,
      title: r.title,
      bio: r.bio,
      photoUrl: r.photo_url,
      linkUrl: r.link_url,
    }));
  } catch {
    return [];
  }
}