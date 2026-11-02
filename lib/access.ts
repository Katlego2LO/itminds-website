import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export type AccessState = "ok" | "pending" | "suspended";

export async function getAccessState(): Promise<AccessState> {
  if (!isSupabaseConfigured) return "ok";

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return "ok"; // the middleware already redirects signed-out visitors

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("role, approval_status")
    .eq("id", user.id)
    .maybeSingle();

  // 42703 = column missing, i.e. the approval migration has not been run yet.
  if (error?.code === "42703") return "ok";
  if (!profile) return "pending";
  if (profile.role !== "student") return "ok";
  if (profile.approval_status === "approved") return "ok";
  return profile.approval_status === "suspended" ? "suspended" : "pending";
}