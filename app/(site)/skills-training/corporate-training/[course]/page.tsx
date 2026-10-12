import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTrainingCourse, getTrainingCourses } from "@/lib/data/queries";
import { PageHeader, Section } from "@/components/ui/Section";
import { Pending } from "@/components/ui/Pending";
import { EnquiryForm } from "@/components/sections/EnquiryForm";

type Props = { params: Promise<{ course: string }> };

export async function generateStaticParams() {
  return (await getTrainingCourses()).map((c) => ({ course: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = await getTrainingCourse((await params).course);
  return {
    title: c?.name ?? "Course",
    description:
      c?.summary ??
      (c
        ? `${c.name}: a short corporate course from IT Minds Institute in partnership with PATRIDOS.`
        : undefined),
  };
}

export default async function CoursePage({ params }: Props) {
  const slug = (await params).course;
  const [course, all] = await Promise.all([getTrainingCourse(slug), getTrainingCourses()]);
  if (!course) notFound();
  const others = all.filter((c) => c.slug !== course.slug && c.track === course.track).slice(0, 6);
  const outcomes = course.outcomes ?? [];

  const facts: [string, React.ReactNode][] = [
    ["Audience", course.audience ?? <Pending />],
    ["Duration", course.duration ?? <Pending />],
    ["Delivery", course.deliveryMode ?? <Pending />],
  ];

  return (
    <>
      <PageHeader
        eyebrow="Corporate short course"
        title={course.name}
        lead={course.summary ?? undefined}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Skills & Training", href: "/skills-training" },
          { label: course.name },
        ]}
      />
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_22rem]">
          <div className="space-y-8">
            {outcomes.length > 0 ? (
              <div>
                <h2 className="text-2xl">What participants learn</h2>
                <ul className="mt-4 list-disc space-y-1.5 pl-5 text-ink-muted marker:text-brand-700">
                  {outcomes.map((o) => (
                    <li key={o}>{o}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="rounded-card border border-line bg-surface-warm p-6">
                <h2 className="text-xl">Course outline on request</h2>
                <p className="mt-2 text-ink-muted">
                  We tailor each course to your team. Send an enquiry and we will share the outline
                  and options.
                </p>
              </div>
            )}
            <p className="prose-copy">
              This is a short, non-credit-bearing course delivered in partnership with PATRIDOS.
              Accredited, NQF-aligned qualifications are listed under{" "}
              <Link href="/faculties" className="text-brand-700 underline">
                Faculties
              </Link>
              .
            </p>
          </div>
          <dl className="h-fit divide-y divide-line rounded-card border border-line bg-white p-6 shadow-card lg:sticky lg:top-24">
            {facts.map(([k, v]) => (
              <div key={k} className="py-3 first:pt-0 last:pb-0">
                <dt className="text-sm text-ink-subtle">{k}</dt>
                <dd className="mt-0.5 font-medium text-slate-brand">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section tone="warm">
        <h2 className="mb-6 text-2xl">Enquire about this course</h2>
        <div className="max-w-2xl">
          <EnquiryForm type="corporate" showOrganisation />
        </div>
      </Section>

      {others.length > 0 && (
        <Section>
          <h2 className="mb-5 text-2xl">Other corporate courses</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {others.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/skills-training/corporate-training/${c.slug}`}
                  className="block rounded-card border border-line bg-white p-4 font-display font-medium text-slate-brand transition-colors duration-180 hover:border-brand-700"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}
    </>
  );
}
