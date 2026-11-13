import { Sidebar } from "@/components/dashboard/Sidebar";
import { AccessNotice } from "@/components/dashboard/AccessNotice";
import { getAccessState } from "@/lib/access";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const access = await getAccessState();
  if (access !== "ok") return <AccessNotice state={access} />;

  return (
    <div className="flex min-h-screen bg-surface-warm">
      <Sidebar />
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}