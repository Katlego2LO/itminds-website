import Image from "next/image";
import Link from "next/link";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" aria-label="IT Minds Institute home" className="inline-flex items-center">
      <Image
        src={light ? "/brand/logo-white.png" : "/brand/logo-full.png"}
        alt="IT Minds Institute"
        width={900}
        height={976}
        priority
        className={light ? "h-24 w-auto" : "h-14 w-auto md:h-[3.75rem]"}
      />
    </Link>
  );
}