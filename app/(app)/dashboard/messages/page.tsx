import type { Metadata } from "next";
import { MessageSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Messages",
  robots: { index: false },
};

export default function MessagesPage() {
  // Placeholder – will be connected to messaging / notifications later
  const messages: { id: string; subject: string; preview: string; date: string }[] = [];

  return (
    <div className="mx-auto max-w-4xl space-y-8 p-5 sm:p-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-brand">Messages</h1>
        <p className="mt-1 text-ink-muted">
          Messages from the institute and your instructors will appear here.
        </p>
      </div>

      {messages.length === 0 ? (
        <div className="rounded-card border border-line bg-white px-6 py-16 text-center">
          <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-brand-50 text-brand-700">
            <MessageSquare size={28} strokeWidth={1.5} />
          </div>
          <h2 className="text-lg font-semibold text-slate-brand">No messages yet</h2>
          <p className="mx-auto mt-2 max-w-sm text-sm text-ink-muted">
            When the institute or a lecturer sends you a message, it will show up here.
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-line rounded-card border border-line bg-white">
          {/* Real message rows will go here later */}
        </ul>
      )}
    </div>
  );
}