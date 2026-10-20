import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, Section } from "@/components/ui/Section";
import { formatNewsDate, getNewsPosts } from "@/lib/data/news";

export const metadata: Metadata = {
  title: "News & Events",
  description: "News, announcements and events from IT Minds Institute.",
};

// Re-read the database at most once a minute. The admin portal can also trigger a refresh.
export const revalidate = 60;

export default async function NewsPage() {
  const posts = await getNewsPosts();

  return (
    <>
      <PageHeader
        eyebrow="News & Events"
        title="Latest from the institute"
        crumbs={[{ label: "Home", href: "/" }, { label: "News & Events" }]}
      />
      <Section>
        {posts.length === 0 ? (
          <div className="max-w-xl rounded-card border border-line bg-white p-8">
            <h2 className="text-xl">No news yet</h2>
            <p className="mt-2 text-ink-muted">
              We have nothing to announce at the moment. Please check back soon, or contact the
              institute with any questions.
            </p>
            <Link href="/contact" className="mt-5 inline-block text-brand-700 underline">
              Contact us
            </Link>
          </div>
        ) : (
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <li
                key={p.slug}
                className="flex flex-col overflow-hidden rounded-card border border-line bg-white shadow-card"
              >
                {p.coverImage && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.coverImage}
                    alt=""
                    loading="lazy"
                    className="aspect-[16/9] w-full object-cover"
                  />
                )}
                <div className="flex flex-1 flex-col p-6">
                  <time dateTime={p.publishedAt} className="eyebrow mb-2">
                    {formatNewsDate(p.publishedAt)}
                  </time>
                  <h2 className="text-xl leading-snug">
                    <Link href={`/news/${p.slug}`} className="hover:text-brand-700">
                      {p.title}
                    </Link>
                  </h2>
                  {p.summary && <p className="mt-3 line-clamp-3 text-ink-muted">{p.summary}</p>}
                  <Link
                    href={`/news/${p.slug}`}
                    className="mt-auto pt-5 text-sm font-medium text-brand-700 underline"
                  >
                    Read more
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Section>
    </>
  );
}