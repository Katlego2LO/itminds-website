import { Clock, ShieldOff } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { Button } from "@/components/ui/Button";
import { signOut } from "@/lib/auth-actions";
import type { AccessState } from "@/lib/access";

const copy = {
  pending: {
    Icon: Clock,
    title: "Your account is awaiting approval",
    body: "Thank you for registering. An administrator reviews every new account. We will email you as soon as yours is approved, and you can then sign in and start learning.",
  },
  suspended: {
    Icon: ShieldOff,
    title: "Your account is not active",
    body: "Access to this account has been paused. Please contact the institute so we can look into it with you.",
  },
} as const;

export function AccessNotice({ state }: { state: Exclude<AccessState, "ok"> }) {
  const { Icon, title, body } = copy[state];
  return (
    <main className="grid min-h-screen place-items-center bg-surface-warm px-5 py-10">
      <div className="w-full max-w-md rounded-2xl border border-line bg-white p-8 text-center shadow-sm">
        <div className="mb-6 flex justify-center">
          <Logo />
        </div>
        <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-full bg-brand-50 text-brand-800">
          <Icon size={26} strokeWidth={1.5} aria-hidden />
        </div>
        <h1 className="font-display text-xl font-semibold text-slate-brand">{title}</h1>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">{body}</p>
        <form action={signOut} className="mt-7">
          <Button type="submit" className="w-full">
            Sign out
          </Button>
        </form>
      </div>
    </main>
  );
}