import { createClient } from "@supabase/supabase-js";
import { isSupabaseConfigured, supabaseKey, supabaseUrl } from "@/lib/supabase/env";

export interface NewsPost {
  slug: string;
  title: string;
  summary: string | null;
  body: string | null;
  coverImage: string | null;
  publishedAt: string;
}

interface Row {
  slug: string;
  title: string;
  summary?: string | null;
  body?: string | null;
  cover_image?: string | null;
  published_at: string | null;
}

function toPost(r: Row): NewsPost {
  const body = r.body ?? null;
  return {
    slug: r.slug,
    title: r.title,
    // Use the summary column if the database has one, otherwise the opening of the body.
    summary: r.summary ?? (body ? body.replace(/\s+/g, " ").slice(0, 180).trim() : null),
    body,
    coverImage: r.cover_image ?? null,
    publishedAt: r.published_at as string,
  };
}

/** Anonymous, cookie-free client so news pages can be cached. RLS limits it to published rows. */
function client() {
  if (!isSupabaseConfigured) return null;
  return createClient(supabaseUrl!, supabaseKey!, { auth: { persistSession: false } });
}

export async function getNewsPosts(limit = 50): Promise<NewsPost[]> {
  const db = client();
  if (!db) return [];
  const { data, error } = await db
    .from("news_posts")
    .select("*")
    .not("published_at", "is", null)
    .lte("published_at", new Date().toISOString())
    .order("published_at", { ascending: false })
    .limit(limit);
  if (error || !data) return [];
  return (data as Row[]).map(toPost);
}

export async function getNewsPost(slug: string): Promise<NewsPost | undefined> {
  const db = client();
  if (!db) return undefined;
  const { data, error } = await db
    .from("news_posts")
    .select("*")
    .eq("slug", slug)
    .not("published_at", "is", null)
    .lte("published_at", new Date().toISOString())
    .maybeSingle();
  if (error || !data) return undefined;
  return toPost(data as Row);
}

export function formatNewsDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-ZA", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Africa/Johannesburg",
  });
}