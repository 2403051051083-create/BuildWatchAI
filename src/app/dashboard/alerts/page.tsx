"use client";

import { Bell, Mail, MessageSquare, Flame, HardHat, Wrench, CloudRain, UserX, Phone } from "lucide-react";
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

export default function AlertsPage() {
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
