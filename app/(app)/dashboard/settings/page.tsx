import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { NameForm, PasswordForm } from "@/components/dashboard/AccountForms";

export const metadata: Metadata = {
  title: "Settings",
};

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .maybeSingle();

  const fullName = profile?.full_name ?? "";

  return (
    <div className="mx-auto max-w-2xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-slate-brand">Account settings</h1>
        <p className="mt-1 text-ink-muted">
          Manage your profile and password.
        </p>
      </div>

      {/* Profile */}
      <section className="rounded-card border border-line bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-brand">Profile</h2>
        <p className="mt-1 text-sm text-ink-muted">
          Your email address is used to sign in and cannot be changed here.
        </p>

        <div className="mt-5 space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-brand">
              Email address
            </label>
            <p className="mt-1.5 rounded-lg border border-line bg-surface-warm px-3 py-2 text-[0.95rem] text-ink-muted">
              {user.email}
            </p>
          </div>

          <NameForm currentName={fullName} />
        </div>
      </section>

      {/* Password */}
      <section className="rounded-card border border-line bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-brand">Password</h2>
        <p className="mt-1 text-sm text-ink-muted">
          Choose a strong password that you don’t use elsewhere.
        </p>

        <div className="mt-5">
          <PasswordForm />
        </div>
      </section>
    </div>
  );
}