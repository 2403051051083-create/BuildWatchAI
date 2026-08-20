"use client";

import { useState } from "react";
import {
  Layers,
  Grid3x3,
  Eye,
  Sun,
  Moon,
  Maximize2,
  Box,
  Scissors,
} from "lucide-react";
import DigitalTwinViewer from "./DigitalTwinViewer";
import { floors } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import type { FloorData } from "@/lib/types";

interface DigitalTwinPanelProps {
  compact?: boolean;
  onFloorSelect?: (floor: FloorData) => void;
}

export default function DigitalTwinPanel({ compact = false, onFloorSelect }: DigitalTwinPanelProps) {
  const [selectedFloor, setSelectedFloor] = useState<number | null>(null);
  const [timelineProgress, setTimelineProgress] = useState(67);
  const [viewMode, setViewMode] = useState<"solid" | "wireframe" | "exploded" | "transparent">("solid");
  const [isNightMode, setIsNightMode] = useState(false);
  const [visibleFloors, setVisibleFloors] = useState<number[]>(floors.map((f) => f.id));

  const handleFloorSelect = (id: number) => {
    setSelectedFloor(id);
    const floor = floors.find((f) => f.id === id);
    if (floor && onFloorSelect) onFloorSelect(floor);
  };

  const toggleFloorVisibility = (id: number) => {
    setVisibleFloors((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const viewModes = [
    { id: "solid" as const, icon: Box, label: "Solid" },
    { id: "wireframe" as const, icon: Grid3x3, label: "Wireframe" },
    { id: "exploded" as const, icon: Layers, label: "Exploded" },
    { id: "transparent" as const, icon: Eye, label: "Transparent" },
  ];

  const selectedFloorData = floors.find((f) => f.id === selectedFloor);

  return (
    <div className={cn("flex flex-col gap-3", compact ? "h-full" : "h-[calc(100vh-12rem)]")}>
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-1">
          {viewModes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => setViewMode(mode.id)}
              className={cn(
                "btn-ghost !px-3 !py-1.5 text-xs",
                viewMode === mode.id && "bg-brand-600/20 text-brand-400"
              )}
              title={mode.label}
            >
              <mode.icon className="w-4 h-4" />
              {!compact && <span className="hidden sm:inline">{mode.label}</span>}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsNightMode(!isNightMode)}
            className="btn-ghost !px-3 !py-1.5"
            title={isNightMode ? "Day Mode" : "Night Mode"}
          >
            {isNightMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button className="btn-ghost !px-3 !py-1.5" title="Section View">
            <Scissors className="w-4 h-4" />
          </button>
          <button className="btn-ghost !px-3 !py-1.5" title="Fullscreen">
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3D Viewport + Side Panel */}
      <div className="flex-1 flex gap-3 min-h-0">
        <div className="flex-1 relative rounded-xl overflow-hidden border border-white/10">
          <DigitalTwinViewer
            selectedFloor={selectedFloor}
            onFloorSelect={handleFloorSelect}
            timelineProgress={timelineProgress}
            viewMode={viewMode}
            isNightMode={isNightMode}
            visibleFloors={visibleFloors}
          />

          {/* Legend */}
          <div className="absolute bottom-3 left-3 glass-card-sm !p-2 flex gap-3 text-xs">
            {[
              { color: "#22c55e", label: "Completed" },
              { color: "#eab308", label: "In Progress" },
              { color: "#6b7280", label: "Not Started" },
              { color: "#ef4444", label: "Delayed" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: item.color }} />
                <span className="text-gray-400">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Floor selector + details */}
        {!compact && (
          <div className="w-64 flex flex-col gap-3 overflow-y-auto">
            <div className="glass-card-sm">
              <h4 className="text-sm font-medium mb-2">Floor Selection</h4>
              <div className="space-y-1 max-h-48 overflow-y-auto">
                {floors.map((floor) => (
                  <button
                    key={floor.id}
                    onClick={() => handleFloorSelect(floor.id)}
                    className={cn(
                      "w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs transition-colors",
                      selectedFloor === floor.id
                        ? "bg-brand-600/20 text-brand-400"
                        : "hover:bg-white/5 text-gray-400"
                    )}
                  >
                    <div
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: getFloorColor(floor.status) }}
                    />
                    <span className="flex-1 text-left">{floor.name}</span>
                    <span>{floor.completion}%</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFloorVisibility(floor.id);
                      }}
                      className="opacity-50 hover:opacity-100"
                    >
                      <Eye className={cn("w-3 h-3", !visibleFloors.includes(floor.id) && "opacity-30")} />
                    </button>
                  </button>
                ))}
              </div>
            </div>

            {selectedFloorData && (
              <div className="glass-card-sm space-y-2 text-xs">
                <h4 className="text-sm font-medium">{selectedFloorData.name}</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div><span className="text-gray-500">Completion</span><p className="text-white font-medium">{selectedFloorData.completion}%</p></div>
                  <div><span className="text-gray-500">Workers</span><p className="text-white font-medium">{selectedFloorData.workers}</p></div>
                  <div><span className="text-gray-500">Safety</span><p className="text-status-success font-medium">{selectedFloorData.safetyScore}/100</p></div>
                  <div><span className="text-gray-500">Concrete</span><p className="text-white font-medium">{selectedFloorData.concreteStrength}</p></div>
                </div>
                <p className="text-gray-400 pt-1 border-t border-white/5">{selectedFloorData.engineerNotes}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Timeline Slider */}
      <div className="glass-card-sm !p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-400">Construction Timeline</span>
          <span className="text-xs font-medium text-brand-400">{timelineProgress}% Built</span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={timelineProgress}
          onChange={(e) => setTimelineProgress(Number(e.target.value))}
          className="w-full h-1.5 rounded-full appearance-none bg-surface-border cursor-pointer
                     [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
                     [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand-500
                     [&::-webkit-slider-thumb]:shadow-glow [&::-webkit-slider-thumb]:cursor-pointer"
        />
        <div className="flex justify-between mt-1.5 text-[10px] text-gray-500">
          <span>Day 1</span>
          <span>Day 20</span>
          <span>Day 45</span>
          <span>Day 60</span>
          <span>Current</span>
        </div>
      </div>
    </div>
  );
}

function getFloorColor(status: string): string {
  switch (status) {
    case "completed": return "#22c55e";
    case "in-progress": return "#eab308";
    case "delayed": return "#ef4444";
    default: return "#6b7280";
  }
}
