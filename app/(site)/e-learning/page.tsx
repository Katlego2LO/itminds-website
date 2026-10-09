import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export const metadata: Metadata = { title: "E-Learning" };

// Gateway page. Whether this opens in a new tab or redirects is an open client decision (spec 9, item 6).
export default function ELearningPage() {
  return (
    <>
      <PageHeader
        eyebrow="E-Learning"
        title="Study online, on your schedule"
        lead="Sign in to continue your courses, pick up where you left off and track your progress."
        crumbs={[{ label: "Home", href: "/" }, { label: "E-Learning" }]}
      />
      <Section>
        <div className="flex flex-wrap items-center gap-4">
          <ButtonLink href="/login" size="lg">
            Sign in
          </ButtonLink>
          <ButtonLink href="/signup" variant="secondary" size="lg">
            Create an account
          </ButtonLink>
        </div>
        {!isSupabaseConfigured && (
          <p className="mt-6 text-sm text-ink-subtle">
            Accounts are not connected in this environment.
          </p>
        )}
        <p className="mt-10 text-sm text-ink-muted">
          Not a student yet?{" "}
          <Link href="/admissions" className="underline">
            See how to apply
          </Link>
          .
        </p>
      </Section>
    </>
  );
}
