"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Button } from "@/components/ui/Button";
import { PasswordInput } from "@/components/ui/PasswordInput";
import type { AuthState } from "@/lib/auth-actions";

type Action = (state: AuthState, formData: FormData) => Promise<AuthState>;

function Messages({ state }: { state: AuthState }) {
  return (
    <>
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
    </>
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

export function ForgotPasswordForm({ action }: { action: Action }) {
  const [state, formAction, pending] = useActionState(action, {});
  const fe = state.fieldErrors ?? {};
  return (
    <form action={formAction} noValidate className="space-y-5">
      <Field label="Email address" error={fe.email}>
        <input name="email" type="email" autoComplete="email" required className="field" />
      </Field>
      <Messages state={state} />
      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Please wait" : "Send reset link"}
      </Button>
      <p className="text-center text-sm text-ink-muted">
        <Link href="/login" className="text-brand-700 underline">
          Back to sign in
        </Link>
      </p>
    </form>
  );
}

export function ResetPasswordForm({ action }: { action: Action }) {
  const [state, formAction, pending] = useActionState(action, {});
  const fe = state.fieldErrors ?? {};
  return (
    <form action={formAction} noValidate className="space-y-5">
      
      <Field label="New password" error={fe.password} hint="At least 8 characters.">
  <PasswordInput name="password" autoComplete="new-password" required />
</Field>
<Field label="Confirm new password" error={fe.confirm}>
  <PasswordInput name="confirm" autoComplete="new-password" required />
</Field>
      <Messages state={state} />
      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Please wait" : "Save new password"}
      </Button>
    </form>
  );
}