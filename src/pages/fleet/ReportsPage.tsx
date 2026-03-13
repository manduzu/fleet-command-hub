import { TrendingUp, TrendingDown, BarChart3, FileText, Download, Calendar, Truck, Clock, Zap, Target } from "lucide-react";

const reportKpis = [
  { label: "Total Distance", value: "4,523", unit: "km", trend: "+12.3%", trendUp: true, icon: Target, color: "hsl(217 91% 60%)" },
  { label: "Avg Trip Duration", value: "3.2", unit: "hrs", trend: "-5.1%", trendUp: false, icon: Clock, color: "hsl(38 92% 50%)" },
  { label: "Fleet Uptime", value: "98.3", unit: "%", trend: "+0.8%", trendUp: true, icon: Zap, color: "hsl(160 84% 39%)" },
  { label: "On-Time Delivery", value: "91.7", unit: "%", trend: "+3.2%", trendUp: true, icon: Truck, color: "hsl(280 65% 60%)" },
];

const fuelData = [
  { month: "Jan", value: 680, label: "680L" },
  { month: "Feb", value: 820, label: "820L" },
  { month: "Mar", value: 750, label: "750L" },
  { month: "Apr", value: 900, label: "900L" },
  { month: "May", value: 760, label: "760L" },
  { month: "Jun", value: 840, label: "840L" },
];

const maxFuel = Math.max(...fuelData.map(d => d.value));

const recentReports = [
  { name: "Monthly Operations Report", date: "Apr 10, 2025", type: "Operations", size: "2.4 MB" },
  { name: "Fuel Efficiency Analysis", date: "Apr 09, 2025", type: "Fuel", size: "1.1 MB" },
  { name: "Driver Performance Review", date: "Apr 08, 2025", type: "HR", size: "3.2 MB" },
  { name: "Route Optimization Summary", date: "Apr 05, 2025", type: "Logistics", size: "0.8 MB" },
  { name: "Fleet Maintenance Log", date: "Apr 02, 2025", type: "Maintenance", size: "1.7 MB" },
  { name: "Weekly KPI Dashboard", date: "Mar 28, 2025", type: "Overview", size: "0.5 MB" },
];

const typeColor: Record<string, string> = {
  Operations: "pill-primary",
  Fuel: "pill-warning",
  HR: "pill-success",
  Logistics: "pill-success",
  Maintenance: "pill-danger",
  Overview: "pill-primary",
};

const utilizationData = [
  { label: "Trucks", value: 82, color: "hsl(217 91% 60%)" },
  { label: "Vans", value: 64, color: "hsl(160 84% 39%)" },
  { label: "Special", value: 45, color: "hsl(38 92% 50%)" },
];

export default function ReportsPage() {
  return (
    <div className="space-y-6 animate-slide-in">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Reports & Analytics</h1>
          <p className="text-muted-foreground text-sm mt-1">Track performance metrics and generate reports</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
          <FileText className="w-4 h-4" />New Report
        </button>
      </div>

      {/* Date range picker */}
      <div className="card-fleet p-5">
        <div className="flex items-center flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Report Period:</span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative">
              <input
                type="date"
                defaultValue="2025-04-01"
                className="px-3 py-2 text-sm bg-muted rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-foreground cursor-pointer"
              />
            </div>
            <span className="text-muted-foreground text-sm">to</span>
            <div className="relative">
              <input
                type="date"
                defaultValue="2025-04-30"
                className="px-3 py-2 text-sm bg-muted rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-foreground cursor-pointer"
              />
            </div>
          </div>
          <div className="flex gap-2 ml-auto">
            {["This Week", "This Month", "Last Quarter"].map(p => (
              <button key={p} className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${p === "This Month" ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:bg-muted"}`}>
                {p}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
            <BarChart3 className="w-4 h-4" />Generate Report
          </button>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {reportKpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div key={kpi.label} className="card-fleet p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{kpi.label}</p>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="text-3xl font-bold text-foreground">{kpi.value}</span>
                    <span className="text-sm text-muted-foreground">{kpi.unit}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-1.5">
                    {kpi.trendUp ? <TrendingUp className="w-3.5 h-3.5 text-success" /> : <TrendingDown className="w-3.5 h-3.5 text-destructive" />}
                    <span className={kpi.trendUp ? "trend-up" : "trend-down"}>{kpi.trend} vs last month</span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${kpi.color}20` }}>
                  <Icon className="w-5 h-5" style={{ color: kpi.color }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts + Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Fuel chart */}
        <div className="lg:col-span-3 card-fleet p-5">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-semibold text-foreground">Fuel Usage Over Time</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Monthly consumption in litres</p>
            </div>
            <select className="text-xs border border-border rounded-lg px-2 py-1.5 bg-background text-foreground focus:outline-none">
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          {/* Bar chart */}
          <div className="flex items-end gap-3 h-44">
            {fuelData.map((d) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-xs text-muted-foreground font-medium">{d.label}</span>
                <div
                  className="w-full rounded-t-md transition-all hover:opacity-80 cursor-pointer"
                  style={{
                    height: `${(d.value / maxFuel) * 140}px`,
                    background: `linear-gradient(180deg, hsl(217 91% 60%), hsl(217 91% 75%))`,
                    minHeight: 8,
                  }}
                />
                <span className="text-xs font-medium text-muted-foreground">{d.month}</span>
              </div>
            ))}
          </div>
          {/* Line chart mini */}
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-muted-foreground">Cost Trend</span>
              <span className="trend-up flex items-center gap-1"><TrendingUp className="w-3 h-3" />+8.3%</span>
            </div>
            <svg viewBox="0 0 300 40" className="w-full h-8">
              <polyline
                points="0,35 50,25 100,30 150,15 200,20 250,10 300,8"
                fill="none"
                stroke="hsl(217 91% 60%)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <polyline
                points="0,35 50,25 100,30 150,15 200,20 250,10 300,8"
                fill="url(#grad)"
                stroke="none"
                opacity="0.1"
              />
            </svg>
          </div>
        </div>

        {/* Vehicle utilization */}
        <div className="lg:col-span-2 card-fleet p-5">
          <div className="mb-4">
            <h2 className="font-semibold text-foreground">Vehicle Utilization</h2>
            <p className="text-xs text-muted-foreground mt-0.5">By fleet type this month</p>
          </div>
          {/* Donut simulation */}
          <div className="flex items-center justify-center my-4">
            <div className="relative w-32 h-32">
              <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="hsl(var(--muted))" strokeWidth="3.8" />
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="hsl(217 91% 60%)" strokeWidth="3.8"
                  strokeDasharray="51.6 100" strokeLinecap="round" />
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="hsl(160 84% 39%)" strokeWidth="3.8"
                  strokeDasharray="40.2 100" strokeDashoffset="-51.6" strokeLinecap="round" />
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="hsl(38 92% 50%)" strokeWidth="3.8"
                  strokeDasharray="28.3 100" strokeDashoffset="-91.8" strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-foreground">74%</span>
                <span className="text-xs text-muted-foreground">Avg</span>
              </div>
            </div>
          </div>
          <div className="space-y-3 mt-2">
            {utilizationData.map(d => (
              <div key={d.label}>
                <div className="flex justify-between text-xs mb-1">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                    <span className="text-foreground font-medium">{d.label}</span>
                  </div>
                  <span className="font-semibold text-foreground">{d.value}%</span>
                </div>
                <div className="progress-bar">
                  <div className="h-full rounded-full" style={{ width: `${d.value}%`, backgroundColor: d.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent reports table */}
      <div className="card-fleet p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-semibold text-foreground">Report History</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Previously generated reports</p>
          </div>
          <button className="flex items-center gap-2 px-3 py-1.5 text-sm border border-border rounded-lg hover:bg-muted transition-colors text-foreground">
            <Download className="w-4 h-4" />Export All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {["Report Name", "Date Generated", "Type", "Size", "Actions"].map(h => (
                  <th key={h} className="text-left py-2.5 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {recentReports.map(r => (
                <tr key={r.name} className="hover:bg-muted/30 transition-colors">
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <FileText className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <span className="font-medium text-foreground">{r.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-muted-foreground">{r.date}</td>
                  <td className="py-3 px-3"><span className={typeColor[r.type] ?? "pill-primary"}>{r.type}</span></td>
                  <td className="py-3 px-3 text-muted-foreground">{r.size}</td>
                  <td className="py-3 px-3">
                    <button className="flex items-center gap-1 text-xs text-primary hover:underline font-medium">
                      <Download className="w-3.5 h-3.5" />Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
