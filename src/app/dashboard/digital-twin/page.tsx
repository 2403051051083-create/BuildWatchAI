"use client";

import { useState } from "react";
import DigitalTwinPanel from "@/components/3d/DigitalTwinPanel";
import { floors } from "@/lib/mock-data";
import { motion } from "framer-motion";
import { Box, CheckCircle2, Clock, AlertCircle, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import ProgressBar from "@/components/ui/ProgressBar";

const statusIcons: Record<string, React.ReactNode> = {
  completed: <CheckCircle2 className="w-3.5 h-3.5 text-status-success" />,
  "in-progress": <Clock className="w-3.5 h-3.5 text-status-warning" />,
  delayed: <AlertCircle className="w-3.5 h-3.5 text-status-danger" />,
  "not-started": <Circle className="w-3.5 h-3.5 text-gray-600" />,
};

export default function DigitalTwinPage() {
  const [selectedFloorId, setSelectedFloorId] = useState<number | null>(null);
  const selectedFloor = floors.find((f) => f.id === selectedFloorId);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-display font-bold">3D Digital Twin</h1>
          <p className="text-sm text-gray-400">Interactive BIM-style building visualization with timeline animation</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          {[
            { color: "#22c55e", label: "Completed" },
            { color: "#eab308", label: "In Progress" },
            { color: "#ef4444", label: "Delayed" },
            { color: "#6b7280", label: "Not Started" },
          ].map((l) => (
            <div key={l.label} className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded" style={{ background: l.color }} />
              <span>{l.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-4">
        {/* 3D Viewer */}
        <div className="lg:col-span-9 glass-card !p-4">
          <DigitalTwinPanel onFloorSelect={(floor) => setSelectedFloorId(floor.id)} />
        </div>

        {/* Floor Summary Sidebar */}
        <div className="lg:col-span-3 space-y-3">
          <div className="glass-card !p-4">
            <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
              <Box className="w-4 h-4 text-brand-400" /> Floor Status
            </h4>
            <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
              {floors.map((floor) => (
                <motion.button
                  key={floor.id}
                  whileHover={{ x: 3 }}
                  onClick={() => setSelectedFloorId(floor.id === selectedFloorId ? null : floor.id)}
                  className={cn(
                    "w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs transition-colors text-left",
                    selectedFloorId === floor.id
                      ? "bg-brand-600/20 text-brand-400 border border-brand-500/30"
                      : "hover:bg-white/5 text-gray-400"
                  )}
                >
                  {statusIcons[floor.status]}
                  <span className="flex-1 truncate font-medium">{floor.name}</span>
                  <span className="text-gray-500">{floor.completion}%</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Selected Floor Details */}
          {selectedFloor ? (
            <motion.div
              key={selectedFloor.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card !p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">{selectedFloor.name}</h4>
                <span className={cn(
                  "badge !text-[10px]",
                  selectedFloor.status === "completed" ? "badge-success" :
                  selectedFloor.status === "in-progress" ? "badge-warning" :
                  selectedFloor.status === "delayed" ? "badge-danger" : "badge-info"
                )}>
                  {selectedFloor.status}
                </span>
              </div>

              <ProgressBar value={selectedFloor.completion} color={
                selectedFloor.status === "completed" ? "green" :
                selectedFloor.status === "delayed" ? "red" : "blue"
              } label="Completion" />

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="glass-card-sm !p-2">
                  <p className="text-gray-500">Workers</p>
                  <p className="font-bold text-base">{selectedFloor.workers}</p>
                </div>
                <div className="glass-card-sm !p-2">
                  <p className="text-gray-500">Safety Score</p>
                  <p className={cn("font-bold text-base", selectedFloor.safetyScore >= 90 ? "text-status-success" : "text-status-warning")}>
                    {selectedFloor.safetyScore}
                  </p>
                </div>
              </div>

              <div className="text-xs space-y-1.5 pt-1 border-t border-white/5">
                <div>
                  <p className="text-gray-500">Materials Used</p>
                  <p className="text-white mt-0.5">{selectedFloor.materialUsed}</p>
                </div>
                <div>
                  <p className="text-gray-500">Concrete Strength</p>
                  <p className="text-white mt-0.5">{selectedFloor.concreteStrength}</p>
                </div>
                <div>
                  <p className="text-gray-500">Engineer Notes</p>
                  <p className="text-gray-300 mt-0.5 leading-relaxed">{selectedFloor.engineerNotes}</p>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="glass-card !p-4 text-center">
              <Box className="w-8 h-8 text-gray-600 mx-auto mb-2" />
              <p className="text-xs text-gray-500">Click a floor in the viewer or sidebar to see details</p>
            </div>
          )}

          {/* Overall Stats */}
          <div className="glass-card !p-4">
            <h4 className="text-xs text-gray-400 mb-3">Building Overview</h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500">Total Floors</span>
                <span className="font-medium">{floors.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Completed</span>
                <span className="text-status-success font-medium">{floors.filter(f => f.status === "completed").length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">In Progress</span>
                <span className="text-status-warning font-medium">{floors.filter(f => f.status === "in-progress").length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Delayed</span>
                <span className="text-status-danger font-medium">{floors.filter(f => f.status === "delayed").length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Not Started</span>
                <span className="text-gray-400 font-medium">{floors.filter(f => f.status === "not-started").length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
