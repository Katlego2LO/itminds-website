import { BookOpenCheck, Lightbulb, HeartHandshake } from "lucide-react";

const stages = [
  {
    n: 1,
    title: "Learn",
    line: "From knowledge to discovery",
    text: "We build strong foundations through quality education, practical skills and lifelong learning.",
    Icon: BookOpenCheck,
    ring: "border-cycle-learn text-cycle-learn",
    fill: "bg-cycle-learn",
  },
  {
    n: 2,
    title: "Innovate",
    line: "From ideas to impact",
    text: "We spark creativity, embrace technology and encourage ideas that drive progress and create solutions.",
    Icon: Lightbulb,
    ring: "border-cycle-innovate text-cycle-innovate",
    fill: "bg-cycle-innovate",
  },
  {
    n: 3,
    title: "Empower",
    line: "Empowering today, transforming generations",
    text: "We empower individuals and communities to achieve their potential and make a positive difference.",
    Icon: HeartHandshake,
    ring: "border-cycle-empower text-cycle-empower",
    fill: "bg-cycle-empower",
  },
] as const;

export function CycleSection() {
  return (
    <ol className="relative grid gap-6 md:grid-cols-3">
      <div
        aria-hidden
        className="absolute left-0 right-0 top-[2.15rem] hidden h-px bg-gradient-to-r from-cycle-learn via-cycle-innovate to-cycle-empower md:block"
      />
      {stages.map(({ n, title, line, text, Icon, ring, fill }) => (
        <li
          key={title}
          className="relative rounded-card border border-line bg-white p-6 shadow-card"
        >
          <div className="flex items-center gap-4">
            <span
              className={`grid h-[4.3rem] w-[4.3rem] place-items-center rounded-full border-2 bg-white ${ring}`}
            >
              <Icon size={28} strokeWidth={1.5} aria-hidden />
            </span>
            <span
              className={`grid h-7 w-7 place-items-center rounded-full font-display text-sm font-semibold text-white ${fill}`}
            >
              {n}
            </span>
          </div>
          <h3 className="mt-5 text-2xl">{title}</h3>
          <p className="mt-1 font-display text-sm font-medium text-ink-subtle">{line}</p>
          <p className="mt-3 text-ink-muted">{text}</p>
        </li>
      ))}
    </ol>
  );
}
