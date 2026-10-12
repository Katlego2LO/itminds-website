import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { faculties, programmes } from "@/lib/data/content";
import { site } from "@/lib/site";

export function Hero() {
  const facts = [
    { value: String(faculties.length), label: "Faculties" },
    { value: String(programmes.length), label: "Programmes" },
    { value: "4 to 5", label: "NQF levels" },
    { value: site.accreditation.qcto, label: "QCTO accreditation" },
  ];
  return (
    <section className="relative overflow-hidden border-b border-line bg-surface-warm">
      <div
        aria-hidden
        className="absolute inset-y-0 right-0 hidden w-1/2 bg-[radial-gradient(60%_60%_at_80%_30%,theme(colors.brand.100),transparent)] lg:block"
      />
      <div className="container-page relative grid gap-12 py-16 sm:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div>
          <p className="eyebrow mb-5">Learn | Innovate | Empower</p>
          <h1 className="text-[2.6rem] leading-[1.06] sm:text-6xl">
            IT education built around <span className="text-brand-700">what comes next.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-ink-muted">
            Accredited qualifications and practical training, with Artificial Intelligence at the
            core of every programme.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="it-school" size="lg">
              Explore programmes <ArrowRight size={18} strokeWidth={1.5} aria-hidden />
            </ButtonLink>
            <ButtonLink href="/skills-training" variant="secondary" size="lg">
              Skills & Training
            </ButtonLink>
          </div>
        </div>

        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-card border border-line bg-line shadow-card">
          {facts.map((f) => (
            <div key={f.label} className="bg-white p-6">
              <dd className="font-display text-3xl font-semibold tracking-tight text-slate-brand">
                {f.value}
              </dd>
              <dt className="mt-1 text-sm text-ink-muted">{f.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
