import { ArrowLeft, Truck, User, MapPin, Navigation, Fuel, Activity, AlertTriangle, Package, Calendar, CheckCircle2, Clock, Star, Phone, CircleDot, Edit, RefreshCw } from "lucide-react";
import truckImg from "@/assets/truck.png";

// ─── Shared data ────────────────────────────────────────────────────────────

const vehicles = [
  { id: "T-101", name: "Truck T-101", type: "truck", driver: "John Doe", driverId: "D-001", status: "active", utilization: 78, location: "Highway 101, Mile 23", plate: "MH 12 AD 1234", speed: "65 mph", fuel: 72, alerts: 1, year: "2021", make: "Volvo FH16", mileage: "124,500 km", lastService: "01 Mar 2025", nextService: "01 Jun 2025", vin: "YV2RT40A7XB123456" },
  { id: "V-204", name: "Van V-204", type: "van", driver: "Sarah Lee", driverId: "D-002", status: "active", utilization: 55, location: "LA Downtown, Exit 5", plate: "DL 04 XY 7788", speed: "40 mph", fuel: 48, alerts: 1, year: "2022", make: "Mercedes Sprinter", mileage: "58,200 km", lastService: "10 Feb 2025", nextService: "10 May 2025", vin: "WDB9066351S123456" },
  { id: "T-108", name: "Truck T-108", type: "truck", driver: "Mike Chen", driverId: "D-003", status: "maintenance", utilization: 0, location: "Chicago Depot", plate: "KA 05 QW 8899", speed: "0 mph", fuel: 85, alerts: 0, year: "2020", make: "Kenworth T680", mileage: "210,800 km", lastService: "11 Mar 2025", nextService: "11 Jun 2025", vin: "1XKWD40X4NJ123456" },
  { id: "T-115", name: "Truck T-115", type: "truck", driver: "Carlos Rivera", driverId: "D-004", status: "active", utilization: 90, location: "I-10 West, Mile 342", plate: "QL 12 AB 1234", speed: "72 mph", fuel: 35, alerts: 0, year: "2023", make: "Peterbilt 579", mileage: "42,100 km", lastService: "20 Feb 2025", nextService: "20 May 2025", vin: "1XPBDP9X8ND123456" },
  { id: "V-301", name: "Van V-301", type: "van", driver: "Priya Patel", driverId: "D-005", status: "idle", utilization: 30, location: "Houston Hub Parking", plate: "TX 99 ZZ 5544", speed: "0 mph", fuel: 91, alerts: 0, year: "2022", make: "Ford Transit", mileage: "33,600 km", lastService: "05 Mar 2025", nextService: "05 Jun 2025", vin: "1FTBW2CM7NKA12345" },
  { id: "T-220", name: "Truck T-220", type: "truck", driver: "Emma Johnson", driverId: "D-006", status: "active", utilization: 65, location: "US-75, Dallas", plate: "GA 07 BC 3311", speed: "58 mph", fuel: 62, alerts: 0, year: "2021", make: "Freightliner Cascadia", mileage: "88,900 km", lastService: "15 Feb 2025", nextService: "15 May 2025", vin: "3AKJHHDR7MSNA1234" },
  { id: "V-112", name: "Van V-112", type: "van", driver: "Raj Sharma", driverId: "D-007", status: "offline", utilization: 0, location: "Last: Miami Port", plate: "FL 23 MN 8800", speed: "N/A", fuel: 0, alerts: 1, year: "2019", make: "RAM ProMaster", mileage: "142,300 km", lastService: "02 Jan 2025", nextService: "02 Apr 2025", vin: "3C6TRVDG8KE123456" },
  { id: "T-330", name: "Truck T-330", type: "truck", driver: "David Kim", driverId: "D-008", status: "active", utilization: 82, location: "I-95 North, Philadelphia", plate: "PA 66 TK 4422", speed: "70 mph", fuel: 55, alerts: 0, year: "2022", make: "Mack Anthem", mileage: "76,400 km", lastService: "08 Mar 2025", nextService: "08 Jun 2025", vin: "1M1AW07Y4NM123456" },
  { id: "V-419", name: "Van V-419", type: "van", driver: "Ana Torres", driverId: "D-009", status: "idle", utilization: 20, location: "Phoenix Central Hub", plate: "AZ 44 XP 9901", speed: "0 mph", fuel: 78, alerts: 0, year: "2023", make: "Mercedes Sprinter", mileage: "18,700 km", lastService: "12 Mar 2025", nextService: "12 Jun 2025", vin: "WDB9066351S654321" },
];

const drivers = [
  { id: "D-001", name: "John Doe", license: "CDL-A | #JD-482910", phone: "+1 (555) 012-3456", status: "on-duty", rating: 4.9, experience: "5 yrs", totalTrips: 248, avatar: "JD", joinDate: "Jan 2020" },
  { id: "D-002", name: "Sarah Lee", license: "CDL-B | #SL-291847", phone: "+1 (555) 023-4567", status: "on-duty", rating: 4.7, experience: "3 yrs", totalTrips: 192, avatar: "SL", joinDate: "Mar 2022" },
  { id: "D-003", name: "Mike Chen", license: "CDL-A | #MC-374821", phone: "+1 (555) 034-5678", status: "off-duty", rating: 4.8, experience: "7 yrs", totalTrips: 310, avatar: "MC", joinDate: "Nov 2018" },
  { id: "D-004", name: "Carlos Rivera", license: "CDL-A | #CR-485920", phone: "+1 (555) 045-6789", status: "on-duty", rating: 4.6, experience: "4 yrs", totalTrips: 175, avatar: "CR", joinDate: "Jun 2021" },
  { id: "D-005", name: "Priya Patel", license: "CDL-B | #PP-591038", phone: "+1 (555) 056-7890", status: "idle", rating: 4.9, experience: "2 yrs", totalTrips: 143, avatar: "PP", joinDate: "Feb 2023" },
  { id: "D-006", name: "Emma Johnson", license: "CDL-A | #EJ-682910", phone: "+1 (555) 067-8901", status: "on-duty", rating: 4.8, experience: "6 yrs", totalTrips: 221, avatar: "EJ", joinDate: "Aug 2019" },
  { id: "D-007", name: "Raj Sharma", license: "CDL-A | #RS-773021", phone: "+1 (555) 078-9012", status: "off-duty", rating: 4.5, experience: "4 yrs", totalTrips: 198, avatar: "RS", joinDate: "Apr 2021" },
  { id: "D-008", name: "David Kim", license: "CDL-A | #DK-864182", phone: "+1 (555) 089-0123", status: "on-duty", rating: 4.7, experience: "5 yrs", totalTrips: 289, avatar: "DK", joinDate: "Sep 2020" },
  { id: "D-009", name: "Ana Torres", license: "CDL-B | #AT-955304", phone: "+1 (555) 090-1234", status: "idle", rating: 4.6, experience: "2 yrs", totalTrips: 112, avatar: "AT", joinDate: "Jan 2024" },
];

const parts = [
  { id: "P-001", partName: "Air Filter", partNumber: "AF-4521-HD", truck: "T-101", quantity: 2, unit: "pcs", status: "issued", dateIssued: "12 Mar 2025", issuedBy: "James Carter", cost: 45.00 },
  { id: "P-002", partName: "Brake Pads (Front)", partNumber: "BP-7832-FR", truck: "T-108", quantity: 4, unit: "sets", status: "issued", dateIssued: "11 Mar 2025", issuedBy: "James Carter", cost: 220.00 },
  { id: "P-003", partName: "Engine Oil 15W-40", partNumber: "OL-1540-5L", truck: "T-115", quantity: 10, unit: "litres", status: "pending", dateIssued: "13 Mar 2025", issuedBy: "Maria Santos", cost: 85.50 },
  { id: "P-004", partName: "Fan Belt", partNumber: "FB-2291-VBX", truck: "V-204", quantity: 1, unit: "pcs", status: "issued", dateIssued: "10 Mar 2025", issuedBy: "James Carter", cost: 32.00 },
  { id: "P-005", partName: "Fuel Injector", partNumber: "FI-9034-DI", truck: "T-330", quantity: 6, unit: "pcs", status: "issued", dateIssued: "09 Mar 2025", issuedBy: "Maria Santos", cost: 540.00 },
  { id: "P-006", partName: "Coolant Fluid", partNumber: "CF-3310-GL", truck: "T-220", quantity: 5, unit: "litres", status: "returned", dateIssued: "08 Mar 2025", issuedBy: "James Carter", cost: 28.00 },
  { id: "P-007", partName: "Alternator", partNumber: "AL-6651-AMB", truck: "V-112", quantity: 1, unit: "pcs", status: "pending", dateIssued: "13 Mar 2025", issuedBy: "Maria Santos", cost: 310.00 },
  { id: "P-008", partName: "Shock Absorbers (Rear)", partNumber: "SA-8812-RR", truck: "V-301", quantity: 2, unit: "pcs", status: "issued", dateIssued: "07 Mar 2025", issuedBy: "James Carter", cost: 195.00 },
  { id: "P-009", partName: "Headlight Bulb H7", partNumber: "HB-1107-H7", truck: "V-419", quantity: 4, unit: "pcs", status: "issued", dateIssued: "06 Mar 2025", issuedBy: "Maria Santos", cost: 18.00 },
  { id: "P-010", partName: "Transmission Fluid", partNumber: "TF-5520-QT", truck: "T-101", quantity: 4, unit: "litres", status: "returned", dateIssued: "05 Mar 2025", issuedBy: "James Carter", cost: 62.00 },
];

const tyreRecords = [
  {
    truckId: "T-101",
    tyres: [
      { pos: "FL", brand: "Michelin X-Works", size: "295/80R22.5", condition: "good", mileage: 42000, nextChange: "Jul 2025" },
      { pos: "FR", brand: "Michelin X-Works", size: "295/80R22.5", condition: "good", mileage: 42000, nextChange: "Jul 2025" },
      { pos: "RL", brand: "Bridgestone M789", size: "295/80R22.5", condition: "worn", mileage: 71000, nextChange: "Apr 2025" },
      { pos: "RR", brand: "Bridgestone M789", size: "295/80R22.5", condition: "critical", mileage: 87000, nextChange: "Overdue" },
      { pos: "Spare", brand: "Continental HDR2", size: "295/80R22.5", condition: "new", mileage: 0, nextChange: "N/A" },
    ]
  },
  {
    truckId: "T-108",
    tyres: [
      { pos: "FL", brand: "Continental HDR2", size: "315/80R22.5", condition: "new", mileage: 8000, nextChange: "Aug 2025" },
      { pos: "FR", brand: "Continental HDR2", size: "315/80R22.5", condition: "new", mileage: 8000, nextChange: "Aug 2025" },
      { pos: "RL", brand: "Continental HDR2", size: "315/80R22.5", condition: "good", mileage: 35000, nextChange: "May 2025" },
      { pos: "RR", brand: "Continental HDR2", size: "315/80R22.5", condition: "good", mileage: 35000, nextChange: "May 2025" },
      { pos: "Spare", brand: "Goodyear KMAX S", size: "315/80R22.5", condition: "good", mileage: 12000, nextChange: "N/A" },
    ]
  },
  {
    truckId: "T-115",
    tyres: [
      { pos: "FL", brand: "Goodyear KMAX S", size: "295/80R22.5", condition: "worn", mileage: 65000, nextChange: "Apr 2025" },
      { pos: "FR", brand: "Goodyear KMAX S", size: "295/80R22.5", condition: "worn", mileage: 65000, nextChange: "Apr 2025" },
      { pos: "RL", brand: "Michelin X-Works", size: "295/80R22.5", condition: "good", mileage: 45000, nextChange: "Jun 2025" },
      { pos: "RR", brand: "Michelin X-Works", size: "295/80R22.5", condition: "good", mileage: 45000, nextChange: "Jun 2025" },
      { pos: "Spare", brand: "Bridgestone M789", size: "295/80R22.5", condition: "new", mileage: 0, nextChange: "N/A" },
    ]
  },
  {
    truckId: "T-220",
    tyres: [
      { pos: "FL", brand: "Michelin X-Works", size: "295/80R22.5", condition: "good", mileage: 28000, nextChange: "Jun 2025" },
      { pos: "FR", brand: "Michelin X-Works", size: "295/80R22.5", condition: "good", mileage: 28000, nextChange: "Jun 2025" },
      { pos: "RL", brand: "Goodyear KMAX S", size: "295/80R22.5", condition: "critical", mileage: 92000, nextChange: "Overdue" },
      { pos: "RR", brand: "Goodyear KMAX S", size: "295/80R22.5", condition: "worn", mileage: 74000, nextChange: "Mar 2025" },
      { pos: "Spare", brand: "Michelin X-Works", size: "295/80R22.5", condition: "good", mileage: 15000, nextChange: "N/A" },
    ]
  },
];

const orders = [
  { id: "ORD-2025-001", customer: "Amazon Logistics", origin: "New York, NY", destination: "Boston, MA", status: "completed", truck: "T-101", weight: "12.4t", date: "13 Mar 2025", eta: "Delivered", distance: "215 km" },
  { id: "ORD-2025-002", customer: "FedEx Supply Chain", origin: "Los Angeles, CA", destination: "San Diego, CA", status: "in-transit", truck: "V-204", weight: "3.8t", date: "13 Mar 2025", eta: "45 min", distance: "193 km" },
  { id: "ORD-2025-003", customer: "UPS Freight", origin: "Chicago, IL", destination: "Detroit, MI", status: "delayed", truck: "T-108", weight: "18.2t", date: "12 Mar 2025", eta: "3h 20m", distance: "457 km" },
  { id: "ORD-2025-004", customer: "DHL Express", origin: "Phoenix, AZ", destination: "Las Vegas, NV", status: "in-transit", truck: "T-115", weight: "9.1t", date: "13 Mar 2025", eta: "3h 50m", distance: "470 km" },
  { id: "ORD-2025-005", customer: "Walmart Distribution", origin: "Houston, TX", destination: "Dallas, TX", status: "completed", truck: "V-301", weight: "5.5t", date: "12 Mar 2025", eta: "Delivered", distance: "386 km" },
  { id: "ORD-2025-006", customer: "Home Depot Supply", origin: "Atlanta, GA", destination: "Dallas, TX", status: "in-transit", truck: "T-220", weight: "15.7t", date: "13 Mar 2025", eta: "5h 10m", distance: "1240 km" },
  { id: "ORD-2025-007", customer: "Best Buy Logistics", origin: "Miami, FL", destination: "Orlando, FL", status: "pending", truck: "V-112", weight: "2.3t", date: "14 Mar 2025", eta: "Scheduled", distance: "381 km" },
  { id: "ORD-2025-008", customer: "Target Distribution", origin: "Philadelphia, PA", destination: "New York, NY", status: "in-transit", truck: "T-330", weight: "11.0t", date: "13 Mar 2025", eta: "1h 20m", distance: "152 km" },
  { id: "ORD-2025-009", customer: "Nike Supply Chain", origin: "Phoenix, AZ", destination: "Tucson, AZ", status: "completed", truck: "V-419", weight: "4.2t", date: "12 Mar 2025", eta: "Delivered", distance: "185 km" },
];

// ─── Configs ────────────────────────────────────────────────────────────────

const vehicleStatusConfig: Record<string, { label: string; dot: string; pill: string }> = {
  active: { label: "Active", dot: "status-dot-active", pill: "pill-success" },
  idle: { label: "Idle", dot: "status-dot-idle", pill: "pill-warning" },
  maintenance: { label: "Maintenance", dot: "status-dot-idle", pill: "pill-primary" },
  offline: { label: "Offline", dot: "status-dot-offline", pill: "pill-danger" },
};

const orderStatusConfig: Record<string, { label: string; pill: string }> = {
  completed: { label: "Completed", pill: "pill-success" },
  "in-transit": { label: "In Transit", pill: "pill-primary" },
  delayed: { label: "Delayed", pill: "pill-danger" },
  pending: { label: "Pending", pill: "pill-warning" },
};

const partsStatusConfig: Record<string, { label: string; pill: string }> = {
  issued: { label: "Issued", pill: "pill-success" },
  pending: { label: "Pending", pill: "pill-warning" },
  returned: { label: "Returned", pill: "pill-primary" },
};

const conditionConfig: Record<string, { label: string; pill: string; bg: string }> = {
  new: { label: "New", pill: "pill-success", bg: "hsl(160 84% 39%)" },
  good: { label: "Good", pill: "pill-primary", bg: "hsl(217 91% 60%)" },
  worn: { label: "Worn", pill: "pill-warning", bg: "hsl(38 92% 50%)" },
  critical: { label: "Critical", pill: "pill-danger", bg: "hsl(0 84% 60%)" },
};

const avatarColors = [
  "hsl(217 91% 60%)", "hsl(160 84% 39%)", "hsl(38 92% 50%)",
  "hsl(280 65% 60%)", "hsl(0 84% 60%)", "hsl(217 91% 70%)"
];

const driverStatusConfig: Record<string, { label: string; pill: string }> = {
  "on-duty": { label: "On Duty", pill: "pill-success" },
  idle: { label: "Idle", pill: "pill-warning" },
  "off-duty": { label: "Off Duty", pill: "pill-danger" },
};

// ─── Component ───────────────────────────────────────────────────────────────

interface Props {
  vehicleId: string;
  onBack: () => void;
}

export default function VehicleDetailPage({ vehicleId, onBack }: Props) {
  const vehicle = vehicles.find(v => v.id === vehicleId);
  if (!vehicle) {
    return (
      <div className="text-center py-20 text-muted-foreground">
        <Truck className="w-12 h-12 mx-auto mb-3 opacity-30" />
        <p className="font-medium">Vehicle not found</p>
        <button onClick={onBack} className="mt-4 text-primary text-sm hover:underline flex items-center gap-1 mx-auto">
          <ArrowLeft className="w-4 h-4" />Back to Fleet
        </button>
      </div>
    );
  }

  const driver = drivers.find(d => d.id === vehicle.driverId);
  const vehicleParts = parts.filter(p => p.truck === vehicle.id);
  const vehicleOrders = orders.filter(o => o.truck === vehicle.id);
  const tyreRecord = tyreRecords.find(t => t.truckId === vehicle.id);
  const vCfg = vehicleStatusConfig[vehicle.status];
  const driverIdx = drivers.findIndex(d => d.id === vehicle.driverId);
  const avatarBg = avatarColors[driverIdx % avatarColors.length];
  const partsCost = vehicleParts.filter(p => p.status !== "returned").reduce((acc, p) => acc + p.cost * p.quantity, 0);

  return (
    <div className="space-y-6 animate-slide-in">
      {/* Back + Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-3 py-2 text-sm rounded-lg border border-border bg-card hover:bg-muted transition-colors text-foreground"
        >
          <ArrowLeft className="w-4 h-4" />Back
        </button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-foreground">{vehicle.name}</h1>
          <p className="text-muted-foreground text-sm">{vehicle.plate} · {vehicle.make} · {vehicle.year}</p>
        </div>
        <span className={vCfg.pill}><span className={`${vCfg.dot} mr-1`} />{vCfg.label}</span>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
          <Edit className="w-4 h-4" />Edit Vehicle
        </button>
      </div>

      {/* ── TOP ROW: Vehicle hero + quick stats ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Vehicle hero card */}
        <div className="card-fleet overflow-hidden lg:col-span-2">
          <div className="relative h-48 bg-gradient-to-br from-primary/10 via-muted/40 to-muted/10 flex items-center justify-center border-b border-border">
            <img
              src={truckImg}
              alt={vehicle.name}
              className="h-36 object-contain drop-shadow-xl"
              style={{
                filter: vehicle.status === "offline" ? "grayscale(100%) opacity(0.5)"
                  : vehicle.status === "maintenance" ? "sepia(60%) opacity(0.8)"
                  : "none"
              }}
            />
            {vehicle.alerts > 0 && (
              <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-destructive/10 border border-destructive/30 text-destructive text-xs font-semibold px-2.5 py-1.5 rounded-lg">
                <AlertTriangle className="w-3.5 h-3.5" />{vehicle.alerts} Active Alert{vehicle.alerts > 1 ? "s" : ""}
              </div>
            )}
            <div className="absolute bottom-3 left-3 bg-black/30 backdrop-blur-sm text-white text-sm font-bold px-3 py-1 rounded-lg">
              {vehicle.id}
            </div>
          </div>

          <div className="p-5 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Make / Model", value: vehicle.make, icon: Truck },
              { label: "Year", value: vehicle.year, icon: Calendar },
              { label: "Mileage", value: vehicle.mileage, icon: Activity },
              { label: "VIN", value: vehicle.vin, icon: RefreshCw },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label}>
                <div className="flex items-center gap-1.5 mb-1">
                  <Icon className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{label}</span>
                </div>
                <p className="text-sm font-semibold text-foreground truncate">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick stats */}
        <div className="flex flex-col gap-4">
          {/* Location */}
          <div className="card-fleet p-4 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-4.5 h-4.5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Current Location</p>
              <p className="text-sm font-semibold text-foreground">{vehicle.location}</p>
            </div>
          </div>

          {/* Speed + Fuel */}
          <div className="grid grid-cols-2 gap-3">
            <div className="card-fleet p-4 text-center">
              <Navigation className="w-5 h-5 text-primary mx-auto mb-1" />
              <p className="text-lg font-bold text-foreground">{vehicle.speed}</p>
              <p className="text-xs text-muted-foreground">Speed</p>
            </div>
            <div className="card-fleet p-4 text-center">
              <Fuel className="w-5 h-5 mx-auto mb-1" style={{ color: `hsl(${vehicle.fuel > 50 ? "160 84% 39%" : vehicle.fuel > 25 ? "38 92% 50%" : "0 84% 60%"})` }} />
              <p className="text-lg font-bold text-foreground">{vehicle.fuel}%</p>
              <p className="text-xs text-muted-foreground">Fuel</p>
            </div>
          </div>

          {/* Utilization */}
          <div className="card-fleet p-4">
            <div className="flex justify-between text-xs mb-2">
              <span className="text-muted-foreground">Today's Utilization</span>
              <span className="font-bold text-foreground">{vehicle.utilization}%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${vehicle.utilization}%` }} />
            </div>
          </div>

          {/* Service */}
          <div className="card-fleet p-4 space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Service Schedule</p>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Last Service</span>
              <span className="font-medium text-foreground">{vehicle.lastService}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Next Service</span>
              <span className="font-medium text-primary">{vehicle.nextService}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── ASSIGNED DRIVER ── */}
      <div className="card-fleet p-5">
        <h2 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
          <User className="w-4 h-4 text-primary" />Assigned Driver
        </h2>
        {driver ? (
          <div className="flex flex-wrap items-center gap-5">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow" style={{ background: avatarBg }}>
                {driver.avatar}
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-base">{driver.name}</h3>
                <p className="text-xs text-muted-foreground">{driver.license}</p>
                <span className={`${driverStatusConfig[driver.status].pill} mt-1 inline-flex`}>{driverStatusConfig[driver.status].label}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-6 ml-0 lg:ml-6">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-foreground">{driver.phone}</span>
              </div>
              <div className="text-center">
                <div className="flex items-center gap-0.5 justify-center">
                  <Star className="w-4 h-4 text-warning fill-warning" />
                  <span className="text-lg font-bold text-foreground">{driver.rating}</span>
                </div>
                <p className="text-xs text-muted-foreground">Rating</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-foreground">{driver.totalTrips}</p>
                <p className="text-xs text-muted-foreground">Total Trips</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-foreground">{driver.experience}</p>
                <p className="text-xs text-muted-foreground">Experience</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-foreground">Since {driver.joinDate}</p>
                <p className="text-xs text-muted-foreground">Joined</p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No driver currently assigned</p>
        )}
      </div>

      {/* ── TYRES + ORDERS ROW ── */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">

        {/* Tyre status */}
        <div className="card-fleet p-5">
          <h2 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <CircleDot className="w-4 h-4 text-primary" />Tyre Status
          </h2>
          {tyreRecord ? (
            <>
              {/* Mini tyre diagram */}
              <div className="bg-muted/30 rounded-xl p-4 mb-4">
                <div className="flex items-center justify-center gap-6">
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-xs text-muted-foreground">Front</p>
                    <div className="flex gap-6">
                      {tyreRecord.tyres.filter(t => t.pos === "FL" || t.pos === "FR").map(t => {
                        const cfg = conditionConfig[t.condition];
                        return (
                          <div key={t.pos} className="flex flex-col items-center gap-1">
                            <div className="w-7 h-9 rounded-sm border-2 flex items-center justify-center text-xs font-bold text-white shadow" style={{ backgroundColor: cfg.bg, borderColor: cfg.bg }}>
                              {t.pos}
                            </div>
                            <span className="text-xs text-muted-foreground">{t.pos}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="w-12 h-16 rounded-lg bg-muted border-2 border-border flex items-center justify-center">
                    <Truck className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-xs text-muted-foreground">Rear</p>
                    <div className="flex gap-6">
                      {tyreRecord.tyres.filter(t => t.pos === "RL" || t.pos === "RR").map(t => {
                        const cfg = conditionConfig[t.condition];
                        return (
                          <div key={t.pos} className="flex flex-col items-center gap-1">
                            <div className="w-7 h-9 rounded-sm border-2 flex items-center justify-center text-xs font-bold text-white shadow" style={{ backgroundColor: cfg.bg, borderColor: cfg.bg }}>
                              {t.pos}
                            </div>
                            <span className="text-xs text-muted-foreground">{t.pos}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-xs text-muted-foreground">Spare</p>
                    {tyreRecord.tyres.filter(t => t.pos === "Spare").map(t => {
                      const cfg = conditionConfig[t.condition];
                      return (
                        <div key={t.pos} className="flex flex-col items-center gap-1">
                          <div className="w-7 h-9 rounded-sm border-2 flex items-center justify-center text-xs font-bold text-white shadow" style={{ backgroundColor: cfg.bg, borderColor: cfg.bg }}>
                            S
                          </div>
                          <span className="text-xs text-muted-foreground">Spare</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              {/* Tyre list */}
              <div className="space-y-2">
                {tyreRecord.tyres.map(tyre => {
                  const cfg = conditionConfig[tyre.condition];
                  return (
                    <div key={tyre.pos} className="flex items-center gap-3 py-1.5 border-b border-border last:border-0 text-xs">
                      <span className="w-8 font-bold text-foreground">{tyre.pos}</span>
                      <span className="flex-1 text-muted-foreground truncate">{tyre.brand} · {tyre.size}</span>
                      <span className="text-muted-foreground whitespace-nowrap">{tyre.mileage.toLocaleString()} km</span>
                      <span className="text-muted-foreground whitespace-nowrap">Next: {tyre.nextChange}</span>
                      <span className={cfg.pill}>{cfg.label}</span>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <p className="text-sm text-muted-foreground py-4 text-center">No tyre records for this vehicle</p>
          )}
        </div>

        {/* Recent orders */}
        <div className="card-fleet p-5">
          <h2 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <Package className="w-4 h-4 text-primary" />Recent Orders ({vehicleOrders.length})
          </h2>
          {vehicleOrders.length > 0 ? (
            <div className="space-y-3">
              {vehicleOrders.map(order => {
                const cfg = orderStatusConfig[order.status];
                return (
                  <div key={order.id} className="p-3 rounded-xl border border-border hover:bg-muted/30 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <span className="font-mono text-xs font-bold text-primary">{order.id}</span>
                        <p className="text-sm font-semibold text-foreground">{order.customer}</p>
                      </div>
                      <span className={cfg.pill}>{cfg.label}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                      <MapPin className="w-3 h-3 text-primary flex-shrink-0" />
                      {order.origin} → {order.destination}
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground pt-1 border-t border-border">
                      <span>{order.date}</span>
                      <span>{order.distance}</span>
                      <span className="font-semibold text-foreground">ETA: {order.eta}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground py-4 text-center">No orders for this vehicle</p>
          )}
        </div>
      </div>

      {/* ── PARTS HISTORY ── */}
      <div className="card-fleet p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Package className="w-4 h-4 text-primary" />Parts History
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Total cost:</span>
            <span className="text-sm font-bold text-foreground">${partsCost.toFixed(2)}</span>
          </div>
        </div>
        {vehicleParts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  {["Part Name", "Part No.", "Qty", "Issued By", "Date", "Cost", "Status"].map(h => (
                    <th key={h} className="text-left py-2.5 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {vehicleParts.map(part => {
                  const cfg = partsStatusConfig[part.status];
                  return (
                    <tr key={part.id} className="hover:bg-muted/30 transition-colors">
                      <td className="py-2.5 px-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Package className="w-3.5 h-3.5 text-primary" />
                          </div>
                          <span className="font-medium text-foreground">{part.partName}</span>
                        </div>
                      </td>
                      <td className="py-2.5 px-3 font-mono text-xs text-muted-foreground">{part.partNumber}</td>
                      <td className="py-2.5 px-3 font-semibold text-foreground whitespace-nowrap">{part.quantity} {part.unit}</td>
                      <td className="py-2.5 px-3 text-muted-foreground text-xs">{part.issuedBy}</td>
                      <td className="py-2.5 px-3 text-muted-foreground whitespace-nowrap text-xs">{part.dateIssued}</td>
                      <td className="py-2.5 px-3 font-semibold text-foreground">${(part.cost * part.quantity).toFixed(2)}</td>
                      <td className="py-2.5 px-3"><span className={cfg.pill}>{cfg.label}</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <Package className="w-10 h-10 mx-auto mb-2 opacity-30" />
            <p className="text-sm">No parts records for this vehicle</p>
          </div>
        )}
      </div>
    </div>
  );
}
