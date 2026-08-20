"use client";

import { useState } from "react";
import { Truck, Fuel, Clock, MapPin, Wrench, X, Battery, Navigation } from "lucide-react";
import { equipment } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import StatCard from "@/components/ui/StatCard";
import ProgressBar from "@/components/ui/ProgressBar";
import { motion, AnimatePresence } from "framer-motion";

type Equipment = typeof equipment[number];

export default function EquipmentPage() {
  const running = equipment.filter((e) => e.status === "running").length;
  const maintenance = equipment.filter((e) => e.status === "maintenance").length;
  const [selected, setSelected] = useState<Equipment | null>(null);

  const statusColor: Record<string, string> = {
    running: "bg-status-success shadow-[0_0_8px_rgba(34,197,94,0.6)]",
    idle: "bg-brand-400 shadow-[0_0_8px_rgba(59,130,246,0.5)]",
    maintenance: "bg-status-warning shadow-[0_0_8px_rgba(234,179,8,0.5)]",
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-display font-bold">Equipment Monitoring</h1>
        <p className="text-sm text-gray-400">Fleet tracking with GPS, fuel, and maintenance</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard label="Total Equipment" value={equipment.length} icon={<Truck className="w-4 h-4" />} />
        <StatCard label="Running" value={running} icon={<Truck className="w-4 h-4" />} color="green" />
        <StatCard label="Idle" value={equipment.length - running - maintenance} icon={<Clock className="w-4 h-4" />} color="blue" />
        <StatCard label="Maintenance" value={maintenance} icon={<Wrench className="w-4 h-4" />} color="orange" />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {equipment.map((e) => (
          <motion.div
            key={e.id}
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={() => setSelected(e)}
            className="glass-card cursor-pointer hover:border-brand-500/20"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-medium">{e.name}</h4>
                <p className="text-xs text-gray-500">{e.type}</p>
              </div>
              <span className={cn(
                "badge !text-[10px]",
                e.status === "running" ? "badge-success" : e.status === "idle" ? "badge-info" : "badge-warning"
              )}>
                {e.status}
              </span>
            </div>
            <ProgressBar
              value={e.fuelLevel}
              label="Fuel Level"
              color={e.fuelLevel < 30 ? "red" : e.fuelLevel < 60 ? "orange" : "green"}
              size="sm"
            />
            <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3 h-3 text-gray-500" />
                <span>{e.workingHours}h today</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Fuel className="w-3 h-3 text-gray-500" />
                <span>{e.fuelLevel}% fuel</span>
              </div>
              <div className="flex items-center gap-1.5 col-span-2">
                <MapPin className="w-3 h-3 text-gray-500" />
                <span>{e.location}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Equipment Detail Modal */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setSelected(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="fixed inset-x-4 top-1/2 -translate-y-1/2 max-w-md mx-auto z-50 glass-card"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-lg">{selected.name}</h3>
                  <p className="text-sm text-gray-400">{selected.type}</p>
                </div>
                <button onClick={() => setSelected(null)} className="btn-ghost !p-1.5">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                {[
                  { icon: <Battery className="w-4 h-4" />, label: "Fuel Level", value: `${selected.fuelLevel}%` },
                  { icon: <Clock className="w-4 h-4" />, label: "Hours Today", value: `${selected.workingHours}h` },
                  { icon: <Navigation className="w-4 h-4" />, label: "GPS", value: `${selected.gps?.lat.toFixed(4)}, ${selected.gps?.lng.toFixed(4)}` },
                  { icon: <MapPin className="w-4 h-4" />, label: "Location", value: selected.location },
                ].map((item) => (
                  <div key={item.label} className="glass-card-sm !p-3">
                    <div className="flex items-center gap-1.5 text-brand-400 mb-1">
                      {item.icon}
                      <span className="text-[10px] text-gray-400">{item.label}</span>
                    </div>
                    <p className="text-sm font-medium">{item.value}</p>
                  </div>
                ))}
              </div>

              <ProgressBar
                value={selected.fuelLevel}
                label="Fuel Level"
                color={selected.fuelLevel < 30 ? "red" : selected.fuelLevel < 60 ? "orange" : "green"}
              />

              <div className="mt-4 flex gap-2">
                <span className={cn(
                  "badge text-sm px-3 py-1",
                  selected.status === "running" ? "badge-success" : selected.status === "idle" ? "badge-info" : "badge-warning"
                )}>
                  {selected.status.toUpperCase()}
                </span>
                {selected.status === "maintenance" && (
                  <button className="btn-secondary !py-1.5 !px-3 text-xs">Schedule Maintenance</button>
                )}
                {selected.status === "idle" && (
                  <button className="btn-primary !py-1.5 !px-3 text-xs">Assign Task</button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* GPS Map */}
      <div className="glass-card">
        <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-brand-400" /> Equipment GPS Map
          <span className="text-xs text-gray-500 ml-auto">Click a dot to see details</span>
        </h4>
        <div className="aspect-[3/1] rounded-xl bg-surface-elevated flex items-center justify-center relative overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&h=400&fit=crop"
            alt="Map"
            className="w-full h-full object-cover opacity-30"
          />
          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "linear-gradient(rgba(59,130,246,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.4) 1px, transparent 1px)",
              backgroundSize: "10% 25%",
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-sm text-gray-500 font-medium">Construction Site — Downtown Metro, NY</p>
          </div>
          {equipment.map((e, i) => (
            <motion.button
              key={e.id}
              whileHover={{ scale: 1.8 }}
              onClick={() => setSelected(e)}
              title={`${e.name} · ${e.status}`}
              className={cn(
                "absolute w-3.5 h-3.5 rounded-full cursor-pointer border-2 border-surface z-10",
                statusColor[e.status] || "bg-gray-400"
              )}
              style={{
                left: `${15 + i * 12}%`,
                top: `${25 + (i % 3) * 22}%`,
                animation: e.status === "running" ? "pulse 2s infinite" : "none",
              }}
            />
          ))}
          {/* Legend */}
          <div className="absolute bottom-3 right-3 glass-card-sm !p-2 flex flex-col gap-1.5">
            {[
              { color: "bg-status-success", label: "Running" },
              { color: "bg-brand-400", label: "Idle" },
              { color: "bg-status-warning", label: "Maintenance" },
            ].map((l) => (
              <div key={l.label} className="flex items-center gap-1.5">
                <div className={cn("w-2.5 h-2.5 rounded-full", l.color)} />
                <span className="text-[10px] text-gray-400">{l.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
