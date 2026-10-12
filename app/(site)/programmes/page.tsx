import type { Metadata } from "next";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { getFaculties, getProgrammes } from "@/lib/data/queries";
import { applyFilters, filterHref, parseFilters } from "@/lib/data/filters";
import { PageHeader, Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "All programmes",
  description: "Browse all IT Minds Institute programmes by faculty, NQF level and mode of study.",
};

const accent = {
  software: "bg-faculty-software",
  networking: "bg-faculty-networking",
  data: "bg-faculty-data",
  support: "bg-faculty-support",
  design: "bg-faculty-design",
  emerging: "bg-faculty-emerging",
} as const;

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default async function ProgrammesPage({ searchParams }: Props) {
  const [faculties, all] = await Promise.all([getFaculties(), getProgrammes()]);
  const filters = parseFilters(
    await searchParams,
    faculties.map((f) => f.slug),
  );
  const results = applyFilters(all, filters);
  const modes = [...new Set(all.map((p) => p.mode).filter((m): m is string => Boolean(m)))];
  const facultyBySlug = new Map(faculties.map((f) => [f.slug, f]));
  const active = Boolean(filters.faculty || filters.level || filters.mode);

  return (
    <>
      <PageHeader
        eyebrow="Study with us"
        title="All programmes"
        lead="Filter by faculty, NQF level and mode of study to find the programme that fits."
        crumbs={[{ label: "Home", href: "/" }, { label: "Programmes" }]}
      />
      <Section>
        <div className="grid gap-10 lg:grid-cols-[16rem_1fr]">
          <aside aria-label="Filters" className="space-y-7 lg:sticky lg:top-24 lg:h-fit">
            <FilterGroup title="Faculty">
              <Chip href={filterHref(filters, { faculty: undefined })} on={!filters.faculty}>
                All faculties
              </Chip>
              {faculties.map((f) => (
                <Chip
                  key={f.slug}
                  href={filterHref(filters, { faculty: f.slug })}
                  on={filters.faculty === f.slug}
                >
                  <span
                    className={cn("mr-2 inline-block h-2 w-2 rounded-full", accent[f.accent])}
                    aria-hidden
                  />
                  {f.name}
                </Chip>
              ))}
            </FilterGroup>
            <FilterGroup title="NQF level">
              <Chip href={filterHref(filters, { level: undefined })} on={!filters.level}>
                Any level
              </Chip>
              {([4, 5] as const).map((l) => (
                <Chip key={l} href={filterHref(filters, { level: l })} on={filters.level === l}>
                  Level {l}
                </Chip>
              ))}
            </FilterGroup>
            {modes.length > 0 && (
              <FilterGroup title="Mode of study">
                <Chip href={filterHref(filters, { mode: undefined })} on={!filters.mode}>
                  Any mode
                </Chip>
                {modes.map((m) => (
                  <Chip key={m} href={filterHref(filters, { mode: m })} on={filters.mode === m}>
                    {m}
                  </Chip>
                ))}
              </FilterGroup>
            )}
            {active && (
              <Link href="/programmes" className="inline-block text-sm text-brand-700 underline">
                Clear all filters
              </Link>
            )}
          </aside>

          <div>
            <p aria-live="polite" className="mb-5 text-sm text-ink-muted">
              Showing {results.length} of {all.length} programmes
            </p>
            {results.length === 0 ? (
              <div className="rounded-card border border-line bg-surface-warm p-8">
                <h2 className="text-xl">No programmes match those filters</h2>
                <p className="mt-2 text-ink-muted">Try removing a filter to see more.</p>
                <Link href="/programmes" className="mt-4 inline-block text-brand-700 underline">
                  Clear all filters
                </Link>
              </div>
            ) : (
              <ul className="grid gap-4 sm:grid-cols-2">
                {results.map((p) => {
                  const f = facultyBySlug.get(p.facultySlug);
                  return (
                    <li key={`${p.facultySlug}/${p.slug}`}>
                      <Link
                        href={`/faculties/${p.facultySlug}/${p.slug}`}
                        className="relative flex h-full flex-col overflow-hidden rounded-card border border-line bg-white p-5 pt-6 transition duration-180 hover:border-slate-brand/40"
                      >
                        {f && (
                          <span
                            className={cn("absolute inset-x-0 top-0 h-1", accent[f.accent])}
                            aria-hidden
                          />
                        )}
                        <span className="text-xs font-semibold uppercase tracking-[0.1em] text-ink-subtle">
                          {f?.name}
                        </span>
                        <span className="mt-1 font-display text-lg font-medium text-slate-brand">
                          {p.name}
                        </span>
                        <span className="mt-4 flex flex-wrap gap-2 text-xs">
                          <span className="rounded-full border border-line px-2.5 py-0.5">
                            NQF {p.nqfLevel}
                          </span>
                          {p.mode && (
                            <span className="rounded-full border border-line px-2.5 py-0.5">
                              {p.mode}
                            </span>
                          )}
                          {p.aiIntegrated && (
                            <span className="rounded-full border border-brand-600/30 bg-brand-50 px-2.5 py-0.5 text-brand-800">
                              AI integrated
                            </span>
                          )}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-3 font-display text-sm font-semibold uppercase tracking-[0.12em] text-slate-brand">
        {title}
      </h2>
      <ul className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">{children}</ul>
    </div>
  );
}

function Chip({ href, on, children }: { href: string; on: boolean; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        aria-current={on ? "true" : undefined}
        className={cn(
          "inline-flex w-full items-center rounded-lg border px-3 py-2 text-[0.95rem] transition-colors duration-180",
          on
            ? "border-brand-700 bg-brand-50 font-medium text-brand-800"
            : "border-line bg-white text-ink-muted hover:border-slate-brand/40",
        )}
      >
        {children}
      </Link>
    </li>
  );
}
