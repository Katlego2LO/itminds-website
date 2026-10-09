import type { Metadata } from "next";

export const metadata: Metadata = { title: "Courses", robots: { index: false } };

export default function CoursesPage() {
  return (
    <div className="p-5 sm:p-8">
      <h1 className="text-2xl">Courses</h1>
      <p className="mt-3 text-ink-muted">
        This section will be built once the learning platform is confirmed.
      </p>
    </div>
  );
}
