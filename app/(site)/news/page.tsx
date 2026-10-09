import type { Metadata } from "next";
import { PageHeader, Section } from "@/components/ui/Section";
import { Pending } from "@/components/ui/Pending";

export const metadata: Metadata = { title: "News & Events" };

export default function NewsPage() {
  return (
    <>
      <PageHeader
        eyebrow="News & Events"
        title="Latest from the institute"
        crumbs={[{ label: "Home", href: "/" }, { label: "News & Events" }]}
      />
      <Section>
        <p className="prose-copy">
          <Pending>News and events will appear here.</Pending>
        </p>
      </Section>
    </>
  );
}
