import {
  BookOpen,
  Briefcase,
  Cpu,
  HeartPulse,
  Lightbulb,
  Monitor,
  Users,
  type LucideIcon,
} from "lucide-react";
import { supportServices } from "@/lib/data/content";

const icons: LucideIcon[] = [BookOpen, Briefcase, Cpu, Monitor, Users, Lightbulb, HeartPulse];

export function SupportGrid() {
  return (
    <ul className="grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
      {supportServices.map((s, i) => {
        const Icon = icons[i] ?? BookOpen;
        return (
          <li key={s.name} className="bg-white p-6 sm:last:col-span-2 lg:last:col-span-2">
            <Icon size={24} strokeWidth={1.5} className="text-brand-700" aria-hidden />
            <h3 className="mt-4 text-lg">{s.name}</h3>
            <p className="mt-1.5 text-[0.97rem] text-ink-muted">{s.description}</p>
          </li>
        );
      })}
    </ul>
  );
}
