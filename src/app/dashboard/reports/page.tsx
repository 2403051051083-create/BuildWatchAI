"use client";

import { FileText, Download, FileSpreadsheet, File } from "lucide-react";

const reportTypes = [
  { name: "Daily Report", desc: "Today's progress, safety, and activity summary", formats: ["PDF", "Excel", "CSV"] },
  { name: "Weekly Report", desc: "7-day overview with trends and milestones", formats: ["PDF", "Excel", "CSV"] },
  { name: "Monthly Report", desc: "Comprehensive monthly project analysis", formats: ["PDF", "Excel", "CSV"] },
  { name: "Safety Report", desc: "PPE compliance, incidents, and violations", formats: ["PDF", "Excel"] },
  { name: "Attendance Report", desc: "Worker attendance and zone activity", formats: ["PDF", "Excel", "CSV"] },
  { name: "Material Report", desc: "Inventory usage, deliveries, and costs", formats: ["PDF", "Excel", "CSV"] },
  { name: "Equipment Report", desc: "Fleet utilization, fuel, and maintenance", formats: ["PDF", "Excel"] },
];

const recentReports = [
  { name: "Daily Report - Jul 20, 2026", type: "PDF", size: "2.4 MB", date: "Today" },
  { name: "Weekly Report - Week 29", type: "Excel", size: "5.1 MB", date: "Yesterday" },
  { name: "Safety Report - July 2026", type: "PDF", size: "3.8 MB", date: "3 days ago" },
  { name: "Material Report - Week 29", type: "CSV", size: "1.2 MB", date: "5 days ago" },
];

export default function ReportsPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-display font-bold">Reports</h1>
        <p className="text-sm text-gray-400">Generate and download project reports</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reportTypes.map((report) => (
          <div key={report.name} className="glass-card">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-brand-600/10 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-brand-400" />
              </div>
              <div>
                <h4 className="font-medium">{report.name}</h4>
                <p className="text-xs text-gray-400 mt-0.5">{report.desc}</p>
              </div>
            </div>
            <div className="flex gap-2">
              {report.formats.map((fmt) => (
                <button key={fmt} className="btn-secondary !py-1.5 !px-3 text-xs flex items-center gap-1">
                  <Download className="w-3 h-3" /> {fmt}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="glass-card">
        <h4 className="text-sm font-medium mb-4">Recent Reports</h4>
        <div className="space-y-2">
          {recentReports.map((r) => (
            <div key={r.name} className="flex items-center justify-between glass-card-sm !p-3">
              <div className="flex items-center gap-3">
                {r.type === "PDF" ? <File className="w-5 h-5 text-status-danger" /> :
                 r.type === "Excel" ? <FileSpreadsheet className="w-5 h-5 text-status-success" /> :
                 <FileText className="w-5 h-5 text-brand-400" />}
                <div>
                  <p className="text-sm font-medium">{r.name}</p>
                  <p className="text-xs text-gray-500">{r.size} · {r.date}</p>
                </div>
              </div>
              <button className="btn-ghost !p-2"><Download className="w-4 h-4" /></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
