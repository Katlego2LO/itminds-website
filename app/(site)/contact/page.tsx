import type { Metadata } from "next";
import { PageHeader, Section } from "@/components/ui/Section";
import { EnquiryForm } from "@/components/sections/EnquiryForm";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Get in touch"
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />
      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-2 text-ink-muted">
            <p>
              Email:{" "}
              <a className="text-brand-700 underline" href={`mailto:${site.contact.email}`}>
                {site.contact.email}
              </a>
            </p>
            <p>QCTO Skills Development Provider, Accreditation No. {site.accreditation.qcto}</p>
          </div>
          <EnquiryForm type="general" />
        </div>
      </Section>
    </>
  );
}
