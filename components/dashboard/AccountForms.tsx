"use client";

import { useActionState } from "react";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { useFormStatus } from "react-dom";
import {
  updateDisplayName,
  changePassword,
  type ActionState,
} from "@/lib/account-actions";

const initial: ActionState = { ok: false, message: "" };

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-10 items-center justify-center rounded-lg bg-brand-700 px-5 text-sm font-medium text-white transition hover:bg-brand-800 disabled:opacity-60"
    >
      {pending ? "Saving…" : label}
    </button>
  );
}

export function NameForm({ currentName }: { currentName: string }) {
  const [state, action] = useActionState(updateDisplayName, initial);

  return (
    <form action={action} className="space-y-4">
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-slate-brand">
          Full name
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          defaultValue={currentName}
          required
          minLength={2}
          maxLength={80}
          className="mt-1.5 w-full max-w-md rounded-lg border border-line bg-white px-3 py-2 text-[0.95rem] outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-100"
        />
      </div>

      {state.message && (
        <p
          className={`text-sm ${state.ok ? "text-brand-700" : "text-red-600"}`}
          role="status"
        >
          {state.message}
        </p>
      )}

      <SubmitButton label="Save name" />
    </form>
  );
}

export function PasswordForm() {
  const [state, action] = useActionState(changePassword, initial);

  return (
    <form action={action} className="space-y-4">
      <div>
  <label htmlFor="password" className="block text-sm font-medium text-slate-brand">
    New password
  </label>
  <PasswordInput
    id="password"
    name="password"
    autoComplete="new-password"
    required
    className="mt-1.5 w-full max-w-md"
  />
</div>
<div>
  <label htmlFor="confirm" className="block text-sm font-medium text-slate-brand">
    Confirm new password
  </label>
  <PasswordInput
    id="confirm"
    name="confirm"
    autoComplete="new-password"
    required
    className="mt-1.5 w-full max-w-md"
  />
</div>

      {state.message && (
        <p
          className={`text-sm ${state.ok ? "text-brand-700" : "text-red-600"}`}
          role="status"
        >
          {state.message}
        </p>
      )}

      <SubmitButton label="Change password" />
    </form>
  );
}