"use client";

import { Package, TrendingDown, Truck, DollarSign, AlertTriangle, Calendar, Building2 } from "lucide-react";
import { materials } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import StatCard from "@/components/ui/StatCard";
import ProgressBar from "@/components/ui/ProgressBar";
import { motion } from "framer-motion";
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";

const tooltipStyle = {
  background: "#0f172a",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "12px",
  color: "#f8fafc",
  fontSize: "12px",
};

const costTrendData = [
  { month: "Feb", steel: 98000, cement: 14200, concrete: 38000, sand: 6800 },
  { month: "Mar", steel: 110000, cement: 16500, concrete: 42000, sand: 7200 },
  { month: "Apr", steel: 105000, cement: 15800, concrete: 40000, sand: 7500 },
  { month: "May", steel: 118000, cement: 17200, concrete: 44000, sand: 7800 },
  { month: "Jun", steel: 122000, cement: 18000, concrete: 43500, sand: 8100 },
  { month: "Jul", steel: 125000, cement: 18500, concrete: 45000, sand: 8400 },
];

const upcomingDeliveries = [
  { id: 1, material: "Concrete", supplier: "ReadyMix Pro", quantity: "120 m³", eta: "Today 2:00 PM", status: "on-time" },
  { id: 2, material: "Steel", supplier: "ArcelorMittal", quantity: "20 tons", eta: "Tomorrow 9:00 AM", status: "on-time" },
  { id: 3, material: "Cement", supplier: "LafargeHolcim", quantity: "100 bags", eta: "Tomorrow 11:00 AM", status: "delayed" },
  { id: 4, material: "Pipes", supplier: "PipeTech", quantity: "200 m", eta: "Aug 10, 8:00 AM", status: "on-time" },
  { id: 5, material: "Sand", supplier: "Local Quarry Co.", quantity: "50 m³", eta: "Aug 11, 10:00 AM", status: "on-time" },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } } };

export default function MaterialsPage() {
  const totalCost = materials.reduce((sum, m) => sum + m.cost, 0);
  const totalDelivery = materials.reduce((sum, m) => sum + m.todayDelivery, 0);
  const lowStock = materials.filter((m) => {
    const daysLeft = Math.floor(m.remaining / m.dailyUsage);
    return daysLeft < 7;
  });

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-display font-bold">Material Tracking</h1>
        <p className="text-sm text-gray-400">Inventory, usage, delivery schedule, and supplier management</p>
      </div>

      {/* Low Stock Warning */}
      {lowStock.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 px-4 py-3 rounded-xl bg-status-warning/10 border border-status-warning/30"
        >
          <AlertTriangle className="w-5 h-5 text-status-warning shrink-0" />
          <p className="text-sm text-status-warning">
            <span className="font-semibold">{lowStock.length} material{lowStock.length > 1 ? "s" : ""} running low</span>
            {" — "}
            {lowStock.map((m) => m.name).join(", ")} (less than 7 days remaining).
          </p>
        </motion.div>
      )}

      {/* Stats */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 md:grid-cols-4 gap-3"
      >
        <motion.div variants={item}>
          <StatCard label="Material Types" value={materials.length} icon={<Package className="w-4 h-4" />} />
        </motion.div>
        <motion.div variants={item}>
          <StatCard label="Today's Delivery" value={totalDelivery} icon={<Truck className="w-4 h-4" />} color="green" />
        </motion.div>
        <motion.div variants={item}>
          <StatCard label="Daily Cost" value={formatCurrency(totalCost)} icon={<DollarSign className="w-4 h-4" />} color="orange" />
        </motion.div>
        <motion.div variants={item}>
          <StatCard label="Low Stock Items" value={lowStock.length} icon={<TrendingDown className="w-4 h-4" />} color={lowStock.length > 0 ? "red" : "green"} />
        </motion.div>
      </motion.div>

      {/* Cost Trend Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card"
      >
        <h4 className="text-sm font-medium mb-4 flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-brand-400" /> Monthly Material Cost Trend ($)
        </h4>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={costTrendData}>
            <defs>
              {[
                { id: "steelGrad", color: "#3b82f6" },
                { id: "cementGrad", color: "#22c55e" },
                { id: "concreteGrad", color: "#f97316" },
              ].map(({ id, color }) => (
                <linearGradient key={id} id={id} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.25} />
                  <stop offset="95%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="month" stroke="#475569" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis stroke="#475569" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
            <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`$${v.toLocaleString()}`]} />
            <Legend wrapperStyle={{ fontSize: "11px", color: "#94a3b8" }} iconSize={10} />
            <Area type="monotone" dataKey="steel" name="Steel" stroke="#3b82f6" fill="url(#steelGrad)" strokeWidth={2} />
            <Area type="monotone" dataKey="cement" name="Cement" stroke="#22c55e" fill="url(#cementGrad)" strokeWidth={2} />
            <Area type="monotone" dataKey="concrete" name="Concrete" stroke="#f97316" fill="url(#concreteGrad)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Material Cards Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {materials.map((m) => {
          const daysLeft = Math.floor(m.remaining / m.dailyUsage);
          const stockPercent = Math.min(100, (m.remaining / (m.remaining + m.dailyUsage * 30)) * 100);
          const isLow = daysLeft < 7;

          return (
            <motion.div
              key={m.id}
              variants={item}
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
              className={`glass-card transition-colors ${isLow ? "border-status-warning/30" : ""}`}
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium">{m.name}</h4>
                <div className="flex items-center gap-1.5">
                  {isLow && <AlertTriangle className="w-3.5 h-3.5 text-status-warning" />}
                  <span className="text-xs text-gray-500">{m.unit}</span>
                </div>
              </div>

              <ProgressBar
                value={stockPercent}
                label="Stock Level"
                color={stockPercent < 20 ? "red" : stockPercent < 50 ? "orange" : "green"}
                size="sm"
              />

              <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
                <div>
                  <span className="text-gray-500">Daily Usage</span>
                  <p className="font-medium">{m.dailyUsage} {m.unit}</p>
                </div>
                <div>
                  <span className="text-gray-500">Remaining</span>
                  <p className={`font-medium ${isLow ? "text-status-warning" : ""}`}>{m.remaining} {m.unit}</p>
                </div>
                <div>
                  <span className="text-gray-500">Days Left</span>
                  <p className={`font-medium ${isLow ? "text-status-danger" : "text-status-success"}`}>{daysLeft}d</p>
                </div>
                <div>
                  <span className="text-gray-500">Today +</span>
                  <p className="font-medium text-status-success">+{m.todayDelivery}</p>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-1 text-[10px] text-gray-500">
                  <Building2 className="w-3 h-3" /> {m.supplier}
                </div>
                <span className="text-[10px] font-medium text-brand-400">{formatCurrency(m.cost)}</span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Upcoming Deliveries */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card"
      >
        <h4 className="text-sm font-medium mb-4 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-brand-400" /> Upcoming Deliveries
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5 text-gray-400 text-xs">
                <th className="text-left p-3">Material</th>
                <th className="text-left p-3">Supplier</th>
                <th className="text-left p-3">Quantity</th>
                <th className="text-left p-3">ETA</th>
                <th className="text-left p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {upcomingDeliveries.map((d) => (
                <tr
                  key={d.id}
                  className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                >
                  <td className="p-3 font-medium">{d.material}</td>
                  <td className="p-3 text-gray-400">{d.supplier}</td>
                  <td className="p-3">
                    <span className="badge-info !text-xs">{d.quantity}</span>
                  </td>
                  <td className="p-3 text-gray-400 text-xs">{d.eta}</td>
                  <td className="p-3">
                    <span className={`badge !text-[10px] ${d.status === "on-time" ? "badge-success" : "badge-warning"}`}>
                      {d.status === "on-time" ? "On Time" : "Delayed"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Daily Usage Bar Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card"
      >
        <h4 className="text-sm font-medium mb-4 flex items-center gap-2">
          <Package className="w-4 h-4 text-brand-400" /> Daily Usage vs Delivery (Today)
        </h4>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={materials.map((m) => ({ name: m.name, usage: m.dailyUsage, delivery: m.todayDelivery }))}>
            <defs>
              <linearGradient id="usageGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.9} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0.4} />
              </linearGradient>
              <linearGradient id="deliveryGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.9} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0.4} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="name" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
            <YAxis stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend wrapperStyle={{ fontSize: "11px", color: "#94a3b8" }} iconSize={10} />
            <Bar dataKey="usage" name="Daily Usage" fill="url(#usageGrad)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="delivery" name="Today's Delivery" fill="url(#deliveryGrad)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}
