"use client";

import { useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Sidebar } from "@/components/Sidebar";
import { AIAssistant } from "@/components/AIAssistant";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const createUser = useMutation(api.hub.createUser);

  useEffect(() => {
    createUser({
      clerkId: "guest",
      email: "guest@example.com",
      name: "Guest User",
    }).catch(console.error);
  }, [createUser]);

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
