import type { Metadata } from "next";
import { PageHeader, Section } from "@/components/ui/Section";
import { FacultyCards } from "@/components/sections/FacultyCards";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = { title: "Faculties" };

export default function FacultiesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Study with us"
        title="Faculties"
        lead="Six faculties and 24 programmes, aligned to the NQF and QCTO occupational qualifications, with AI integrated into each."
        crumbs={[{ label: "Home", href: "/" }, { label: "Faculties" }]}
      />
      <Section>
        <FacultyCards />
        <div className="mt-10">
          <ButtonLink href="/programmes" variant="secondary">
            Browse all 24 programmes with filters
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
