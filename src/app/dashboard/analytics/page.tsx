"use client";

import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, RadialBarChart, RadialBar, Legend,
} from "recharts";
import { Brain, TrendingUp, DollarSign, Users, Zap } from "lucide-react";
import { progressChartData, aiProgress } from "@/lib/mock-data";
import StatCard from "@/components/ui/StatCard";
import { motion } from "framer-motion";

const COLORS = ["#3b82f6", "#22c55e", "#f97316", "#ef4444", "#8b5cf6"];

const safetyData = [
  { name: "Compliant", value: 85 },
  { name: "Helmet", value: 8 },
  { name: "Jacket", value: 4 },
  { name: "Other", value: 3 },
];

const kpiData = [
  { name: "Progress", value: 67, fill: "#3b82f6" },
  { name: "Safety", value: 91, fill: "#22c55e" },
  { name: "Labor Eff.", value: 87, fill: "#8b5cf6" },
  { name: "Budget", value: 67, fill: "#f97316" },
];

const tooltipStyle = {
  background: "#0f172a",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "12px",
  color: "#f8fafc",
  fontSize: "12px",
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold">AI Analytics</h1>
        <p className="text-sm text-gray-400">Comprehensive project intelligence and insights</p>
      </div>

      {/* KPI Stats */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 md:grid-cols-4 gap-3"
      >
        <motion.div variants={item}>
          <StatCard label="Overall Progress" value={`${aiProgress.today}%`} change={aiProgress.delta} icon={<TrendingUp className="w-4 h-4" />} color="blue" />
        </motion.div>
        <motion.div variants={item}>
          <StatCard label="AI Confidence" value="94.2%" icon={<Brain className="w-4 h-4" />} color="green" />
        </motion.div>
        <motion.div variants={item}>
          <StatCard label="Cost Variance" value="-2.3%" icon={<DollarSign className="w-4 h-4" />} color="green" />
        </motion.div>
        <motion.div variants={item}>
          <StatCard label="Labor Efficiency" value="87%" icon={<Users className="w-4 h-4" />} color="blue" />
        </motion.div>
      </motion.div>

      {/* KPI RadialBar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="glass-card"
      >
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-4 h-4 text-brand-400" />
          <h4 className="text-sm font-medium">Key Performance Indicators</h4>
        </div>
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <ResponsiveContainer width="100%" height={220}>
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="25%"
              outerRadius="90%"
              data={kpiData}
              startAngle={180}
              endAngle={-180}
            >
              <RadialBar
                dataKey="value"
                cornerRadius={8}
                background={{ fill: "rgba(255,255,255,0.04)" }}
              />
              <Tooltip
                contentStyle={tooltipStyle}
                formatter={(v) => [`${v}%`]}
              />
              <Legend
                iconSize={10}
                layout="vertical"
                verticalAlign="middle"
                align="right"
                wrapperStyle={{ fontSize: "11px", color: "#94a3b8" }}
              />
            </RadialBarChart>
          </ResponsiveContainer>
          <div className="space-y-3">
            {kpiData.map((kpi) => (
              <div key={kpi.name} className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full shrink-0" style={{ background: kpi.fill }} />
                <div className="flex-1">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-400">{kpi.name}</span>
                    <span className="font-medium">{kpi.value}%</span>
                  </div>
                  <div className="h-1.5 bg-surface-border rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${kpi.value}%` }}
                      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
                      className="h-full rounded-full"
                      style={{ background: kpi.fill }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Charts Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid lg:grid-cols-2 gap-4"
      >
        <motion.div variants={item} className="glass-card">
          <h4 className="text-sm font-medium mb-4">Monthly Progress (%)</h4>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={progressChartData}>
              <defs>
                <linearGradient id="progressGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="month" stroke="#475569" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#475569" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="progress" stroke="#3b82f6" fill="url(#progressGrad)" strokeWidth={2.5} dot={{ fill: "#3b82f6", r: 3 }} activeDot={{ r: 5 }} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div variants={item} className="glass-card">
          <h4 className="text-sm font-medium mb-4">Cost Analysis ($M)</h4>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={progressChartData}>
              <defs>
                <linearGradient id="costGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.9} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0.4} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="month" stroke="#475569" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#475569" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="cost" fill="url(#costGrad)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div variants={item} className="glass-card">
          <h4 className="text-sm font-medium mb-4">Labor & Equipment Usage</h4>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={progressChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="month" stroke="#475569" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#475569" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="labor" stroke="#3b82f6" strokeWidth={2.5} dot={false} activeDot={{ r: 5, fill: "#3b82f6" }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div variants={item} className="glass-card">
          <h4 className="text-sm font-medium mb-4">Safety Compliance Breakdown</h4>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={safetyData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={3}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
                labelLine={false}
              >
                {safetyData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v}%`]} />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </motion.div>
    </div>
  );
}
