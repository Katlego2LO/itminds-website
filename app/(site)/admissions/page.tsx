import type { Metadata } from "next";
import { PageHeader, Section, SectionHeading } from "@/components/ui/Section";
import { EnquiryForm } from "@/components/sections/EnquiryForm";
import { Pending } from "@/components/ui/Pending";

export const metadata: Metadata = { title: "Admissions" };

export default function AdmissionsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Admissions"
        title="Start your application"
        lead="Tell us which programme interests you and we will guide you through the next steps."
        crumbs={[{ label: "Home", href: "/" }, { label: "Admissions" }]}
      />
      <Section>
        <div className="grid gap-10 md:grid-cols-3">
          {["How to apply", "Fees", "Key dates"].map((t) => (
            <div key={t} className="rounded-card border border-line bg-white p-6">
              <h2 className="text-xl">{t}</h2>
              <p className="mt-2">
                <Pending>Details to be published.</Pending>
              </p>
            </div>
          ))}
        </div>
      </Section>
      <Section tone="warm">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading eyebrow="Enquiry" title="Application interest" />
          <EnquiryForm type="admissions" />
        </div>
      </Section>
    </>
  );
}
