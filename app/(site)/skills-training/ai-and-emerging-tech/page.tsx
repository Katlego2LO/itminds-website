import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, Section } from "@/components/ui/Section";
import { Pending } from "@/components/ui/Pending";

export const metadata: Metadata = { title: "AI & Emerging Technology" };

export default function AiEmergingTechPage() {
  return (
    <>
      <PageHeader
        eyebrow="Skills & Training"
        title="AI & Emerging Technology"
        lead="Fundamentals, workplace tools, generative AI, business and productivity applications."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Skills & Training", href: "/skills-training" },
          { label: "AI & Emerging Technology" },
        ]}
      />
      <Section>
        <p className="prose-copy">
          <Pending>Short course list to be published.</Pending>
        </p>
        <div className="mt-8 max-w-2xl rounded-card border border-line bg-surface-warm p-6">
          <h2 className="text-xl">Looking for an accredited qualification?</h2>
          <p className="mt-2 text-ink-muted">
            Some topics are also offered as NQF-aligned programmes, for example{" "}
            <Link
              className="underline"
              href="it-school/data-ai/ai-and-machine-learning-fundamentals"
            >
              AI & Machine Learning Fundamentals
            </Link>{" "}
            and{" "}
            <Link
              className="underline"
              href="/it-school/emerging-tech-innovation/ai-prompt-engineering"
            >
              AI Prompt Engineering
            </Link>
            . Each page states which is the qualification and which is the short course.
          </p>
        </div>
      </Section>
    </>
  );
}
