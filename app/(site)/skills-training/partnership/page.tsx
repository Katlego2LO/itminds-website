import type { Metadata } from "next";
import { PageHeader, Section } from "@/components/ui/Section";
import { PartnerBanner } from "@/components/sections/PartnerBanner";
import { Pending } from "@/components/ui/Pending";

export const metadata: Metadata = { title: "PATRIDOS Partnership" };

export default function PartnershipPage() {
  return (
    <>
      <PageHeader
        eyebrow="Skills & Training"
        title="Our partnership with PATRIDOS"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Skills & Training", href: "/skills-training" },
          { label: "Partnership" },
        ]}
      />
      <Section>
        <PartnerBanner />
        <p className="prose-copy mt-8">
          <Pending>Partnership wording and logo usage rules awaiting the client.</Pending>
        </p>
      </Section>
    </>
  );
}
