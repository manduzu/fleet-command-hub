import { useState } from "react";
import { Search, Plus, AlertTriangle, CheckCircle2, Clock, Filter, Truck, Calendar, Activity } from "lucide-react";

type TyreCondition = "good" | "worn" | "critical" | "new";

const tyreRecords = [
  {
    id: "TY-001", truckId: "T-101", truckPlate: "MH 12 AD 1234", driver: "John Doe",
    tyres: [
      { pos: "FL", brand: "Michelin X-Works", size: "295/80R22.5", condition: "good" as TyreCondition, mileage: 42000, lastChanged: "Jan 2025", nextChange: "Jul 2025" },
      { pos: "FR", brand: "Michelin X-Works", size: "295/80R22.5", condition: "good" as TyreCondition, mileage: 42000, lastChanged: "Jan 2025", nextChange: "Jul 2025" },
      { pos: "RL", brand: "Bridgestone M789", size: "295/80R22.5", condition: "worn" as TyreCondition, mileage: 71000, lastChanged: "Sep 2024", nextChange: "Apr 2025" },
      { pos: "RR", brand: "Bridgestone M789", size: "295/80R22.5", condition: "critical" as TyreCondition, mileage: 87000, lastChanged: "Jun 2024", nextChange: "Overdue" },
      { pos: "Spare", brand: "Continental HDR2", size: "295/80R22.5", condition: "new" as TyreCondition, mileage: 0, lastChanged: "Mar 2025", nextChange: "N/A" },
    ]
  },
  {
    id: "TY-002", truckId: "T-108", truckPlate: "KA 05 QW 8899", driver: "Mike Chen",
    tyres: [
      { pos: "FL", brand: "Continental HDR2", size: "315/80R22.5", condition: "new" as TyreCondition, mileage: 8000, lastChanged: "Feb 2025", nextChange: "Aug 2025" },
      { pos: "FR", brand: "Continental HDR2", size: "315/80R22.5", condition: "new" as TyreCondition, mileage: 8000, lastChanged: "Feb 2025", nextChange: "Aug 2025" },
      { pos: "RL", brand: "Continental HDR2", size: "315/80R22.5", condition: "good" as TyreCondition, mileage: 35000, lastChanged: "Nov 2024", nextChange: "May 2025" },
      { pos: "RR", brand: "Continental HDR2", size: "315/80R22.5", condition: "good" as TyreCondition, mileage: 35000, lastChanged: "Nov 2024", nextChange: "May 2025" },
      { pos: "Spare", brand: "Goodyear KMAX S", size: "315/80R22.5", condition: "good" as TyreCondition, mileage: 12000, lastChanged: "Dec 2024", nextChange: "N/A" },
    ]
  },
  {
    id: "TY-003", truckId: "T-115", truckPlate: "QL 12 AB 1234", driver: "Carlos Rivera",
    tyres: [
      { pos: "FL", brand: "Goodyear KMAX S", size: "295/80R22.5", condition: "worn" as TyreCondition, mileage: 65000, lastChanged: "Aug 2024", nextChange: "Apr 2025" },
      { pos: "FR", brand: "Goodyear KMAX S", size: "295/80R22.5", condition: "worn" as TyreCondition, mileage: 65000, lastChanged: "Aug 2024", nextChange: "Apr 2025" },
      { pos: "RL", brand: "Michelin X-Works", size: "295/80R22.5", condition: "good" as TyreCondition, mileage: 45000, lastChanged: "Dec 2024", nextChange: "Jun 2025" },
      { pos: "RR", brand: "Michelin X-Works", size: "295/80R22.5", condition: "good" as TyreCondition, mileage: 45000, lastChanged: "Dec 2024", nextChange: "Jun 2025" },
      { pos: "Spare", brand: "Bridgestone M789", size: "295/80R22.5", condition: "new" as TyreCondition, mileage: 0, lastChanged: "Mar 2025", nextChange: "N/A" },
    ]
  },
  {
    id: "TY-004", truckId: "T-220", truckPlate: "GA 07 BC 3311", driver: "Emma Johnson",
    tyres: [
      { pos: "FL", brand: "Michelin X-Works", size: "295/80R22.5", condition: "good" as TyreCondition, mileage: 28000, lastChanged: "Dec 2024", nextChange: "Jun 2025" },
      { pos: "FR", brand: "Michelin X-Works", size: "295/80R22.5", condition: "good" as TyreCondition, mileage: 28000, lastChanged: "Dec 2024", nextChange: "Jun 2025" },
      { pos: "RL", brand: "Goodyear KMAX S", size: "295/80R22.5", condition: "critical" as TyreCondition, mileage: 92000, lastChanged: "May 2024", nextChange: "Overdue" },
      { pos: "RR", brand: "Goodyear KMAX S", size: "295/80R22.5", condition: "worn" as TyreCondition, mileage: 74000, lastChanged: "May 2024", nextChange: "Mar 2025" },
      { pos: "Spare", brand: "Michelin X-Works", size: "295/80R22.5", condition: "good" as TyreCondition, mileage: 15000, lastChanged: "Jan 2025", nextChange: "N/A" },
    ]
  },
];

const conditionConfig: Record<TyreCondition, { label: string; pill: string; color: string; bg: string }> = {
  new: { label: "New", pill: "pill-success", color: "text-success", bg: "hsl(160 84% 39%)" },
  good: { label: "Good", pill: "pill-primary", color: "text-primary", bg: "hsl(217 91% 60%)" },
  worn: { label: "Worn", pill: "pill-warning", color: "text-warning", bg: "hsl(38 92% 50%)" },
  critical: { label: "Critical", pill: "pill-danger", color: "text-destructive", bg: "hsl(0 84% 60%)" },
};

const TyreIcon = ({ condition, pos }: { condition: TyreCondition; pos: string }) => {
  const cfg = conditionConfig[condition];
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className="w-8 h-10 rounded-sm border-2 flex items-center justify-center text-xs font-bold text-white shadow"
        style={{ backgroundColor: cfg.bg, borderColor: cfg.bg }}
        title={`${pos}: ${cfg.label}`}
      >
        {pos === "Spare" ? "S" : pos}
      </div>
      <span className="text-xs text-muted-foreground">{pos}</span>
    </div>
  );
};

export default function TyresPage() {
  const [search, setSearch] = useState("");

  const allTyres = tyreRecords.flatMap(t => t.tyres.map(ty => ({ ...ty, truckId: t.truckId })));
  const criticalCount = allTyres.filter(t => t.condition === "critical").length;
  const wornCount = allTyres.filter(t => t.condition === "worn").length;
  const goodCount = allTyres.filter(t => t.condition === "good" || t.condition === "new").length;

  const filtered = tyreRecords.filter(r =>
    r.truckId.toLowerCase().includes(search.toLowerCase()) ||
    r.driver.toLowerCase().includes(search.toLowerCase()) ||
    r.truckPlate.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-slide-in">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Tyre Management</h1>
          <p className="text-muted-foreground text-sm mt-1">Monitor tyre condition and replacement schedules for all vehicles</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" />Log Replacement
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total Tyres", count: allTyres.length, color: "text-primary", bg: "hsl(217 91% 60% / 0.08)" },
          { label: "Good / New", count: goodCount, color: "text-success", bg: "hsl(160 84% 39% / 0.08)" },
          { label: "Worn", count: wornCount, color: "text-warning", bg: "hsl(38 92% 50% / 0.08)" },
          { label: "Critical", count: criticalCount, color: "text-destructive", bg: "hsl(0 84% 60% / 0.08)" },
        ].map(s => (
          <div key={s.label} className="card-fleet p-4 text-center" style={{ backgroundColor: s.bg }}>
            <p className={`text-2xl font-bold ${s.color}`}>{s.count}</p>
            <p className="text-xs text-muted-foreground font-medium">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Alert banner if critical */}
      {criticalCount > 0 && (
        <div className="card-fleet p-4 border-destructive/30 bg-destructive/5 flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-destructive">{criticalCount} Critical Tyre{criticalCount > 1 ? "s" : ""} Require Immediate Attention</p>
            <p className="text-xs text-muted-foreground">Schedule replacement immediately to ensure safety compliance</p>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by truck ID, driver, plate..."
            className="w-full pl-9 pr-4 py-2.5 text-sm bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground"
          />
        </div>
        <button className="flex items-center gap-2 px-3 py-2.5 text-sm bg-card border border-border rounded-lg hover:bg-muted transition-colors text-foreground">
          <Filter className="w-4 h-4" />Filters
        </button>
      </div>

      {/* Tyre cards per truck */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {filtered.map(record => {
          const hasCritical = record.tyres.some(t => t.condition === "critical");
          const hasWorn = record.tyres.some(t => t.condition === "worn");
          return (
            <div key={record.id} className={`card-fleet p-5 ${hasCritical ? "border-destructive/30" : ""}`}>
              {/* Truck header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${hasCritical ? "bg-destructive/10" : "bg-primary/10"}`}>
                    <Truck className={`w-5 h-5 ${hasCritical ? "text-destructive" : "text-primary"}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{record.truckId}</h3>
                    <p className="text-xs text-muted-foreground">{record.truckPlate} · {record.driver}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {hasCritical && <span className="pill-danger flex items-center gap-1"><AlertTriangle className="w-3 h-3" />Critical</span>}
                  {!hasCritical && hasWorn && <span className="pill-warning">Worn</span>}
                  {!hasCritical && !hasWorn && <span className="pill-success flex items-center gap-1"><CheckCircle2 className="w-3 h-3" />Good</span>}
                </div>
              </div>

              {/* Tyre layout diagram */}
              <div className="bg-muted/30 rounded-xl p-4 mb-4">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">Tyre Layout</p>
                <div className="flex items-center justify-center gap-6">
                  {/* Front axle */}
                  <div className="flex flex-col items-center gap-3">
                    <p className="text-xs text-muted-foreground">Front</p>
                    <div className="flex gap-8">
                      {record.tyres.filter(t => t.pos === "FL" || t.pos === "FR").map(t => (
                        <TyreIcon key={t.pos} condition={t.condition} pos={t.pos} />
                      ))}
                    </div>
                  </div>
                  {/* Truck body */}
                  <div className="w-16 h-20 rounded-lg bg-muted border-2 border-border flex items-center justify-center">
                    <Truck className="w-8 h-8 text-muted-foreground" />
                  </div>
                  {/* Rear axle */}
                  <div className="flex flex-col items-center gap-3">
                    <p className="text-xs text-muted-foreground">Rear</p>
                    <div className="flex gap-8">
                      {record.tyres.filter(t => t.pos === "RL" || t.pos === "RR").map(t => (
                        <TyreIcon key={t.pos} condition={t.condition} pos={t.pos} />
                      ))}
                    </div>
                  </div>
                  {/* Spare */}
                  <div className="flex flex-col items-center gap-3">
                    <p className="text-xs text-muted-foreground">Spare</p>
                    {record.tyres.filter(t => t.pos === "Spare").map(t => (
                      <TyreIcon key={t.pos} condition={t.condition} pos={t.pos} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Tyre details table */}
              <div className="space-y-2">
                {record.tyres.map(tyre => {
                  const cfg = conditionConfig[tyre.condition];
                  return (
                    <div key={tyre.pos} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
                      <div className="w-10 text-xs font-bold text-foreground">{tyre.pos}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-foreground truncate">{tyre.brand}</p>
                        <p className="text-xs text-muted-foreground">{tyre.size}</p>
                      </div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <Activity className="w-3 h-3" />{tyre.mileage.toLocaleString()} km
                      </div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-3 h-3" />{tyre.nextChange}
                      </div>
                      <span className={cfg.pill}>{cfg.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
