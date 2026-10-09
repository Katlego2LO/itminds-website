import type { Metadata } from "next";

export const metadata: Metadata = { title: "Progress", robots: { index: false } };

export default function ProgressPage() {
  return (
    <div className="p-5 sm:p-8">
      <h1 className="text-2xl">Progress</h1>
      <p className="mt-3 text-ink-muted">
        This section will be built once the learning platform is confirmed.
      </p>
    </div>
  );
}
