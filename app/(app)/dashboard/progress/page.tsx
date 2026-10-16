import type { Metadata } from "next";
import { BarChart3 } from "lucide-react";

export const metadata: Metadata = {
  title: "Progress",
  robots: { index: false },
};

export default function ProgressPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8 p-5 sm:p-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-brand">Progress</h1>
        <p className="mt-1 text-ink-muted">
          Track how far you have come across your courses.
        </p>
      </div>

      <div className="rounded-card border border-line bg-white px-6 py-16 text-center">
        <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-brand-50 text-brand-700">
          <BarChart3 size={28} strokeWidth={1.5} />
        </div>
        <h2 className="text-lg font-semibold text-slate-brand">No progress to show yet</h2>
        <p className="mx-auto mt-2 max-w-sm text-sm text-ink-muted">
          Once you start learning, your completion rates, streaks and milestones will
          appear here.
        </p>
      </div>
    </div>
  );
}