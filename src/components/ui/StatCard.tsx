"use client";

import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface StatCardProps {
  label: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
  color?: "blue" | "green" | "orange" | "red";
}

function useCountUp(target: number, duration = 500) {
  const [count, setCount] = useState(0);
  const ref = useRef<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      setCount(target);
      return;
    }

    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) {
        ref.current = requestAnimationFrame(animate);
      }
    };
    ref.current = requestAnimationFrame(animate);
    return () => {
      if (ref.current) cancelAnimationFrame(ref.current);
    };
  }, [target, duration, shouldReduceMotion]);

  return count;
}

export default function StatCard({ label, value, change, icon, color = "blue" }: StatCardProps) {
  const colorClasses = {
    blue: "text-brand-400 bg-brand-600/10",
    green: "text-status-success bg-status-success/10",
    orange: "text-status-warning bg-status-warning/10",
    red: "text-status-danger bg-status-danger/10",
  };

  const borderColors = {
    blue: "hover:border-brand-500/30",
    green: "hover:border-status-success/30",
    orange: "hover:border-status-warning/30",
    red: "hover:border-status-danger/30",
  };

  const isNumeric = typeof value === "number";
  const numericValue = isNumeric ? value : parseFloat(String(value).replace(/[^0-9.]/g, ""));
  const suffix = isNumeric ? "" : String(value).replace(/^[\d.]+/, "");
  const animatedCount = useCountUp(isNaN(numericValue) ? 0 : numericValue);
  const displayValue = isNaN(numericValue) ? value : `${animatedCount}${suffix}`;
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
      animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={{ duration: shouldReduceMotion ? 0.1 : 0.2, ease: "easeOut" }}
      className={cn("stat-card group cursor-default transition-all duration-300", borderColors[color])}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500 truncate pr-1">{label}</span>
        <motion.div
          whileHover={shouldReduceMotion ? undefined : { scale: 1.15, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400 }}
          className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0", colorClasses[color])}
        >
          {icon}
        </motion.div>
      </div>
      <p className="text-2xl font-display font-bold tabular-nums">{displayValue}</p>
      {change !== undefined && (
        <div className={cn("flex items-center gap-1 text-xs", change >= 0 ? "text-status-success" : "text-status-danger")}>
          {change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          <span>{change >= 0 ? "+" : ""}{change}% from yesterday</span>
        </div>
      )}
    </motion.div>
  );
}
