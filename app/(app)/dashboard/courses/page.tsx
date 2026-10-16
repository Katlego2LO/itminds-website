import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Courses",
  robots: { index: false },
};

export default function CoursesPage() {
  // Placeholder – will be replaced by real enrolments from Supabase / admin
  const courses: { id: string; title: string; faculty: string; progress: number }[] = [];

  return (
    <div className="mx-auto max-w-4xl space-y-8 p-5 sm:p-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-brand">My courses</h1>
        <p className="mt-1 text-ink-muted">
          Courses you are enrolled in will appear here.
        </p>
      </div>

      {courses.length === 0 ? (
        <div className="rounded-card border border-line bg-white px-6 py-16 text-center">
          <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-brand-50 text-brand-700">
            <BookOpen size={28} strokeWidth={1.5} />
          </div>
          <h2 className="text-lg font-semibold text-slate-brand">No courses yet</h2>
          <p className="mx-auto mt-2 max-w-sm text-sm text-ink-muted">
            When you enrol in a programme or short course, it will show up here with your
            progress.
          </p>
          <Link
            href="/it-school"
            className="mt-6 inline-flex h-10 items-center justify-center rounded-lg bg-brand-700 px-5 text-sm font-medium text-white hover:bg-brand-800"
          >
            Browse programmes
          </Link>
        </div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {/* Real course cards will go here later */}
        </ul>
      )}
    </div>
  );
}