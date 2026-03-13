import { useState } from "react";
import { Search, Plus, Filter, Truck, User, MapPin, Package, Eye, CheckCircle2, Clock, AlertTriangle, TrendingUp, Calendar } from "lucide-react";

const orders = [
  { id: "ORD-2025-001", customer: "Amazon Logistics", origin: "New York, NY", destination: "Boston, MA", status: "completed", driver: "John Doe", driverId: "D-001", truck: "T-101", truckPlate: "MH 12 AD 1234", weight: "12.4t", date: "13 Mar 2025", eta: "Delivered", distance: "215 km", priority: "high" },
  { id: "ORD-2025-002", customer: "FedEx Supply Chain", origin: "Los Angeles, CA", destination: "San Diego, CA", status: "in-transit", driver: "Sarah Lee", driverId: "D-002", truck: "V-204", truckPlate: "DL 04 XY 7788", weight: "3.8t", date: "13 Mar 2025", eta: "45 min", distance: "193 km", priority: "medium" },
  { id: "ORD-2025-003", customer: "UPS Freight", origin: "Chicago, IL", destination: "Detroit, MI", status: "delayed", driver: "Mike Chen", driverId: "D-003", truck: "T-108", truckPlate: "KA 05 QW 8899", weight: "18.2t", date: "12 Mar 2025", eta: "3h 20m", distance: "457 km", priority: "high" },
  { id: "ORD-2025-004", customer: "DHL Express", origin: "Phoenix, AZ", destination: "Las Vegas, NV", status: "in-transit", driver: "Carlos Rivera", driverId: "D-004", truck: "T-115", truckPlate: "QL 12 AB 1234", weight: "9.1t", date: "13 Mar 2025", eta: "3h 50m", distance: "470 km", priority: "low" },
  { id: "ORD-2025-005", customer: "Walmart Distribution", origin: "Houston, TX", destination: "Dallas, TX", status: "completed", driver: "Priya Patel", driverId: "D-005", truck: "V-301", truckPlate: "TX 99 ZZ 5544", weight: "5.5t", date: "12 Mar 2025", eta: "Delivered", distance: "386 km", priority: "medium" },
  { id: "ORD-2025-006", customer: "Home Depot Supply", origin: "Atlanta, GA", destination: "Dallas, TX", status: "in-transit", driver: "Emma Johnson", driverId: "D-006", truck: "T-220", truckPlate: "GA 07 BC 3311", weight: "15.7t", date: "13 Mar 2025", eta: "5h 10m", distance: "1240 km", priority: "high" },
  { id: "ORD-2025-007", customer: "Best Buy Logistics", origin: "Miami, FL", destination: "Orlando, FL", status: "pending", driver: "Raj Sharma", driverId: "D-007", truck: "V-112", truckPlate: "FL 23 MN 8800", weight: "2.3t", date: "14 Mar 2025", eta: "Scheduled", distance: "381 km", priority: "low" },
  { id: "ORD-2025-008", customer: "Target Distribution", origin: "Philadelphia, PA", destination: "New York, NY", status: "in-transit", driver: "David Kim", driverId: "D-008", truck: "T-330", truckPlate: "PA 66 TK 4422", weight: "11.0t", date: "13 Mar 2025", eta: "1h 20m", distance: "152 km", priority: "medium" },
  { id: "ORD-2025-009", customer: "Nike Supply Chain", origin: "Phoenix, AZ", destination: "Tucson, AZ", status: "completed", driver: "Ana Torres", driverId: "D-009", truck: "V-419", truckPlate: "AZ 44 XP 9901", weight: "4.2t", date: "12 Mar 2025", eta: "Delivered", distance: "185 km", priority: "low" },
];

const statusConfig: Record<string, { label: string; pill: string; icon: typeof CheckCircle2 }> = {
  completed: { label: "Completed", pill: "pill-success", icon: CheckCircle2 },
  "in-transit": { label: "In Transit", pill: "pill-primary", icon: Clock },
  delayed: { label: "Delayed", pill: "pill-danger", icon: AlertTriangle },
  pending: { label: "Pending", pill: "pill-warning", icon: Clock },
};

const priorityConfig: Record<string, string> = {
  high: "text-destructive bg-destructive/10",
  medium: "text-warning bg-warning/10",
  low: "text-success bg-success/10",
};

const avatarColors = [
  "hsl(217 91% 60%)", "hsl(160 84% 39%)", "hsl(38 92% 50%)",
  "hsl(280 65% 60%)", "hsl(0 84% 60%)", "hsl(217 91% 70%)"
];

export default function OrdersPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [view, setView] = useState<"table" | "cards">("table");

  const filtered = orders.filter(o => {
    const matchSearch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.driver.toLowerCase().includes(search.toLowerCase()) ||
      o.truck.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || o.status === filter;
    return matchSearch && matchFilter;
  });

  const counts = {
    all: orders.length,
    "in-transit": orders.filter(o => o.status === "in-transit").length,
    completed: orders.filter(o => o.status === "completed").length,
    delayed: orders.filter(o => o.status === "delayed").length,
    pending: orders.filter(o => o.status === "pending").length,
  };

  return (
    <div className="space-y-6 animate-slide-in">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Orders</h1>
          <p className="text-muted-foreground text-sm mt-1">{orders.length} orders with driver & truck assignments</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" />New Order
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total Orders", count: counts.all, color: "text-primary", bg: "hsl(217 91% 60% / 0.08)" },
          { label: "In Transit", count: counts["in-transit"], color: "text-primary", bg: "hsl(217 91% 60% / 0.08)" },
          { label: "Completed", count: counts.completed, color: "text-success", bg: "hsl(160 84% 39% / 0.08)" },
          { label: "Delayed", count: counts.delayed, color: "text-destructive", bg: "hsl(0 84% 60% / 0.08)" },
        ].map(s => (
          <div key={s.label} className="card-fleet p-4 text-center cursor-pointer" style={{ backgroundColor: s.bg }}
            onClick={() => setFilter(s.label.toLowerCase().replace(" ", "-") === "total-orders" ? "all" : s.label.toLowerCase().replace(" ", "-"))}>
            <p className={`text-2xl font-bold ${s.color}`}>{s.count}</p>
            <p className="text-xs text-muted-foreground font-medium">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Search & controls */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by order ID, customer, driver, truck..."
            className="w-full pl-9 pr-4 py-2.5 text-sm bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground"
          />
        </div>
        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="px-3 py-2.5 text-sm bg-card border border-border rounded-lg focus:outline-none text-foreground"
        >
          <option value="all">All Statuses</option>
          <option value="in-transit">In Transit</option>
          <option value="completed">Completed</option>
          <option value="delayed">Delayed</option>
          <option value="pending">Pending</option>
        </select>
        <button className="flex items-center gap-2 px-3 py-2.5 text-sm bg-card border border-border rounded-lg hover:bg-muted transition-colors text-foreground">
          <Filter className="w-4 h-4" />Filters
        </button>
        <div className="flex rounded-lg overflow-hidden border border-border">
          <button onClick={() => setView("table")} className={`px-3 py-2.5 text-sm transition-colors ${view === "table" ? "bg-primary text-primary-foreground" : "bg-card text-foreground hover:bg-muted"}`}>Table</button>
          <button onClick={() => setView("cards")} className={`px-3 py-2.5 text-sm transition-colors ${view === "cards" ? "bg-primary text-primary-foreground" : "bg-card text-foreground hover:bg-muted"}`}>Cards</button>
        </div>
      </div>

      {/* Table view */}
      {view === "table" && (
        <div className="card-fleet overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  {["Order ID", "Customer", "Route", "Driver + Truck", "Weight", "Date", "ETA", "Priority", "Status", ""].map(h => (
                    <th key={h} className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((order, idx) => {
                  const cfg = statusConfig[order.status];
                  const StatusIcon = cfg.icon;
                  const avatarBg = avatarColors[idx % avatarColors.length];
                  const initials = order.driver.split(" ").map(n => n[0]).join("");
                  return (
                    <tr key={order.id} className="hover:bg-muted/30 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Package className="w-3.5 h-3.5 text-primary" />
                          <span className="font-mono text-xs font-semibold text-foreground">{order.id}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-medium text-foreground max-w-[140px] truncate">{order.customer}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-start gap-1 text-xs text-muted-foreground">
                          <MapPin className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                          <span>{order.origin}<br />→ {order.destination}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: avatarBg }}>{initials}</div>
                          <div>
                            <p className="text-xs font-medium text-foreground">{order.driver}</p>
                            <div className="flex items-center gap-1">
                              <Truck className="w-3 h-3 text-primary" />
                              <span className="text-xs text-muted-foreground">{order.truck} · {order.truckPlate}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-xs text-muted-foreground font-medium">{order.weight}</td>
                      <td className="py-3 px-4 text-xs text-muted-foreground whitespace-nowrap">{order.date}</td>
                      <td className="py-3 px-4 text-xs font-semibold text-foreground whitespace-nowrap">{order.eta}</td>
                      <td className="py-3 px-4">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full capitalize ${priorityConfig[order.priority]}`}>{order.priority}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={cfg.pill}>
                          <StatusIcon className="w-3 h-3 mr-1 inline" />{cfg.label}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button className="flex items-center gap-1 text-xs text-primary hover:underline whitespace-nowrap">
                          <Eye className="w-3.5 h-3.5" />View
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <Package className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="font-medium">No orders found</p>
            </div>
          )}
        </div>
      )}

      {/* Cards view */}
      {view === "cards" && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((order, idx) => {
            const cfg = statusConfig[order.status];
            const StatusIcon = cfg.icon;
            const avatarBg = avatarColors[idx % avatarColors.length];
            const initials = order.driver.split(" ").map(n => n[0]).join("");
            return (
              <div key={order.id} className="card-fleet p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <Package className="w-3.5 h-3.5 text-primary" />
                      <span className="font-mono text-xs font-bold text-primary">{order.id}</span>
                    </div>
                    <h3 className="font-semibold text-foreground">{order.customer}</h3>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full capitalize ${priorityConfig[order.priority]}`}>{order.priority}</span>
                    <span className={cfg.pill}><StatusIcon className="w-3 h-3 mr-1 inline" />{cfg.label}</span>
                  </div>
                </div>

                {/* Route */}
                <div className="bg-muted/40 rounded-lg p-3 mb-3 space-y-1">
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-1.5 h-1.5 rounded-full bg-success" />
                    <span className="text-foreground font-medium">{order.origin}</span>
                  </div>
                  <div className="w-0.5 h-3 bg-border ml-[2px]" />
                  <div className="flex items-center gap-2 text-xs">
                    <MapPin className="w-3 h-3 text-destructive" />
                    <span className="text-foreground font-medium">{order.destination}</span>
                  </div>
                </div>

                {/* Driver + Truck */}
                <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg mb-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: avatarBg }}>{initials}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3 text-muted-foreground" />
                      <p className="text-xs font-semibold text-foreground truncate">{order.driver}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Truck className="w-3 h-3 text-primary" />
                      <p className="text-xs text-muted-foreground">{order.truck} · {order.truckPlate}</p>
                    </div>
                  </div>
                </div>

                {/* Meta */}
                <div className="flex items-center justify-between text-xs pt-2 border-t border-border">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Calendar className="w-3 h-3" />{order.date}
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Package className="w-3 h-3" />{order.weight}
                  </div>
                  <div className="flex items-center gap-1 font-semibold text-foreground">
                    <TrendingUp className="w-3 h-3 text-primary" />ETA: {order.eta}
                  </div>
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div className="col-span-3 text-center py-12 text-muted-foreground">
              <Package className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="font-medium">No orders found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
