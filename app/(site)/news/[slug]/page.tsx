import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader, Section } from "@/components/ui/Section";
import { formatNewsDate, getNewsPost } from "@/lib/data/news";

export const revalidate = 60;

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = await getNewsPost(slug);
  if (!post) return { title: "News" };
  return {
    title: post.title,
    description: post.summary ?? undefined,
    openGraph: {
      title: post.title,
      description: post.summary ?? undefined,
      type: "article",
      publishedTime: post.publishedAt,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

export default async function NewsArticlePage({ params }: Params) {
  const { slug } = await params;
  const post = await getNewsPost(slug);
  if (!post) notFound();

  // The body is plain text from the admin portal. Blank lines separate paragraphs.
  const paragraphs = (post.body ?? "")
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <>
      <PageHeader
        eyebrow={formatNewsDate(post.publishedAt)}
        title={post.title}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "News & Events", href: "/news" },
          { label: post.title },
        ]}
      />
      <Section>
        <article className="max-w-3xl">
          {post.coverImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.coverImage}
              alt=""
              className="mb-8 aspect-[16/9] w-full rounded-card object-cover"
            />
          )}
          <div className="space-y-5 text-lg leading-relaxed text-ink">
            {paragraphs.length ? (
              paragraphs.map((p, i) => (
                <p key={i} className="whitespace-pre-line">
                  {p}
                </p>
              ))
            ) : (
              <p className="text-ink-muted">The full article will be available soon.</p>
            )}
          </div>
          <Link href="/news" className="mt-10 inline-block text-brand-700 underline">
            Back to all news
          </Link>
        </article>
      </Section>
    </>
  );
}