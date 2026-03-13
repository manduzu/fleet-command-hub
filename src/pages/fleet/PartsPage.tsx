import { useState } from "react";
import { Search, Plus, Package, Truck, User, AlertTriangle, Filter, Eye, CheckCircle2, Clock, DollarSign } from "lucide-react";

const parts = [
  { id: "P-001", partName: "Air Filter", partNumber: "AF-4521-HD", truck: "T-101", truckPlate: "MH 12 AD 1234", quantity: 2, unit: "pcs", status: "issued", dateIssued: "12 Mar 2025", issuedBy: "James Carter", cost: 45.00, notes: "Replacement for worn filter" },
  { id: "P-002", partName: "Brake Pads (Front)", partNumber: "BP-7832-FR", truck: "T-108", truckPlate: "KA 05 QW 8899", quantity: 4, unit: "sets", status: "issued", dateIssued: "11 Mar 2025", issuedBy: "James Carter", cost: 220.00, notes: "Scheduled maintenance" },
  { id: "P-003", partName: "Engine Oil 15W-40", partNumber: "OL-1540-5L", truck: "T-115", truckPlate: "QL 12 AB 1234", quantity: 10, unit: "litres", status: "pending", dateIssued: "13 Mar 2025", issuedBy: "Maria Santos", cost: 85.50, notes: "Awaiting approval" },
  { id: "P-004", partName: "Fan Belt", partNumber: "FB-2291-VBX", truck: "V-204", truckPlate: "DL 04 XY 7788", quantity: 1, unit: "pcs", status: "issued", dateIssued: "10 Mar 2025", issuedBy: "James Carter", cost: 32.00, notes: "Emergency replacement" },
  { id: "P-005", partName: "Fuel Injector", partNumber: "FI-9034-DI", truck: "T-330", truckPlate: "PA 66 TK 4422", quantity: 6, unit: "pcs", status: "issued", dateIssued: "09 Mar 2025", issuedBy: "Maria Santos", cost: 540.00, notes: "Full set replacement" },
  { id: "P-006", partName: "Coolant Fluid", partNumber: "CF-3310-GL", truck: "T-220", truckPlate: "GA 07 BC 3311", quantity: 5, unit: "litres", status: "returned", dateIssued: "08 Mar 2025", issuedBy: "James Carter", cost: 28.00, notes: "Excess returned to store" },
  { id: "P-007", partName: "Alternator", partNumber: "AL-6651-AMB", truck: "V-112", truckPlate: "FL 23 MN 8800", quantity: 1, unit: "pcs", status: "pending", dateIssued: "13 Mar 2025", issuedBy: "Maria Santos", cost: 310.00, notes: "Ordered — awaiting stock" },
  { id: "P-008", partName: "Shock Absorbers (Rear)", partNumber: "SA-8812-RR", truck: "V-301", truckPlate: "TX 99 ZZ 5544", quantity: 2, unit: "pcs", status: "issued", dateIssued: "07 Mar 2025", issuedBy: "James Carter", cost: 195.00, notes: "Rear pair replacement" },
  { id: "P-009", partName: "Headlight Bulb H7", partNumber: "HB-1107-H7", truck: "V-419", truckPlate: "AZ 44 XP 9901", quantity: 4, unit: "pcs", status: "issued", dateIssued: "06 Mar 2025", issuedBy: "Maria Santos", cost: 18.00, notes: "Both headlights replaced" },
  { id: "P-010", partName: "Transmission Fluid", partNumber: "TF-5520-QT", truck: "T-101", truckPlate: "MH 12 AD 1234", quantity: 4, unit: "litres", status: "returned", dateIssued: "05 Mar 2025", issuedBy: "James Carter", cost: 62.00, notes: "Partial return" },
];

const statusConfig: Record<string, { label: string; pill: string; icon: typeof CheckCircle2 }> = {
  issued: { label: "Issued", pill: "pill-success", icon: CheckCircle2 },
  pending: { label: "Pending", pill: "pill-warning", icon: Clock },
  returned: { label: "Returned", pill: "pill-primary", icon: Package },
};

export default function PartsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = parts.filter(p => {
    const matchSearch =
      p.partName.toLowerCase().includes(search.toLowerCase()) ||
      p.truck.toLowerCase().includes(search.toLowerCase()) ||
      p.partNumber.toLowerCase().includes(search.toLowerCase()) ||
      p.issuedBy.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || p.status === filter;
    return matchSearch && matchFilter;
  });

  const totalCost = filtered.reduce((acc, p) => acc + p.cost * p.quantity, 0);

  const counts = {
    all: parts.length,
    issued: parts.filter(p => p.status === "issued").length,
    pending: parts.filter(p => p.status === "pending").length,
    returned: parts.filter(p => p.status === "returned").length,
  };

  return (
    <div className="space-y-6 animate-slide-in">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Store Manager — Parts Issuance</h1>
          <p className="text-muted-foreground text-sm mt-1">Track and manage parts issued to each truck</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" />Issue Part
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total Records", count: counts.all, color: "text-primary", bg: "hsl(217 91% 60% / 0.08)" },
          { label: "Issued", count: counts.issued, color: "text-success", bg: "hsl(160 84% 39% / 0.08)" },
          { label: "Pending", count: counts.pending, color: "text-warning", bg: "hsl(38 92% 50% / 0.08)" },
          { label: "Returned", count: counts.returned, color: "text-primary", bg: "hsl(217 91% 60% / 0.06)" },
        ].map(s => (
          <div key={s.label} className="card-fleet p-4 text-center cursor-pointer" style={{ backgroundColor: s.bg }}
            onClick={() => setFilter(s.label.toLowerCase() === "total records" ? "all" : s.label.toLowerCase())}>
            <p className={`text-2xl font-bold ${s.color}`}>{s.count}</p>
            <p className="text-xs text-muted-foreground font-medium">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Summary cost */}
      <div className="card-fleet p-4 flex items-center gap-4 bg-primary/5 border-primary/20">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
          <DollarSign className="w-5 h-5 text-primary" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Total Parts Cost (Filtered)</p>
          <p className="text-2xl font-bold text-foreground">${totalCost.toFixed(2)}</p>
        </div>
      </div>

      {/* Search & filter */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by part name, truck, issued by..."
            className="w-full pl-9 pr-4 py-2.5 text-sm bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground"
          />
        </div>
        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="px-3 py-2.5 text-sm bg-card border border-border rounded-lg focus:outline-none text-foreground"
        >
          <option value="all">All Statuses</option>
          <option value="issued">Issued</option>
          <option value="pending">Pending</option>
          <option value="returned">Returned</option>
        </select>
        <button className="flex items-center gap-2 px-3 py-2.5 text-sm bg-card border border-border rounded-lg hover:bg-muted transition-colors text-foreground">
          <Filter className="w-4 h-4" />Filters
        </button>
      </div>

      {/* Parts table */}
      <div className="card-fleet overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                {["Part", "Part Number", "Truck", "Qty", "Issued By", "Date", "Cost", "Status", "Actions"].map(h => (
                  <th key={h} className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((part) => {
                const cfg = statusConfig[part.status];
                const StatusIcon = cfg.icon;
                return (
                  <tr key={part.id} className="hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Package className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{part.partName}</p>
                          <p className="text-xs text-muted-foreground">{part.notes}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-xs font-mono text-muted-foreground">{part.partNumber}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5">
                        <Truck className="w-3.5 h-3.5 text-primary" />
                        <div>
                          <p className="font-medium text-foreground">{part.truck}</p>
                          <p className="text-xs text-muted-foreground">{part.truckPlate}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-semibold text-foreground whitespace-nowrap">{part.quantity} {part.unit}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-muted-foreground" />
                        <span className="text-muted-foreground">{part.issuedBy}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground whitespace-nowrap">{part.dateIssued}</td>
                    <td className="py-3 px-4 font-semibold text-foreground">${(part.cost * part.quantity).toFixed(2)}</td>
                    <td className="py-3 px-4">
                      <span className={cfg.pill}>
                        <StatusIcon className="w-3 h-3 mr-1 inline" />{cfg.label}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button className="flex items-center gap-1 text-xs text-primary hover:underline">
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
            <p className="font-medium">No parts records found</p>
          </div>
        )}
      </div>
    </div>
  );
}
