import type { Metadata } from "next";
import { Award } from "lucide-react";

export const metadata: Metadata = {
  title: "Certificates",
  robots: { index: false },
};

export default function CertificatesPage() {
  // Placeholder – will be filled from completed courses / admin
  const certificates: { id: string; title: string; issuedAt: string }[] = [];

  return (
    <div className="mx-auto max-w-4xl space-y-8 p-5 sm:p-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-brand">Certificates</h1>
        <p className="mt-1 text-ink-muted">
          Certificates you earn will be available to download here.
        </p>
      </div>

      {certificates.length === 0 ? (
        <div className="rounded-card border border-line bg-white px-6 py-16 text-center">
          <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-brand-50 text-brand-700">
            <Award size={28} strokeWidth={1.5} />
          </div>
          <h2 className="text-lg font-semibold text-slate-brand">No certificates yet</h2>
          <p className="mx-auto mt-2 max-w-sm text-sm text-ink-muted">
            Complete a programme or short course to earn your first certificate.
          </p>
        </div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {/* Real certificate cards will go here later */}
        </ul>
      )}
    </div>
  );
}