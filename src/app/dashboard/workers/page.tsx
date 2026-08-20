"use client";

import { useState } from "react";
import { HardHat, Shield, AlertTriangle, UserX, MapPin, User, CheckCircle2, XCircle } from "lucide-react";
import { workers } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import StatCard from "@/components/ui/StatCard";
import { motion, AnimatePresence } from "framer-motion";

const zoneColors: Record<string, string> = {
  "Floor 3": "bg-brand-500/20 border-brand-500/40 text-brand-400",
  "Floor 2": "bg-purple-500/20 border-purple-500/40 text-purple-400",
  "Floor 4": "bg-cyan-500/20 border-cyan-500/40 text-cyan-400",
  "Restricted": "bg-status-danger/20 border-status-danger/40 text-status-danger",
  "Ground Floor": "bg-status-success/20 border-status-success/40 text-status-success",
  "Crane Zone": "bg-status-warning/20 border-status-warning/40 text-status-warning",
  "Floor 1": "bg-emerald-500/20 border-emerald-500/40 text-emerald-400",
};

// Zone positions for the site map (percentage-based)
const zoneMap = [
  { label: "Crane Zone", x: 10, y: 8, w: 20, h: 16 },
  { label: "Floor 4", x: 35, y: 5, w: 30, h: 18 },
  { label: "Floor 3", x: 68, y: 5, w: 28, h: 18 },
  { label: "Floor 2", x: 10, y: 30, w: 25, h: 18 },
  { label: "Floor 1", x: 38, y: 28, w: 25, h: 18 },
  { label: "Ground Floor", x: 66, y: 28, w: 30, h: 18 },
  { label: "Floor 5", x: 10, y: 54, w: 20, h: 16 },
  { label: "Restricted", x: 35, y: 52, w: 22, h: 16 },
  { label: "Material Yard", x: 62, y: 52, w: 34, h: 16 },
];

export default function WorkersPage() {
  const [activeTab, setActiveTab] = useState<"table" | "map">("map");
  const [selectedWorker, setSelectedWorker] = useState<string | null>(null);

  const totalWorkers = workers.filter((w) => w.role !== "Unknown").length;
  const violations = workers.filter((w) => !w.helmet || !w.safetyJacket).length;
  const unknown = workers.filter((w) => w.role === "Unknown").length;

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-display font-bold">Worker Monitoring</h1>
        <p className="text-sm text-gray-400">AI-powered safety and attendance tracking</p>
      </div>

      <motion.div
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.08 } }, hidden: {} }}
        className="grid grid-cols-2 md:grid-cols-4 gap-3"
      >
        {[
          { label: "Total Workers", value: totalWorkers, icon: <HardHat className="w-4 h-4" />, color: "blue" as const },
          { label: "PPE Compliant", value: `${Math.round(((totalWorkers - violations) / totalWorkers) * 100)}%`, icon: <Shield className="w-4 h-4" />, color: "green" as const },
          { label: "Violations", value: violations, icon: <AlertTriangle className="w-4 h-4" />, color: "orange" as const },
          { label: "Unknown Persons", value: unknown, icon: <UserX className="w-4 h-4" />, color: "red" as const },
        ].map((s) => (
          <motion.div
            key={s.label}
            variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
          >
            <StatCard {...s} />
          </motion.div>
        ))}
      </motion.div>

      {/* Tab Switch */}
      <div className="flex gap-2">
        {(["map", "table"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm capitalize transition-colors",
              activeTab === tab ? "bg-brand-600/20 text-brand-400 border border-brand-500/30" : "text-gray-400 hover:bg-white/5"
            )}
          >
            {tab === "map" ? "🗺 Zone Map" : "📋 Table View"}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "map" ? (
          <motion.div
            key="map"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="grid lg:grid-cols-3 gap-4"
          >
            {/* Site Zone Map */}
            <div className="lg:col-span-2 glass-card">
              <h4 className="text-sm font-medium mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-400" /> Live Site Zone Map
              </h4>
              <div className="relative bg-surface-elevated rounded-xl overflow-hidden" style={{ aspectRatio: "16/9" }}>
                {/* Grid lines for site feel */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: "linear-gradient(rgba(59,130,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.3) 1px, transparent 1px)",
                    backgroundSize: "8% 12%",
                  }}
                />

                {/* Zones */}
                {zoneMap.map((zone) => {
                  const zoneWorkers = workers.filter((w) => w.zone === zone.label);
                  const hasViolation = zoneWorkers.some((w) => !w.helmet || !w.safetyJacket);
                  const hasUnknown = zoneWorkers.some((w) => w.role === "Unknown");
                  const count = zoneWorkers.length;

                  return (
                    <div
                      key={zone.label}
                      className={cn(
                        "absolute border rounded-lg flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 hover:scale-105",
                        hasUnknown
                          ? "bg-status-danger/15 border-status-danger/40"
                          : hasViolation
                          ? "bg-status-warning/15 border-status-warning/40"
                          : count > 0
                          ? "bg-brand-500/10 border-brand-500/30"
                          : "bg-white/[0.03] border-white/10"
                      )}
                      style={{
                        left: `${zone.x}%`,
                        top: `${zone.y}%`,
                        width: `${zone.w}%`,
                        height: `${zone.h}%`,
                      }}
                    >
                      <span className="text-[9px] font-medium text-gray-300 leading-tight px-1">{zone.label}</span>
                      {count > 0 && (
                        <div className="flex items-center gap-1 mt-0.5">
                          <User className="w-2.5 h-2.5 text-gray-400" />
                          <span className="text-[9px] font-bold text-white">{count}</span>
                          {(hasViolation || hasUnknown) && (
                            <span className="w-1.5 h-1.5 rounded-full bg-status-danger animate-pulse" />
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Legend */}
                <div className="absolute bottom-2 right-2 flex flex-col gap-1">
                  {[
                    { color: "bg-brand-500/30 border-brand-500/50", label: "Active" },
                    { color: "bg-status-warning/30 border-status-warning/50", label: "Violation" },
                    { color: "bg-status-danger/30 border-status-danger/50", label: "Unauthorized" },
                  ].map((l) => (
                    <div key={l.label} className="flex items-center gap-1.5">
                      <div className={cn("w-3 h-2 rounded border", l.color)} />
                      <span className="text-[9px] text-gray-400">{l.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Worker Cards */}
            <div className="space-y-2 overflow-y-auto max-h-[420px] pr-1">
              <h4 className="text-sm font-medium mb-2">All Workers</h4>
              {workers.map((w) => (
                <motion.button
                  key={w.id}
                  whileHover={{ x: 4 }}
                  onClick={() => setSelectedWorker(selectedWorker === w.id ? null : w.id)}
                  className={cn(
                    "w-full glass-card-sm !p-3 text-left transition-colors",
                    w.role === "Unknown" && "border-status-danger/30 bg-status-danger/5",
                    selectedWorker === w.id && "border-brand-500/40"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold",
                      w.role === "Unknown" ? "bg-status-danger/20 text-status-danger" : "bg-brand-600/20 text-brand-400"
                    )}>
                      {w.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate">{w.name}</p>
                      <p className="text-[10px] text-gray-500">{w.role} · {w.zone}</p>
                    </div>
                    <span className={cn(
                      "badge !text-[9px]",
                      w.status === "active" ? "badge-success" : w.status === "break" ? "badge-warning" : "badge-info"
                    )}>
                      {w.status}
                    </span>
                  </div>
                  <AnimatePresence>
                    {selectedWorker === w.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="mt-2 pt-2 border-t border-white/5 grid grid-cols-4 gap-1"
                      >
                        {[
                          { label: "Helmet", ok: w.helmet },
                          { label: "Jacket", ok: w.safetyJacket },
                          { label: "Gloves", ok: w.gloves },
                          { label: "Boots", ok: w.boots },
                        ].map((ppe) => (
                          <div key={ppe.label} className="flex flex-col items-center gap-0.5">
                            {ppe.ok
                              ? <CheckCircle2 className="w-3.5 h-3.5 text-status-success" />
                              : <XCircle className="w-3.5 h-3.5 text-status-danger" />
                            }
                            <span className="text-[9px] text-gray-500">{ppe.label}</span>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="table"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="glass-card overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5 text-gray-400 text-xs">
                    <th className="text-left p-3">Worker</th>
                    <th className="text-left p-3">Role</th>
                    <th className="text-center p-3">Helmet</th>
                    <th className="text-center p-3">Jacket</th>
                    <th className="text-center p-3">Gloves</th>
                    <th className="text-center p-3">Boots</th>
                    <th className="text-left p-3">Zone</th>
                    <th className="text-left p-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {workers.map((w) => (
                    <tr
                      key={w.id}
                      className={cn("border-b border-white/5 hover:bg-white/[0.02] transition-colors", w.role === "Unknown" && "bg-status-danger/5")}
                    >
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <div className={cn(
                            "w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold shrink-0",
                            w.role === "Unknown" ? "bg-status-danger/20 text-status-danger" : "bg-brand-600/20 text-brand-400"
                          )}>
                            {w.name.split(" ").map(n => n[0]).join("")}
                          </div>
                          <span className="font-medium">{w.name}</span>
                        </div>
                      </td>
                      <td className="p-3 text-gray-400">{w.role}</td>
                      <td className="p-3 text-center">{w.helmet ? <CheckCircle2 className="w-4 h-4 text-status-success mx-auto" /> : <XCircle className="w-4 h-4 text-status-danger mx-auto" />}</td>
                      <td className="p-3 text-center">{w.safetyJacket ? <CheckCircle2 className="w-4 h-4 text-status-success mx-auto" /> : <XCircle className="w-4 h-4 text-status-danger mx-auto" />}</td>
                      <td className="p-3 text-center">{w.gloves ? <CheckCircle2 className="w-4 h-4 text-status-success mx-auto" /> : <XCircle className="w-4 h-4 text-status-danger mx-auto" />}</td>
                      <td className="p-3 text-center">{w.boots ? <CheckCircle2 className="w-4 h-4 text-status-success mx-auto" /> : <XCircle className="w-4 h-4 text-status-danger mx-auto" />}</td>
                      <td className="p-3">
                        <span className={cn("flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border w-fit", zoneColors[w.zone] || "text-gray-400")}>
                          <MapPin className="w-3 h-3" /> {w.zone}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className={cn("badge !text-[10px]", w.status === "active" ? "badge-success" : w.status === "break" ? "badge-warning" : "badge-info")}>
                          {w.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
