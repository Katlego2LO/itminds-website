import type { Metadata } from "next";

export const metadata: Metadata = { title: "Certificates", robots: { index: false } };

export default function CertificatesPage() {
  return (
    <div className="p-5 sm:p-8">
      <h1 className="text-2xl">Certificates</h1>
      <p className="mt-3 text-ink-muted">
        This section will be built once the learning platform is confirmed.
      </p>
    </div>
  );
}
