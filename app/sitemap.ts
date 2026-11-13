import type { MetadataRoute } from "next";
import { faculties, programmes, trainingCourses } from "@/lib/data/content";
import { getNewsPosts } from "@/lib/data/news";
import { site } from "@/lib/site";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const fixed = [
    "",
    "/about",
    "/about/mission-vision",
    "/about/our-cycle",
    "/about/governance",
    "/about/accreditation",
    "/about/student-support",
    "/it-school",
    "/skills-training",
    "/skills-training/ai-and-emerging-tech",
    "/skills-training/partnership",
    "/business-school",
    "/admissions",
    "/news",
    "/contact",
    "/faq",
    "/e-learning",
    "/privacy",
  ];
  const paths = [
    ...fixed,
    ...faculties.map((f) => `/it-school/${f.slug}`),
    ...programmes.map((p) => `/it-school/${p.facultySlug}/${p.slug}`),
    ...trainingCourses.map((c) => `/skills-training/corporate-training/${c.slug}`),
  ];

  const pages: MetadataRoute.Sitemap = paths.map((p) => ({
    url: `${site.url}${p}`,
    lastModified: new Date(),
  }));

  const posts = await getNewsPosts(200);
  const news: MetadataRoute.Sitemap = posts.map((n) => ({
    url: `${site.url}/news/${n.slug}`,
    lastModified: new Date(n.publishedAt),
  }));

  return [...pages, ...news];
}