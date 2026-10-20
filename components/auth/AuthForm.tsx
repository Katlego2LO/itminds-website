"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Button } from "@/components/ui/Button";
import { PasswordInput } from "@/components/ui/PasswordInput";   
import type { AuthState } from "@/lib/auth-actions";

interface Props {
  mode: "login" | "signup";
  action: (state: AuthState, formData: FormData) => Promise<AuthState>;
  next?: string;
}

export function AuthForm({ mode, action, next }: Props) {
  const [state, formAction, pending] = useActionState(action, {});
  const signup = mode === "signup";
  const fe = state.fieldErrors ?? {};

  return (
    <form action={formAction} noValidate className="space-y-5">
      {next && <input type="hidden" name="next" value={next} />}
      {signup && (
        <Field label="Full name" error={fe.fullName}>
          <input name="fullName" autoComplete="name" required className="field" />
        </Field>
      )}
      <Field label="Email address" error={fe.email}>
        <input name="email" type="email" autoComplete="email" required className="field" />
      </Field>
      <Field
  label="Password"
  error={fe.password}
  hint={signup ? "At least 8 characters." : undefined}
>
  <PasswordInput
    name="password"
    autoComplete={signup ? "new-password" : "current-password"}
    required
  />
</Field>

      {state.error && (
        <p
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          {state.error}
        </p>
      )}
      {state.notice && (
        <p
          role="status"
          className="rounded-lg border border-brand-600/30 bg-brand-50 px-4 py-3 text-sm text-brand-800"
        >
          {state.notice}
        </p>
      )}

      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Please wait" : signup ? "Create account" : "Sign in"}
      </Button>

      <p className="text-center text-sm text-ink-muted">
        {signup ? (
          <>
            Already registered?{" "}
            <Link href="/login" className="text-brand-700 underline">
              Sign in
            </Link>
          </>
        ) : (
          <>
            New here?{" "}
            <Link href="/signup" className="text-brand-700 underline">
              Create an account
            </Link>
          </>
        )}
      </p>
    </form>
  );
}

function Field({
  label,
  error,
  hint,
  children,
}: {
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-display text-sm font-medium text-slate-brand">
        {label}
      </span>
      {children}
      {hint && !error && <span className="mt-1.5 block text-sm text-ink-subtle">{hint}</span>}
      {error && <span className="mt-1.5 block text-sm text-red-700">{error}</span>}
    </label>
  );
}
