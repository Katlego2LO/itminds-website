import type { Metadata } from "next";
import Link from "next/link";
import { Bell, Clock, Flame, Play, Star } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { signOut } from "@/lib/auth-actions";
import { NotesPanel } from "@/components/dashboard/NotesPanel";
import { Logo } from "@/components/layout/Logo";

export const metadata: Metadata = { title: "Dashboard", robots: { index: false } };

// Placeholder learner data. Replaced by the LMS integration once the platform is confirmed (spec 9, item 6).
const inProgress = [
  {
    title: "Web Development",
    faculty: "Software Development",
    done: 18,
    total: 40,
    left: "2 hours left",
  },
  {
    title: "Cloud Computing",
    faculty: "Networking & Cloud",
    done: 11,
    total: 36,
    left: "5 hours left",
  },
];
const recommended = [
  { title: "AI Prompt Engineering", faculty: "Emerging Tech & Innovation", level: "NQF 5" },
  { title: "Data Analytics", faculty: "Data & AI Technologies", level: "NQF 5" },
  { title: "UI/UX Design", faculty: "Digital Design & Multimedia", level: "NQF 4" },
  { title: "Cybersecurity", faculty: "Networking & Cloud", level: "NQF 5" },
];
const week = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const studied = new Set([0, 1, 2]);

export default async function DashboardPage() {
  let userId: string | null = null;
  let name = "Learner";
  if (isSupabaseConfigured) {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    userId = data.user?.id ?? null;
    if (userId) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", userId)
        .maybeSingle();
      name = profile?.full_name || data.user?.email?.split("@")[0] || name;
    }
  }

  return (
    <>
      <header className="flex h-[4.25rem] items-center justify-between gap-4 border-b border-line bg-white px-5 sm:px-8">
        <div className="lg:hidden">
          <Logo />
        </div>
        <h1 className="hidden font-display text-lg font-semibold lg:block">Dashboard</h1>
        <div className="flex items-center gap-3">
          <button
            aria-label="Notifications"
            className="grid h-10 w-10 place-items-center rounded-lg border border-line text-ink-muted"
          >
            <Bell size={18} strokeWidth={1.5} />
          </button>
          <form action={signOut}>
            <button className="h-10 rounded-lg border border-line px-4 font-display text-sm font-medium text-slate-brand hover:border-slate-brand">
              Sign out
            </button>
          </form>
        </div>
      </header>

      <div className="grid gap-6 p-5 sm:p-8 xl:grid-cols-[1fr_20rem]">
        <div className="space-y-8">
          {!isSupabaseConfigured && (
            <p className="rounded-lg border border-line bg-white px-4 py-3 text-sm text-ink-muted">
              Preview mode: Supabase is not connected, so this page shows sample data and saves
              notes on this device only.
            </p>
          )}

          <section>
            <h2 className="mb-4 text-xl">Continue learning</h2>
            <ul className="grid gap-4 md:grid-cols-2">
              {inProgress.map((c) => {
                const pct = Math.round((c.done / c.total) * 100);
                return (
                  <li key={c.title} className="rounded-card border border-line bg-white p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.1em] text-ink-subtle">
                      {c.faculty}
                    </p>
                    <h3 className="mt-1 text-lg">{c.title}</h3>
                    <div
                      className="mt-4 h-1.5 overflow-hidden rounded-full bg-surface-sunken"
                      role="progressbar"
                      aria-valuenow={pct}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`${c.title} progress`}
                    >
                      <div
                        className="h-full rounded-full bg-brand-600"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <div className="mt-3 flex items-center justify-between text-sm text-ink-muted">
                      <span>
                        {c.done}/{c.total} lessons
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock size={14} strokeWidth={1.5} aria-hidden />
                        {c.left}
                      </span>
                    </div>
                    <Link
                      href="/dashboard/courses"
                      className="mt-4 inline-flex items-center gap-1.5 font-display text-sm font-medium text-brand-700"
                    >
                      <Play size={14} strokeWidth={1.5} aria-hidden /> Resume course
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-xl">Recommended for you</h2>
            <ul className="grid gap-4 sm:grid-cols-2">
              {recommended.map((c) => (
                <li
                  key={c.title}
                  className="overflow-hidden rounded-card border border-line bg-white"
                >
                  <div
                    className="aspect-[16/5] bg-gradient-to-br from-brand-100 to-surface-warm"
                    aria-hidden
                  />
                  <div className="p-5">
                    <h3 className="text-lg">{c.title}</h3>
                    <p className="mt-1 text-sm text-ink-muted">{c.faculty}</p>
                    <p className="mt-3 inline-flex items-center gap-1 text-sm text-ink-muted">
                      <Star size={14} strokeWidth={1.5} aria-hidden />
                      {c.level}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="space-y-6">
          <section className="rounded-card border border-line bg-white p-5">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-brand-50 font-display text-lg font-semibold text-brand-800">
                {name.charAt(0).toUpperCase()}
              </span>
              <div>
                <p className="font-display font-semibold text-slate-brand">{name}</p>
                <p className="text-sm text-ink-muted">Student</p>
              </div>
            </div>
            <dl className="mt-5 grid grid-cols-2 gap-3 text-center">
              <div className="rounded-lg bg-surface-warm p-3">
                <dd className="font-display text-xl font-semibold">3</dd>
                <dt className="text-xs text-ink-muted">Day streak</dt>
              </div>
              <div className="rounded-lg bg-surface-warm p-3">
                <dd className="font-display text-xl font-semibold">2</dd>
                <dt className="text-xs text-ink-muted">In progress</dt>
              </div>
            </dl>
          </section>

          <section className="rounded-card border border-line bg-white p-5">
            <h2 className="flex items-center gap-2 text-lg">
              <Flame size={18} strokeWidth={1.5} className="text-elearn" aria-hidden />
              Weekly streak
            </h2>
            <ol className="mt-4 grid grid-cols-7 gap-1.5 text-center text-xs">
              {week.map((d, i) => (
                <li key={d}>
                  <span
                    className={`mb-1 block rounded-md py-2 font-display font-medium ${studied.has(i) ? "bg-brand-700 text-white" : "bg-surface-warm text-ink-subtle"}`}
                  >
                    {i + 1}
                  </span>
                  <span className="text-ink-subtle">{d}</span>
                </li>
              ))}
            </ol>
          </section>

          <NotesPanel userId={userId} />
        </div>
      </div>
    </>
  );
}
