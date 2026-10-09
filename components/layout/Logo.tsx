import Image from "next/image";
import Link from "next/link";

/**
 * Horizontal lock-up built from the raster mark plus live text.
 * Swap for the supplied SVG lock-up when received (spec 5.3).
 */
export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="IT Minds Institute home">
      <Image
        src="/brand/mark-sm.png"
        alt=""
        width={44}
        height={38}
        priority
        className="h-9 w-auto"
      />
      <span className="leading-none">
        <span className="block font-display text-[1.35rem] font-bold tracking-tight">
          <span className={light ? "text-brand-100" : "text-brand-600"}>IT</span>{" "}
          <span className={light ? "text-white" : "text-slate-brand"}>MINDS</span>
        </span>
        <span
          className={`mt-1 block font-display text-[0.62rem] font-medium uppercase tracking-[0.42em] ${light ? "text-white/70" : "text-slate-brand/80"}`}
        >
          Institute
        </span>
      </span>
    </Link>
  );
}
