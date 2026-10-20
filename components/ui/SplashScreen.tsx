"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Minimum time the splash is shown (feels intentional)
    const minTimer = setTimeout(() => {
      setFadeOut(true);
    }, 1200);

    // Remove from DOM after fade finishes
    const removeTimer = setTimeout(() => {
      setVisible(false);
    }, 1800);

    return () => {
      clearTimeout(minTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white transition-opacity duration-500 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      aria-hidden={!fadeOut}
    >
      <div className="flex flex-col items-center animate-splash">
        <Image
          src="/brand/logo-full.png"
          alt="IT Minds Institute"
          width={280}
          height={120}
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