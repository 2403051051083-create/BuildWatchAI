"use client";

import {
  Cloud, Droplets, Wind, Thermometer, Sun, AlertTriangle,
  CloudRain, Cloudy, CheckCircle, XCircle, Gauge,
} from "lucide-react";
import { weatherData } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import StatCard from "@/components/ui/StatCard";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";

const tooltipStyle = {
  background: "#0f172a",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "12px",
  color: "#f8fafc",
  fontSize: "12px",
};

const hourlyData = [
  { time: "6 AM", temp: 24, rain: 20, wind: 8, humidity: 72 },
  { time: "8 AM", temp: 25, rain: 30, wind: 10, humidity: 70 },
  { time: "10 AM", temp: 27, rain: 45, wind: 11, humidity: 68 },
  { time: "12 PM", temp: 28, rain: 60, wind: 12, humidity: 65 },
  { time: "2 PM", temp: 29, rain: 75, wind: 14, humidity: 63 },
  { time: "4 PM", temp: 28, rain: 80, wind: 13, humidity: 64 },
  { time: "6 PM", temp: 26, rain: 65, wind: 11, humidity: 67 },
  { time: "8 PM", temp: 24, rain: 40, wind: 9, humidity: 70 },
];

const constructionImpact = [
  { task: "Concrete Pouring", suitable: false, reason: "High rain risk (>70%)" },
  { task: "Steel Erection", suitable: true, reason: "Wind within safe limits" },
  { task: "Crane Operations", suitable: true, reason: "Wind < 15 km/h" },
  { task: "Excavation", suitable: false, reason: "Rain may cause mudslides" },
  { task: "Scaffold Work", suitable: true, reason: "Conditions acceptable" },
  { task: "Electrical Installation", suitable: false, reason: "Moisture risk" },
  { task: "Facade Work", suitable: true, reason: "Light conditions good" },
  { task: "Painting / Finishing", suitable: false, reason: "High humidity (>60%)" },
];

function WeatherIcon({ condition }: { condition: string }) {
  if (condition.includes("Cloudy")) return <Cloudy className="w-16 h-16 text-gray-300 opacity-80" />;
  if (condition.includes("Rain")) return <CloudRain className="w-16 h-16 text-brand-400 opacity-80" />;
  return <Sun className="w-16 h-16 text-status-warning opacity-80" />;
}

function ForecastIcon({ rain }: { rain: number }) {
  if (rain > 50) return <CloudRain className="w-8 h-8 text-brand-400 mx-auto" />;
  if (rain > 25) return <Cloudy className="w-8 h-8 text-gray-400 mx-auto" />;
  return <Sun className="w-8 h-8 text-status-warning mx-auto" />;
}

const container = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

export default function WeatherPage() {
  const suitabilityColor =
    weatherData.constructionSuitability === "Moderate"
      ? "text-status-warning"
      : weatherData.constructionSuitability === "Poor"
      ? "text-status-danger"
      : "text-status-success";

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-display font-bold">Weather Forecast</h1>
        <p className="text-sm text-gray-400">Real-time weather data and construction suitability analysis</p>
      </div>

      {/* Rain Alert Banner */}
      {weatherData.rainPrediction > 60 && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 px-4 py-3 rounded-xl bg-status-warning/10 border border-status-warning/30"
        >
          <AlertTriangle className="w-5 h-5 text-status-warning shrink-0" />
          <p className="text-sm text-status-warning">
            <span className="font-semibold">Rain alert:</span> {weatherData.rainPrediction}% chance of rain within 4 hours. Consider pausing outdoor concrete work.
          </p>
        </motion.div>
      )}

      {/* Stat Cards */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 md:grid-cols-4 gap-3"
      >
        {[
          { label: "Temperature", value: `${weatherData.temperature}°C`, icon: <Thermometer className="w-4 h-4" />, color: "orange" as const },
          { label: "Humidity", value: `${weatherData.humidity}%`, icon: <Droplets className="w-4 h-4" />, color: "blue" as const },
          { label: "Wind Speed", value: `${weatherData.windSpeed} km/h`, icon: <Wind className="w-4 h-4" />, color: "blue" as const },
          { label: "Rain Chance", value: `${weatherData.rainPrediction}%`, icon: <CloudRain className="w-4 h-4" />, color: "orange" as const },
        ].map((s) => (
          <motion.div key={s.label} variants={item}>
            <StatCard {...s} />
          </motion.div>
        ))}
      </motion.div>

      {/* Current Conditions + Suitability */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid lg:grid-cols-3 gap-4"
      >
        {/* Current conditions */}
        <div className="lg:col-span-2 glass-card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-6xl font-display font-bold">{weatherData.temperature}°C</p>
              <p className="text-gray-400 mt-1 text-lg">{weatherData.condition}</p>
              <p className="text-sm text-gray-500 mt-1">Downtown Metro, NY</p>
            </div>
            <WeatherIcon condition={weatherData.condition} />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { icon: <Droplets className="w-4 h-4 text-brand-400" />, label: "Humidity", value: `${weatherData.humidity}%` },
              { icon: <Wind className="w-4 h-4 text-brand-400" />, label: "Wind Speed", value: `${weatherData.windSpeed} km/h` },
              { icon: <Thermometer className="w-4 h-4 text-status-warning" />, label: "Heat Index", value: `${weatherData.heatIndex}°C` },
              { icon: <Gauge className="w-4 h-4 text-status-warning" />, label: "Rain Risk", value: `${weatherData.rainPrediction}%` },
            ].map((item) => (
              <div key={item.label} className="glass-card-sm text-center !p-3">
                <div className="flex justify-center mb-1">{item.icon}</div>
                <p className="text-[10px] text-gray-500">{item.label}</p>
                <p className="text-base font-bold mt-0.5">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Construction Suitability */}
        <div className="glass-card">
          <h4 className="text-sm font-medium mb-4">Construction Suitability</h4>
          <div className={cn(
            "text-center py-6 rounded-xl mb-4",
            weatherData.constructionSuitability === "Moderate" ? "bg-status-warning/10" :
            weatherData.constructionSuitability === "Poor" ? "bg-status-danger/10" : "bg-status-success/10"
          )}>
            <AlertTriangle className={cn("w-10 h-10 mx-auto mb-2", suitabilityColor)} />
            <p className={cn("text-2xl font-bold", suitabilityColor)}>{weatherData.constructionSuitability}</p>
            <p className="text-xs text-gray-400 mt-1">Overall site conditions</p>
          </div>

          {/* Wind gauge */}
          <div className="mb-4">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>Wind: {weatherData.windSpeed} km/h</span>
              <span className="text-status-success">Safe (&lt;20 km/h)</span>
            </div>
            <div className="h-2 bg-surface-border rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-status-success to-status-warning"
                style={{ width: `${(weatherData.windSpeed / 30) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Hourly Chart */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card"
      >
        <h4 className="text-sm font-medium mb-4 flex items-center gap-2">
          <Cloud className="w-4 h-4 text-brand-400" /> Today's Hourly Forecast
        </h4>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={hourlyData}>
            <defs>
              <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="rainGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="time" stroke="#475569" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis stroke="#475569" fontSize={11} tickLine={false} axisLine={false} />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend wrapperStyle={{ fontSize: "11px", color: "#94a3b8" }} iconSize={10} />
            <Area type="monotone" dataKey="temp" name="Temp (°C)" stroke="#f97316" fill="url(#tempGrad)" strokeWidth={2.5} dot={false} />
            <Area type="monotone" dataKey="rain" name="Rain (%)" stroke="#3b82f6" fill="url(#rainGrad)" strokeWidth={2.5} dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* 5-Day Forecast */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="glass-card"
      >
        <h4 className="text-sm font-medium mb-4 flex items-center gap-2">
          <Sun className="w-4 h-4 text-brand-400" /> 5-Day Forecast
        </h4>
        <div className="grid grid-cols-5 gap-3">
          {weatherData.forecast.map((day, i) => (
            <motion.div
              key={day.day}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className={cn(
                "glass-card-sm text-center !p-3",
                !day.suitable && "border-status-warning/25 bg-status-warning/5"
              )}
            >
              <p className="text-sm font-semibold mb-1">{day.day}</p>
              <ForecastIcon rain={day.rain} />
              <p className="text-lg font-bold mt-2">{day.temp}°C</p>
              <p className="text-xs text-gray-500 mt-1">{day.rain}% rain</p>
              <span className={cn("badge !text-[9px] mt-2", day.suitable ? "badge-success" : "badge-warning")}>
                {day.suitable ? "✓ Suitable" : "⚠ Caution"}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Construction Task Impact Table */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card"
      >
        <h4 className="text-sm font-medium mb-4 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-brand-400" /> Construction Task Suitability — Today
        </h4>
        <div className="grid md:grid-cols-2 gap-2">
          {constructionImpact.map((task) => (
            <div
              key={task.task}
              className={cn(
                "flex items-center gap-3 p-3 rounded-xl border",
                task.suitable
                  ? "border-status-success/20 bg-status-success/5"
                  : "border-status-danger/20 bg-status-danger/5"
              )}
            >
              {task.suitable ? (
                <CheckCircle className="w-5 h-5 text-status-success shrink-0" />
              ) : (
                <XCircle className="w-5 h-5 text-status-danger shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{task.task}</p>
                <p className="text-xs text-gray-500 mt-0.5">{task.reason}</p>
              </div>
              <span className={cn("badge !text-[10px]", task.suitable ? "badge-success" : "badge-danger")}>
                {task.suitable ? "OK" : "Stop"}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
