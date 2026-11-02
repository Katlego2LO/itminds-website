import { createClient } from "@supabase/supabase-js";
import { isSupabaseConfigured, supabaseKey, supabaseUrl } from "@/lib/supabase/env";
import { site } from "@/lib/site";

export interface ContactInfo {
  email: string;
  phone: string;
  facebook: string;
  linkedin: string;
  instagram: string;
}

const KEYS = [
  "contact_email",
  "contact_phone",
  "social_facebook",
  "social_linkedin",
  "social_instagram",
];

function asText(v: unknown) {
  if (typeof v !== "string") return "";
  return v.trim().replace(/^"|"$/g, "");
}

/** Contact details from the admin's Site settings, falling back to lib/site.ts. */
export async function getContactInfo(): Promise<ContactInfo> {
  const fallback: ContactInfo = {
    email: site.contact.email,
    phone: site.contact.phone,
    facebook: site.social.facebook,
    linkedin: site.social.linkedin,
    instagram: site.social.instagram,
  };

  if (!isSupabaseConfigured) return fallback;

  try {
    const db = createClient(supabaseUrl!, supabaseKey!, {
      auth: { persistSession: false },
    });
    const { data, error } = await db
      .from("site_settings")
      .select("key, value")
      .in("key", KEYS);
    if (error || !data) return fallback;

    const map = new Map<string, string>();
    for (const row of data) map.set(row.key as string, asText(row.value));

    return {
      email: map.get("contact_email") || fallback.email,
      phone: map.get("contact_phone") || fallback.phone,
      facebook: map.get("social_facebook") || fallback.facebook,
      linkedin: map.get("social_linkedin") || fallback.linkedin,
      instagram: map.get("social_instagram") || fallback.instagram,
    };
  } catch {
    return fallback;
  }
}