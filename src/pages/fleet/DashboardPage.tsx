import { TrendingUp, TrendingDown, Truck, CheckCircle2, Fuel, Activity, AlertTriangle, Clock, MapPin, MoreHorizontal } from "lucide-react";

const kpis = [
  {
    label: "Total Fleet",
    value: "24",
    unit: "Vehicles",
    trend: "+2 this week",
    trendUp: true,
    icon: Truck,
    color: "bg-blue-50 text-primary",
    iconBg: "hsl(217 91% 60% / 0.12)",
  },
  {
    label: "Active Now",
    value: "18",
    unit: "On-road",
    trend: "75% utilization",
    trendUp: true,
    icon: Activity,
    color: "bg-green-50 text-success",
    iconBg: "hsl(160 84% 39% / 0.12)",
  },
  {
    label: "Trips Today",
    value: "42",
    unit: "Completed",
    trend: "+8% vs yesterday",
    trendUp: true,
    icon: CheckCircle2,
    color: "text-success",
    iconBg: "hsl(160 84% 39% / 0.12)",
  },
  {
    label: "Fuel Efficiency",
    value: "8.2",
    unit: "L/100km",
    trend: "-0.3 vs last week",
    trendUp: false,
    icon: Fuel,
    color: "text-warning",
    iconBg: "hsl(38 92% 50% / 0.12)",
  },
];

const alerts = [
  { id: 1, message: "Engine fault detected", vehicle: "Truck T-101", type: "danger", time: "10 min ago", icon: AlertTriangle },
  { id: 2, message: "Route deviation", vehicle: "Van V-204", type: "warning", time: "25 min ago", icon: MapPin },
  { id: 3, message: "Maintenance due soon", vehicle: "Truck T-108", type: "primary", time: "1 hr ago", icon: Clock },
  { id: 4, message: "Low fuel warning", vehicle: "Van V-301", type: "warning", time: "2 hrs ago", icon: Fuel },
];

const recentTrips = [
  { vehicle: "Truck T-101", driver: "John Doe", route: "NYC → Boston", start: "06:00 AM", status: "Completed" },
  { vehicle: "Van V-204", driver: "Sarah Lee", route: "LA → San Diego", start: "08:30 AM", status: "In Progress" },
  { vehicle: "Truck T-108", driver: "Mike Chen", route: "Chicago → Detroit", start: "09:15 AM", status: "Delayed" },
  { vehicle: "Van V-301", driver: "Priya Patel", route: "Houston → Dallas", start: "10:00 AM", status: "Completed" },
  { vehicle: "Truck T-115", driver: "Carlos Rivera", route: "Phoenix → Vegas", start: "11:45 AM", status: "In Progress" },
];

const vehicles = [
  { id: "T-101", name: "Truck T-101", lat: 38, lng: -97 },
  { id: "V-204", name: "Van V-204", lat: 36, lng: -118 },
  { id: "T-108", name: "Truck T-108", lat: 42, lng: -88 },
  { id: "V-301", name: "Van V-301", lat: 30, lng: -95 },
];

const statusPill = (status: string) => {
  const map: Record<string, string> = {
    Completed: "pill-success",
    "In Progress": "pill-primary",
    Delayed: "pill-danger",
  };
  return <span className={map[status] ?? "pill-primary"}>{status}</span>;
};

const alertPill = (type: string) => {
  const map: Record<string, string> = {
    danger: "pill-danger",
    warning: "pill-warning",
    primary: "pill-primary",
  };
  return map[type] ?? "pill-primary";
};

export default function DashboardPage() {
  return (
    <div className="space-y-6 animate-slide-in">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Logistic Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">Monitor your fleet performance in real-time</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div key={kpi.label} className="card-fleet p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{kpi.label}</p>
                  <div className="flex items-baseline gap-1.5 mt-2">
                    <span className="text-3xl font-bold text-foreground">{kpi.value}</span>
                    <span className="text-sm text-muted-foreground">{kpi.unit}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    {kpi.trendUp
                      ? <TrendingUp className="w-3.5 h-3.5 text-success" />
                      : <TrendingDown className="w-3.5 h-3.5 text-destructive" />}
                    <span className={kpi.trendUp ? "trend-up" : "trend-down"}>{kpi.trend}</span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: kpi.iconBg }}>
                  <Icon className="w-5 h-5" style={{ color: `hsl(var(--${kpi.trendUp ? "primary" : "warning"}))` }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Map + Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Map */}
        <div className="lg:col-span-2 card-fleet p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-semibold text-foreground">Live Map View</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Real-time vehicle locations</p>
            </div>
            <span className="pill-success">● Live</span>
          </div>
          <div className="relative rounded-xl overflow-hidden map-grid bg-slate-50" style={{ height: 280 }}>
            {/* Route lines simulation */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M15,70 Q35,40 55,55 Q75,70 85,30" stroke="hsl(217 91% 60% / 0.3)" strokeWidth="0.5" fill="none" strokeDasharray="2,1" />
              <path d="M10,30 Q30,50 60,35 Q80,20 90,45" stroke="hsl(160 84% 39% / 0.3)" strokeWidth="0.5" fill="none" strokeDasharray="2,1" />
            </svg>
            {/* Vehicle dots */}
            {vehicles.map((v, i) => {
              const positions = [
                { left: "55%", top: "52%" },
                { left: "22%", top: "38%" },
                { left: "70%", top: "28%" },
                { left: "38%", top: "68%" },
              ];
              const pos = positions[i];
              return (
                <div key={v.id} className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer" style={pos}>
                  <div className="relative">
                    <div className="w-4 h-4 rounded-full bg-primary border-2 border-white shadow-lg animate-pulse-dot" />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 bg-foreground text-white text-xs px-1.5 py-0.5 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                      {v.name}
                    </div>
                  </div>
                </div>
              );
            })}
            {/* Area badge */}
            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm border border-border rounded-lg px-3 py-2 shadow-sm">
              <p className="text-xs font-semibold text-foreground">📍 5 Vehicles in this area</p>
              <p className="text-xs text-muted-foreground">Northeast Corridor</p>
            </div>
            {/* Map controls */}
            <div className="absolute top-3 right-3 flex flex-col gap-1">
              <button className="w-7 h-7 bg-white rounded-lg shadow-sm border border-border text-foreground text-sm font-bold hover:bg-muted transition-colors">+</button>
              <button className="w-7 h-7 bg-white rounded-lg shadow-sm border border-border text-foreground text-sm font-bold hover:bg-muted transition-colors">−</button>
            </div>
          </div>
          {/* Legend */}
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-success" /><span className="text-xs text-muted-foreground">Active (18)</span></div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-warning" /><span className="text-xs text-muted-foreground">Idle (4)</span></div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-muted-foreground" /><span className="text-xs text-muted-foreground">Offline (2)</span></div>
          </div>
        </div>

        {/* Alerts */}
        <div className="card-fleet p-5 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground">Active Alerts</h2>
            <span className="pill-danger">{alerts.length} Active</span>
          </div>
          <div className="space-y-3 flex-1">
            {alerts.map((alert) => {
              const Icon = alert.icon;
              return (
                <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/40 hover:bg-muted/70 transition-colors cursor-pointer">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${alertPill(alert.type)}`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{alert.message}</p>
                    <p className="text-xs text-muted-foreground">{alert.vehicle}</p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{alert.time}</span>
                </div>
              );
            })}
          </div>
          <button className="mt-4 w-full py-2 text-sm font-medium text-primary border border-primary/20 rounded-lg hover:bg-primary/5 transition-colors">
            View All Alerts
          </button>
        </div>
      </div>

      {/* Vehicle delivery status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Delivery vehicles */}
        <div className="card-fleet p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-semibold text-foreground">Delivery Vehicles</h2>
              <p className="text-xs text-muted-foreground">Vehicles on the road</p>
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-4xl font-bold text-foreground">12</span>
            <span className="trend-up flex items-center gap-1"><TrendingUp className="w-3 h-3" />7.89% vs last week</span>
          </div>
          <div className="grid grid-cols-3 gap-2 my-4">
            {[{ label: "On-road", value: 9, color: "bg-success" }, { label: "Parked", value: 2, color: "bg-warning" }, { label: "Maintenance", value: 1, color: "bg-destructive" }].map(s => (
              <div key={s.label} className="text-center p-2 rounded-lg bg-muted/40">
                <div className={`w-2 h-2 rounded-full ${s.color} mx-auto mb-1`} />
                <p className="text-lg font-bold text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            {[
              { id: "T-101", plate: "MH 12 AD 1234", status: "active" },
              { id: "V-204", plate: "DL 04 XY 7788", status: "active" },
              { id: "T-108", plate: "KA 05 QW 8899", status: "idle" },
              { id: "T-115", plate: "QL 12 AB 1234", status: "active" },
            ].map(v => (
              <div key={v.id} className="flex items-center gap-2 py-1.5 border-b border-border last:border-0">
                <div className={v.status === "active" ? "status-dot-active" : "status-dot-idle"} />
                <span className="text-sm font-medium text-foreground">{v.id}</span>
                <span className="text-xs text-muted-foreground ml-auto">{v.plate}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tracking card */}
        <div className="card-fleet p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-semibold text-foreground">Tracking Delivery</h2>
              <p className="text-xs text-primary cursor-pointer hover:underline">View delivery history</p>
            </div>
          </div>
          <div className="bg-muted/40 rounded-lg p-3 mb-4">
            <p className="text-xs text-muted-foreground">Shipment ID</p>
            <p className="text-sm font-bold text-foreground">#179004-787-98</p>
          </div>
          {/* Timeline */}
          <div className="space-y-3">
            {[
              { label: "Order Placed", date: "11 Mar 2025", status: "done" },
              { label: "In Transit", date: "12 Mar 2025", status: "done" },
              { label: "Out for Delivery", date: "13 Mar 2025", status: "active" },
              { label: "Delivered", date: "13 Mar 2025 16:00", status: "pending" },
            ].map((step, i, arr) => (
              <div key={step.label} className="flex items-start gap-3">
                <div className="flex flex-col items-center">
                  <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${step.status === "done" ? "bg-success border-success" : step.status === "active" ? "bg-primary border-primary" : "bg-white border-border"}`} />
                  {i < arr.length - 1 && <div className={`w-0.5 h-6 mt-0.5 ${step.status === "done" ? "bg-success" : "bg-border"}`} />}
                </div>
                <div>
                  <p className={`text-sm font-medium ${step.status === "pending" ? "text-muted-foreground" : "text-foreground"}`}>{step.label}</p>
                  <p className="text-xs text-muted-foreground">{step.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Total income */}
        <div className="card-fleet p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-semibold text-foreground">Revenue Overview</h2>
              <p className="text-xs text-muted-foreground">Current period</p>
            </div>
            <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="text-3xl font-bold text-foreground mb-1">$256K</div>
          <span className="trend-up flex items-center gap-1 mb-4"><TrendingUp className="w-3 h-3" />+12.5% this month</span>
          {/* Bar chart */}
          <div className="flex items-end gap-1.5 h-20 mb-3">
            {[35, 55, 85, 45, 60, 75, 50].map((h, i) => (
              <div key={i} className="flex-1 rounded-t flex flex-col justify-end" style={{ height: "100%" }}>
                <div
                  className="rounded-t transition-all"
                  style={{
                    height: `${h}%`,
                    background: i === 2 ? "hsl(var(--primary))" : "hsl(var(--primary) / 0.2)",
                  }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => <span key={i}>{d}</span>)}
          </div>
          <div className="mt-4 space-y-2">
            {[
              { label: "Completed Trips", value: "$185,389", sub: "42 trips" },
              { label: "Pending Invoices", value: "$70,611", sub: "8 pending" },
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between py-1.5 border-b border-border last:border-0">
                <div>
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.sub}</p>
                </div>
                <span className="text-sm font-bold text-foreground">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Trips */}
      <div className="card-fleet p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-foreground">Recent Trips</h2>
          <button className="text-sm text-primary hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {["Vehicle", "Driver", "Route", "Start Time", "Status"].map(h => (
                  <th key={h} className="text-left py-2.5 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {recentTrips.map((trip) => (
                <tr key={trip.vehicle} className="hover:bg-muted/30 transition-colors">
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Truck className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <span className="font-medium text-foreground">{trip.vehicle}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-muted-foreground">{trip.driver}</td>
                  <td className="py-3 px-3 text-muted-foreground">{trip.route}</td>
                  <td className="py-3 px-3 text-muted-foreground">{trip.start}</td>
                  <td className="py-3 px-3">{statusPill(trip.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
