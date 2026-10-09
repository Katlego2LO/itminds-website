import Link from "next/link";
import { ArrowRight, Building2, GraduationCap, MonitorPlay, Wrench } from "lucide-react";
import { site } from "@/lib/site";

const paths = [
  {
    title: "Study",
    text: "Accredited programmes across six faculties.",
    href: "/faculties",
    Icon: GraduationCap,
  },
  {
    title: "Train",
    text: "Short courses for organisations and teams.",
    href: "/skills-training",
    Icon: Wrench,
  },
  {
    title: "Business School",
    text: "Courses announced shortly.",
    href: "/business-school",
    Icon: Building2,
  },
  {
    title: "E-Learning",
    text: "Continue your studies online.",
    href: site.elearningUrl,
    Icon: MonitorPlay,
  },
];

export function Pathways() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {paths.map(({ title, text, href, Icon }) => (
        <li key={title}>
          <Link
            href={href}
            className="group flex h-full flex-col rounded-card border border-line bg-white p-6 transition duration-180 hover:border-brand-700"
          >
            <Icon size={26} strokeWidth={1.5} className="text-brand-700" aria-hidden />
            <h3 className="mt-5 text-xl">{title}</h3>
            <p className="mt-1.5 flex-1 text-[0.97rem] text-ink-muted">{text}</p>
            <span className="mt-5 inline-flex items-center gap-1.5 font-display text-sm font-medium text-brand-700">
              Go{" "}
              <ArrowRight
                size={15}
                strokeWidth={1.5}
                className="transition-transform duration-180 group-hover:translate-x-0.5"
                aria-hidden
              />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
