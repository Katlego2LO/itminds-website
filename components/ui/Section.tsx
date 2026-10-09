import { cn } from "@/lib/utils";

export function Section({
  children,
  className,
  tone = "white",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "white" | "warm" | "dark";
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-16 sm:py-20",
        tone === "warm" && "bg-surface-warm",
        tone === "dark" && "bg-slate-brand text-white",
        className,
      )}
    >
      <div className="container-page">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  children,
  className,
}: {
  eyebrow?: string;
  title: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-10 max-w-2xl", className)}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className="text-3xl leading-tight sm:text-[2.1rem]">{title}</h2>
      {children && <p className="mt-4 text-ink-muted">{children}</p>}
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  lead,
  crumbs,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  crumbs?: { label: string; href?: string }[];
}) {
  return (
    <header className="border-b border-line bg-surface-warm">
      <div className="container-page py-12 sm:py-16">
        {crumbs && (
          <nav aria-label="Breadcrumb" className="mb-5 text-sm text-ink-muted">
            <ol className="flex flex-wrap items-center gap-2">
              {crumbs.map((c, i) => (
                <li key={c.label} className="flex items-center gap-2">
                  {c.href ? (
                    <a href={c.href} className="hover:text-brand-700">
                      {c.label}
                    </a>
                  ) : (
                    <span aria-current="page">{c.label}</span>
                  )}
                  {i < crumbs.length - 1 && <span aria-hidden>/</span>}
                </li>
              ))}
            </ol>
          </nav>
        )}
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h1 className="max-w-3xl text-4xl leading-[1.1] sm:text-5xl">{title}</h1>
        {lead && <p className="mt-5 max-w-2xl text-lg text-ink-muted">{lead}</p>}
      </div>
    </header>
  );
}
