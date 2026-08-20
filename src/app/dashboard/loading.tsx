"use client";

import { motion } from "framer-motion";

function Skeleton({ className = "" }: { className?: string }) {
  return (
    <motion.div
      animate={{ opacity: [0.4, 0.8, 0.4] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      className={`rounded-xl bg-white/5 ${className}`}
    />
  );
}

export default function DashboardLoading() {
  return (
    <div className="space-y-4">
      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-20" />
        ))}
      </div>
      {/* Main content */}
      <div className="grid lg:grid-cols-12 gap-4">
        <div className="lg:col-span-3 space-y-4">
          <Skeleton className="h-56" />
          <Skeleton className="h-40" />
        </div>
        <div className="lg:col-span-6">
          <Skeleton className="h-[400px]" />
        </div>
        <div className="lg:col-span-3 space-y-4">
          <Skeleton className="h-48" />
          <Skeleton className="h-48" />
        </div>
      </div>
      {/* Camera row */}
      <Skeleton className="h-48" />
    </div>
  );
}
