import { useState } from "react";
import { Search, Plus, Phone, Star, Truck, Calendar, MapPin, Filter, Eye, Edit, UserCheck, AlertTriangle } from "lucide-react";

const drivers = [
  { id: "D-001", name: "John Doe", license: "CDL-A | #JD-482910", phone: "+1 (555) 012-3456", status: "on-duty", assignedTruck: "T-101", truckPlate: "MH 12 AD 1234", tripsToday: 3, totalTrips: 248, rating: 4.9, experience: "5 yrs", location: "Highway 101, Mile 23", joinDate: "Jan 2020", avatar: "JD" },
  { id: "D-002", name: "Sarah Lee", license: "CDL-B | #SL-291847", phone: "+1 (555) 023-4567", status: "on-duty", assignedTruck: "V-204", truckPlate: "DL 04 XY 7788", tripsToday: 2, totalTrips: 192, rating: 4.7, experience: "3 yrs", location: "LA Downtown, Exit 5", joinDate: "Mar 2022", avatar: "SL" },
  { id: "D-003", name: "Mike Chen", license: "CDL-A | #MC-374821", phone: "+1 (555) 034-5678", status: "off-duty", assignedTruck: "T-108", truckPlate: "KA 05 QW 8899", tripsToday: 0, totalTrips: 310, rating: 4.8, experience: "7 yrs", location: "Chicago Depot", joinDate: "Nov 2018", avatar: "MC" },
  { id: "D-004", name: "Carlos Rivera", license: "CDL-A | #CR-485920", phone: "+1 (555) 045-6789", status: "on-duty", assignedTruck: "T-115", truckPlate: "QL 12 AB 1234", tripsToday: 1, totalTrips: 175, rating: 4.6, experience: "4 yrs", location: "I-10 West, Mile 342", joinDate: "Jun 2021", avatar: "CR" },
  { id: "D-005", name: "Priya Patel", license: "CDL-B | #PP-591038", phone: "+1 (555) 056-7890", status: "idle", assignedTruck: "V-301", truckPlate: "TX 99 ZZ 5544", tripsToday: 1, totalTrips: 143, rating: 4.9, experience: "2 yrs", location: "Houston Hub Parking", joinDate: "Feb 2023", avatar: "PP" },
  { id: "D-006", name: "Emma Johnson", license: "CDL-A | #EJ-682910", phone: "+1 (555) 067-8901", status: "on-duty", assignedTruck: "T-220", truckPlate: "GA 07 BC 3311", tripsToday: 2, totalTrips: 221, rating: 4.8, experience: "6 yrs", location: "US-75, Dallas", joinDate: "Aug 2019", avatar: "EJ" },
  { id: "D-007", name: "Raj Sharma", license: "CDL-A | #RS-773021", phone: "+1 (555) 078-9012", status: "off-duty", assignedTruck: "V-112", truckPlate: "FL 23 MN 8800", tripsToday: 0, totalTrips: 198, rating: 4.5, experience: "4 yrs", location: "Last: Miami Port", joinDate: "Apr 2021", avatar: "RS" },
  { id: "D-008", name: "David Kim", license: "CDL-A | #DK-864182", phone: "+1 (555) 089-0123", status: "on-duty", assignedTruck: "T-330", truckPlate: "PA 66 TK 4422", tripsToday: 3, totalTrips: 289, rating: 4.7, experience: "5 yrs", location: "I-95 North, Philadelphia", joinDate: "Sep 2020", avatar: "DK" },
  { id: "D-009", name: "Ana Torres", license: "CDL-B | #AT-955304", phone: "+1 (555) 090-1234", status: "idle", assignedTruck: "V-419", truckPlate: "AZ 44 XP 9901", tripsToday: 1, totalTrips: 112, rating: 4.6, experience: "2 yrs", location: "Phoenix Central Hub", joinDate: "Jan 2024", avatar: "AT" },
];

const statusConfig: Record<string, { label: string; pill: string; dot: string }> = {
  "on-duty": { label: "On Duty", pill: "pill-success", dot: "status-dot-active" },
  "idle": { label: "Idle", pill: "pill-warning", dot: "status-dot-idle" },
  "off-duty": { label: "Off Duty", pill: "pill-danger", dot: "status-dot-offline" },
};

const avatarColors = [
  "hsl(217 91% 60%)", "hsl(160 84% 39%)", "hsl(38 92% 50%)",
  "hsl(280 65% 60%)", "hsl(0 84% 60%)", "hsl(217 91% 70%)"
];

export default function DriversPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = drivers.filter(d => {
    const matchSearch =
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.assignedTruck.toLowerCase().includes(search.toLowerCase()) ||
      d.license.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || d.status === filter;
    return matchSearch && matchFilter;
  });

  const counts = {
    all: drivers.length,
    "on-duty": drivers.filter(d => d.status === "on-duty").length,
    idle: drivers.filter(d => d.status === "idle").length,
    "off-duty": drivers.filter(d => d.status === "off-duty").length,
  };

  return (
    <div className="space-y-6 animate-slide-in">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Driver Management</h1>
          <p className="text-muted-foreground text-sm mt-1">{drivers.length} registered drivers · each assigned to a vehicle</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" />Add Driver
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total Drivers", count: counts.all, color: "text-primary", bg: "hsl(217 91% 60% / 0.08)" },
          { label: "On Duty", count: counts["on-duty"], color: "text-success", bg: "hsl(160 84% 39% / 0.08)" },
          { label: "Idle", count: counts.idle, color: "text-warning", bg: "hsl(38 92% 50% / 0.08)" },
          { label: "Off Duty", count: counts["off-duty"], color: "text-destructive", bg: "hsl(0 84% 60% / 0.08)" },
        ].map(s => (
          <div key={s.label} className="card-fleet p-4 text-center cursor-pointer" style={{ backgroundColor: s.bg }}
            onClick={() => setFilter(filter === s.label.toLowerCase().replace(" ", "-") ? "all" : s.label.toLowerCase().replace(" ", "-"))}>
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
            placeholder="Search by driver name, truck, license..."
            className="w-full pl-9 pr-4 py-2.5 text-sm bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground"
          />
        </div>
        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="px-3 py-2.5 text-sm bg-card border border-border rounded-lg focus:outline-none text-foreground"
        >
          <option value="all">All Statuses</option>
          <option value="on-duty">On Duty</option>
          <option value="idle">Idle</option>
          <option value="off-duty">Off Duty</option>
        </select>
        <button className="flex items-center gap-2 px-3 py-2.5 text-sm bg-card border border-border rounded-lg hover:bg-muted transition-colors text-foreground">
          <Filter className="w-4 h-4" />Filters
        </button>
      </div>

      {/* Driver cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((driver, idx) => {
          const cfg = statusConfig[driver.status];
          const avatarBg = avatarColors[idx % avatarColors.length];
          return (
            <div key={driver.id} className="card-fleet p-5 hover:shadow-md transition-shadow">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-sm shadow"
                    style={{ background: avatarBg }}
                  >
                    {driver.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{driver.name}</h3>
                    <p className="text-xs text-muted-foreground">{driver.license}</p>
                  </div>
                </div>
                <span className={cfg.pill}><span className={`${cfg.dot} mr-1`} />{cfg.label}</span>
              </div>

              {/* Assigned truck */}
              <div className="bg-primary/5 border border-primary/15 rounded-xl p-3 mb-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Truck className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Assigned Vehicle</p>
                  <p className="text-sm font-bold text-foreground">{driver.assignedTruck}</p>
                  <p className="text-xs text-muted-foreground">{driver.truckPlate}</p>
                </div>
                <UserCheck className="ml-auto w-4 h-4 text-success" />
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="text-center">
                  <p className="text-lg font-bold text-foreground">{driver.tripsToday}</p>
                  <p className="text-xs text-muted-foreground">Today</p>
                </div>
                <div className="text-center border-x border-border">
                  <p className="text-lg font-bold text-foreground">{driver.totalTrips}</p>
                  <p className="text-xs text-muted-foreground">Total Trips</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-0.5">
                    <Star className="w-3.5 h-3.5 text-warning fill-warning" />
                    <span className="text-lg font-bold text-foreground">{driver.rating}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Rating</p>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                  <span className="text-muted-foreground">{driver.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                  <span className="text-muted-foreground line-clamp-1">{driver.location}</span>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-border">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className="text-muted-foreground">Since {driver.joinDate}</span>
                  </div>
                  <span className="font-medium text-foreground">{driver.experience} exp.</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 mt-4">
                <button className="flex-1 flex items-center justify-center gap-1 py-1.5 text-xs font-medium rounded-lg border border-border hover:bg-muted transition-colors text-foreground">
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
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <AlertTriangle className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="font-medium">No drivers found</p>
          <p className="text-sm mt-1">Try adjusting your search or filter</p>
        </div>
      )}
    </div>
  );
}
