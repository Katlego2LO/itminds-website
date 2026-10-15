"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { forgotPasswordSchema, newPasswordSchema } from "@/lib/password-validation";
import type { AuthState } from "@/lib/auth-actions";

const notConfigured: AuthState = {
  error: "This service is not available yet. Please try again later.",
};

function fieldErrors(issues: { path: (string | number)[]; message: string }[]) {
  const out: Record<string, string> = {};
  for (const i of issues) out[String(i.path[0])] ??= i.message;
  return out;
}

/**
 * Sends a reset link. The reply is the same whether or not the address has an
 * account, so the form cannot be used to find out who is registered.
 */
export async function requestPasswordReset(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  if (!isSupabaseConfigured) return notConfigured;
  const parsed = forgotPasswordSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { fieldErrors: fieldErrors(parsed.error.issues) };

  const origin = (await headers()).get("origin") ?? process.env.NEXT_PUBLIC_SITE_URL;
  const supabase = await createClient();
  await supabase.auth.resetPasswordForEmail(parsed.data.email, {
    redirectTo: `${origin}/auth/callback?next=/reset-password`,
  });
  return {
    notice: "If that address has an account, we have sent a link to reset the password.",
  };
}

/** Runs on /reset-password after the emailed link has signed the learner in. */
export async function updatePassword(_prev: AuthState, formData: FormData): Promise<AuthState> {
  if (!isSupabaseConfigured) return notConfigured;
  const parsed = newPasswordSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { fieldErrors: fieldErrors(parsed.error.issues) };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { error: "This reset link has expired. Request a new one." };
  }
  const { error } = await supabase.auth.updateUser({ password: parsed.data.password });
  if (error) {
    return { error: "We could not change the password. Use a different one and try again." };
  }
  redirect("/dashboard");
}