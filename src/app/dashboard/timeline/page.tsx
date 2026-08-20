"use client";

import { useState } from "react";
import {
  Clock, CheckCircle, Circle, AlertCircle, CalendarDays,
  TrendingUp, Flag, Layers, ChevronRight,
} from "lucide-react";
import { timelineDays, floors } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import StatCard from "@/components/ui/StatCard";

const milestones = [
  { date: "2024-03-15", title: "Project Kickoff", status: "completed", phase: "Planning" },
  { date: "2024-06-01", title: "Foundation Complete", status: "completed", phase: "Foundation" },
  { date: "2024-09-15", title: "Ground Floor Complete", status: "completed", phase: "Structure" },
  { date: "2025-01-20", title: "Floor 3 Slab Pour", status: "completed", phase: "Structure" },
  { date: "2025-07-20", title: "Floor 5 Steel Delay", status: "delayed", phase: "Structure" },
  { date: "2025-09-01", title: "Floor 6 Target", status: "upcoming", phase: "Structure" },
  { date: "2026-06-01", title: "Facade Complete", status: "upcoming", phase: "Finishing" },
  { date: "2026-12-30", title: "Project Handover", status: "upcoming", phase: "Handover" },
];

const phases = [
  { name: "Planning", start: 0, duration: 10, color: "#8b5cf6" },
  { name: "Foundation", start: 10, duration: 15, color: "#3b82f6" },
  { name: "Structure", start: 25, duration: 50, color: "#f97316" },
  { name: "MEP Work", start: 45, duration: 30, color: "#22c55e" },
  { name: "Finishing", start: 75, duration: 20, color: "#eab308" },
  { name: "Handover", start: 95, duration: 5, color: "#94a3b8" },
];

const TOTAL_DAYS = 1020; // Mar 2024 → Dec 2026
const currentProgress = 67;

export default function TimelinePage() {
  const [selectedDay, setSelectedDay] = useState(timelineDays[timelineDays.length - 1]);
  const [selectedMilestone, setSelectedMilestone] = useState<string | null>(null);

  const completedFloors = floors.filter((f) => f.status === "completed").length;
  const inProgressFloors = floors.filter((f) => f.status === "in-progress").length;
  const delayedFloors = floors.filter((f) => f.status === "delayed").length;

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-display font-bold">Project Timeline</h1>
        <p className="text-sm text-gray-400">Construction progress, Gantt chart, and milestone tracking</p>
      </div>

      {/* Stats */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.08 } }, hidden: {} }}
        className="grid grid-cols-2 md:grid-cols-4 gap-3"
      >
        {[
          { label: "Overall Progress", value: `${currentProgress}%`, icon: <TrendingUp className="w-4 h-4" />, color: "green" as const },
          { label: "Floors Complete", value: completedFloors, icon: <Layers className="w-4 h-4" />, color: "blue" as const },
          { label: "In Progress", value: inProgressFloors, icon: <Clock className="w-4 h-4" />, color: "orange" as const },
          { label: "Delayed", value: delayedFloors, icon: <AlertCircle className="w-4 h-4" />, color: "red" as const },
        ].map((s) => (
          <motion.div key={s.label} variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}>
            <StatCard {...s} />
          </motion.div>
        ))}
      </motion.div>

      {/* Timeline Scrubber */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card"
      >
        <h4 className="text-sm font-medium mb-4 flex items-center gap-2">
          <Clock className="w-4 h-4 text-brand-400" /> Construction Timeline — Skyline Tower Phase II
        </h4>
        <div className="relative">
          {/* Progress bar */}
          <div className="h-2 bg-surface-border rounded-full mb-4">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${selectedDay.completion}%` }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="h-full bg-gradient-to-r from-brand-600 to-brand-400 rounded-full"
            />
          </div>

          {/* Day checkpoints */}
          <div className="flex justify-between">
            {timelineDays.map((day) => (
              <button
                key={day.day}
                onClick={() => setSelectedDay(day)}
                className={cn(
                  "flex flex-col items-center gap-1 transition-all group",
                  selectedDay.day === day.day ? "text-brand-400" : "text-gray-500 hover:text-gray-300"
                )}
              >
                <div className={cn(
                  "w-4 h-4 rounded-full border-2 transition-all group-hover:scale-110",
                  selectedDay.day === day.day
                    ? "bg-brand-500 border-brand-400 shadow-[0_0_8px_rgba(59,130,246,0.6)]"
                    : day.completion <= currentProgress
                    ? "bg-brand-700 border-brand-600"
                    : "border-gray-700"
                )} />
                <span className="text-xs font-medium">{day.label}</span>
                <span className="text-[10px]">{day.completion}%</span>
              </button>
            ))}
          </div>
        </div>

        {/* Selected day info */}
        <motion.div
          key={selectedDay.day}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 pt-4 border-t border-white/5 grid md:grid-cols-3 gap-4 text-sm"
        >
          <div className="glass-card-sm !p-3">
            <p className="text-xs text-gray-500 mb-1">Completion at {selectedDay.label}</p>
            <p className="text-2xl font-bold text-brand-400">{selectedDay.completion}%</p>
          </div>
          <div className="glass-card-sm !p-3">
            <p className="text-xs text-gray-500 mb-1">Floors Built</p>
            <p className="font-medium">{selectedDay.floorsBuilt.length} floors</p>
            <p className="text-xs text-gray-500 mt-1 truncate">
              {selectedDay.floorsBuilt
                .map((f) => floors.find((fl) => fl.id === f)?.name)
                .join(" · ")}
            </p>
          </div>
          <div className="glass-card-sm !p-3">
            <p className="text-xs text-gray-500 mb-1">Day on Project</p>
            <p className="font-medium">Day {selectedDay.day} of {TOTAL_DAYS}</p>
            <p className="text-xs text-gray-500 mt-1">{Math.round((selectedDay.day / TOTAL_DAYS) * 100)}% time elapsed</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Gantt Chart */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card overflow-hidden"
      >
        <h4 className="text-sm font-medium mb-5 flex items-center gap-2">
          <CalendarDays className="w-4 h-4 text-brand-400" /> Gantt Chart — Construction Phases
        </h4>

        {/* Header: Month labels */}
        <div className="relative mb-1">
          <div className="flex justify-between text-[10px] text-gray-500 mb-2 px-1">
            <span>Mar 2024</span>
            <span>Jan 2025</span>
            <span>Sep 2025</span>
            <span>May 2026</span>
            <span>Dec 2026</span>
          </div>

          {/* Current progress marker */}
          <div
            className="absolute top-0 bottom-0 w-px bg-brand-400/80 z-10"
            style={{ left: `${currentProgress}%` }}
          >
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 text-[9px] bg-brand-600 text-white px-1 rounded whitespace-nowrap">
              Now ({currentProgress}%)
            </div>
          </div>
        </div>

        {/* Phase Bars */}
        <div className="space-y-2.5 pb-2">
          {phases.map((phase) => (
            <div key={phase.name} className="flex items-center gap-3">
              <div className="w-20 text-xs text-gray-400 text-right shrink-0">{phase.name}</div>
              <div className="flex-1 h-7 bg-surface-elevated rounded-lg relative overflow-hidden">
                {/* Background track */}
                <div className="absolute inset-0 opacity-5 bg-white" />

                {/* Phase bar */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${phase.duration}%` }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                  className="absolute top-0 h-full rounded-lg flex items-center px-2"
                  style={{
                    left: `${phase.start}%`,
                    background: `${phase.color}30`,
                    border: `1px solid ${phase.color}60`,
                  }}
                >
                  <span className="text-[10px] font-medium truncate" style={{ color: phase.color }}>
                    {phase.name}
                  </span>
                </motion.div>

                {/* Completed portion */}
                {phase.start < currentProgress && (
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${Math.min(phase.duration, currentProgress - phase.start)}%`,
                    }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
                    className="absolute top-0 h-full rounded-lg"
                    style={{
                      left: `${phase.start}%`,
                      background: `${phase.color}60`,
                    }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-4 pt-3 border-t border-white/5 flex gap-4 flex-wrap">
          {phases.map((p) => (
            <div key={p.name} className="flex items-center gap-1.5 text-xs text-gray-400">
              <div className="w-3 h-3 rounded" style={{ background: p.color }} />
              {p.name}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Floor-by-floor Progress */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card"
      >
        <h4 className="text-sm font-medium mb-4 flex items-center gap-2">
          <Layers className="w-4 h-4 text-brand-400" /> Floor-by-Floor Progress
        </h4>
        <div className="space-y-2.5">
          {floors.map((floor, i) => (
            <motion.div
              key={floor.id}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * i }}
              className="flex items-center gap-3"
            >
              <div className="w-20 text-xs text-gray-400 shrink-0 truncate">{floor.name}</div>
              <div className="flex-1 h-5 bg-surface-elevated rounded-full overflow-hidden relative">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${floor.completion}%` }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 * i }}
                  className="h-full rounded-full"
                  style={{
                    background:
                      floor.status === "completed"
                        ? "#22c55e"
                        : floor.status === "in-progress"
                        ? "#f97316"
                        : floor.status === "delayed"
                        ? "#ef4444"
                        : "#6b7280",
                  }}
                />
              </div>
              <div className="w-10 text-xs text-right text-gray-400 shrink-0">{floor.completion}%</div>
              <div className="w-20 shrink-0">
                <span className={cn(
                  "badge !text-[9px]",
                  floor.status === "completed" ? "badge-success" :
                  floor.status === "in-progress" ? "badge-warning" :
                  floor.status === "delayed" ? "badge-danger" : "badge-info"
                )}>
                  {floor.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Milestones */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card"
      >
        <h4 className="text-sm font-medium mb-4 flex items-center gap-2">
          <Flag className="w-4 h-4 text-brand-400" /> Project Milestones
        </h4>
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[9px] top-2 bottom-2 w-px bg-white/10" />

          <div className="space-y-0">
            {milestones.map((m) => (
              <button
                key={m.title}
                onClick={() => setSelectedMilestone(selectedMilestone === m.title ? null : m.title)}
                className="w-full flex gap-4 text-left hover:bg-white/[0.02] rounded-xl transition-colors p-2 -mx-2"
              >
                <div className="shrink-0 mt-0.5 z-10">
                  {m.status === "completed" ? (
                    <CheckCircle className="w-5 h-5 text-status-success" />
                  ) : m.status === "delayed" ? (
                    <AlertCircle className="w-5 h-5 text-status-danger" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-600" />
                  )}
                </div>
                <div className="flex-1 pb-5">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <p className="text-xs text-gray-500">{m.date}</p>
                      <p className={cn(
                        "text-sm font-medium mt-0.5",
                        m.status === "delayed" && "text-status-danger",
                        m.status === "completed" && "text-white",
                        m.status === "upcoming" && "text-gray-400"
                      )}>
                        {m.title}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="badge !text-[9px] !bg-white/5 !text-gray-400">{m.phase}</span>
                      <span className={cn(
                        "badge !text-[10px]",
                        m.status === "completed" ? "badge-success" :
                        m.status === "delayed" ? "badge-danger" : "badge-info"
                      )}>
                        {m.status}
                      </span>
                      <ChevronRight className={cn(
                        "w-3.5 h-3.5 text-gray-600 transition-transform",
                        selectedMilestone === m.title && "rotate-90"
                      )} />
                    </div>
                  </div>

                  {selectedMilestone === m.title && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-2 glass-card-sm !p-3 !rounded-xl text-xs text-gray-400"
                    >
                      {m.status === "delayed"
                        ? "⚠️ Delayed due to steel delivery issues. Resolution expected within 3 days. Rescheduling in progress."
                        : m.status === "completed"
                        ? "✅ Completed on schedule. All quality checks passed. Signed off by project engineer."
                        : "📅 Upcoming milestone. Currently on track based on current progress rate."}
                    </motion.div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
