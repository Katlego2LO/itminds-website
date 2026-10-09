"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { useAutosave } from "@/hooks/useAutosave";

type EnquiryType = "general" | "admissions" | "corporate" | "business_school";

interface Draft {
  name: string;
  email: string;
  phone: string;
  organisation: string;
  message: string;
}

const empty: Draft = { name: "", email: "", phone: "", organisation: "", message: "" };

export function EnquiryForm({
  type = "general",
  showOrganisation = false,
}: {
  type?: EnquiryType;
  showOrganisation?: boolean;
}) {
  const draftKey = `enquiry-draft:${type}`;
  const pathname = usePathname();
  const [draft, setDraft] = useState<Draft>(empty);
  const [restored, setRestored] = useState(false);
  const [state, setState] = useState<{
    status: "idle" | "sending" | "sent" | "error";
    errors?: Record<string, string>;
    message?: string;
  }>({ status: "idle" });

  // Restore an unfinished enquiry from this browser.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(draftKey);
      if (raw) setDraft({ ...empty, ...(JSON.parse(raw) as Partial<Draft>) });
    } catch {
      /* storage unavailable */
    }
    setRestored(true);
  }, [draftKey]);

  const { status: saveStatus } = useAutosave({
    value: draft,
    enabled: restored && state.status !== "sent",
    delay: 600,
    onSave: async (value) => localStorage.setItem(draftKey, JSON.stringify(value)),
  });

  function update<K extends keyof Draft>(key: K, value: string) {
    setDraft((d) => ({ ...d, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState({ status: "sending" });
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/enquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...Object.fromEntries(form), type, sourcePage: pathname }),
    }).catch(() => null);

    if (res?.ok) {
      try {
        localStorage.removeItem(draftKey);
      } catch {
        /* ignore */
      }
      setDraft(empty);
      setState({ status: "sent" });
      return;
    }
    const body = res ? await res.json().catch(() => ({})) : {};
    setState({
      status: "error",
      errors: body.fieldErrors,
      message: body.error ?? "We could not send your enquiry. Please try again.",
    });
  }

  if (state.status === "sent") {
    return (
      <div role="status" className="rounded-card border border-brand-600/30 bg-brand-50 p-6">
        <h3 className="text-xl">Thank you. We have your enquiry.</h3>
        <p className="mt-2 text-ink-muted">A member of the team will reply by email.</p>
      </div>
    );
  }

  const err = state.errors ?? {};
  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" error={err.name}>
          <input
            name="name"
            className="field"
            autoComplete="name"
            required
            value={draft.name}
            onChange={(e) => update("name", e.target.value)}
          />
        </Field>
        <Field label="Email address" error={err.email}>
          <input
            name="email"
            type="email"
            className="field"
            autoComplete="email"
            required
            value={draft.email}
            onChange={(e) => update("email", e.target.value)}
          />
        </Field>
        <Field label="Phone (optional)" error={err.phone}>
          <input
            name="phone"
            type="tel"
            className="field"
            autoComplete="tel"
            value={draft.phone}
            onChange={(e) => update("phone", e.target.value)}
          />
        </Field>
        {showOrganisation && (
          <Field label="Organisation" error={err.organisation}>
            <input
              name="organisation"
              className="field"
              autoComplete="organization"
              value={draft.organisation}
              onChange={(e) => update("organisation", e.target.value)}
            />
          </Field>
        )}
      </div>
      <Field label="Message" error={err.message}>
        <textarea
          name="message"
          rows={5}
          className="field"
          required
          value={draft.message}
          onChange={(e) => update("message", e.target.value)}
        />
      </Field>

      {/* Honeypot: real visitors never see or fill this */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="hidden"
      />

      <label className="flex items-start gap-3 text-sm text-ink-muted">
        <input type="checkbox" name="consent" className="mt-1 h-4 w-4 accent-brand-700" />
        <span>
          I agree that IT Minds Institute may store my details to respond to this enquiry, as
          described in the{" "}
          <a href="/privacy" className="underline">
            privacy policy
          </a>
          .
        </span>
      </label>
      {err.consent && <p className="-mt-3 text-sm text-red-700">{err.consent}</p>}
      {state.status === "error" && !state.errors && (
        <p role="alert" className="text-sm text-red-700">
          {state.message}
        </p>
      )}

      <div className="flex items-center gap-4">
        <Button type="submit" disabled={state.status === "sending"}>
          {state.status === "sending" ? "Sending" : "Send enquiry"}
        </Button>
        <span aria-live="polite" className="text-sm text-ink-subtle">
          {saveStatus === "saving" && "Saving draft"}
          {saveStatus === "saved" && "Draft saved on this device"}
        </span>
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-display text-sm font-medium text-slate-brand">
        {label}
      </span>
      {children}
      {error && <span className="mt-1.5 block text-sm text-red-700">{error}</span>}
    </label>
  );
}
