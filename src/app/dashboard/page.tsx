"use client";

import {
  Users, HardHat, Truck, Shield, TrendingUp, AlertTriangle,
  Camera, CloudRain,
} from "lucide-react";
import StatCard from "@/components/ui/StatCard";
import ProgressBar from "@/components/ui/ProgressBar";
import DigitalTwinPanel from "@/components/3d/DigitalTwinPanel";
import {
  dashboardStats, cameras, aiProgress, alerts, weatherData,
} from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  return (
    <div className="space-y-4">
      {/* Top Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
        <StatCard label="Completion" value={`${dashboardStats.completion}%`} change={6} icon={<TrendingUp className="w-4 h-4" />} color="green" />
        <StatCard label="Workers" value={dashboardStats.activeWorkers} icon={<Users className="w-4 h-4" />} color="blue" />
        <StatCard label="Safety Score" value={dashboardStats.safetyScore} icon={<Shield className="w-4 h-4" />} color="green" />
        <StatCard label="Equipment Active" value={dashboardStats.equipmentRunning} icon={<Truck className="w-4 h-4" />} color="blue" />
        <StatCard label="Active Alerts" value={dashboardStats.alertsActive} icon={<AlertTriangle className="w-4 h-4" />} color="orange" />
        <StatCard label="Budget Used" value={`${dashboardStats.budgetUsed}%`} icon={<TrendingUp className="w-4 h-4" />} color="orange" />
        <StatCard label="Days Left" value={dashboardStats.daysRemaining} icon={<HardHat className="w-4 h-4" />} color="blue" />
        <StatCard label="Weather" value={`${weatherData.temperature}°C`} icon={<CloudRain className="w-4 h-4" />} color="blue" />
      </div>

      {/* Main Content: 3D Twin Center + Side Panels */}
      <div className="grid lg:grid-cols-12 gap-4">
        {/* Left Panel - AI Progress & Safety */}
        <div className="lg:col-span-3 space-y-4">
          <div className="glass-card">
            <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-brand-400" /> AI Progress Detection
            </h3>
            <div className="flex items-center justify-between mb-4">
              <div className="text-center">
                <p className="text-xs text-gray-500">Yesterday</p>
                <p className="text-xl font-bold">{aiProgress.yesterday}%</p>
              </div>
              <div className="text-2xl text-status-success font-bold">→ +{aiProgress.delta}%</div>
              <div className="text-center">
                <p className="text-xs text-gray-500">Today</p>
                <p className="text-xl font-bold text-status-success">{aiProgress.today}%</p>
              </div>
            </div>
            {Object.entries(aiProgress.breakdown).map(([key, val]) => (
              <div key={key} className="mb-2">
                <ProgressBar
                  label={key.charAt(0).toUpperCase() + key.slice(1)}
                  value={val.today}
                  color="green"
                  size="sm"
                />
              </div>
            ))}
          </div>

          <div className="glass-card">
            <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-status-warning" /> Active Alerts
            </h3>
            <div className="space-y-2">
              {alerts.filter((a) => !a.read).map((alert) => (
                <div key={alert.id} className="glass-card-sm !p-2.5">
                  <div className="flex items-start gap-2">
                    <div className={cn(
                      "w-2 h-2 rounded-full mt-1.5 shrink-0",
                      alert.severity === "critical" ? "bg-status-danger" : "bg-status-warning"
                    )} />
                    <div>
                      <p className="text-xs font-medium">{alert.title}</p>
                      <p className="text-[10px] text-gray-500 mt-0.5">{alert.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center - 3D Digital Twin */}
        <div className="lg:col-span-6">
          <div className="glass-card !p-4 h-full">
            <h3 className="text-sm font-medium mb-3">3D Digital Twin — Skyline Tower Phase II</h3>
            <DigitalTwinPanel compact />
          </div>
        </div>

        {/* Right Panel - Weather & Equipment */}
        <div className="lg:col-span-3 space-y-4">
          <div className="glass-card">
            <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
              <CloudRain className="w-4 h-4 text-brand-400" /> Weather
            </h3>
            <div className="text-center mb-3">
              <p className="text-3xl font-display font-bold">{weatherData.temperature}°C</p>
              <p className="text-xs text-gray-400">{weatherData.condition}</p>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs mb-3">
              <div className="glass-card-sm !p-2 text-center">
                <p className="text-gray-500">Humidity</p>
                <p className="font-medium">{weatherData.humidity}%</p>
              </div>
              <div className="glass-card-sm !p-2 text-center">
                <p className="text-gray-500">Wind</p>
                <p className="font-medium">{weatherData.windSpeed} km/h</p>
              </div>
              <div className="glass-card-sm !p-2 text-center">
                <p className="text-gray-500">Rain</p>
                <p className="font-medium text-status-warning">{weatherData.rainPrediction}%</p>
              </div>
              <div className="glass-card-sm !p-2 text-center">
                <p className="text-gray-500">Suitability</p>
                <p className="font-medium text-status-warning">{weatherData.constructionSuitability}</p>
              </div>
            </div>
          </div>

          <div className="glass-card">
            <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
              <Shield className="w-4 h-4 text-status-success" /> Safety Overview
            </h3>
            <div className="text-center mb-3">
              <div className="relative w-24 h-24 mx-auto">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#1e293b" strokeWidth="8" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#22c55e" strokeWidth="8"
                    strokeDasharray={`${91 * 2.51} ${100 * 2.51}`} strokeLinecap="round" />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-xl font-bold">91</span>
              </div>
            </div>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between"><span className="text-gray-400">Helmet Violations</span><span className="text-status-warning">3</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Worker Falls</span><span className="text-status-success">0</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Fire Detection</span><span className="text-status-success">Clear</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Camera Thumbnails */}
      <div className="glass-card !p-4">
        <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
          <Camera className="w-4 h-4 text-brand-400" /> Live Camera Feeds
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {cameras.map((cam) => (
            <div key={cam.id} className="relative group rounded-xl overflow-hidden border border-white/5 cursor-pointer hover:border-brand-500/30 transition-colors">
              <img src={cam.thumbnail} alt={cam.name} className="w-full aspect-video object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute top-2 left-2 flex items-center gap-1.5">
                {cam.isLive && (
                  <span className="badge-danger !text-[10px] flex items-center gap-1">
                    <span className="live-indicator !h-1.5 !w-1.5" /> LIVE
                  </span>
                )}
                {cam.isRecording && <span className="badge !bg-white/10 !text-[10px]">REC</span>}
              </div>
              <div className="absolute bottom-2 left-2 right-2">
                <p className="text-xs font-medium truncate">{cam.name}</p>
                <p className="text-[10px] text-gray-400">{cam.location}</p>
              </div>
              {cam.motionDetected && (
                <div className="absolute top-2 right-2 w-2 h-2 bg-status-warning rounded-full animate-pulse" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
