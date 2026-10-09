"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Award,
  BookOpen,
  LayoutGrid,
  MessageSquare,
  Settings,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/layout/Logo";

const items: { label: string; href: string; Icon: LucideIcon }[] = [
  { label: "Overview", href: "/dashboard", Icon: LayoutGrid },
  { label: "Courses", href: "/dashboard/courses", Icon: BookOpen },
  { label: "Progress", href: "/dashboard/progress", Icon: Trophy },
  { label: "Certificates", href: "/dashboard/certificates", Icon: Award },
  { label: "Messages", href: "/dashboard/messages", Icon: MessageSquare },
  { label: "Settings", href: "/dashboard/settings", Icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-line bg-white p-5 lg:flex">
      <Logo />
      <p className="mb-2 mt-9 px-3 text-xs font-semibold uppercase tracking-[0.12em] text-ink-subtle">
        Menu
      </p>
      <nav aria-label="Dashboard">
        <ul className="space-y-1">
          {items.map(({ label, href, Icon }) => {
            const active = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 font-display text-[0.95rem] font-medium transition-colors duration-180",
                    active
                      ? "bg-brand-50 text-brand-800"
                      : "text-ink-muted hover:bg-surface-warm hover:text-slate-brand",
                  )}
                >
                  <Icon size={18} strokeWidth={1.5} aria-hidden />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="mt-auto rounded-card bg-surface-warm p-4 text-sm text-ink-muted">
        <p className="font-display font-medium text-slate-brand">Need help?</p>
        <p className="mt-1">Contact academic support from the main site.</p>
        <Link href="/about/student-support" className="mt-2 inline-block text-brand-700 underline">
          Student support
        </Link>
      </div>
    </aside>
  );
}
