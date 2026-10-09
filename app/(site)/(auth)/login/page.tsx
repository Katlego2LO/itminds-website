import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/AuthForm";
import { signIn } from "@/lib/auth-actions";
import { safeNext } from "@/lib/validation";

export const metadata: Metadata = { title: "Sign in" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const sp = await searchParams;
  return (
    <div className="container-page grid place-items-center py-16 sm:py-24">
      <div className="w-full max-w-md rounded-card border border-line bg-white p-8 shadow-card">
        <h1 className="text-3xl">Sign in</h1>
        <p className="mb-7 mt-2 text-ink-muted">Continue to your learning dashboard.</p>
        {sp.error === "confirmation" && (
          <p
            role="alert"
            className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
          >
            That confirmation link is invalid or has expired. Sign in, or create the account again.
          </p>
        )}
        <AuthForm mode="login" action={signIn} next={sp.next ? safeNext(sp.next) : undefined} />
      </div>
    </div>
  );
}
