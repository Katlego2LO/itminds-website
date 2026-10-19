"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { primaryNav } from "@/lib/site";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);

  // Close the menu whenever the page changes.
  useEffect(() => {
    setOpen(false);
    setExpanded(null);
  }, [pathname]);

  // Lock the page behind the menu; the menu itself scrolls.
  useEffect(() => {
    const body = document.body;
    if (open) body.style.overflow = "hidden";
    else body.style.overflow = "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
    
      body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="grid h-10 w-10 place-items-center rounded-lg border border-line text-slate-brand"
      >
        {open ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
      </button>

      {open &&
        mounted &&
        createPortal(
          <nav
            id="mobile-menu"
            aria-label="Primary"
            style={{ touchAction: "pan-y", WebkitOverflowScrolling: "touch" }}
            className="fixed inset-0 z-40 overflow-y-auto overscroll-contain bg-white px-5 pb-28 pt-[4.75rem]"
          >
            <ul className="divide-y divide-line">
              {primaryNav.map((item) => {
                const children = "children" in item ? item.children : undefined;
                const isOpen = expanded === item.href;
                return (
                  <li key={item.href}>
                    <div className="flex items-center justify-between">
                      <Link
                        href={item.href}
                        onClick={close}
                        className="flex-1 py-4 font-display text-lg font-medium text-slate-brand"
                      >
                        {item.label}
                      </Link>
                      {children && (
                        <button
                          type="button"
                          aria-expanded={isOpen}
                          aria-label={`${isOpen ? "Hide" : "Show"} ${item.label} pages`}
                          onClick={() => setExpanded(isOpen ? null : item.href)}
                          className="grid h-11 w-11 place-items-center rounded-lg text-slate-brand"
                        >
                          <ChevronDown
                            size={20}
                            strokeWidth={1.5}
                            className={cn(
                              "transition-transform duration-180",
                              isOpen && "rotate-180",
                            )}
                            aria-hidden
                          />
                        </button>
                      )}
                    </div>
                    {children && isOpen && (
                      <ul className="mb-3 ml-2 border-l border-line pl-4">
                        {children.map((c) => (
                          <li key={c.href}>
                            <Link
                              href={c.href}
                              onClick={close}
                              className="block py-2.5 text-ink-muted"
                            >
                              {c.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
              <li>
                <Link
                  href="/login"
                  onClick={close}
                  className="block py-4 font-display text-lg font-medium text-brand-700"
                >
                  Sign in
                </Link>
              </li>
            </ul>
          </nav>,
          document.body,
        )}
    </div>
  );
}