"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, Camera, CheckCircle2, Clock3, MapPin, MessageSquare, Paperclip, ShieldAlert, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";

const incidentDetails = {
  "INC-1042": {
    title: "Helmet Violation Detected",
    location: "Camera 5 - South Facade",
    severity: "warning",
    detected: "Today, 10:42 AM",
    description: "AI vision detected a worker inside the south facade zone without the required helmet.",
    evidence: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&h=675&fit=crop",
    assignee: "Safety Team",
    status: "Investigating",
  },
  "INC-1041": {
    title: "Unauthorized Entry",
    location: "Crane Base - Restricted Zone",
    severity: "critical",
    detected: "Today, 10:39 AM",
    description: "An unidentified person entered the restricted crane operating zone.",
    evidence: "https://images.unsplash.com/photo-1590496793907-2a838b934d0a?w=1200&h=675&fit=crop",
    assignee: "James Rodriguez",
    status: "Open",
  },
  "INC-1040": {
    title: "Concrete Delivery Delay",
    location: "Floor 3 - Pour Area",
    severity: "warning",
    detected: "Today, 10:29 AM",
    description: "The scheduled concrete delivery has not reached the floor 3 pour area.",
    evidence: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&h=675&fit=crop",
    assignee: "Logistics Team",
    status: "Resolved",
  },
} as const;

type Status = "Open" | "Investigating" | "Resolved";
type Assignee = "Safety Team" | "James Rodriguez" | "Logistics Team" | "Site Engineer";

export default function IncidentDetailsPage() {
  const params = useParams<{ id: string }>();
  const incident = incidentDetails[params.id as keyof typeof incidentDetails] ?? incidentDetails["INC-1042"];
  const [status, setStatus] = useState<Status>(incident.status);
  const [assignee, setAssignee] = useState<Assignee>(incident.assignee);
  const [note, setNote] = useState("");
  const [savedNote, setSavedNote] = useState("");

  return (
    <div className="space-y-4 max-w-6xl">
      <Link href="/dashboard/alerts" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to alerts
      </Link>

      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs text-gray-500">{params.id}</span>
            <span className={cn("badge !text-[10px]", incident.severity === "critical" ? "badge-danger" : "badge-warning")}>{incident.severity}</span>
          </div>
          <h1 className="text-2xl font-display font-bold">{incident.title}</h1>
          <p className="text-sm text-gray-400 mt-1 flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {incident.location} · Detected {incident.detected}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Workflow status</span>
          <select value={status} onChange={(event) => setStatus(event.target.value as Status)} className="input-field !w-auto !py-2 text-sm">
            <option>Open</option><option>Investigating</option><option>Resolved</option>
          </select>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1.5fr_1fr] gap-4">
        <div className="glass-card !p-0 overflow-hidden">
          <div className="relative aspect-video bg-black">
            <img src={incident.evidence} alt={`Evidence for ${incident.title}`} className="w-full h-full object-cover" />
            <div className="absolute top-3 left-3 badge badge-danger flex items-center gap-1"><Camera className="w-3 h-3" /> AI evidence</div>
          </div>
          <div className="p-4">
            <h3 className="text-sm font-medium">Detection summary</h3>
            <p className="text-sm text-gray-400 mt-2 leading-relaxed">{incident.description}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="glass-card">
            <h3 className="text-sm font-medium mb-4">Incident ownership</h3>
            <label className="text-xs text-gray-500 block mb-2">Assigned to</label>
            <div className="flex items-center gap-2">
              <UserPlus className="w-4 h-4 text-brand-400" />
              <select value={assignee} onChange={(event) => setAssignee(event.target.value as Assignee)} className="input-field !py-2 text-sm">
                <option>Safety Team</option><option>James Rodriguez</option><option>Logistics Team</option><option>Site Engineer</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              <div className="rounded-lg bg-white/[0.03] p-3"><p className="text-xs text-gray-500">Priority</p><p className="text-sm font-medium mt-1 capitalize">{incident.severity}</p></div>
              <div className="rounded-lg bg-white/[0.03] p-3"><p className="text-xs text-gray-500">Current state</p><p className="text-sm font-medium mt-1">{status}</p></div>
            </div>
          </div>

          <div className="glass-card">
            <h3 className="text-sm font-medium mb-3">Add investigation note</h3>
            <textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="Record what happened or what action was taken..." className="input-field min-h-24 resize-none text-sm" />
            <button onClick={() => { setSavedNote(note); setNote(""); }} disabled={!note.trim()} className="btn-primary mt-3 text-sm disabled:opacity-40">Save note</button>
            {savedNote && <p className="text-xs text-status-success mt-2">Note saved to this incident.</p>}
          </div>
        </div>
      </div>

      <div className="glass-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium">Activity timeline</h3>
          <span className="text-xs text-gray-500">Live incident log</span>
        </div>
        <div className="space-y-4">
          <div className="flex gap-3"><CheckCircle2 className="w-4 h-4 text-status-success mt-0.5" /><div><p className="text-sm">Incident assigned to {assignee}</p><p className="text-xs text-gray-500 mt-1">Just now · Workflow update</p></div></div>
          <div className="flex gap-3"><Clock3 className="w-4 h-4 text-status-warning mt-0.5" /><div><p className="text-sm">Status changed to {status}</p><p className="text-xs text-gray-500 mt-1">Today, 10:45 AM · Site operations</p></div></div>
          <div className="flex gap-3"><ShieldAlert className="w-4 h-4 text-status-danger mt-0.5" /><div><p className="text-sm">AI detection created this incident from camera evidence</p><p className="text-xs text-gray-500 mt-1">{incident.detected} · BuildWatch Vision</p></div></div>
          {savedNote && <div className="flex gap-3"><MessageSquare className="w-4 h-4 text-brand-400 mt-0.5" /><div><p className="text-sm">{savedNote}</p><p className="text-xs text-gray-500 mt-1">Just now · Investigation note</p></div></div>}
        </div>
        <button className="btn-secondary mt-5 text-sm flex items-center gap-2"><Paperclip className="w-4 h-4" /> Attach evidence</button>
      </div>
    </div>
  );
}
