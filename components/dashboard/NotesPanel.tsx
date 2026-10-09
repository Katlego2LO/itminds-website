"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { useAutosave } from "@/hooks/useAutosave";

const KEY = "dashboard-notes";

/**
 * Example of the platform-wide autosave pattern: debounce, flush on tab hide,
 * retry when back online. Reuse useAutosave for any editable content.
 */
export function NotesPanel({ userId }: { userId: string | null }) {
  const [text, setText] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        if (userId && isSupabaseConfigured) {
          const { data } = await createClient()
            .from("autosave_drafts")
            .select("content")
            .eq("key", KEY)
            .maybeSingle();
          if (!cancelled && data?.content && typeof data.content.text === "string")
            setText(data.content.text);
        } else {
          const raw = localStorage.getItem(KEY);
          if (!cancelled && raw) setText(raw);
        }
      } catch {
        /* start empty */
      }
      if (!cancelled) setLoaded(true);
    })();
    return () => {
      cancelled = true;
    };
  }, [userId]);

  const { status, savedAt } = useAutosave({
    value: text,
    enabled: loaded,
    onSave: async (value) => {
      if (userId && isSupabaseConfigured) {
        const { error } = await createClient()
          .from("autosave_drafts")
          .upsert({
            user_id: userId,
            key: KEY,
            content: { text: value },
            updated_at: new Date().toISOString(),
          });
        if (error) throw error;
      } else {
        localStorage.setItem(KEY, value);
      }
    },
  });

  return (
    <section className="rounded-card border border-line bg-white p-5">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg">Study notes</h2>
        <span aria-live="polite" className="text-xs text-ink-subtle">
          {status === "saving" && "Saving"}
          {status === "saved" &&
            savedAt &&
            `Saved ${savedAt.toLocaleTimeString("en-ZA", { hour: "2-digit", minute: "2-digit" })}`}
          {status === "error" && (
            <span className="text-red-700">Not saved. Retrying when online.</span>
          )}
        </span>
      </div>
      <label htmlFor="notes" className="sr-only">
        Study notes
      </label>
      <textarea
        id="notes"
        rows={6}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write notes as you study. They save automatically."
        className="field resize-y"
        disabled={!loaded}
      />
    </section>
  );
}
