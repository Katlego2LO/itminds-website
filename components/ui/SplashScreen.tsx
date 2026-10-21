"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const SEEN_KEY = "itminds-splash-seen";

export function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Show the splash once per browser session, not on every page load.
    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === "1";
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      // Storage can be blocked; fall back to showing it.
    }
    if (seen) {
      setVisible(false);
      return;
    }

    const minTimer = setTimeout(() => setFadeOut(true), 1200);
    const removeTimer = setTimeout(() => setVisible(false), 1800);
    return () => {
      clearTimeout(minTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white transition-opacity duration-500 ${
        fadeOut ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      aria-hidden={!fadeOut}
    >
      <div className="flex animate-splash flex-col items-center">
        <Image
          src="/brand/logo-full.png"
          alt="IT Minds Institute"
          width={900}
          height={976}
          priority
          className="h-20 w-auto md:h-24"
        />
        <div className="mt-8 h-1 w-24 overflow-hidden rounded-full bg-neutral-100">
          <div className="h-full w-full origin-left animate-progress rounded-full bg-brand-600" />
        </div>
      </div>
    </div>
  );
}