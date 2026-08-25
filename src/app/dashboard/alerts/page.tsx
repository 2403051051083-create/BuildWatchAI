"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell, Mail, MessageSquare, Flame, HardHat, Wrench, CloudRain, UserX, Phone, CheckCircle2, Clock3, UserPlus } from "lucide-react";
import { alerts } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const alertIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  fire: Flame,
  helmet: HardHat,
  machine: Wrench,
  concrete: Wrench,
  rain: CloudRain,
  unauthorized: UserX,
};

const notificationChannels = [
  { name: "Push Notifications", icon: Bell, enabled: true },
  { name: "Email Alerts", icon: Mail, enabled: true },
  { name: "SMS", icon: Phone, enabled: true },
  { name: "WhatsApp", icon: MessageSquare, enabled: false },
];

const incidentSeed = [
  { id: "INC-1042", title: "Helmet Violation Detected", location: "Camera 5 - South Facade", severity: "warning", assignee: "Safety Team", status: "Investigating", age: "2 min ago" },
  { id: "INC-1041", title: "Unauthorized Entry", location: "Crane Base - Restricted Zone", severity: "critical", assignee: "James Rodriguez", status: "Open", age: "5 min ago" },
  { id: "INC-1040", title: "Concrete Delivery Delay", location: "Floor 3 - Pour Area", severity: "warning", assignee: "Logistics Team", status: "Resolved", age: "15 min ago" },
];

type Incident = (typeof incidentSeed)[number];

export default function AlertsPage() {
  const [incidents, setIncidents] = useState<Incident[]>(incidentSeed);

  const updateIncident = (id: string, field: "status" | "assignee", value: string) => {
    setIncidents((current) => current.map((incident) => (
      incident.id === id ? { ...incident, [field]: value } : incident
    )));
  };

  const incidentCounts = {
    open: incidents.filter((incident) => incident.status === "Open").length,
    investigating: incidents.filter((incident) => incident.status === "Investigating").length,
    resolved: incidents.filter((incident) => incident.status === "Resolved").length,
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold">Alerts & Notifications</h1>
          <p className="text-sm text-gray-400">Real-time safety and project alerts</p>
        </div>
        <button className="btn-secondary !py-2 !px-4 text-sm text-status-danger">
          Emergency SOS
        </button>
      </div>

      <div className="grid md:grid-cols-4 gap-3">
        {notificationChannels.map((ch) => (
          <div key={ch.name} className="glass-card-sm flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ch.icon className="w-4 h-4 text-brand-400" />
              <span className="text-sm">{ch.name}</span>
            </div>
            <div className={cn(
              "w-10 h-5 rounded-full relative cursor-pointer transition-colors",
              ch.enabled ? "bg-status-success" : "bg-surface-border"
            )}>
              <div className={cn(
                "absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform",
                ch.enabled ? "translate-x-5" : "translate-x-0.5"
              )} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-3">
        <div className="glass-card-sm flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-status-danger/15 flex items-center justify-center"><Bell className="w-4 h-4 text-status-danger" /></div>
          <div><p className="text-xs text-gray-400">Open incidents</p><p className="text-xl font-semibold">{incidentCounts.open}</p></div>
        </div>
        <div className="glass-card-sm flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-status-warning/15 flex items-center justify-center"><Clock3 className="w-4 h-4 text-status-warning" /></div>
          <div><p className="text-xs text-gray-400">Under investigation</p><p className="text-xl font-semibold">{incidentCounts.investigating}</p></div>
        </div>
        <div className="glass-card-sm flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-status-success/15 flex items-center justify-center"><CheckCircle2 className="w-4 h-4 text-status-success" /></div>
          <div><p className="text-xs text-gray-400">Resolved today</p><p className="text-xl font-semibold">{incidentCounts.resolved}</p></div>
        </div>
      </div>

      <div className="glass-card">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-sm font-medium">AI Safety Incident Workflow</h4>
            <p className="text-xs text-gray-500 mt-1">Detect, assign, investigate, and close incidents from one queue.</p>
          </div>
          <span className="badge badge-info">AI monitored</span>
        </div>
        <div className="space-y-2">
          {incidents.map((incident) => (
            <Link href={`/dashboard/alerts/${incident.id}`} key={incident.id} className="block rounded-xl border border-white/5 bg-white/[0.02] p-3 hover:border-brand-500/30 transition-colors">
              <div className="flex flex-col lg:flex-row lg:items-center gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-gray-500">{incident.id}</span>
                    <span className={cn("badge !text-[10px]", incident.severity === "critical" ? "badge-danger" : "badge-warning")}>{incident.severity}</span>
                  </div>
                  <p className="text-sm font-medium mt-1 truncate">{incident.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{incident.location} · {incident.age}</p>
                </div>
                <label className="flex items-center gap-2 text-xs text-gray-400">
                  <UserPlus className="w-3.5 h-3.5" />
                  <select value={incident.assignee} onClick={(event) => event.preventDefault()} onChange={(event) => updateIncident(incident.id, "assignee", event.target.value)} className="input-field !w-auto !py-1.5 text-xs">
                    <option>Safety Team</option><option>James Rodriguez</option><option>Logistics Team</option><option>Site Engineer</option>
                  </select>
                </label>
                <select value={incident.status} onClick={(event) => event.preventDefault()} onChange={(event) => updateIncident(incident.id, "status", event.target.value)} className="input-field !w-auto !py-1.5 text-xs">
                  <option>Open</option><option>Investigating</option><option>Resolved</option>
                </select>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="glass-card">
        <h4 className="text-sm font-medium mb-4">All Alerts</h4>
        <div className="space-y-2">
          {alerts.map((alert) => {
            const Icon = alertIcons[alert.type] || Bell;
            return (
              <div
                key={alert.id}
                className={cn(
                  "flex items-start gap-4 p-4 rounded-xl transition-colors",
                  !alert.read ? "bg-white/[0.03] border border-white/5" : "hover:bg-white/[0.02]"
                )}
              >
                <div className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
                  alert.severity === "critical" ? "bg-status-danger/20" :
                  alert.severity === "warning" ? "bg-status-warning/20" : "bg-brand-600/20"
                )}>
                  <Icon className={cn(
                    "w-5 h-5",
                    alert.severity === "critical" ? "text-status-danger" :
                    alert.severity === "warning" ? "text-status-warning" : "text-brand-400"
                  )} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-medium">{alert.title}</h4>
                    {!alert.read && <span className="w-2 h-2 bg-brand-500 rounded-full" />}
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">{alert.message}</p>
                  <p className="text-[10px] text-gray-600 mt-1">
                    {alert.timestamp.toLocaleTimeString()} · {alert.timestamp.toLocaleDateString()}
                  </p>
                </div>
                <span className={cn(
                  "badge !text-[10px]",
                  alert.severity === "critical" ? "badge-danger" :
                  alert.severity === "warning" ? "badge-warning" : "badge-info"
                )}>
                  {alert.severity}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
