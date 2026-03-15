import { useState } from "react";
import { ArrowLeft, Truck, Save, X, User, MapPin, Calendar, Activity, Fuel, ChevronDown } from "lucide-react";
import truckImg from "@/assets/truck.png";

const drivers = [
  { id: "D-001", name: "John Doe", assignedTruck: "T-101" },
  { id: "D-002", name: "Sarah Lee", assignedTruck: "V-204" },
  { id: "D-003", name: "Mike Chen", assignedTruck: "T-108" },
  { id: "D-004", name: "Carlos Rivera", assignedTruck: "T-115" },
  { id: "D-005", name: "Priya Patel", assignedTruck: "V-301" },
  { id: "D-006", name: "Emma Johnson", assignedTruck: "T-220" },
  { id: "D-007", name: "Raj Sharma", assignedTruck: "V-112" },
  { id: "D-008", name: "David Kim", assignedTruck: "T-330" },
  { id: "D-009", name: "Ana Torres", assignedTruck: "V-419" },
];

interface Props {
  onBack: () => void;
  onSave?: (data: Record<string, string>) => void;
}

export default function AddVehiclePage({ onBack, onSave }: Props) {
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    id: "",
    name: "",
    type: "truck",
    plate: "",
    make: "",
    year: "",
    vin: "",
    mileage: "",
    fuelType: "diesel",
    status: "active",
    driverId: "",
    location: "",
    lastService: "",
    nextService: "",
    notes: "",
  });

  const availableDrivers = drivers.filter(d => !d.assignedTruck || d.id === form.driverId);

  const set = (key: string, val: string) => setForm(f => ({ ...f, [key]: val }));

  const handleSave = () => {
    if (!form.id || !form.name || !form.plate || !form.make) return;
    onSave?.(form);
    setSaved(true);
    setTimeout(() => { setSaved(false); onBack(); }, 1200);
  };

  const assigned = drivers.find(d => d.id === form.driverId);

  return (
    <div className="space-y-6 animate-slide-in">
      {/* Header */}
      <div className="flex items-center gap-3 flex-wrap">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-3 py-2 text-sm rounded-lg border border-border bg-card hover:bg-muted transition-colors text-foreground"
        >
          <ArrowLeft className="w-4 h-4" />Back
        </button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-foreground">Add New Vehicle</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Register a new truck or van to the fleet</p>
        </div>
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${saved ? "bg-success text-white" : "bg-primary text-primary-foreground hover:opacity-90"}`}
        >
          <Save className="w-4 h-4" />
          {saved ? "Saved!" : "Save Vehicle"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ── LEFT: Preview card ── */}
        <div className="flex flex-col gap-4">
          {/* Vehicle preview */}
          <div className="card-fleet overflow-hidden">
            <div className="relative h-44 bg-gradient-to-br from-primary/10 via-muted/40 to-muted/10 flex items-center justify-center border-b border-border">
              <img
                src={truckImg}
                alt="Vehicle preview"
                className="h-32 object-contain drop-shadow-xl opacity-90"
                style={{ filter: form.status === "offline" ? "grayscale(80%)" : form.status === "maintenance" ? "sepia(60%)" : "none" }}
              />
              <div className="absolute top-2 right-2">
                <span className={`pill-${form.status === "active" ? "success" : form.status === "maintenance" ? "primary" : form.status === "idle" ? "warning" : "danger"}`}>
                  <span className={`status-dot-${form.status === "active" ? "active" : form.status === "offline" ? "offline" : "idle"} mr-1`} />
                  {form.status.charAt(0).toUpperCase() + form.status.slice(1)}
                </span>
              </div>
              {form.id && (
                <div className="absolute bottom-2 left-2 bg-black/30 backdrop-blur-sm text-white text-xs font-bold px-2 py-0.5 rounded">
                  {form.id}
                </div>
              )}
            </div>
            <div className="p-4 space-y-2">
              <p className="font-semibold text-foreground text-sm">{form.name || <span className="text-muted-foreground italic">Vehicle name…</span>}</p>
              <p className="text-xs text-muted-foreground">{form.plate || "Plate number…"}</p>
              <p className="text-xs text-muted-foreground">{form.make || "Make / Model…"}{form.year ? ` · ${form.year}` : ""}</p>
              {assigned && (
                <div className="flex items-center gap-1.5 pt-1 border-t border-border">
                  <User className="w-3.5 h-3.5 text-primary" />
                  <span className="text-xs text-foreground">{assigned.name}</span>
                </div>
              )}
            </div>
          </div>

          {/* Quick stats preview */}
          <div className="card-fleet p-4 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">At a Glance</p>
            {[
              { icon: Truck, label: "Type", value: form.type === "truck" ? "Heavy Truck" : "Van" },
              { icon: Fuel, label: "Fuel", value: form.fuelType.charAt(0).toUpperCase() + form.fuelType.slice(1) },
              { icon: Activity, label: "Mileage", value: form.mileage ? `${form.mileage} km` : "—" },
              { icon: Calendar, label: "Next Service", value: form.nextService || "—" },
              { icon: MapPin, label: "Location", value: form.location || "—" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-2.5">
                <Icon className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                <span className="text-xs text-muted-foreground w-20 flex-shrink-0">{label}</span>
                <span className="text-xs text-foreground font-medium truncate">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Form ── */}
        <div className="lg:col-span-2 space-y-5">

          {/* Vehicle Identity */}
          <div className="card-fleet p-5">
            <h2 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <Truck className="w-4 h-4 text-primary" />Vehicle Identity
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label-field">Vehicle ID *</label>
                <input
                  type="text"
                  value={form.id}
                  onChange={e => set("id", e.target.value)}
                  placeholder="e.g. T-440"
                  className="input-field"
                />
              </div>
              <div>
                <label className="label-field">Vehicle Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => set("name", e.target.value)}
                  placeholder="e.g. Truck T-440"
                  className="input-field"
                />
              </div>
              <div>
                <label className="label-field">Type *</label>
                <div className="relative">
                  <select value={form.type} onChange={e => set("type", e.target.value)} className="input-field appearance-none pr-8">
                    <option value="truck">Heavy Truck</option>
                    <option value="van">Van / Light Truck</option>
                    <option value="trailer">Trailer</option>
                    <option value="pickup">Pickup</option>
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="label-field">Status *</label>
                <div className="relative">
                  <select value={form.status} onChange={e => set("status", e.target.value)} className="input-field appearance-none pr-8">
                    <option value="active">Active</option>
                    <option value="idle">Idle</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="offline">Offline</option>
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="label-field">License Plate *</label>
                <input
                  type="text"
                  value={form.plate}
                  onChange={e => set("plate", e.target.value.toUpperCase())}
                  placeholder="e.g. TX 44 AB 1234"
                  className="input-field font-mono"
                />
              </div>
              <div>
                <label className="label-field">Make / Model *</label>
                <input
                  type="text"
                  value={form.make}
                  onChange={e => set("make", e.target.value)}
                  placeholder="e.g. Volvo FH16"
                  className="input-field"
                />
              </div>
              <div>
                <label className="label-field">Year</label>
                <input
                  type="number"
                  value={form.year}
                  onChange={e => set("year", e.target.value)}
                  placeholder="e.g. 2023"
                  min="1990" max="2026"
                  className="input-field"
                />
              </div>
              <div>
                <label className="label-field">VIN Number</label>
                <input
                  type="text"
                  value={form.vin}
                  onChange={e => set("vin", e.target.value.toUpperCase())}
                  placeholder="17-digit VIN"
                  maxLength={17}
                  className="input-field font-mono"
                />
              </div>
            </div>
          </div>

          {/* Technical Details */}
          <div className="card-fleet p-5">
            <h2 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" />Technical Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label-field">Fuel Type</label>
                <div className="relative">
                  <select value={form.fuelType} onChange={e => set("fuelType", e.target.value)} className="input-field appearance-none pr-8">
                    <option value="diesel">Diesel</option>
                    <option value="petrol">Petrol</option>
                    <option value="cng">CNG</option>
                    <option value="electric">Electric</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="label-field">Current Mileage (km)</label>
                <input
                  type="number"
                  value={form.mileage}
                  onChange={e => set("mileage", e.target.value)}
                  placeholder="e.g. 45000"
                  min="0"
                  className="input-field"
                />
              </div>
              <div>
                <label className="label-field">Last Service Date</label>
                <input type="date" value={form.lastService} onChange={e => set("lastService", e.target.value)} className="input-field" />
              </div>
              <div>
                <label className="label-field">Next Service Date</label>
                <input type="date" value={form.nextService} onChange={e => set("nextService", e.target.value)} className="input-field" />
              </div>
            </div>
          </div>

          {/* Driver Assignment */}
          <div className="card-fleet p-5">
            <h2 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <User className="w-4 h-4 text-primary" />Driver Assignment
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="label-field">Assign Driver</label>
                <div className="relative">
                  <select value={form.driverId} onChange={e => set("driverId", e.target.value)} className="input-field appearance-none pr-8">
                    <option value="">— Unassigned —</option>
                    {drivers.map(d => (
                      <option key={d.id} value={d.id} disabled={!!d.assignedTruck && d.id !== form.driverId}>
                        {d.name}{d.assignedTruck && d.id !== form.driverId ? ` (assigned to ${d.assignedTruck})` : ""}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                </div>
                {form.driverId && assigned && (
                  <div className="mt-2 flex items-center gap-2 text-xs text-success">
                    <User className="w-3.5 h-3.5" />
                    <span>{assigned.name} will be assigned to this vehicle</span>
                  </div>
                )}
              </div>
              <div className="sm:col-span-2">
                <label className="label-field">Current / Home Location</label>
                <input
                  type="text"
                  value={form.location}
                  onChange={e => set("location", e.target.value)}
                  placeholder="e.g. Chicago Depot, Bay 3"
                  className="input-field"
                />
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="card-fleet p-5">
            <h2 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />Additional Notes
            </h2>
            <textarea
              value={form.notes}
              onChange={e => set("notes", e.target.value)}
              rows={3}
              placeholder="Any special notes about this vehicle (e.g. modifications, restrictions, recent issues)…"
              className="input-field resize-none"
            />
          </div>

          {/* Action row */}
          <div className="flex items-center gap-3 justify-end pb-2">
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card hover:bg-muted transition-colors text-sm font-medium text-foreground"
            >
              <X className="w-4 h-4" />Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!form.id || !form.name || !form.plate || !form.make}
              className="flex items-center gap-2 px-6 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4" />
              {saved ? "Saved!" : "Save Vehicle"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
