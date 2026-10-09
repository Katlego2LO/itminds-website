import type { Metadata } from "next";
import { PageHeader, Section } from "@/components/ui/Section";
import { EnquiryForm } from "@/components/sections/EnquiryForm";

export const metadata: Metadata = { title: "Business School" };

export default function BusinessSchoolPage() {
  return (
    <>
      <PageHeader
        eyebrow="IT Minds Business School"
        title="Courses announced shortly"
        lead="Register your interest and we will contact you when the first courses open."
        crumbs={[{ label: "Home", href: "/" }, { label: "Business School" }]}
      />
      <Section>
        <div className="max-w-2xl">
          <EnquiryForm type="business_school" />
        </div>
      </Section>
    </>
  );
}
