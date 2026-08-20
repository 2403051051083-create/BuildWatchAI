"use client";

import { useState } from "react";
import {
  User, Shield, Bell, Palette, Globe, Key,
  Plus, Trash2, Edit2, CheckCircle, Camera,
  Users, Building2, AlertOctagon, Save, ToggleLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "team", label: "Team", icon: Users },
  { id: "security", label: "Security", icon: Shield },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "integrations", label: "Integrations", icon: Globe },
];

const teamMembers = [
  { id: 1, name: "Sarah Johnson", email: "sarah.j@buildwatch.ai", role: "Project Manager", avatar: "SJ", status: "active" },
  { id: 2, name: "Carlos Mendez", email: "c.mendez@buildwatch.ai", role: "Site Engineer", avatar: "CM", status: "active" },
  { id: 3, name: "Priya Sharma", email: "p.sharma@buildwatch.ai", role: "Safety Officer", avatar: "PS", status: "active" },
  { id: 4, name: "David Kim", email: "d.kim@buildwatch.ai", role: "Viewer", avatar: "DK", status: "inactive" },
];

const notificationItems = [
  { key: "fire", label: "Fire Alerts", desc: "Immediate fire or smoke detection", critical: true },
  { key: "safety", label: "Safety Violations", desc: "PPE non-compliance detections", critical: true },
  { key: "machine", label: "Machine Failures", desc: "Equipment status changes", critical: false },
  { key: "weather", label: "Weather Warnings", desc: "Rain and wind alerts", critical: false },
  { key: "progress", label: "Progress Updates", desc: "Daily progress summaries", critical: false },
  { key: "reports", label: "Daily Reports", desc: "Auto-generated report delivery", critical: false },
  { key: "deliveries", label: "Material Deliveries", desc: "Supplier delivery updates", critical: false },
  { key: "budget", label: "Budget Alerts", desc: "Spending threshold notifications", critical: false },
];

const integrations = [
  { name: "Google Maps API", desc: "GPS tracking and site visualization", connected: true, logo: "🗺️" },
  { name: "Autodesk BIM 360", desc: "BIM model sync and collaboration", connected: true, logo: "📐" },
  { name: "Procore", desc: "Construction management platform", connected: false, logo: "🔧" },
  { name: "Slack", desc: "Team notifications and alerts", connected: false, logo: "💬" },
  { name: "Microsoft Teams", desc: "Enterprise communication", connected: true, logo: "🏢" },
  { name: "WhatsApp Business", desc: "Mobile alert delivery", connected: false, logo: "📱" },
];

function Toggle({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        "w-11 h-6 rounded-full relative transition-colors duration-200",
        enabled ? "bg-brand-600" : "bg-surface-border"
      )}
    >
      <div className={cn(
        "absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200",
        enabled ? "translate-x-5" : "translate-x-0.5"
      )} />
    </button>
  );
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [saved, setSaved] = useState(false);
  const [notifications, setNotifications] = useState<Record<string, boolean>>(
    Object.fromEntries(notificationItems.map((n) => [n.key, true]))
  );

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-display font-bold">Settings</h1>
        <p className="text-sm text-gray-400">Manage your account, team, and platform preferences</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-5">
        {/* Sidebar */}
        <div className="lg:w-56 space-y-0.5 shrink-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all",
                activeTab === tab.id
                  ? "bg-brand-600/15 text-brand-400 border border-brand-500/20"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Main Panel */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
            >
              {/* ─── Profile ─── */}
              {activeTab === "profile" && (
                <div className="glass-card space-y-5">
                  <h3 className="font-semibold text-base">Profile Settings</h3>

                  {/* Avatar */}
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-600 to-brand-700 flex items-center justify-center text-2xl font-bold shadow-glow">
                        AU
                      </div>
                      <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-brand-600 flex items-center justify-center border-2 border-surface hover:bg-brand-500 transition-colors">
                        <Camera className="w-3 h-3" />
                      </button>
                    </div>
                    <div>
                      <p className="font-medium">Admin User</p>
                      <p className="text-sm text-gray-400">admin@buildwatch.ai</p>
                      <span className="badge-success !text-[10px] mt-1">Pro Plan</span>
                    </div>
                  </div>

                  {/* Form fields */}
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { label: "Full Name", val: "Admin User" },
                      { label: "Email", val: "admin@buildwatch.ai" },
                      { label: "Company", val: "BuildWatch Construction" },
                      { label: "Role", val: "Project Manager" },
                      { label: "Phone", val: "+1 (555) 012-3456" },
                      { label: "Location", val: "New York, NY" },
                    ].map((field) => (
                      <div key={field.label}>
                        <label className="text-xs text-gray-400 mb-1.5 block">{field.label}</label>
                        <input className="input-field !py-2.5" defaultValue={field.val} />
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <button onClick={handleSave} className="btn-primary !py-2 !px-6 text-sm">
                      {saved ? <><CheckCircle className="w-4 h-4" /> Saved!</> : <><Save className="w-4 h-4" /> Save Changes</>}
                    </button>
                    <button className="btn-secondary !py-2 !px-4 text-sm">Cancel</button>
                  </div>
                </div>
              )}

              {/* ─── Team ─── */}
              {activeTab === "team" && (
                <div className="glass-card space-y-5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-base">Team Management</h3>
                    <button className="btn-primary !py-2 !px-4 text-sm">
                      <Plus className="w-4 h-4" /> Invite Member
                    </button>
                  </div>

                  {/* Team Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-white/5 text-gray-400 text-xs">
                          <th className="text-left p-3">Member</th>
                          <th className="text-left p-3">Role</th>
                          <th className="text-left p-3">Status</th>
                          <th className="text-left p-3">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {teamMembers.map((member) => (
                          <tr key={member.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                            <td className="p-3">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-brand-600/20 flex items-center justify-center text-xs font-bold text-brand-400">
                                  {member.avatar}
                                </div>
                                <div>
                                  <p className="font-medium">{member.name}</p>
                                  <p className="text-xs text-gray-500">{member.email}</p>
                                </div>
                              </div>
                            </td>
                            <td className="p-3">
                              <select className="bg-transparent text-sm text-gray-300 border border-white/10 rounded-lg px-2 py-1 focus:outline-none focus:border-brand-500/50">
                                {["Admin", "Project Manager", "Site Engineer", "Safety Officer", "Viewer"].map((r) => (
                                  <option key={r} value={r} selected={r === member.role} className="bg-surface">{r}</option>
                                ))}
                              </select>
                            </td>
                            <td className="p-3">
                              <span className={cn("badge !text-[10px]", member.status === "active" ? "badge-success" : "badge-info")}>
                                {member.status}
                              </span>
                            </td>
                            <td className="p-3">
                              <div className="flex gap-2">
                                <button className="btn-ghost !p-1.5" title="Edit"><Edit2 className="w-3.5 h-3.5" /></button>
                                <button className="btn-ghost !p-1.5 text-status-danger hover:bg-status-danger/10" title="Remove">
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Project Config */}
                  <div className="pt-4 border-t border-white/5">
                    <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-brand-400" /> Project Configuration
                    </h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      {[
                        { label: "Project Name", val: "Skyline Tower Phase II" },
                        { label: "Project ID", val: "PROJ-2024-001" },
                        { label: "Site Location", val: "Downtown Metro, NY" },
                        { label: "Project Manager", val: "Sarah Johnson" },
                      ].map((f) => (
                        <div key={f.label}>
                          <label className="text-xs text-gray-400 mb-1 block">{f.label}</label>
                          <input className="input-field !py-2 text-sm" defaultValue={f.val} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ─── Security ─── */}
              {activeTab === "security" && (
                <div className="glass-card space-y-4">
                  <h3 className="font-semibold text-base">Security Settings</h3>
                  <div className="space-y-3">
                    {[
                      {
                        icon: <Key className="w-4 h-4 text-brand-400" />,
                        title: "Two-Factor Authentication",
                        desc: "Enabled via Authenticator App",
                        badge: <span className="badge-success">Active</span>,
                        action: <button className="btn-secondary !py-1.5 !px-3 text-xs">Manage</button>,
                      },
                      {
                        icon: <Shield className="w-4 h-4 text-brand-400" />,
                        title: "Change Password",
                        desc: "Last changed 30 days ago",
                        badge: null,
                        action: <button className="btn-secondary !py-1.5 !px-3 text-xs">Update</button>,
                      },
                      {
                        icon: <Globe className="w-4 h-4 text-brand-400" />,
                        title: "Active Sessions",
                        desc: "2 sessions currently active",
                        badge: null,
                        action: <button className="btn-secondary !py-1.5 !px-3 text-xs">Manage</button>,
                      },
                      {
                        icon: <ToggleLeft className="w-4 h-4 text-brand-400" />,
                        title: "Login Notifications",
                        desc: "Get notified on new sign-ins",
                        badge: <span className="badge-success">Enabled</span>,
                        action: null,
                      },
                    ].map((item) => (
                      <div key={item.title} className="glass-card-sm flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          {item.icon}
                          <div>
                            <p className="text-sm font-medium">{item.title}</p>
                            <p className="text-xs text-gray-500">{item.desc}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          {item.badge}
                          {item.action}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Danger Zone */}
                  <div className="mt-6 pt-6 border-t border-status-danger/20">
                    <h4 className="text-sm font-medium text-status-danger mb-3 flex items-center gap-2">
                      <AlertOctagon className="w-4 h-4" /> Danger Zone
                    </h4>
                    <div className="space-y-2">
                      <div className="glass-card-sm border-status-danger/20 flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Archive Project</p>
                          <p className="text-xs text-gray-500">Move project to archive (reversible)</p>
                        </div>
                        <button className="btn-secondary !py-1.5 !px-3 text-xs text-status-warning">Archive</button>
                      </div>
                      <div className="glass-card-sm border-status-danger/20 flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-status-danger">Delete Account</p>
                          <p className="text-xs text-gray-500">Permanently delete all data (irreversible)</p>
                        </div>
                        <button className="btn-secondary !py-1.5 !px-3 text-xs text-status-danger">Delete</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── Notifications ─── */}
              {activeTab === "notifications" && (
                <div className="glass-card space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-base">Notification Preferences</h3>
                    <button
                      onClick={() => setNotifications(Object.fromEntries(notificationItems.map((n) => [n.key, true])))}
                      className="btn-ghost text-xs"
                    >
                      Enable All
                    </button>
                  </div>

                  <div className="space-y-1">
                    {notificationItems.map((n) => (
                      <div key={n.key} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                        <div className="flex items-center gap-3">
                          {n.critical && <span className="w-1.5 h-1.5 bg-status-danger rounded-full" />}
                          <div>
                            <p className="text-sm font-medium">{n.label}</p>
                            <p className="text-xs text-gray-500">{n.desc}</p>
                          </div>
                          {n.critical && <span className="badge-danger !text-[9px]">Critical</span>}
                        </div>
                        <Toggle
                          enabled={notifications[n.key]}
                          onToggle={() => setNotifications((p) => ({ ...p, [n.key]: !p[n.key] }))}
                        />
                      </div>
                    ))}
                  </div>

                  <h4 className="text-sm font-medium pt-2">Delivery Channels</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { ch: "Push Notifications", enabled: true },
                      { ch: "Email", enabled: true },
                      { ch: "SMS", enabled: true },
                      { ch: "WhatsApp", enabled: false },
                    ].map((c) => (
                      <div key={c.ch} className="glass-card-sm flex items-center justify-between">
                        <span className="text-sm">{c.ch}</span>
                        <Toggle enabled={c.enabled} onToggle={() => {}} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ─── Appearance ─── */}
              {activeTab === "appearance" && (
                <div className="glass-card space-y-5">
                  <h3 className="font-semibold text-base">Appearance</h3>
                  <div>
                    <label className="text-xs text-gray-400 mb-2.5 block">Theme</label>
                    <div className="flex gap-3">
                      {["Dark", "Light", "System"].map((t) => (
                        <button
                          key={t}
                          className={cn(
                            "flex-1 py-3 rounded-xl text-sm border transition-all",
                            t === "Dark"
                              ? "bg-brand-600/20 text-brand-400 border-brand-500/40"
                              : "glass border-white/10 text-gray-400 hover:border-white/20"
                          )}
                        >
                          {t === "Dark" ? "🌙" : t === "Light" ? "☀️" : "💻"} {t}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 mb-2.5 block">Accent Color</label>
                    <div className="flex gap-3">
                      {[
                        { color: "bg-blue-500", label: "Blue" },
                        { color: "bg-green-500", label: "Green" },
                        { color: "bg-purple-500", label: "Purple" },
                        { color: "bg-orange-500", label: "Orange" },
                        { color: "bg-pink-500", label: "Pink" },
                      ].map((c) => (
                        <button
                          key={c.label}
                          className={cn(
                            "w-8 h-8 rounded-full border-2 transition-all hover:scale-110",
                            c.color,
                            c.label === "Blue" ? "border-white ring-2 ring-blue-500/50" : "border-transparent"
                          )}
                          title={c.label}
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 mb-2.5 block">Sidebar Style</label>
                    <div className="flex gap-3">
                      {["Compact", "Full", "Floating"].map((s) => (
                        <button
                          key={s}
                          className={cn(
                            "px-4 py-2 rounded-xl text-sm border transition-all",
                            s === "Full"
                              ? "bg-brand-600/20 text-brand-400 border-brand-500/40"
                              : "glass border-white/10 text-gray-400 hover:border-white/20"
                          )}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ─── Integrations ─── */}
              {activeTab === "integrations" && (
                <div className="glass-card space-y-4">
                  <h3 className="font-semibold text-base">Integrations</h3>
                  <p className="text-sm text-gray-400">Connect BuildWatch AI with your existing tools and platforms.</p>

                  <div className="grid md:grid-cols-2 gap-3">
                    {integrations.map((intg) => (
                      <div key={intg.name} className={cn(
                        "glass-card-sm flex items-center gap-4",
                        intg.connected && "border-status-success/20 bg-status-success/5"
                      )}>
                        <div className="text-2xl shrink-0">{intg.logo}</div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">{intg.name}</p>
                          <p className="text-xs text-gray-500 truncate">{intg.desc}</p>
                        </div>
                        <div className="shrink-0 flex items-center gap-2">
                          {intg.connected && <span className="badge-success !text-[9px]">Connected</span>}
                          <button className={cn(
                            "text-xs rounded-lg px-3 py-1.5 border transition-colors",
                            intg.connected
                              ? "text-status-danger border-status-danger/30 hover:bg-status-danger/10"
                              : "text-brand-400 border-brand-500/30 hover:bg-brand-600/10"
                          )}>
                            {intg.connected ? "Disconnect" : "Connect"}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="glass-card-sm border-brand-500/20 bg-brand-600/5">
                    <div className="flex items-center gap-3">
                      <Key className="w-5 h-5 text-brand-400" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">API Access</p>
                        <p className="text-xs text-gray-500">Use our REST API to build custom integrations</p>
                      </div>
                      <button className="btn-primary !py-1.5 !px-4 text-xs">Generate Key</button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
