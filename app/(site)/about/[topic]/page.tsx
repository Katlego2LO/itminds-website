import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader, Section } from "@/components/ui/Section";
import { CycleSection } from "@/components/sections/CycleSection";
import { AccreditationStrip } from "@/components/sections/AccreditationStrip";
import { SupportGrid } from "@/components/sections/SupportGrid";
import { Pending } from "@/components/ui/Pending";
import { values } from "@/lib/data/content";

const topics = {
  "mission-vision": { title: "Mission and Vision" },
  "our-cycle": { title: "Our Cycle" },
  governance: { title: "Governance" },
  accreditation: { title: "Accreditation" },
  "student-support": { title: "Student Support" },
} as const;

type Slug = keyof typeof topics;
type Props = { params: Promise<{ topic: string }> };

export function generateStaticParams() {
  return Object.keys(topics).map((topic) => ({ topic }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = topics[(await params).topic as Slug];
  return { title: t?.title ?? "About" };
}

export default async function AboutTopic({ params }: Props) {
  const slug = (await params).topic as Slug;
  const topic = topics[slug];
  if (!topic) notFound();

  return (
    <>
      <PageHeader
        eyebrow="About"
        title={topic.title}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: topic.title },
        ]}
      />
      <Section>
        {slug === "mission-vision" && (
          <div className="space-y-10">
            <div>
              <h2 className="text-2xl">Mission</h2>
              <p className="prose-copy mt-3">
                To provide quality, accessible and industry-relevant education, training and
                practical skills that empower individuals to succeed in today&apos;s digital world.
              </p>
            </div>
            <div>
              <h2 className="text-2xl">Vision</h2>
              <p className="prose-copy mt-3">
                To be a leading centre of excellence in digital education, research and innovation,
                driving digital transformation and empowering individuals to lead in an
                interconnected and evolving digital world.
              </p>
            </div>
            <ul className="flex flex-wrap gap-2">
              {values.map((v) => (
                <li key={v} className="rounded-full border border-line px-4 py-1.5 text-sm">
                  {v}
                </li>
              ))}
            </ul>
          </div>
        )}
        {slug === "our-cycle" && <CycleSection />}
        {slug === "governance" && (
          <p className="prose-copy">
            <Pending>
              Governance structure and leadership profiles to be confirmed by the client.
            </Pending>
          </p>
        )}
        {slug === "accreditation" && <AccreditationStrip />}
        {slug === "student-support" && <SupportGrid />}
      </Section>
    </>
  );
}
