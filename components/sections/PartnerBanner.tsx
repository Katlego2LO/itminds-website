import { ButtonLink } from "@/components/ui/Button";

/** PATRIDOS logo and usage rules are awaiting the client (spec 5.3). Text lock-up until supplied. */
export function PartnerBanner() {
  return (
    <div className="flex flex-col items-start gap-6 rounded-card border border-line bg-white p-8 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="eyebrow mb-2">In partnership with</p>
        <p className="font-display text-3xl font-bold tracking-tight text-slate-brand">PATRIDOS</p>
        <p className="mt-2 max-w-xl text-ink-muted">
          Practical, industry-led training for organisations, delivered together with our partner.
        </p>
      </div>
      <ButtonLink href="/skills-training/partnership" variant="secondary">
        About the partnership
      </ButtonLink>
    </div>
  );
}
