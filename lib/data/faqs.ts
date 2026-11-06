import { createClient } from "@supabase/supabase-js";
import { isSupabaseConfigured, supabaseKey, supabaseUrl } from "@/lib/supabase/env";

export interface Faq {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface Row {
  id: string;
  question: string;
  answer: string;
  category: string | null;
}

/** Anonymous client. RLS only lets it read published rows. */
export async function getFaqs(): Promise<Faq[]> {
  if (!isSupabaseConfigured) return [];
  try {
    const db = createClient(supabaseUrl!, supabaseKey!, { auth: { persistSession: false } });
    const { data, error } = await db
      .from("faqs")
      .select("id, question, answer, category")
      .eq("published", true)
      .order("sort_order", { ascending: true })
      .order("question", { ascending: true });
    if (error || !data) return [];
    return (data as Row[]).map((r) => ({
      id: r.id,
      question: r.question,
      answer: r.answer,
      category: r.category?.trim() || "General",
    }));
  } catch {
    return [];
  }
}