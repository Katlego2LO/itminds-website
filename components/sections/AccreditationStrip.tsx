import { BadgeCheck, Landmark, Layers } from "lucide-react";
import { site } from "@/lib/site";

export function AccreditationStrip() {
  const items = [
    {
      Icon: BadgeCheck,
      title: "QCTO",
      text: `Skills Development Provider. Accreditation No. ${site.accreditation.qcto}.`,
    },
    {
      Icon: Landmark,
      title: "SAQA",
      text: "Qualifications registered on the South African Qualifications Authority framework.",
    },
    {
      Icon: Layers,
      title: "NQF aligned",
      text: "Programmes aligned to the National Qualifications Framework.",
    },
  ];
  return (
    <ul className="grid divide-y divide-line rounded-card border border-line bg-white md:grid-cols-3 md:divide-x md:divide-y-0">
      {items.map(({ Icon, title, text }) => (
        <li key={title} className="flex gap-4 p-6">
          <Icon
            size={26}
            strokeWidth={1.5}
            className="mt-0.5 shrink-0 text-brand-700"
            aria-hidden
          />
          <div>
            <h3 className="text-lg">{title}</h3>
            <p className="mt-1 text-[0.97rem] text-ink-muted">{text}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
