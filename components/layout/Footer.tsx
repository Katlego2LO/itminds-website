import Link from "next/link";
import { primaryNav, site } from "@/lib/site";
import { Logo } from "./Logo";
import { getContactInfo } from "@/lib/data/settings";

export async function Footer() {
  const contact = await getContactInfo();

  const connect = [
    { label: "News & Events", href: "/news" },
    { label: "E-Learning", href: "/e-learning" },
    { label: "Sign in", href: "/login" },
    { label: contact.email, href: `mailto:${contact.email}` },
    ...(contact.phone
      ? [{ label: contact.phone, href: `tel:${contact.phone.replace(/[^+\d]/g, "")}` }]
      : []),
  ];

  const socials = [
    { label: "Facebook", href: contact.facebook },
    { label: "LinkedIn", href: contact.linkedin },
    { label: "Instagram", href: contact.instagram },
  ].filter((s) => /^https?:\/\//i.test(s.href));

  return (
    <footer className="bg-slate-brand text-white/80">
      <div className="container-page grid gap-12 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo light />
          <p className="mt-5 max-w-xs text-sm leading-relaxed">
            Building minds. Creating futures. Changing lives.
          </p>
          <p className="mt-5 text-sm">
            QCTO Skills Development Provider
            <br />
            Accreditation No. {site.accreditation.qcto}
          </p>
          {socials.length > 0 && (
            <ul className="mt-5 flex gap-4 text-sm">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <FooterList
          title="Study"
          links={[
            { label: "Faculties", href: "/it-school" },
            { label: "Admissions", href: "/admissions" },
            { label: "Skills & Training", href: "/skills-training" },
            { label: "Business School", href: "/business-school" },
          ]}
        />
        <FooterList
          title="Institute"
          links={primaryNav[0].children.map((c) => ({ label: c.label, href: c.href }))}
        />
        <FooterList title="Connect" links={connect} />
      </div>
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-3 py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} IT Minds Institute. All rights reserved.</p>
          <ul className="flex gap-5">
            <li>
              <Link href="/privacy" className="hover:text-white">
                Privacy policy
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterList({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className="mb-4 font-display text-sm font-semibold uppercase tracking-[0.12em] text-white">
        {title}
      </h2>
      <ul className="space-y-2.5 text-sm">
        {links.map((l) => (
          <li key={l.label}>
            <Link href={l.href} className="hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}