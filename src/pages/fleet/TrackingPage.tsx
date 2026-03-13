import { useState } from "react";
import { Crosshair, Navigation, MapPin, Clock, Zap, Search, X } from "lucide-react";

const trackingVehicles = [
  { id: "T-101", name: "Truck T-101", plate: "MH 12 AD 1234", driver: "John Doe", status: "active", speed: 65, heading: "North", eta: "2h 15m", destination: "Boston Hub", progress: 68, lat: "55%", top: "45%" },
  { id: "V-204", name: "Van V-204", plate: "DL 04 XY 7788", driver: "Sarah Lee", status: "active", speed: 40, heading: "West", eta: "45m", destination: "San Diego DC", progress: 85, lat: "20%", top: "62%" },
  { id: "T-115", name: "Truck T-115", plate: "QL 12 AB 1234", driver: "Carlos Rivera", status: "active", speed: 72, heading: "East", eta: "3h 50m", destination: "Las Vegas DC", progress: 35, lat: "18%", top: "38%" },
  { id: "T-330", name: "Truck T-330", plate: "PA 66 TK 4422", driver: "David Kim", status: "active", speed: 70, heading: "North", eta: "1h 20m", destination: "New York Hub", progress: 72, lat: "72%", top: "30%" },
  { id: "V-301", name: "Van V-301", plate: "TX 99 ZZ 5544", driver: "Priya Patel", status: "idle", speed: 0, heading: "—", eta: "—", destination: "Houston Hub", progress: 0, lat: "44%", top: "70%" },
];

export default function TrackingPage() {
  const [selected, setSelected] = useState(trackingVehicles[0]);
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = trackingVehicles.filter(v =>
    v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.driver.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4 animate-slide-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Live Tracking</h1>
        <p className="text-muted-foreground text-sm mt-1">Real-time vehicle tracking and route monitoring</p>
      </div>

      <div className="card-fleet overflow-hidden" style={{ height: "calc(100vh - 220px)", minHeight: 500 }}>
        <div className="flex h-full">
          {/* Map */}
          <div className="flex-1 relative map-grid bg-slate-50">
            {/* SVG routes */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M55,45 Q65,35 72,30" stroke="hsl(217 91% 60% / 0.4)" strokeWidth="0.6" fill="none" />
              <path d="M20,62 Q38,55 55,45" stroke="hsl(160 84% 39% / 0.4)" strokeWidth="0.6" fill="none" strokeDasharray="1.5,0.8" />
              <path d="M18,38 Q36,42 55,45" stroke="hsl(38 92% 50% / 0.4)" strokeWidth="0.6" fill="none" />
              <path d="M72,30 Q75,40 73,55 Q71,65 44,70" stroke="hsl(280 65% 60% / 0.3)" strokeWidth="0.5" fill="none" strokeDasharray="2,1" />
            </svg>

            {/* Vehicle markers */}
            {trackingVehicles.map(v => (
              <button
                key={v.id}
                onClick={() => setSelected(v)}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                style={{ left: v.lat, top: v.top }}
              >
              <div className={`relative flex items-center justify-center rounded-full border-2 shadow-lg transition-all ${selected.id === v.id ? "w-11 h-11 border-primary bg-primary" : v.status === "active" ? "w-9 h-9 border-success bg-success" : "w-9 h-9 border-warning bg-warning"}`}>
                  <Navigation className="w-4 h-4 text-primary-foreground" />
                  {selected.id === v.id && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-primary animate-pulse-dot border border-white" />
                  )}
                </div>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-foreground text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
                  {v.name} · {v.speed > 0 ? `${v.speed} mph` : "Stopped"}
                </div>
              </button>
            ))}

            {/* Map controls */}
            <div className="absolute top-3 left-3 flex flex-col gap-1">
              <button className="w-8 h-8 bg-white rounded-lg shadow border border-border text-foreground text-sm font-bold hover:bg-muted transition-colors">+</button>
              <button className="w-8 h-8 bg-white rounded-lg shadow border border-border text-foreground text-sm font-bold hover:bg-muted transition-colors">−</button>
            </div>

            {/* Active count */}
            <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm border border-border rounded-lg px-3 py-2 shadow">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse-dot" />
                <span className="text-xs font-semibold text-foreground">4 Vehicles Active</span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">1 Idle · 0 Offline</p>
            </div>

            {/* Speed legend */}
            <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm border border-border rounded-lg px-3 py-2 shadow">
              <p className="text-xs font-semibold text-foreground mb-1">Map Legend</p>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground"><div className="w-3 h-3 rounded-full bg-success" />Active</div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5"><div className="w-3 h-3 rounded-full bg-warning" />Idle</div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5"><div className="w-3 h-3 rounded-full bg-primary" />Selected</div>
            </div>
          </div>

          {/* Side panel */}
          <div className="w-72 flex flex-col border-l border-border bg-card">
            {/* Search */}
            <div className="p-4 border-b border-border">
              <h3 className="font-semibold text-foreground mb-3">Active Vehicles</h3>
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search vehicles..."
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-muted rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="absolute right-2 top-1/2 -translate-y-1/2">
                    <X className="w-3.5 h-3.5 text-muted-foreground" />
                  </button>
                )}
              </div>
            </div>

            {/* Vehicle list */}
            <div className="flex-1 overflow-y-auto divide-y divide-border">
              {filtered.map(v => (
                <button
                  key={v.id}
                  onClick={() => setSelected(v)}
                  className={`w-full p-4 text-left hover:bg-muted/40 transition-colors ${selected.id === v.id ? "bg-primary/5 border-l-2 border-l-primary" : ""}`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-foreground">{v.name}</span>
                    <div className={`w-2 h-2 rounded-full ${v.status === "active" ? "bg-success" : "bg-warning"}`} />
                  </div>
                  <p className="text-xs text-muted-foreground">{v.driver}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-muted-foreground">{v.speed > 0 ? `${v.speed} mph · ${v.heading}` : "Stopped"}</span>
                    <button
                      onClick={e => { e.stopPropagation(); setSelected(v); }}
                      className="flex items-center gap-1 text-xs text-primary hover:underline"
                    >
                      <Crosshair className="w-3 h-3" />Track
                    </button>
                  </div>
                  {v.status === "active" && (
                    <div className="mt-2">
                      <div className="flex justify-between text-xs mb-0.5">
                        <span className="text-muted-foreground">To {v.destination}</span>
                        <span className="text-foreground font-medium">{v.progress}%</span>
                      </div>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${v.progress}%` }} />
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Selected vehicle details */}
            <div className="border-t border-border p-4 bg-muted/30">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse-dot" />
                <p className="text-xs font-semibold text-foreground uppercase tracking-wider">Selected Vehicle</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs text-muted-foreground">Vehicle</span>
                  <span className="text-xs font-semibold text-foreground">{selected.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-muted-foreground">Driver</span>
                  <span className="text-xs font-semibold text-foreground">{selected.driver}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-muted-foreground">Speed</span>
                  <span className="text-xs font-semibold text-foreground flex items-center gap-1">
                    <Zap className="w-3 h-3 text-warning" />{selected.speed} mph
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-muted-foreground">Heading</span>
                  <span className="text-xs font-semibold text-foreground">{selected.heading}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-muted-foreground">ETA</span>
                  <span className="text-xs font-semibold text-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3 text-primary" />{selected.eta}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-muted-foreground">Destination</span>
                  <span className="text-xs font-semibold text-foreground flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-destructive" />{selected.destination}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
