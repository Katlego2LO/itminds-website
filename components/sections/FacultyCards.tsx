import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getFaculties, getProgrammes } from "@/lib/data/queries";

const accentBg = {
  software: "bg-faculty-software",
  networking: "bg-faculty-networking",
  data: "bg-faculty-data",
  support: "bg-faculty-support",
  design: "bg-faculty-design",
  emerging: "bg-faculty-emerging",
} as const;

export async function FacultyCards() {
  const [faculties, programmes] = await Promise.all([getFaculties(), getProgrammes()]);
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {faculties.map((f) => {
        const list = programmes.filter((p) => p.facultySlug === f.slug);
        const levels = [...new Set(list.map((p) => p.nqfLevel))].sort();
        return (
          <li key={f.slug}>
            <Link
              href={`/it-school/${f.slug}`}
              className="group relative flex h-full flex-col overflow-hidden rounded-card border border-line bg-white p-6 pt-7 shadow-card transition duration-180 hover:-translate-y-0.5 hover:border-slate-brand/30"
            >
              <span className={`absolute inset-x-0 top-0 h-1 ${accentBg[f.accent]}`} aria-hidden />
              <h3 className="text-xl">{f.name}</h3>
              <p className="mt-3 flex-1 text-[0.97rem] text-ink-muted">{f.summary}</p>
              <div className="mt-6 flex items-center justify-between border-t border-line pt-4 text-sm">
                <span className="text-ink-muted">
                  {list.length} programmes · NQF {levels.join(" and ")}
                </span>
                <ArrowUpRight
                  size={18}
                  strokeWidth={1.5}
                  className="text-slate-brand transition-transform duration-180 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
