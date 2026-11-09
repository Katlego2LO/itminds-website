import { Section, SectionHeading } from "@/components/ui/Section";
import { getTeamAndPartners } from "@/lib/data/team";

export async function TeamPartners() {
  const all = await getTeamAndPartners();
  const team = all.filter((e) => e.kind === "team");
  const partners = all.filter((e) => e.kind === "partner");

  return (
    <>
      {team.length > 0 && (
        <Section>
          <SectionHeading eyebrow="Our team" title="The people behind the institute" />
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((m) => (
              <li
                key={m.id}
                className="flex flex-col overflow-hidden rounded-card border border-line bg-white shadow-card"
              >
                {m.photoUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={m.photoUrl}
                    alt={m.name}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover"
                  />
                )}
                <div className="p-6">
                  <h3 className="text-xl leading-snug">{m.name}</h3>
                  {m.title && <p className="mt-1 text-sm font-medium text-brand-700">{m.title}</p>}
                  {m.bio && <p className="mt-3 whitespace-pre-line text-ink-muted">{m.bio}</p>}
                  {m.linkUrl && (
                    <a
                      href={m.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-block text-sm font-medium text-brand-700 underline"
                    >
                      View profile
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {partners.length > 0 && (
        <Section tone="warm">
          <SectionHeading eyebrow="Partners" title="Organisations we work with" />
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {partners.map((p) => {
              const body = (
                <>
                  {p.photoUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.photoUrl}
                      alt=""
                      loading="lazy"
                      className="mb-4 h-16 w-full object-contain"
                    />
                  )}
                  <h3 className="text-lg leading-snug">{p.name}</h3>
                  {p.title && <p className="mt-1 text-sm text-ink-muted">{p.title}</p>}
                </>
              );
              return (
                <li key={p.id} className="rounded-card border border-line bg-white p-6 shadow-card">
                  {p.linkUrl ? (
                    <a
                      href={p.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block hover:text-brand-700"
                    >
                      {body}
                    </a>
                  ) : (
                    body
                  )}
                </li>
              );
            })}
          </ul>
        </Section>
      )}
    </>
  );
}