import Link from "next/link";
import { cn } from "@/lib/utils";

const variants = {
  primary: "bg-brand-700 text-white hover:bg-brand-800 border-transparent",
  secondary: "bg-white text-slate-brand border-line hover:border-slate-brand",
  dark: "bg-slate-brand text-white hover:bg-ink border-transparent",
  elearn: "bg-[#3F9A12] text-white hover:bg-[#2E7A0D] border-transparent",
  ghost: "bg-transparent text-brand-700 hover:bg-brand-50 border-transparent",
} as const;

const sizes = {
  md: "h-11 px-5 text-[0.95rem]",
  sm: "h-9 px-4 text-sm",
  lg: "h-12 px-6 text-base",
} as const;

interface Props {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
  children: React.ReactNode;
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg border font-display font-medium transition-colors duration-180 disabled:cursor-not-allowed disabled:opacity-60";

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  external,
}: Props & { href: string; external?: boolean }) {
  const cls = cn(base, variants[variant], sizes[size], className);
  return external ? (
    <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: Props & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </button>
  );
}
