import { Hero } from "@/components/sections/Hero";
import { Pathways } from "@/components/sections/Pathways";
import { CycleSection } from "@/components/sections/CycleSection";
import { FacultyCards } from "@/components/sections/FacultyCards";
import { PartnerBanner } from "@/components/sections/PartnerBanner";
import { AccreditationStrip } from "@/components/sections/AccreditationStrip";
import { SupportGrid } from "@/components/sections/SupportGrid";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Section className="pb-4 sm:pb-6">
        <Pathways />
      </Section>
      <Section>
        <SectionHeading eyebrow="Our cycle" title="Learn. Innovate. Empower.">
          A continuous journey: knowledge becomes discovery, ideas become impact, and the people we
          teach open doors for others.
        </SectionHeading>
        <CycleSection />
      </Section>
      <Section tone="warm">
        <SectionHeading eyebrow="Faculties" title="Six faculties, one practical standard">
          Every programme is aligned to the NQF and QCTO occupational qualifications, with AI
          integrated throughout.
        </SectionHeading>
        <FacultyCards />
      </Section>
      <Section>
        <SectionHeading
          eyebrow="Skills & Training"
          title="Training that organisations can put to work"
        >
          Short, practical courses on AI and emerging technology for businesses, public sector teams
          and schools.
        </SectionHeading>
        <PartnerBanner />
        <div className="mt-6">
          <ButtonLink href="/skills-training" variant="dark">
            View all courses
          </ButtonLink>
        </div>
      </Section>
      <Section tone="warm">
        <SectionHeading eyebrow="Accreditation" title="Quality you can verify" />
        <AccreditationStrip />
      </Section>
      <Section>
        <SectionHeading eyebrow="Student support" title="Support that goes beyond the classroom" />
        <SupportGrid />
      </Section>
    </>
  );
}
