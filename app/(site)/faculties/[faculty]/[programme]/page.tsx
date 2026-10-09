import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getFaculty, getProgramme, getProgrammes } from "@/lib/data/queries";
import { PageHeader, Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Pending } from "@/components/ui/Pending";

type Props = { params: Promise<{ faculty: string; programme: string }> };

export async function generateStaticParams() {
  return (await getProgrammes()).map((p) => ({ faculty: p.facultySlug, programme: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { faculty, programme } = await params;
  const p = await getProgramme(faculty, programme);
  return { title: p?.name ?? "Programme" };
}

export default async function ProgrammePage({ params }: Props) {
  const { faculty: fs, programme: ps } = await params;
  const [faculty, programme] = await Promise.all([getFaculty(fs), getProgramme(fs, ps)]);
  if (!faculty || !programme) notFound();

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
            <div>
              <h2 className="text-2xl">Overview</h2>
              <p className="prose-copy mt-4">
                {programme.summary ??
                  "Programme overview to be published. Contact us for the current outline."}
              </p>
            </div>
            <div>
              <h2 className="text-2xl">Curriculum</h2>
              <p className="prose-copy mt-4">
                <Pending>Curriculum highlights to be published.</Pending>
              </p>
            </div>
            <div>
              <h2 className="text-2xl">Career outcomes</h2>
              <p className="prose-copy mt-4">
                <Pending>Career outcomes to be published.</Pending>
              </p>
            </div>
          </div>

          <aside className="h-fit rounded-card border border-line bg-white p-6 shadow-card">
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
    </>
  );
}
