import { useState } from "react";
import { Search, Filter, Plus, Truck, MapPin, User, AlertTriangle, MoreVertical, Eye, Edit, Navigation } from "lucide-react";
import truckImg from "@/assets/truck.png";
import VehicleDetailPage from "./VehicleDetailPage";
import AddVehiclePage from "./AddVehiclePage";

const vehicles = [
  { id: "T-101", name: "Truck T-101", type: "truck", driver: "John Doe", status: "active", utilization: 78, location: "Highway 101, Mile 23", plate: "MH 12 AD 1234", speed: "65 mph", fuel: 72, alerts: 1 },
  { id: "V-204", name: "Van V-204", type: "van", driver: "Sarah Lee", status: "active", utilization: 55, location: "LA Downtown, Exit 5", plate: "DL 04 XY 7788", speed: "40 mph", fuel: 48, alerts: 1 },
  { id: "T-108", name: "Truck T-108", type: "truck", driver: "Mike Chen", status: "maintenance", utilization: 0, location: "Chicago Depot", plate: "KA 05 QW 8899", speed: "0 mph", fuel: 85, alerts: 0 },
  { id: "T-115", name: "Truck T-115", type: "truck", driver: "Carlos Rivera", status: "active", utilization: 90, location: "I-10 West, Mile 342", plate: "QL 12 AB 1234", speed: "72 mph", fuel: 35, alerts: 0 },
  { id: "V-301", name: "Van V-301", type: "van", driver: "Priya Patel", status: "idle", utilization: 30, location: "Houston Hub Parking", plate: "TX 99 ZZ 5544", speed: "0 mph", fuel: 91, alerts: 0 },
  { id: "T-220", name: "Truck T-220", type: "truck", driver: "Emma Johnson", status: "active", utilization: 65, location: "US-75, Dallas", plate: "GA 07 BC 3311", speed: "58 mph", fuel: 62, alerts: 0 },
  { id: "V-112", name: "Van V-112", type: "van", driver: "Raj Sharma", status: "offline", utilization: 0, location: "Last: Miami Port", plate: "FL 23 MN 8800", speed: "N/A", fuel: 0, alerts: 1 },
  { id: "T-330", name: "Truck T-330", type: "truck", driver: "David Kim", status: "active", utilization: 82, location: "I-95 North, Philadelphia", plate: "PA 66 TK 4422", speed: "70 mph", fuel: 55, alerts: 0 },
  { id: "V-419", name: "Van V-419", type: "van", driver: "Ana Torres", status: "idle", utilization: 20, location: "Phoenix Central Hub", plate: "AZ 44 XP 9901", speed: "0 mph", fuel: 78, alerts: 0 },
];

const statusConfig: Record<string, { label: string; dot: string; pill: string }> = {
  active: { label: "Active", dot: "status-dot-active", pill: "pill-success" },
  idle: { label: "Idle", dot: "status-dot-idle", pill: "pill-warning" },
  maintenance: { label: "Maintenance", dot: "status-dot-idle", pill: "pill-primary" },
  offline: { label: "Offline", dot: "status-dot-offline", pill: "pill-danger" },
};

export default function FleetPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);
  const [showAddVehicle, setShowAddVehicle] = useState(false);

  if (showAddVehicle) {
    return <AddVehiclePage onBack={() => setShowAddVehicle(false)} />;
  }

  if (selectedVehicleId) {
    return <VehicleDetailPage vehicleId={selectedVehicleId} onBack={() => setSelectedVehicleId(null)} />;
  }

  const filtered = vehicles.filter(v => {
    const matchSearch = v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.driver.toLowerCase().includes(search.toLowerCase()) ||
      v.plate.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || v.status === filter;
    return matchSearch && matchFilter;
  });

  const counts = {
    all: vehicles.length,
    active: vehicles.filter(v => v.status === "active").length,
    idle: vehicles.filter(v => v.status === "idle").length,
    maintenance: vehicles.filter(v => v.status === "maintenance").length,
    offline: vehicles.filter(v => v.status === "offline").length,
  };

  return (
    <div className="space-y-6 animate-slide-in">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Fleet Management</h1>
          <p className="text-muted-foreground text-sm mt-1">{vehicles.length} vehicles in your fleet</p>
        </div>
        <button
          onClick={() => setShowAddVehicle(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" />Add Vehicle
        </button>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Active", count: counts.active, color: "text-success", bg: "hsl(160 84% 39% / 0.08)" },
          { label: "Idle", count: counts.idle, color: "text-warning", bg: "hsl(38 92% 50% / 0.08)" },
          { label: "Maintenance", count: counts.maintenance, color: "text-primary", bg: "hsl(217 91% 60% / 0.08)" },
          { label: "Offline", count: counts.offline, color: "text-destructive", bg: "hsl(0 84% 60% / 0.08)" },
        ].map(s => (
          <div key={s.label} className="card-fleet p-4 text-center cursor-pointer" style={{ backgroundColor: s.bg }} onClick={() => setFilter(filter === s.label.toLowerCase() ? "all" : s.label.toLowerCase())}>
            <p className={`text-2xl font-bold ${s.color}`}>{s.count}</p>
            <p className="text-xs text-muted-foreground font-medium">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Search & filter */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by vehicle, driver, plate..."
            className="w-full pl-9 pr-4 py-2.5 text-sm bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground"
          />
        </div>
        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="px-3 py-2.5 text-sm bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 text-foreground"
        >
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="idle">Idle</option>
          <option value="maintenance">Maintenance</option>
          <option value="offline">Offline</option>
        </select>
        <button className="flex items-center gap-2 px-3 py-2.5 text-sm bg-card border border-border rounded-lg hover:bg-muted transition-colors text-foreground">
          <Filter className="w-4 h-4" />Filters
        </button>
      </div>

      {/* Vehicle grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(vehicle => {
          const cfg = statusConfig[vehicle.status];
          return (
            <div key={vehicle.id} className="card-fleet overflow-hidden hover:shadow-md transition-shadow">
              {/* Truck image banner */}
              <div className="relative h-32 bg-gradient-to-br from-muted/60 to-muted/20 flex items-center justify-center overflow-hidden border-b border-border">
                <img
                  src={truckImg}
                  alt={vehicle.name}
                  className="h-24 object-contain drop-shadow-md"
                  style={{ filter: vehicle.status === "offline" ? "grayscale(100%) opacity(0.5)" : vehicle.status === "maintenance" ? "sepia(60%) opacity(0.8)" : "none" }}
                />
                {/* Status pill overlaid */}
                <div className="absolute top-2 right-2">
                  <span className={cfg.pill}><span className={`${cfg.dot} mr-1`} />{cfg.label}</span>
                </div>
                {vehicle.alerts > 0 && (
                  <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-destructive/10 border border-destructive/30 flex items-center justify-center">
                    <AlertTriangle className="w-3 h-3 text-destructive" />
                  </div>
                )}
                {/* Vehicle ID badge */}
                <div className="absolute bottom-2 left-2 bg-black/30 backdrop-blur-sm text-white text-xs font-bold px-2 py-0.5 rounded">
                  {vehicle.id}
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-foreground">{vehicle.name}</h3>
                    <p className="text-xs text-muted-foreground">{vehicle.plate}</p>
                  </div>
                  <button className="p-1 rounded hover:bg-muted transition-colors">
                    <MoreVertical className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className="text-sm text-foreground">{vehicle.driver}</span>
                  </div>

                  <div className="flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-muted-foreground line-clamp-1">{vehicle.location}</span>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">Today's Utilization</span>
                      <span className="font-semibold text-foreground">{vehicle.utilization}%</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${vehicle.utilization}%` }} />
                    </div>
                  </div>

                  <div className="flex justify-between text-xs pt-1 border-t border-border">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Navigation className="w-3 h-3" />
                      <span>{vehicle.speed}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full" style={{ background: `hsl(${vehicle.fuel > 50 ? "160 84% 39%" : vehicle.fuel > 25 ? "38 92% 50%" : "0 84% 60%"})` }} />
                      <span className="text-muted-foreground">Fuel: {vehicle.fuel}%</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => setSelectedVehicleId(vehicle.id)}
                    className="flex-1 flex items-center justify-center gap-1 py-1.5 text-xs font-medium rounded-lg border border-border hover:bg-muted transition-colors text-foreground"
                  >
                    <Eye className="w-3.5 h-3.5" />View
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-1 py-1.5 text-xs font-medium rounded-lg border border-border hover:bg-muted transition-colors text-foreground">
                    <Edit className="w-3.5 h-3.5" />Edit
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-1 py-1.5 text-xs font-medium rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
                    <MapPin className="w-3.5 h-3.5" />Track
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Truck className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="font-medium">No vehicles found</p>
          <p className="text-sm mt-1">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}
