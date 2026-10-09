"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type SaveStatus = "idle" | "saving" | "saved" | "error";

interface Options<T> {
  /** Current value to persist. A change triggers a debounced save. */
  value: T;
  /** Persist the value. Throw to signal failure. */
  onSave: (value: T) => Promise<void>;
  delay?: number;
  enabled?: boolean;
}

/**
 * Debounced autosave. Saves shortly after the user stops typing, flushes when
 * the tab is hidden or closed, and retries once the connection returns.
 */
export function useAutosave<T>({ value, onSave, delay = 1200, enabled = true }: Options<T>) {
  const [status, setStatus] = useState<SaveStatus>("idle");
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const latest = useRef(value);
  const lastSaved = useRef(JSON.stringify(value));
  const saveRef = useRef(onSave);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  latest.current = value;
  saveRef.current = onSave;

  const flush = useCallback(async () => {
    clearTimeout(timer.current);
    const snapshot = JSON.stringify(latest.current);
    if (snapshot === lastSaved.current) return;
    setStatus("saving");
    try {
      await saveRef.current(latest.current);
      lastSaved.current = snapshot;
      setSavedAt(new Date());
      setStatus("saved");
    } catch {
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    if (!enabled || JSON.stringify(value) === lastSaved.current) return;
    timer.current = setTimeout(flush, delay);
    return () => clearTimeout(timer.current);
  }, [value, delay, enabled, flush]);

  useEffect(() => {
    if (!enabled) return;
    const onHide = () => document.visibilityState === "hidden" && void flush();
    const onOnline = () => void flush();
    document.addEventListener("visibilitychange", onHide);
    window.addEventListener("pagehide", onHide);
    window.addEventListener("online", onOnline);
    return () => {
      document.removeEventListener("visibilitychange", onHide);
      window.removeEventListener("pagehide", onHide);
      window.removeEventListener("online", onOnline);
    };
  }, [enabled, flush]);

  return { status, savedAt, saveNow: flush };
}
