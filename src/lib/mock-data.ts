import type {
  Alert,
  CameraFeed,
  Equipment,
  FloorData,
  Material,
  Project,
  TimelineDay,
  Worker,
} from "./types";

export const projects: Project[] = [
  {
    id: "proj-1",
    name: "Skyline Tower Phase II",
    location: "Downtown Metro, NY",
    completion: 67,
    startDate: "2024-03-15",
    endDate: "2026-12-30",
    budget: 45000000,
    spent: 30150000,
  },
  {
    id: "proj-2",
    name: "Harbor Bridge Extension",
    location: "San Francisco Bay, CA",
    completion: 42,
    startDate: "2024-06-01",
    endDate: "2027-06-15",
    budget: 78000000,
    spent: 32760000,
  },
  {
    id: "proj-3",
    name: "Greenfield Residential Complex",
    location: "Austin, TX",
    completion: 89,
    startDate: "2023-11-01",
    endDate: "2025-08-20",
    budget: 22000000,
    spent: 19580000,
  },
];

export const floors: FloorData[] = [
  {
    id: 1,
    name: "Basement",
    status: "completed",
    completion: 100,
    workers: 4,
    materialUsed: "450 tons concrete",
    concreteStrength: "35 MPa",
    safetyScore: 98,
    engineerNotes: "Waterproofing complete. Ready for ground floor.",
    cameraId: "cam-1",
  },
  {
    id: 2,
    name: "Ground Floor",
    status: "completed",
    completion: 100,
    workers: 6,
    materialUsed: "320 tons concrete, 45 tons steel",
    concreteStrength: "30 MPa",
    safetyScore: 96,
    engineerNotes: "Lobby fit-out in progress. MEP rough-in complete.",
    cameraId: "cam-2",
  },
  {
    id: 3,
    name: "Floor 1",
    status: "completed",
    completion: 100,
    workers: 8,
    materialUsed: "280 tons concrete, 38 tons steel",
    concreteStrength: "30 MPa",
    safetyScore: 94,
    engineerNotes: "All structural work signed off.",
    cameraId: "cam-3",
  },
  {
    id: 4,
    name: "Floor 2",
    status: "completed",
    completion: 100,
    workers: 7,
    materialUsed: "275 tons concrete, 36 tons steel",
    concreteStrength: "28 MPa",
    safetyScore: 95,
    engineerNotes: "Facade installation started on south wing.",
    cameraId: "cam-4",
  },
  {
    id: 5,
    name: "Floor 3",
    status: "in-progress",
    completion: 78,
    workers: 12,
    materialUsed: "210 tons concrete, 28 tons steel",
    concreteStrength: "28 MPa (curing)",
    safetyScore: 91,
    engineerNotes: "Slab pour scheduled tomorrow. Rebar inspection passed.",
    cameraId: "cam-5",
  },
  {
    id: 6,
    name: "Floor 4",
    status: "in-progress",
    completion: 45,
    workers: 10,
    materialUsed: "120 tons concrete, 18 tons steel",
    concreteStrength: "N/A",
    safetyScore: 88,
    engineerNotes: "Column formwork in progress. Crane lift at 2 PM.",
    cameraId: "cam-1",
  },
  {
    id: 7,
    name: "Floor 5",
    status: "delayed",
    completion: 22,
    workers: 6,
    materialUsed: "65 tons concrete, 10 tons steel",
    concreteStrength: "N/A",
    safetyScore: 82,
    engineerNotes: "Delayed due to steel delivery. Expected resolution in 3 days.",
    cameraId: "cam-2",
  },
  {
    id: 8,
    name: "Floor 6",
    status: "not-started",
    completion: 0,
    workers: 0,
    materialUsed: "None",
    concreteStrength: "N/A",
    safetyScore: 100,
    engineerNotes: "Pending floor 5 completion.",
    cameraId: "cam-3",
  },
  {
    id: 9,
    name: "Floor 7",
    status: "not-started",
    completion: 0,
    workers: 0,
    materialUsed: "None",
    concreteStrength: "N/A",
    safetyScore: 100,
    engineerNotes: "Design review scheduled next week.",
    cameraId: "cam-4",
  },
  {
    id: 10,
    name: "Roof",
    status: "not-started",
    completion: 0,
    workers: 0,
    materialUsed: "None",
    concreteStrength: "N/A",
    safetyScore: 100,
    engineerNotes: "Penthouse mechanical planning in progress.",
    cameraId: "cam-5",
  },
];

export const timelineDays: TimelineDay[] = [
  { day: 1, label: "Day 1", completion: 5, floorsBuilt: [1] },
  { day: 20, label: "Day 20", completion: 18, floorsBuilt: [1, 2] },
  { day: 45, label: "Day 45", completion: 35, floorsBuilt: [1, 2, 3] },
  { day: 60, label: "Day 60", completion: 48, floorsBuilt: [1, 2, 3, 4] },
  { day: 90, label: "Day 90", completion: 58, floorsBuilt: [1, 2, 3, 4, 5] },
  { day: 120, label: "Current", completion: 67, floorsBuilt: [1, 2, 3, 4, 5, 6] },
];

export const cameras: CameraFeed[] = [
  {
    id: "cam-1",
    name: "Camera 1 - North Gate",
    location: "Main Entrance",
    isLive: true,
    isRecording: true,
    motionDetected: true,
    aiDetection: ["Worker", "Helmet ✓", "Crane"],
    thumbnail: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=225&fit=crop",
    videoUrl: "",
  },
  {
    id: "cam-2",
    name: "Camera 2 - East Wing",
    location: "Floor 2 East",
    isLive: true,
    isRecording: true,
    motionDetected: false,
    aiDetection: ["Worker", "Helmet ✓", "Safety Jacket ✓"],
    thumbnail: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=225&fit=crop",
    videoUrl: "",
  },
  {
    id: "cam-3",
    name: "Camera 3 - Crane Zone",
    location: "Tower Crane Base",
    isLive: true,
    isRecording: true,
    motionDetected: true,
    aiDetection: ["Crane", "Worker", "Helmet ✓"],
    thumbnail: "https://images.unsplash.com/photo-1590496793907-2a838b934d0a?w=400&h=225&fit=crop",
    videoUrl: "",
  },
  {
    id: "cam-4",
    name: "Camera 4 - Material Yard",
    location: "Storage Area",
    isLive: true,
    isRecording: false,
    motionDetected: false,
    aiDetection: ["Vehicle", "Materials"],
    thumbnail: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=225&fit=crop",
    videoUrl: "",
  },
  {
    id: "cam-5",
    name: "Camera 5 - South Facade",
    location: "Floor 3 South",
    isLive: true,
    isRecording: true,
    motionDetected: true,
    aiDetection: ["Worker", "No Helmet ✗", "Scaffolding"],
    thumbnail: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=225&fit=crop",
    videoUrl: "",
  },
];

export const workers: Worker[] = [
  { id: "w1", name: "James Rodriguez", role: "Foreman", helmet: true, safetyJacket: true, gloves: true, boots: true, zone: "Floor 3", status: "active" },
  { id: "w2", name: "Maria Chen", role: "Electrician", helmet: true, safetyJacket: true, gloves: true, boots: true, zone: "Floor 2", status: "active" },
  { id: "w3", name: "Ahmed Hassan", role: "Steel Worker", helmet: true, safetyJacket: true, gloves: false, boots: true, zone: "Floor 4", status: "active" },
  { id: "w4", name: "Unknown Person", role: "Unknown", helmet: false, safetyJacket: false, gloves: false, boots: false, zone: "Restricted", status: "active" },
  { id: "w5", name: "Sarah Johnson", role: "Engineer", helmet: true, safetyJacket: true, gloves: true, boots: true, zone: "Ground Floor", status: "active" },
  { id: "w6", name: "Carlos Mendez", role: "Crane Operator", helmet: true, safetyJacket: true, gloves: true, boots: true, zone: "Crane Zone", status: "active" },
  { id: "w7", name: "Priya Sharma", role: "Plumber", helmet: true, safetyJacket: true, gloves: true, boots: true, zone: "Floor 1", status: "break" },
  { id: "w8", name: "David Kim", role: "Concrete Worker", helmet: true, safetyJacket: false, gloves: true, boots: true, zone: "Floor 3", status: "active" },
];

export const equipment: Equipment[] = [
  { id: "e1", name: "Tower Crane TC-01", type: "Tower Crane", status: "running", fuelLevel: 72, workingHours: 6.5, location: "North Zone", gps: { lat: 40.7128, lng: -74.006 } },
  { id: "e2", name: "JCB 3DX Super", type: "JCB", status: "idle", fuelLevel: 45, workingHours: 3.2, location: "Material Yard", gps: { lat: 40.713, lng: -74.0058 } },
  { id: "e3", name: "CAT 320 Excavator", type: "Excavator", status: "maintenance", fuelLevel: 88, workingHours: 0, location: "Service Bay", gps: { lat: 40.7125, lng: -74.0062 } },
  { id: "e4", name: "Tata Prima Dumper", type: "Dumper", status: "running", fuelLevel: 60, workingHours: 5.1, location: "East Access", gps: { lat: 40.7132, lng: -74.0055 } },
  { id: "e5", name: "Schwing S36X", type: "Concrete Pump", status: "running", fuelLevel: 55, workingHours: 4.8, location: "Floor 3", gps: { lat: 40.7129, lng: -74.0059 } },
  { id: "e6", name: "Ajax Fiori Mixer", type: "Mixer", status: "idle", fuelLevel: 90, workingHours: 2.0, location: "Batch Plant", gps: { lat: 40.7126, lng: -74.0065 } },
  { id: "e7", name: "CAT D6 Bulldozer", type: "Bulldozer", status: "idle", fuelLevel: 78, workingHours: 1.5, location: "South Perimeter", gps: { lat: 40.7124, lng: -74.0068 } },
];

export const materials: Material[] = [
  { id: "m1", name: "Steel", dailyUsage: 12.5, remaining: 245, todayDelivery: 20, cost: 125000, supplier: "ArcelorMittal", unit: "tons" },
  { id: "m2", name: "Cement", dailyUsage: 45, remaining: 890, todayDelivery: 100, cost: 18500, supplier: "LafargeHolcim", unit: "bags" },
  { id: "m3", name: "Sand", dailyUsage: 28, remaining: 520, todayDelivery: 50, cost: 8400, supplier: "Local Quarry Co.", unit: "m³" },
  { id: "m4", name: "Bricks", dailyUsage: 5000, remaining: 85000, todayDelivery: 10000, cost: 4200, supplier: "BrickWorks Inc.", unit: "units" },
  { id: "m5", name: "Concrete", dailyUsage: 85, remaining: 340, todayDelivery: 120, cost: 45000, supplier: "ReadyMix Pro", unit: "m³" },
  { id: "m6", name: "Tiles", dailyUsage: 200, remaining: 4500, todayDelivery: 0, cost: 12000, supplier: "TileMaster", unit: "m²" },
  { id: "m7", name: "Pipes", dailyUsage: 45, remaining: 890, todayDelivery: 200, cost: 6800, supplier: "PipeTech", unit: "m" },
  { id: "m8", name: "Electrical", dailyUsage: 15, remaining: 320, todayDelivery: 50, cost: 9200, supplier: "ElectroSupply", unit: "units" },
];

export const alerts: Alert[] = [
  { id: "a1", type: "helmet", severity: "warning", title: "Helmet Violation Detected", message: "Worker without helmet detected at Camera 5 - South Facade", timestamp: new Date(Date.now() - 120000), read: false },
  { id: "a2", type: "unauthorized", severity: "critical", title: "Unauthorized Entry", message: "Unknown person detected in restricted zone near crane base", timestamp: new Date(Date.now() - 300000), read: false },
  { id: "a3", type: "concrete", severity: "warning", title: "Concrete Delivery Delay", message: "ReadyMix Pro delivery delayed by 2 hours for Floor 3 pour", timestamp: new Date(Date.now() - 900000), read: true },
  { id: "a4", type: "machine", severity: "info", title: "Maintenance Scheduled", message: "CAT 320 Excavator scheduled for routine maintenance today", timestamp: new Date(Date.now() - 1800000), read: true },
  { id: "a5", type: "rain", severity: "warning", title: "Rain Alert", message: "Heavy rain predicted in 4 hours. Consider pausing concrete work.", timestamp: new Date(Date.now() - 3600000), read: false },
];

export const aiProgress = {
  yesterday: 52,
  today: 58,
  delta: 6,
  breakdown: {
    walls: { yesterday: 48, today: 55 },
    columns: { yesterday: 60, today: 65 },
    slabs: { yesterday: 50, today: 58 },
    beams: { yesterday: 55, today: 62 },
  },
};

export const weatherData = {
  temperature: 28,
  humidity: 65,
  windSpeed: 12,
  heatIndex: 31,
  rainPrediction: 75,
  condition: "Partly Cloudy",
  constructionSuitability: "Moderate",
  forecast: [
    { day: "Mon", temp: 28, rain: 75, suitable: false },
    { day: "Tue", temp: 26, rain: 30, suitable: true },
    { day: "Wed", temp: 29, rain: 10, suitable: true },
    { day: "Thu", temp: 31, rain: 5, suitable: true },
    { day: "Fri", temp: 27, rain: 45, suitable: false },
  ],
};

export const safetyStats = {
  score: 91,
  helmetViolations: 3,
  workerFalls: 0,
  smokeDetection: false,
  fireDetection: false,
  gasLeak: false,
};

export const dashboardStats = {
  totalWorkers: 47,
  activeWorkers: 42,
  equipmentRunning: 3,
  safetyScore: 91,
  completion: 67,
  budgetUsed: 67,
  daysRemaining: 245,
  alertsActive: 3,
};

export const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: "LayoutDashboard" },
  { href: "/dashboard/digital-twin", label: "3D Digital Twin", icon: "Box" },
  { href: "/dashboard/cameras", label: "Live Cameras", icon: "Video" },
  { href: "/dashboard/drone", label: "Drone View", icon: "Plane" },
  { href: "/dashboard/workers", label: "Workers", icon: "HardHat" },
  { href: "/dashboard/materials", label: "Materials", icon: "Package" },
  { href: "/dashboard/equipment", label: "Equipment", icon: "Truck" },
  { href: "/dashboard/analytics", label: "AI Analytics", icon: "Brain" },
  { href: "/dashboard/reports", label: "Reports", icon: "FileText" },
  { href: "/dashboard/timeline", label: "Timeline", icon: "Clock" },
  { href: "/dashboard/weather", label: "Weather", icon: "Cloud" },
  { href: "/dashboard/documents", label: "Documents", icon: "FolderOpen" },
  { href: "/dashboard/alerts", label: "Alerts", icon: "Bell" },
  { href: "/dashboard/settings", label: "Settings", icon: "Settings" },
];

export const landingFeatures = [
  { title: "Live Monitoring", description: "Real-time CCTV feeds with AI-powered object detection across your entire construction site.", icon: "Video" },
  { title: "3D Digital Twin", description: "Interactive BIM-style building model with floor-by-floor progress visualization and timeline animation.", icon: "Box" },
  { title: "AI Analytics", description: "YOLOv11-powered progress detection from drone photos with automatic completion calculations.", icon: "Brain" },
  { title: "Worker Safety", description: "Helmet, jacket, and PPE detection with restricted zone alerts and attendance tracking.", icon: "Shield" },
  { title: "Equipment Tracking", description: "GPS-enabled fleet monitoring with fuel levels, working hours, and maintenance scheduling.", icon: "Truck" },
  { title: "Material Management", description: "Track steel, cement, concrete, and all materials with supplier integration and cost analysis.", icon: "Package" },
];

export const pricingPlans = [
  { name: "Starter", price: 499, features: ["Up to 2 projects", "5 camera feeds", "Basic AI analytics", "Email alerts", "Standard reports"], popular: false },
  { name: "Professional", price: 1299, features: ["Up to 10 projects", "25 camera feeds", "Advanced AI + Drone", "All alert channels", "Custom reports", "3D Digital Twin"], popular: true },
  { name: "Enterprise", price: 2999, features: ["Unlimited projects", "Unlimited cameras", "Full AI suite", "Priority support", "API access", "Custom integrations", "Dedicated account manager"], popular: false },
];

export const testimonials = [
  { name: "Robert Mitchell", role: "Project Director, Turner Construction", quote: "BuildWatch AI transformed how we monitor our 40-story project. The 3D digital twin alone saved us weeks of coordination meetings.", avatar: "RM" },
  { name: "Elena Vasquez", role: "Safety Manager, Bechtel", quote: "The AI safety detection caught 3 helmet violations in the first week. Our incident rate dropped 40% since deployment.", avatar: "EV" },
  { name: "James Park", role: "CEO, Metro Developers", quote: "Investors love the real-time dashboard. We closed funding 2 months early thanks to transparent progress tracking.", avatar: "JP" },
];

export const faqs = [
  { q: "How does AI progress detection work?", a: "Our system uses YOLOv11 and OpenCV to compare daily drone photos, automatically detecting walls, columns, slabs, and beams to calculate completion percentages." },
  { q: "Can I integrate with existing BIM software?", a: "Yes, BuildWatch AI supports IFC, Revit, and Bentley file formats for seamless 3D model integration." },
  { q: "What cameras are supported?", a: "We support IP cameras, RTSP streams, and major brands including Hikvision, Dahua, and Axis Communications." },
  { q: "Is my data secure?", a: "All data is encrypted at rest and in transit. We are SOC 2 Type II certified with AWS cloud infrastructure." },
  { q: "How many users can access the platform?", a: "Starter supports 5 users, Professional supports 25, and Enterprise offers unlimited user seats with role-based access control." },
];

export const documents = [
  { id: "d1", name: "Structural Blueprint v3.2", type: "Blueprint", size: "24.5 MB", date: "2025-06-15", category: "blueprints" },
  { id: "d2", name: "MEP CAD Drawings", type: "CAD", size: "18.2 MB", date: "2025-06-10", category: "cad" },
  { id: "d3", name: "BIM Model - Phase II", type: "BIM", size: "156 MB", date: "2025-05-28", category: "bim" },
  { id: "d4", name: "Steel Supplier Invoice #4521", type: "Invoice", size: "1.2 MB", date: "2025-07-18", category: "invoices" },
  { id: "d5", name: "Safety Certificate 2025", type: "Certificate", size: "0.8 MB", date: "2025-01-15", category: "safety" },
  { id: "d6", name: "Floor 3 Inspection Report", type: "Report", size: "3.4 MB", date: "2025-07-19", category: "inspections" },
  { id: "d7", name: "Main Contract Agreement", type: "Contract", size: "5.6 MB", date: "2024-03-01", category: "contracts" },
];

export const progressChartData = [
  { month: "Jan", progress: 12, cost: 2.1, labor: 45 },
  { month: "Feb", progress: 22, cost: 4.5, labor: 52 },
  { month: "Mar", progress: 35, cost: 7.2, labor: 58 },
  { month: "Apr", progress: 42, cost: 9.8, labor: 62 },
  { month: "May", progress: 52, cost: 12.5, labor: 65 },
  { month: "Jun", progress: 58, cost: 15.2, labor: 68 },
  { month: "Jul", progress: 67, cost: 18.5, labor: 72 },
];

export const chatResponses: Record<string, string> = {
  "how much construction is completed": "The project is currently 67% complete. Floor 3 is at 78% and Floor 4 is at 45%.",
  "show camera 3": "Opening Camera 3 - Crane Zone. Live feed is now displayed.",
  "safety score": "Current safety score is 91/100. There are 3 active helmet violations and 1 unauthorized entry alert.",
  "weather": "Current conditions: 28°C, partly cloudy. Rain predicted at 75% in 4 hours. Construction suitability: Moderate.",
  "workers": "47 total workers on site. 42 active, 3 on break, 2 offline. 1 unknown person detected in restricted zone.",
  "materials": "Steel: 245 tons remaining. Cement: 890 bags. Concrete: 340 m³. Today's delivery: 120 m³ concrete incoming.",
  "generate report": "Generating daily progress report... Report ready for download in PDF, Excel, and CSV formats.",
  default: "I can help you with project progress, safety status, camera feeds, weather, materials, and reports. What would you like to know?",
};

export function getFloorColor(status: string): string {
  switch (status) {
    case "completed": return "#22c55e";
    case "in-progress": return "#eab308";
    case "delayed": return "#ef4444";
    default: return "#6b7280";
  }
}
