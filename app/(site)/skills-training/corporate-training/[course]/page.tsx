import type { Metadata } from "next";
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
  return { title: c?.name ?? "Course" };
}

export default async function CoursePage({ params }: Props) {
  const course = await getTrainingCourse((await params).course);
  if (!course) notFound();
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
          <div>
            <h2 className="text-2xl">Course outline</h2>
            <p className="prose-copy mt-4">
              <Pending>Course description and outcomes to be published.</Pending>
            </p>
            <p className="prose-copy mt-4">
              This is a short, non-credit-bearing course. Accredited qualifications are listed under
              Faculties.
            </p>
          </div>
          <dl className="h-fit divide-y divide-line rounded-card border border-line bg-white p-6 shadow-card">
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
    </>
  );
}
