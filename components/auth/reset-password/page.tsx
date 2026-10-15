import type { Metadata } from "next";
import Link from "next/link";
import { ResetPasswordForm } from "@/components/auth/PasswordForms";
import { updatePassword } from "@/lib/password-actions";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Choose a new password", robots: { index: false } };

export default async function ResetPasswordPage() {
  let signedIn = false;
  if (isSupabaseConfigured) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    signedIn = Boolean(user);
  }

  return (
    <div className="container-page grid place-items-center py-16 sm:py-24">
      <div className="w-full max-w-md rounded-card border border-line bg-white p-8 shadow-card">
        <h1 className="text-3xl">Choose a new password</h1>
        {signedIn ? (
          <>
            <p className="mb-7 mt-2 text-ink-muted">
              Pick a password you have not used on this site before.
            </p>
            <ResetPasswordForm action={updatePassword} />
          </>
        ) : (
          <>
            <p className="mt-2 text-ink-muted">
              This reset link is invalid or has expired. Reset links work once and for a short
              time.
            </p>
            <Link href="/forgot-password" className="mt-6 inline-block text-brand-700 underline">
              Request a new link
            </Link>
          </>
        )}
      </div>
    </div>
  );
}