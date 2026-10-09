import type { Metadata } from "next";
import { PageHeader, Section } from "@/components/ui/Section";
import { Pending } from "@/components/ui/Pending";

export const metadata: Metadata = { title: "Privacy policy" };

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        title="Privacy policy"
        crumbs={[{ label: "Home", href: "/" }, { label: "Privacy policy" }]}
      />
      <Section>
        <p className="prose-copy">
          <Pending>
            POPIA-compliant policy text and enquiry retention period to be supplied and approved by
            the client.
          </Pending>
        </p>
      </Section>
    </>
  );
}
