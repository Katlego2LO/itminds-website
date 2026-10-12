import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getFaculties, getFaculty, getProgrammes } from "@/lib/data/queries";
import { PageHeader, Section } from "@/components/ui/Section";

type Props = { params: Promise<{ faculty: string }> };

export async function generateStaticParams() {
  return (await getFaculties()).map((f) => ({ faculty: f.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const f = await getFaculty((await params).faculty);
  return { title: f?.name ?? "Faculty", description: f?.summary };
}

export default async function FacultyPage({ params }: Props) {
  const { faculty: slug } = await params;
  const faculty = await getFaculty(slug);
  if (!faculty) notFound();
  const programmes = await getProgrammes(slug);
  const levels = [...new Set(programmes.map((p) => p.nqfLevel))].sort();

  return (
    <>
      <PageHeader
        eyebrow="Faculty"
        title={faculty.name}
        lead={faculty.summary}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Faculties", href: "/it-school" },
          { label: faculty.name },
        ]}
      />
      <Section>
        {levels.map((level) => (
          <div key={level} className="mb-12 last:mb-0">
            <h2 className="mb-5 text-2xl">NQF Level {level}</h2>
            <ul className="divide-y divide-line rounded-card border border-line bg-white">
              {programmes
                .filter((p) => p.nqfLevel === level)
                .map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/it-school/${slug}/${p.slug}`}
                      className="flex items-center justify-between gap-4 p-5 transition-colors duration-180 hover:bg-surface-warm"
                    >
                      <span className="font-display text-lg font-medium text-slate-brand">
                        {p.name}
                      </span>
                      {p.aiIntegrated && (
                        <span className="rounded-full border border-brand-600/30 bg-brand-50 px-2.5 py-0.5 text-xs font-medium text-brand-800">
                          AI integrated
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </Section>
    </>
  );
}
