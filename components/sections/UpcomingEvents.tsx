import { Section, SectionHeading } from "@/components/ui/Section";
import { formatEventDate, getUpcomingEvents } from "@/lib/data/events";

export async function UpcomingEvents() {
  const events = await getUpcomingEvents();
  if (events.length === 0) return null;

  return (
    <Section tone="warm">
      <SectionHeading eyebrow="Events" title="Upcoming events" />
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((e) => (
          <li
            key={e.id}
            className="flex flex-col rounded-card border border-line bg-white p-6 shadow-card"
          >
            <time dateTime={e.startsAt} className="eyebrow mb-2">
              {formatEventDate(e.startsAt)}
            </time>
            <h3 className="text-xl leading-snug">{e.title}</h3>
            {e.location && <p className="mt-2 text-sm text-ink-muted">{e.location}</p>}
            {e.summary && <p className="mt-3 text-ink-muted">{e.summary}</p>}
            {e.body && (
              <details className="mt-4">
                <summary className="cursor-pointer text-sm font-medium text-brand-700 underline">
                  More details
                </summary>
                <p className="mt-2 whitespace-pre-line text-sm text-ink-muted">{e.body}</p>
              </details>
            )}
          </li>
        ))}
      </ul>
    </Section>
  );
}