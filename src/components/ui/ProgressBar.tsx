"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  color?: "blue" | "green" | "orange" | "red";
  size?: "sm" | "md";
}

export default function ProgressBar({
  value,
  max = 100,
  label,
  showValue = true,
  color = "blue",
  size = "md",
}: ProgressBarProps) {
  const percent = Math.min(100, (value / max) * 100);

  const colorClasses = {
    blue: "bg-brand-500",
    green: "bg-status-success",
    orange: "bg-status-warning",
    red: "bg-status-danger",
  };

  const glowClasses = {
    blue: "shadow-[0_0_8px_rgba(59,130,246,0.5)]",
    green: "shadow-[0_0_8px_rgba(34,197,94,0.5)]",
    orange: "shadow-[0_0_8px_rgba(234,179,8,0.5)]",
    red: "shadow-[0_0_8px_rgba(239,68,68,0.5)]",
  };

  return (
    <div className="w-full">
      {(label || showValue) && (
        <div className="flex justify-between mb-1">
          {label && <span className="text-xs text-gray-400">{label}</span>}
          {showValue && <span className="text-xs font-medium tabular-nums">{percent.toFixed(0)}%</span>}
        </div>
      )}
      <div className={cn("w-full rounded-full bg-surface-border overflow-hidden", size === "sm" ? "h-1.5" : "h-2.5")}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className={cn("h-full rounded-full", colorClasses[color], glowClasses[color])}
        />
      </div>
    </div>
  );
}
