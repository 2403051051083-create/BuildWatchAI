"use client";

import { useState } from "react";
import {
  Video, Maximize2, Minimize2, Camera, Move, ZoomIn, ZoomOut,
  RotateCw, Circle, Grid2X2, Grid3X3, Square, Download,
  Wifi, WifiOff, AlertTriangle, Shield, Eye,
} from "lucide-react";
import { cameras } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import StatCard from "@/components/ui/StatCard";
import { motion, AnimatePresence } from "framer-motion";

const layoutOptions = [
  { id: 1, label: "1×1", icon: Square, cols: "grid-cols-1" },
  { id: 2, label: "2×2", icon: Grid2X2, cols: "grid-cols-2" },
  { id: 4, label: "2×3", icon: Grid3X3, cols: "grid-cols-3" },
] as const;

type LayoutId = (typeof layoutOptions)[number]["id"];

export default function CamerasPage() {
  const [selectedCam, setSelectedCam] = useState(cameras[0]);
  const [fullscreen, setFullscreen] = useState(false);
  const [layout, setLayout] = useState<LayoutId>(1);
  const [activeView, setActiveView] = useState<"main" | "grid">("main");

  const liveCams = cameras.filter((c) => c.isLive).length;
  const motionCams = cameras.filter((c) => c.motionDetected).length;
  const recordingCams = cameras.filter((c) => c.isRecording).length;
  const violations = cameras.filter((c) =>
    c.aiDetection.some((d) => d.includes("✗"))
  ).length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-display font-bold">Live Cameras</h1>
          <p className="text-sm text-gray-400">Real-time CCTV feeds with AI detection</p>
        </div>
        <div className="flex gap-2">
          {(["main", "grid"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setActiveView(v)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm capitalize transition-colors",
                activeView === v
                  ? "bg-brand-600/20 text-brand-400 border border-brand-500/30"
                  : "text-gray-400 hover:bg-white/5"
              )}
            >
              {v === "main" ? "🎬 Main View" : "⊞ Grid View"}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.07 } }, hidden: {} }}
        className="grid grid-cols-2 md:grid-cols-4 gap-3"
      >
        {[
          { label: "Live Feeds", value: liveCams, icon: <Wifi className="w-4 h-4" />, color: "green" as const },
          { label: "Recording", value: recordingCams, icon: <Circle className="w-4 h-4" />, color: "red" as const },
          { label: "Motion Alerts", value: motionCams, icon: <AlertTriangle className="w-4 h-4" />, color: "orange" as const },
          { label: "AI Violations", value: violations, icon: <Shield className="w-4 h-4" />, color: violations > 0 ? "red" as const : "green" as const },
        ].map((s) => (
          <motion.div key={s.label} variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}>
            <StatCard {...s} />
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence mode="wait">
        {activeView === "main" ? (
          <motion.div
            key="main"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="grid lg:grid-cols-3 gap-4"
          >
            {/* Main Feed */}
            <div
              className={cn(
                "lg:col-span-2 glass-card !p-0 overflow-hidden rounded-2xl",
                fullscreen && "fixed inset-4 z-50 rounded-2xl shadow-2xl"
              )}
            >
              <div className="relative aspect-video bg-black">
                <img
                  src={selectedCam.thumbnail}
                  alt={selectedCam.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

                {/* Top-left badges */}
                <div className="absolute top-3 left-3 flex items-center gap-2 flex-wrap">
                  {selectedCam.isLive && (
                    <span className="badge-danger flex items-center gap-1 !text-[11px]">
                      <span className="live-indicator !h-1.5 !w-1.5" /> LIVE
                    </span>
                  )}
                  {selectedCam.isRecording && (
                    <span className="badge !bg-white/10 !text-[11px] flex items-center gap-1">
                      <Circle className="w-2.5 h-2.5 text-status-danger fill-status-danger" /> REC
                    </span>
                  )}
                  {selectedCam.motionDetected && (
                    <span className="badge-warning !text-[11px]">⚡ Motion</span>
                  )}
                </div>

                {/* Top-right controls */}
                <div className="absolute top-3 right-3 flex gap-2">
                  <button
                    title="Download clip"
                    className="btn-ghost !p-2 glass !bg-black/40"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setFullscreen(!fullscreen)}
                    className="btn-ghost !p-2 glass !bg-black/40"
                  >
                    {fullscreen ? (
                      <Minimize2 className="w-4 h-4" />
                    ) : (
                      <Maximize2 className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* AI Detection overlays */}
                <div className="absolute bottom-14 right-3 flex flex-wrap gap-1 justify-end max-w-xs">
                  {selectedCam.aiDetection.map((det) => (
                    <span
                      key={det}
                      className={cn(
                        "badge !text-[10px]",
                        det.includes("✗")
                          ? "badge-danger"
                          : det.includes("✓")
                          ? "badge-success"
                          : "badge-info"
                      )}
                    >
                      {det}
                    </span>
                  ))}
                </div>

                {/* Camera name */}
                <div className="absolute bottom-3 left-3">
                  <h3 className="font-semibold text-sm">{selectedCam.name}</h3>
                  <p className="text-[11px] text-gray-300">{selectedCam.location}</p>
                </div>

                {/* PTZ Controls */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 glass !bg-black/50 rounded-xl px-2 py-1.5">
                  <button title="Pan/Tilt" className="btn-ghost !p-1.5 hover:text-brand-400">
                    <Move className="w-4 h-4" />
                  </button>
                  <button title="Zoom In" className="btn-ghost !p-1.5 hover:text-brand-400">
                    <ZoomIn className="w-4 h-4" />
                  </button>
                  <button title="Zoom Out" className="btn-ghost !p-1.5 hover:text-brand-400">
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <div className="w-px h-4 bg-white/10" />
                  <button title="Auto Rotate" className="btn-ghost !p-1.5 hover:text-brand-400">
                    <RotateCw className="w-4 h-4" />
                  </button>
                  <button title="Snapshot" className="btn-ghost !p-1.5 hover:text-brand-400">
                    <Camera className="w-4 h-4" />
                  </button>
                  <button title="Night Vision" className="btn-ghost !p-1.5 hover:text-brand-400">
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Stream info bar */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-surface/60 border-t border-white/5 text-xs">
                <div className="flex items-center gap-4 text-gray-400">
                  <span className="flex items-center gap-1">
                    <Wifi className="w-3 h-3 text-status-success" /> 1080p HD
                  </span>
                  <span>30 FPS</span>
                  <span>Latency: 120ms</span>
                </div>
                <span className="text-gray-500">
                  AI: YOLOv11 · Confidence 94.2%
                </span>
              </div>
            </div>

            {/* Camera List */}
            <div className="space-y-2 overflow-y-auto max-h-[520px] pr-1">
              <h4 className="text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
                <Video className="w-4 h-4 text-brand-400" /> All Cameras ({cameras.length})
              </h4>
              {cameras.map((cam) => (
                <motion.button
                  key={cam.id}
                  whileHover={{ x: 4 }}
                  onClick={() => setSelectedCam(cam)}
                  className={cn(
                    "w-full glass-card-sm !p-2 flex gap-3 text-left transition-all",
                    selectedCam.id === cam.id
                      ? "border-brand-500/40 bg-brand-600/10"
                      : "hover:bg-white/[0.04]"
                  )}
                >
                  <div className="relative w-24 shrink-0 rounded-lg overflow-hidden">
                    <img
                      src={cam.thumbnail}
                      alt={cam.name}
                      className="w-full aspect-video object-cover"
                    />
                    {cam.isLive && (
                      <span className="absolute top-1 left-1 w-2 h-2 bg-status-danger rounded-full animate-pulse" />
                    )}
                    {cam.motionDetected && (
                      <span className="absolute top-1 right-1 w-2 h-2 bg-status-warning rounded-full animate-pulse" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">{cam.name}</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">{cam.location}</p>
                    <div className="flex gap-1 mt-1.5 flex-wrap">
                      {cam.isLive && (
                        <span className="badge-success !text-[9px]">Live</span>
                      )}
                      {cam.isRecording && (
                        <span className="badge-danger !text-[9px]">Rec</span>
                      )}
                      {cam.motionDetected && (
                        <span className="badge-warning !text-[9px]">Motion</span>
                      )}
                      {cam.aiDetection.length > 0 && (
                        <span className="badge-info !text-[9px]">AI</span>
                      )}
                    </div>
                  </div>
                  {!cam.isLive && (
                    <WifiOff className="w-3.5 h-3.5 text-gray-600 shrink-0 mt-1" />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          /* Grid View */
          <motion.div
            key="grid"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-3"
          >
            {/* Layout Toggle */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">Grid layout:</span>
              {layoutOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setLayout(opt.id)}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-colors",
                    layout === opt.id
                      ? "bg-brand-600/20 text-brand-400 border border-brand-500/30"
                      : "text-gray-400 hover:bg-white/5"
                  )}
                >
                  <opt.icon className="w-3.5 h-3.5" /> {opt.label}
                </button>
              ))}
            </div>

            <div
              className={cn(
                "grid gap-3",
                layout === 1
                  ? "grid-cols-1 max-w-2xl"
                  : layout === 2
                  ? "grid-cols-2"
                  : "grid-cols-3"
              )}
            >
              {cameras.map((cam) => (
                <div
                  key={cam.id}
                  onClick={() => { setSelectedCam(cam); setActiveView("main"); }}
                  className="relative group rounded-2xl overflow-hidden border border-white/5 cursor-pointer hover:border-brand-500/30 transition-all"
                >
                  <img
                    src={cam.thumbnail}
                    alt={cam.name}
                    className={cn(
                      "w-full object-cover transition-transform group-hover:scale-105",
                      layout === 1 ? "aspect-video" : "aspect-video"
                    )}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  {/* Top badges */}
                  <div className="absolute top-2 left-2 flex gap-1 flex-wrap">
                    {cam.isLive && (
                      <span className="badge-danger !text-[9px] flex items-center gap-0.5">
                        <span className="live-indicator !h-1.5 !w-1.5" /> LIVE
                      </span>
                    )}
                    {cam.isRecording && (
                      <span className="badge !bg-white/10 !text-[9px]">REC</span>
                    )}
                  </div>

                  {cam.motionDetected && (
                    <div className="absolute top-2 right-2 w-2 h-2 bg-status-warning rounded-full animate-pulse" />
                  )}

                  {/* Bottom info */}
                  <div className="absolute bottom-2 left-2 right-2">
                    <p className="text-xs font-medium truncate">{cam.name}</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {cam.aiDetection.slice(0, 2).map((d) => (
                        <span
                          key={d}
                          className={cn(
                            "badge !text-[9px]",
                            d.includes("✗") ? "badge-danger" : d.includes("✓") ? "badge-success" : "badge-info"
                          )}
                        >
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-brand-600/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Maximize2 className="w-6 h-6 text-white drop-shadow-lg" />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
