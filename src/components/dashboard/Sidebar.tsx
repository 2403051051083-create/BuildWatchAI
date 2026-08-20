"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Box, Video, Plane, HardHat, Package, Truck,
  Brain, FileText, Clock, Cloud, FolderOpen, Bell, Settings,
  ChevronLeft, ChevronRight, Building2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { navItems } from "@/lib/mock-data";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard, Box, Video, Plane, HardHat, Package, Truck,
  Brain, FileText, Clock, Cloud, FolderOpen, Bell, Settings,
};

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen z-40 flex flex-col border-r border-white/5 bg-surface/80 backdrop-blur-xl transition-all duration-300",
        collapsed ? "w-[72px]" : "w-64"
      )}
    >
      <div className="flex items-center gap-3 px-4 h-16 border-b border-white/5">
        <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center shrink-0 shadow-glow">
          <Building2 className="w-5 h-5 text-white" />
        </div>
        {!collapsed && (
          <div>
            <h1 className="font-display font-bold text-sm">BuildWatch</h1>
            <p className="text-[10px] text-brand-400">AI Platform</p>
          </div>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-0.5">
        {navItems.map((item) => {
          const Icon = iconMap[item.icon];
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200",
                isActive
                  ? "bg-brand-600/15 text-brand-400 border border-brand-500/20"
                  : "text-gray-400 hover:text-white hover:bg-white/5",
                collapsed && "justify-center px-0"
              )}
              title={collapsed ? item.label : undefined}
            >
              <Icon className="w-5 h-5 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <button
        onClick={onToggle}
        className="flex items-center justify-center h-12 border-t border-white/5 text-gray-400 hover:text-white transition-colors"
      >
        {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>
    </aside>
  );
}
