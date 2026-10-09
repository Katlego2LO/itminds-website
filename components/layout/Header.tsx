import Link from "next/link";
import { ChevronDown, GraduationCap } from "lucide-react";
import { primaryNav, site } from "@/lib/site";
import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";

export function Header() {
  const external = /^https?:/.test(site.elearningUrl);
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded focus:bg-white focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <div className="container-page flex h-[4.25rem] items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {primaryNav.map((item) => (
              <li key={item.href} className="group relative">
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1 rounded-md px-3 py-2 font-display text-[0.95rem] font-medium text-slate-brand transition-colors duration-180 hover:text-brand-700"
                >
                  {item.label}
                  {"children" in item && <ChevronDown size={14} strokeWidth={1.5} aria-hidden />}
                </Link>
                {"children" in item && (
                  <ul className="invisible absolute left-0 top-full z-10 min-w-56 translate-y-1 rounded-card border border-line bg-white p-2 opacity-0 shadow-card transition duration-180 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    {item.children.map((c) => (
                      <li key={c.href}>
                        <Link
                          href={c.href}
                          className="block rounded-md px-3 py-2 text-[0.95rem] text-ink-muted hover:bg-surface-warm hover:text-slate-brand"
                        >
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden font-display text-[0.95rem] font-medium text-slate-brand hover:text-brand-700 sm:block"
          >
            Sign in
          </Link>
          <ButtonLink href={site.elearningUrl} variant="elearn" size="sm" external={external}>
            <GraduationCap size={16} strokeWidth={1.5} aria-hidden />
            E-Learning
          </ButtonLink>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
