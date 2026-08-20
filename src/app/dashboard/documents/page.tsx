"use client";

import { useState } from "react";
import {
  FolderOpen, FileText, Download, Search, Upload,
  File, FileSpreadsheet, Layers, Shield, FileCheck,
  LayoutList, Landmark, ChevronRight, X,
} from "lucide-react";
import { documents } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  { id: "all", label: "All Documents", icon: FolderOpen },
  { id: "blueprints", label: "Blueprints", icon: Layers },
  { id: "cad", label: "CAD Files", icon: FileText },
  { id: "bim", label: "BIM Files", icon: Landmark },
  { id: "invoices", label: "Invoices", icon: FileSpreadsheet },
  { id: "safety", label: "Safety Certs", icon: Shield },
  { id: "inspections", label: "Inspections", icon: FileCheck },
  { id: "contracts", label: "Contracts", icon: LayoutList },
];

const typeIcons: Record<string, { icon: React.ComponentType<{ className?: string }>; color: string }> = {
  Blueprint: { icon: Layers, color: "text-brand-400" },
  CAD: { icon: FileText, color: "text-purple-400" },
  BIM: { icon: Landmark, color: "text-cyan-400" },
  Invoice: { icon: FileSpreadsheet, color: "text-status-success" },
  Certificate: { icon: Shield, color: "text-status-warning" },
  Report: { icon: FileCheck, color: "text-orange-400" },
  Contract: { icon: LayoutList, color: "text-pink-400" },
};

const typeColors: Record<string, string> = {
  Blueprint: "bg-brand-500/15 border-brand-500/30",
  CAD: "bg-purple-500/15 border-purple-500/30",
  BIM: "bg-cyan-500/15 border-cyan-500/30",
  Invoice: "bg-status-success/15 border-status-success/30",
  Certificate: "bg-status-warning/15 border-status-warning/30",
  Report: "bg-orange-500/15 border-orange-500/30",
  Contract: "bg-pink-500/15 border-pink-500/30",
};

type Document = (typeof documents)[number];

export default function DocumentsPage() {
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Document | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const filtered = documents.filter((d) => {
    const matchCat = category === "all" || d.category === category;
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const totalSize = "247.7 MB";

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-display font-bold">Documents</h1>
          <p className="text-sm text-gray-400">Blueprints, CAD, BIM, invoices, and project files</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary !py-2 !px-4 text-sm">
            <Search className="w-4 h-4" /> Quick Search
          </button>
          <button className="btn-primary !py-2 !px-4 text-sm">
            <Upload className="w-4 h-4" /> Upload Files
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Total Files", value: documents.length, color: "bg-brand-500/10 border-brand-500/20" },
          { label: "Total Size", value: totalSize, color: "bg-purple-500/10 border-purple-500/20" },
          { label: "Categories", value: categories.length - 1, color: "bg-cyan-500/10 border-cyan-500/20" },
          { label: "Shared", value: 5, color: "bg-status-success/10 border-status-success/20" },
        ].map((s) => (
          <div key={s.label} className={`glass-card-sm !p-3 border ${s.color}`}>
            <p className="text-xs text-gray-400">{s.label}</p>
            <p className="text-lg font-bold mt-0.5">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-4 gap-4">
        {/* Sidebar Categories */}
        <div className="lg:col-span-1">
          <div className="glass-card !p-3 space-y-0.5 sticky top-20">
            <p className="text-xs text-gray-500 px-3 py-1 font-medium uppercase tracking-wide">Categories</p>
            {categories.map((cat) => {
              const count = cat.id === "all"
                ? documents.length
                : documents.filter((d) => d.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-colors",
                    category === cat.id
                      ? "bg-brand-600/15 text-brand-400 border border-brand-500/20"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <cat.icon className="w-4 h-4" />
                    <span>{cat.label}</span>
                  </div>
                  <span className="text-xs bg-white/5 px-1.5 py-0.5 rounded-full">{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search documents..."
              className="input-field !pl-10 !py-2.5"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Drag to upload zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => { e.preventDefault(); setDragOver(false); }}
            className={cn(
              "border-2 border-dashed rounded-xl py-6 text-center transition-all cursor-pointer",
              dragOver
                ? "border-brand-400 bg-brand-600/10 text-brand-400"
                : "border-white/10 hover:border-white/20 text-gray-500 hover:text-gray-400"
            )}
          >
            <Upload className="w-8 h-8 mx-auto mb-2 opacity-60" />
            <p className="text-sm font-medium">Drop files here to upload</p>
            <p className="text-xs mt-1 opacity-70">Supports PDF, DWG, IFC, XLSX, and more</p>
          </div>

          {/* Document Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <FolderOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="font-medium">No documents found</p>
              <p className="text-xs mt-1">Try a different search or category</p>
            </div>
          ) : (
            <motion.div
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.07 } }, hidden: {} }}
              className="grid md:grid-cols-2 gap-3"
            >
              {filtered.map((doc) => {
                const typeInfo = typeIcons[doc.type] || { icon: File, color: "text-gray-400" };
                const TypeIcon = typeInfo.icon;

                return (
                  <motion.div
                    key={doc.id}
                    variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
                    whileHover={{ y: -2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    onClick={() => setSelected(selected?.id === doc.id ? null : doc)}
                    className={cn(
                      "glass-card group cursor-pointer transition-all",
                      selected?.id === doc.id && "border-brand-500/40",
                      typeColors[doc.type] || "hover:border-white/15"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
                        typeColors[doc.type]?.replace("border-", "") || "bg-brand-600/10"
                      )}>
                        <TypeIcon className={cn("w-5 h-5", typeInfo.color)} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium truncate">{doc.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={cn("badge !text-[9px]", typeColors[doc.type] || "")}>{doc.type}</span>
                          <span className="text-[10px] text-gray-500">{doc.size}</span>
                          <span className="text-[10px] text-gray-600">{doc.date}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={(e) => e.stopPropagation()}
                          className="btn-ghost !p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                          title="Download"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <ChevronRight className={cn(
                          "w-4 h-4 text-gray-600 transition-transform",
                          selected?.id === doc.id && "rotate-90 text-brand-400"
                        )} />
                      </div>
                    </div>

                    {/* Expanded preview */}
                    <AnimatePresence>
                      {selected?.id === doc.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="mt-4 pt-4 border-t border-white/5 overflow-hidden"
                        >
                          <div className="rounded-xl bg-surface-elevated h-32 flex items-center justify-center mb-3">
                            <div className="text-center text-gray-500">
                              <TypeIcon className={cn("w-10 h-10 mx-auto mb-2 opacity-40", typeInfo.color)} />
                              <p className="text-xs">Preview not available</p>
                              <p className="text-[10px] mt-0.5">{doc.type} · {doc.size}</p>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="glass-card-sm !p-2">
                              <p className="text-gray-500">File Type</p>
                              <p className="font-medium">{doc.type}</p>
                            </div>
                            <div className="glass-card-sm !p-2">
                              <p className="text-gray-500">File Size</p>
                              <p className="font-medium">{doc.size}</p>
                            </div>
                            <div className="glass-card-sm !p-2">
                              <p className="text-gray-500">Last Modified</p>
                              <p className="font-medium">{doc.date}</p>
                            </div>
                            <div className="glass-card-sm !p-2">
                              <p className="text-gray-500">Category</p>
                              <p className="font-medium capitalize">{doc.category}</p>
                            </div>
                          </div>
                          <button
                            onClick={(e) => e.stopPropagation()}
                            className="btn-primary w-full !py-2 text-sm mt-3"
                          >
                            <Download className="w-4 h-4" /> Download File
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
