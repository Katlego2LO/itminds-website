import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, Section, SectionHeading } from "@/components/ui/Section";
import { CycleSection } from "@/components/sections/CycleSection";
import { AccreditationStrip } from "@/components/sections/AccreditationStrip";
import { values } from "@/lib/data/content";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Quality, future-focused IT education"
        lead="We equip, inspire and empower individuals with the knowledge, skills and mindset to solve problems, create solutions and transform lives."
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />
      <Section>
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-2xl">Our mission</h2>
            <p className="prose-copy mt-3">
              To provide quality, accessible and industry-relevant education, training and practical
              skills that empower individuals to succeed in today&apos;s digital world.
            </p>
          </div>
          <div>
            <h2 className="text-2xl">Our vision</h2>
            <p className="prose-copy mt-3">
              To be a leading centre of excellence in digital education, research and innovation,
              driving digital transformation and empowering individuals to lead in an interconnected
              and evolving digital world.
            </p>
          </div>
        </div>
      </Section>
      <Section tone="warm">
        <SectionHeading eyebrow="Values" title="What we stand for" />
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <li
              key={v}
              className="rounded-card border border-line bg-white px-5 py-4 font-display font-medium text-slate-brand"
            >
              {v}
            </li>
          ))}
        </ul>
      </Section>
      <Section>
        <SectionHeading eyebrow="Our cycle" title="Learn. Innovate. Empower." />
        <CycleSection />
      </Section>
      <Section tone="warm">
        <SectionHeading eyebrow="Accreditation" title="Quality assured" />
        <AccreditationStrip />
        <p className="mt-6 text-sm">
          <Link href="/about/accreditation" className="text-brand-700 underline">
            Accreditation detail
          </Link>
        </p>
      </Section>
    </>
  );
}
