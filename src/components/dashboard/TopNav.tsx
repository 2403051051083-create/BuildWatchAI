"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Search, Bell, ChevronDown, Sun, Moon, User, LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { projects, alerts } from "@/lib/mock-data";
import { createClient } from "@/lib/supabase/client";

interface TopNavProps {
  sidebarCollapsed: boolean;
}

export default function TopNav({ sidebarCollapsed }: TopNavProps) {
  const [selectedProject, setSelectedProject] = useState(projects[0]);
  const [showProjects, setShowProjects] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("buildwatch-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldUseDark = savedTheme ? savedTheme === "dark" : prefersDark;

    setIsDark(shouldUseDark);
    document.documentElement.classList.toggle("dark", shouldUseDark);
    document.documentElement.style.colorScheme = shouldUseDark ? "dark" : "light";
    document.body.dataset.theme = shouldUseDark ? "dark" : "light";
  }, []);

  useEffect(() => {
    const theme = isDark ? "dark" : "light";
    document.documentElement.classList.toggle("dark", isDark);
    document.documentElement.style.colorScheme = theme;
    document.body.dataset.theme = theme;
    window.localStorage.setItem("buildwatch-theme", theme);
  }, [isDark]);

  const unreadAlerts = alerts.filter((a) => !a.read).length;

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.assign("/login");
  };

  return (
    <header
      className={cn(
        "fixed top-0 right-0 h-16 z-30 flex items-center justify-between px-6 border-b border-white/5 bg-surface/60 backdrop-blur-xl transition-all duration-300",
        sidebarCollapsed ? "left-[72px]" : "left-64"
      )}
    >
      {/* Search */}
      <div className="relative w-80 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          type="text"
          placeholder="Search projects, workers, equipment..."
          className="input-field !py-2 !pl-10 !text-sm w-full"
        />
      </div>

      <div className="flex items-center gap-3">
        {/* Project Selector */}
        <div className="relative">
          <button
            onClick={() => { setShowProjects(!showProjects); setShowNotifications(false); setShowProfile(false); }}
            className="flex items-center gap-2 glass-card-sm !py-2 !px-3 text-sm"
          >
            <span className="text-gray-400 hidden sm:inline">Project:</span>
            <span className="font-medium truncate max-w-[160px]">{selectedProject.name}</span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>
          {showProjects && (
            <div className="absolute right-0 top-full mt-2 w-72 glass-card !p-2 z-50">
              {projects.map((p) => (
                <button
                  key={p.id}
                  onClick={() => { setSelectedProject(p); setShowProjects(false); }}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                    p.id === selectedProject.id ? "bg-brand-600/20 text-brand-400" : "hover:bg-white/5 text-gray-300"
                  )}
                >
                  <p className="font-medium">{p.name}</p>
                  <p className="text-xs text-gray-500">{p.location} · {p.completion}%</p>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        <button
          onClick={() => setIsDark(!isDark)}
          className="btn-ghost !p-2"
          title="Toggle theme"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => { setShowNotifications(!showNotifications); setShowProjects(false); setShowProfile(false); }}
            className="btn-ghost !p-2 relative"
          >
            <Bell className="w-5 h-5" />
            {unreadAlerts > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-status-danger rounded-full text-[10px] flex items-center justify-center font-bold">
                {unreadAlerts}
              </span>
            )}
          </button>
          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-80 glass-card !p-2 z-50 max-h-96 overflow-y-auto">
              <h4 className="text-sm font-medium px-2 py-1 mb-1">Notifications</h4>
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={cn(
                    "px-3 py-2 rounded-lg text-sm mb-1",
                    !alert.read && "bg-white/5"
                  )}
                >
                  <div className="flex items-start gap-2">
                    <div className={cn(
                      "w-2 h-2 rounded-full mt-1.5 shrink-0",
                      alert.severity === "critical" ? "bg-status-danger" :
                      alert.severity === "warning" ? "bg-status-warning" : "bg-brand-500"
                    )} />
                    <div>
                      <p className="font-medium text-xs">{alert.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{alert.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => { setShowProfile(!showProfile); setShowProjects(false); setShowNotifications(false); }}
            className="flex items-center gap-2 glass-card-sm !py-1.5 !px-2"
          >
            <div className="w-8 h-8 rounded-lg bg-brand-600/30 flex items-center justify-center">
              <User className="w-4 h-4 text-brand-400" />
            </div>
            <span className="text-sm hidden md:inline">Admin</span>
            <ChevronDown className="w-3 h-3 text-gray-400 hidden md:inline" />
          </button>
          {showProfile && (
            <div className="absolute right-0 top-full mt-2 w-48 glass-card !p-2 z-50">
              <Link href="/dashboard/settings" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-white/5">
                <User className="w-4 h-4" /> Profile
              </Link>
              <Link href="/dashboard/settings" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-white/5">
                <Settings className="w-4 h-4" /> Settings
              </Link>
              <hr className="border-white/5 my-1" />
              <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-status-danger hover:bg-white/5">
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function Settings({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
