"use client";

import { useState } from "react";
import {
  Plane, Upload, Image, Brain, Box, Thermometer,
  AlertTriangle, GitCompare, Play,
} from "lucide-react";
import { cn } from "@/lib/utils";

const droneFeatures = [
  { icon: Upload, title: "Upload Drone Video", desc: "Process 4K aerial footage" },
  { icon: Image, title: "Upload Images", desc: "Daily photo comparison" },
  { icon: Brain, title: "AI Analysis", desc: "YOLOv11 object detection" },
  { icon: Box, title: "3D Reconstruction", desc: "Photogrammetry pipeline" },
  { icon: Thermometer, title: "Heat Map", desc: "Thermal anomaly detection" },
  { icon: AlertTriangle, title: "Crack Detection", desc: "Structural defect analysis" },
  { icon: Plane, title: "Roof Inspection", desc: "Automated roof assessment" },
  { icon: GitCompare, title: "Comparison", desc: "Before/after analysis" },
];

export default function DronePage() {
  const [activeTab, setActiveTab] = useState<"live" | "analysis" | "upload">("live");

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-display font-bold">Drone Inspection</h1>
        <p className="text-sm text-gray-400">Aerial monitoring with AI-powered analysis</p>
      </div>

      <div className="flex gap-2">
        {(["live", "analysis", "upload"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm capitalize transition-colors",
              activeTab === tab ? "bg-brand-600/20 text-brand-400" : "text-gray-400 hover:bg-white/5"
            )}
          >
            {tab === "live" ? "Live Drone View" : tab === "analysis" ? "AI Analysis" : "Upload Media"}
          </button>
        ))}
      </div>

      {activeTab === "live" && (
        <div className="grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 glass-card !p-0 overflow-hidden">
            <div className="relative aspect-video">
              <img
                src="https://images.unsplash.com/photo-1473966968603-fa801b079784?w=1200&h=675&fit=crop"
                alt="Drone view"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute top-4 left-4 badge-danger flex items-center gap-1">
                <span className="live-indicator" /> DRONE LIVE
              </div>
              <div className="absolute bottom-4 left-4 space-y-1">
                <p className="text-sm font-medium">Altitude: 85m · Speed: 12 km/h</p>
                <p className="text-xs text-gray-400">GPS: 40.7128° N, 74.0060° W · Battery: 72%</p>
              </div>
              <div className="absolute bottom-4 right-4 flex gap-2">
                <button className="btn-primary !py-2 !px-4 text-sm"><Play className="w-4 h-4" /> Record</button>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="glass-card">
              <h4 className="text-sm font-medium mb-3">Flight Data</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-400">Flight Time</span><span>18:42</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Distance</span><span>2.4 km</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Coverage</span><span>78%</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Photos Taken</span><span>156</span></div>
              </div>
            </div>
            <div className="glass-card">
              <h4 className="text-sm font-medium mb-3">Latest AI Findings</h4>
              <div className="space-y-2">
                <div className="glass-card-sm !p-2 text-xs"><span className="text-status-warning">⚠</span> Minor crack detected - Floor 5 NW corner</div>
                <div className="glass-card-sm !p-2 text-xs"><span className="text-status-success">✓</span> Roof inspection complete - No issues</div>
                <div className="glass-card-sm !p-2 text-xs"><span className="text-brand-400">ℹ</span> Progress +6% since yesterday</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "analysis" && (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {droneFeatures.map((f) => (
            <div key={f.title} className="glass-card group cursor-pointer hover:border-brand-500/20">
              <div className="w-10 h-10 rounded-lg bg-brand-600/10 flex items-center justify-center mb-3 group-hover:shadow-glow transition-shadow">
                <f.icon className="w-5 h-5 text-brand-400" />
              </div>
              <h4 className="text-sm font-medium">{f.title}</h4>
              <p className="text-xs text-gray-400 mt-1">{f.desc}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === "upload" && (
        <div className="glass-card border-dashed border-2 border-white/10 flex flex-col items-center justify-center py-16 cursor-pointer hover:border-brand-500/30 transition-colors">
          <Upload className="w-12 h-12 text-gray-500 mb-4" />
          <p className="text-lg font-medium">Drop drone photos or videos here</p>
          <p className="text-sm text-gray-400 mt-1">Supports JPG, PNG, MP4, MOV up to 2GB</p>
          <button className="btn-primary mt-4">Browse Files</button>
        </div>
      )}
    </div>
  );
}
