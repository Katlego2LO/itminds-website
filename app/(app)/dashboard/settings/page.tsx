import type { Metadata } from "next";

export const metadata: Metadata = { title: "Settings", robots: { index: false } };

export default function SettingsPage() {
  return (
    <div className="p-5 sm:p-8">
      <h1 className="text-2xl">Settings</h1>
      <p className="mt-3 text-ink-muted">
        This section will be built once the learning platform is confirmed.
      </p>
    </div>
  );
}
