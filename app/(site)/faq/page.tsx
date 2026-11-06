import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, Section } from "@/components/ui/Section";
import { getFaqs, type Faq } from "@/lib/data/faqs";

export const metadata: Metadata = {
  title: "FAQs",
  description: "Answers to common questions about IT Minds Institute, admissions and studying with us.",
};

export const revalidate = 60;

export default async function FaqPage() {
  const faqs = await getFaqs();

  const groups = new Map<string, Faq[]>();
  for (const f of faqs) {
    const list = groups.get(f.category) ?? [];
    list.push(f);
    groups.set(f.category, list);
  }

  return (
    <>
      <PageHeader
        eyebrow="FAQs"
        title="Frequently asked questions"
        crumbs={[{ label: "Home", href: "/" }, { label: "FAQs" }]}
      />
      <Section>
        {faqs.length === 0 ? (
          <div className="max-w-xl rounded-card border border-line bg-white p-8">
            <h2 className="text-xl">No questions yet</h2>
            <p className="mt-2 text-ink-muted">
              We are still putting our answers together. In the meantime, please contact the
              institute with any questions.
            </p>
            <Link href="/contact" className="mt-5 inline-block text-brand-700 underline">
              Contact us
            </Link>
          </div>
        ) : (
          <div className="max-w-3xl space-y-12">
            {Array.from(groups.entries()).map(([category, items]) => (
              <section key={category} aria-labelledby={`faq-${category}`}>
                <h2 id={`faq-${category}`} className="mb-4 text-2xl">
                  {category}
                </h2>
                <div className="space-y-3">
                  {items.map((f) => (
                    <details
                      key={f.id}
                      className="group rounded-card border border-line bg-white p-5 open:shadow-card"
                    >
                      <summary className="cursor-pointer font-display font-medium text-slate-brand">
                        {f.question}
                      </summary>
                      <p className="mt-3 whitespace-pre-line text-ink-muted">{f.answer}</p>
                    </details>
                  ))}
                </div>
              </section>
            ))}

            <p className="text-ink-muted">
              Cannot find your answer?{" "}
              <Link href="/contact" className="text-brand-700 underline">
                Contact us
              </Link>
              .
            </p>
          </div>
        )}
      </Section>
    </>
  );
}