import { Sidebar } from "@/components/Sidebar";
import { AIAssistant } from "@/components/AIAssistant";
import { useSyncUser } from "@/hooks/useSyncUser";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useSyncUser(); // Synchronize Clerk user to Convex
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <main className="flex-1 overflow-y-auto relative p-6">
        <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          {children}
        </div>
        <AIAssistant />
      </main>
    </div>
  );
}
