export type FloorStatus = "completed" | "in-progress" | "not-started" | "delayed";

export interface FloorData {
  id: number;
  name: string;
  status: FloorStatus;
  completion: number;
  workers: number;
  materialUsed: string;
  concreteStrength: string;
  safetyScore: number;
  engineerNotes: string;
  cameraId: string;
}

export interface CameraFeed {
  id: string;
  name: string;
  location: string;
  isLive: boolean;
  isRecording: boolean;
  motionDetected: boolean;
  aiDetection: string[];
  thumbnail: string;
}

export interface Worker {
  id: string;
  name: string;
  role: string;
  helmet: boolean;
  safetyJacket: boolean;
  gloves: boolean;
  boots: boolean;
  zone: string;
  status: "active" | "break" | "offline";
}

export interface Equipment {
  id: string;
  name: string;
  type: string;
  status: "running" | "idle" | "maintenance";
  fuelLevel: number;
  workingHours: number;
  location: string;
  gps: { lat: number; lng: number };
}

export interface Material {
  id: string;
  name: string;
  dailyUsage: number;
  remaining: number;
  todayDelivery: number;
  cost: number;
  supplier: string;
  unit: string;
}

export interface Alert {
  id: string;
  type: "fire" | "helmet" | "machine" | "concrete" | "rain" | "unauthorized";
  severity: "critical" | "warning" | "info";
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

export interface Project {
  id: string;
  name: string;
  location: string;
  completion: number;
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
}

export interface TimelineDay {
  day: number;
  label: string;
  completion: number;
  floorsBuilt: number[];
}
