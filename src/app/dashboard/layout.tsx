"use client";

import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import TopNav from "@/components/dashboard/TopNav";
import AIChatbot from "@/components/dashboard/AIChatbot";
import { cn } from "@/lib/utils";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  return (
    <div className="min-h-screen mesh-gradient">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <TopNav sidebarCollapsed={sidebarCollapsed} />
      <main
        className={cn(
          "pt-16 min-h-screen transition-all duration-300 p-4 md:p-6",
          sidebarCollapsed ? "ml-[72px]" : "ml-64"
        )}
      >
        <div className="animate-page-in">{children}</div>
      </main>
      <AIChatbot />
    </div>
  );
}
