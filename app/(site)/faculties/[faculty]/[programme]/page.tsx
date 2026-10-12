import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getFaculty, getProgramme, getProgrammes } from "@/lib/data/queries";
import { programmesWithShortCourse } from "@/lib/data/content";
import { PageHeader, Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Pending } from "@/components/ui/Pending";

type Props = { params: Promise<{ faculty: string; programme: string }> };

export async function generateStaticParams() {
  return (await getProgrammes()).map((p) => ({ faculty: p.facultySlug, programme: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { faculty, programme } = await params;
  const [f, p] = await Promise.all([getFaculty(faculty), getProgramme(faculty, programme)]);
  if (!p) return { title: "Programme" };
  return {
    title: p.name,
    description:
      p.summary ??
      `${p.name}: NQF level ${p.nqfLevel} programme in ${f?.name ?? "IT"} at IT Minds Institute.`,
  };
}

export default async function ProgrammePage({ params }: Props) {
  const { faculty: fs, programme: ps } = await params;
  const [faculty, programme, siblings] = await Promise.all([
    getFaculty(fs),
    getProgramme(fs, ps),
    getProgrammes(fs),
  ]);
  if (!faculty || !programme) notFound();

  const curriculum = programme.curriculum ?? [];
  const outcomes = programme.outcomes ?? [];
  const others = siblings.filter((p) => p.slug !== programme.slug);
  const hasShortCourse = programmesWithShortCourse.has(programme.slug);

  const facts: [string, React.ReactNode][] = [
    ["NQF level", programme.nqfLevel],
    ["Qualification type", programme.qualificationType ?? <Pending />],
    ["SAQA ID", programme.saqaId ?? <Pending />],
    ["Duration", programme.duration ?? <Pending />],
    ["Mode of study", programme.mode ?? <Pending />],
    ["Entry requirements", programme.entryRequirements ?? <Pending />],
  ];

  return (
    <>
      <PageHeader
        eyebrow={faculty.name}
        title={programme.name}
        lead={programme.summary ?? undefined}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Faculties", href: "/faculties" },
          { label: faculty.name, href: `/faculties/${faculty.slug}` },
          { label: programme.name },
        ]}
      />
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_22rem]">
          <div className="space-y-12">
            {programme.summary && (
              <div>
                <h2 className="text-2xl">Overview</h2>
                <p className="prose-copy mt-4">{programme.summary}</p>
              </div>
            )}

            {curriculum.length > 0 && (
              <div>
                <h2 className="text-2xl">Curriculum highlights</h2>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {curriculum.map((item) => (
                    <li
                      key={item}
                      className="rounded-lg border border-line bg-white px-4 py-3 text-ink-muted"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {outcomes.length > 0 && (
              <div>
                <h2 className="text-2xl">Career outcomes</h2>
                <ul className="mt-4 list-disc space-y-1.5 pl-5 text-ink-muted marker:text-brand-700">
                  {outcomes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {!programme.summary && curriculum.length === 0 && outcomes.length === 0 && (
              <div className="rounded-card border border-line bg-surface-warm p-6">
                <h2 className="text-xl">Full programme outline on request</h2>
                <p className="mt-2 text-ink-muted">
                  The detailed curriculum and career outcomes for this programme are being
                  finalised. Send us an enquiry and we will share the current outline.
                </p>
              </div>
            )}

            {hasShortCourse && (
              <div className="rounded-card border border-brand-600/30 bg-brand-50 p-6">
                <h2 className="text-lg">Qualification and short course</h2>
                <p className="mt-2 text-ink-muted">
                  This page describes the accredited, NQF-aligned programme. A shorter,
                  non-credit-bearing course on related topics is also available through{" "}
                  <Link
                    href="/skills-training/ai-and-emerging-tech"
                    className="text-brand-800 underline"
                  >
                    Skills & Training
                  </Link>
                  .
                </p>
              </div>
            )}
          </div>

          <aside className="h-fit rounded-card border border-line bg-white p-6 shadow-card lg:sticky lg:top-24">
            <dl className="divide-y divide-line">
              {facts.map(([k, v]) => (
                <div key={k} className="py-3 first:pt-0">
                  <dt className="text-sm text-ink-subtle">{k}</dt>
                  <dd className="mt-0.5 font-medium text-slate-brand">{v}</dd>
                </div>
              ))}
            </dl>
            <ButtonLink href="/admissions" className="mt-5 w-full">
              Apply or enquire
            </ButtonLink>
          </aside>
        </div>
      </Section>

      {others.length > 0 && (
        <Section tone="warm">
          <h2 className="mb-5 text-2xl">More in {faculty.name}</h2>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/faculties/${faculty.slug}/${p.slug}`}
                  className="flex items-center justify-between gap-3 rounded-card border border-line bg-white p-4 transition-colors duration-180 hover:border-brand-700"
                >
                  <span className="font-display font-medium text-slate-brand">{p.name}</span>
                  <span className="text-sm text-ink-subtle">NQF {p.nqfLevel}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}
    </>
  );
}
