import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/AuthForm";
import { signUp } from "@/lib/auth-actions";

export const metadata: Metadata = { title: "Create account" };

export default function SignUpPage() {
  return (
    <div className="container-page grid place-items-center py-16 sm:py-24">
      <div className="w-full max-w-md rounded-card border border-line bg-white p-8 shadow-card">
        <h1 className="text-3xl">Create your account</h1>
        <p className="mb-7 mt-2 text-ink-muted">
          Use your email address. We will send a confirmation link.
        </p>
        <AuthForm mode="signup" action={signUp} />
      </div>
    </div>
  );
}
