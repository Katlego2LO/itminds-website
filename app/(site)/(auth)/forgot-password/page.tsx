import type { Metadata } from "next";
import { ForgotPasswordForm } from "@/components/auth/PasswordForms";
import { requestPasswordReset } from "@/lib/password-actions";

export const metadata: Metadata = { title: "Reset your password" };

export default function ForgotPasswordPage() {
  return (
    <div className="container-page grid place-items-center py-16 sm:py-24">
      <div className="w-full max-w-md rounded-card border border-line bg-white p-8 shadow-card">
        <h1 className="text-3xl">Reset your password</h1>
        <p className="mb-7 mt-2 text-ink-muted">
          Enter the email address you registered with and we will send you a link.
        </p>
        <ForgotPasswordForm action={requestPasswordReset} />
      </div>
    </div>
  );
}