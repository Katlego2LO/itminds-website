import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Briefcase, Cpu } from "lucide-react";
import { PageHeader, Section, SectionHeading } from "@/components/ui/Section";
import { PartnerBanner } from "@/components/sections/PartnerBanner";
import { EnquiryForm } from "@/components/sections/EnquiryForm";
import { getTrainingCourses } from "@/lib/data/queries";

export const metadata: Metadata = { title: "Skills & Training" };

export default async function SkillsTrainingPage() {
  const courses = await getTrainingCourses();
  return (
    <>
      <PageHeader
        eyebrow="In partnership with PATRIDOS"
        title="Skills & Training"
        lead="Short, practical courses that help people and organisations work confidently with AI and emerging technology."
        crumbs={[{ label: "Home", href: "/" }, { label: "Skills & Training" }]}
      />
      <Section>
        <div className="grid gap-5 md:grid-cols-2">
          <Track
            href="/skills-training/corporate-training"
            Icon={Briefcase}
            title="Corporate Short Courses"
            text="Role- and sector-based training for organisations."
          />
          <Track
            href="/skills-training/ai-and-emerging-tech"
            Icon={Cpu}
            title="AI & Emerging Technology"
            text="Fundamentals, workplace tools, generative AI and productivity applications."
          />
        </div>
      </Section>
      <Section tone="warm" id="courses">
        <SectionHeading eyebrow="Launch catalogue" title="Corporate short courses" />
        <ul className="grid gap-4 sm:grid-cols-2">
          {courses.map((c, i) => (
            <li key={c.slug}>
              <Link
                href={`/skills-training/corporate-training/${c.slug}`}
                className="group flex h-full items-start gap-4 rounded-card border border-line bg-white p-5 transition duration-180 hover:border-brand-700"
              >
                <span className="font-display text-sm font-semibold text-ink-subtle">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 font-display text-lg font-medium text-slate-brand">
                  {c.name}
                </span>
                <ArrowRight
                  size={18}
                  strokeWidth={1.5}
                  className="mt-1 text-brand-700"
                  aria-hidden
                />
              </Link>
            </li>
          ))}
        </ul>
      </Section>
      <Section>
        <PartnerBanner />
      </Section>
      <Section tone="warm">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            eyebrow="Corporate enquiries"
            title="Talk to us about training for your team"
          >
            Tell us about your organisation and what you would like your people to be able to do.
          </SectionHeading>
          <EnquiryForm type="corporate" showOrganisation />
        </div>
      </Section>
    </>
  );
}

function Track({
  href,
  Icon,
  title,
  text,
}: {
  href: string;
  Icon: typeof Briefcase;
  title: string;
  text: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-card border border-line bg-white p-7 shadow-card transition duration-180 hover:border-brand-700"
    >
      <Icon size={28} strokeWidth={1.5} className="text-brand-700" aria-hidden />
      <h2 className="mt-5 text-2xl">{title}</h2>
      <p className="mt-2 text-ink-muted">{text}</p>
    </Link>
  );
}
