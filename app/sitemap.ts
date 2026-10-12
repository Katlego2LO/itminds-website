import type { MetadataRoute } from "next";
import { faculties, programmes, trainingCourses } from "@/lib/data/content";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
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
    "/e-learning",
    "/privacy",
  ];
  const paths = [
    ...fixed,
    ...faculties.map((f) => `/it-school/${f.slug}`),
    ...programmes.map((p) => `/it-school/${p.facultySlug}/${p.slug}`),
    ...trainingCourses.map((c) => `/skills-training/corporate-training/${c.slug}`),
  ];
  return paths.map((p) => ({ url: `${site.url}${p}`, lastModified: new Date() }));
}
