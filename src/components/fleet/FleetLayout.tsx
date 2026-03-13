import React from "react";
import type { FleetPage } from "@/App";
import {
  LayoutDashboard, Truck, MapPin, BarChart3, Bell, Search,
  ChevronRight, Package, Users, Calendar, Settings, LogOut,
  Menu, X
} from "lucide-react";
import { useState } from "react";

interface FleetLayoutProps {
  children: React.ReactNode;
  activePage: FleetPage;
  setActivePage: (page: FleetPage) => void;
}

const navItems = [
  { id: "dashboard" as FleetPage, label: "Dashboard", icon: LayoutDashboard },
  { id: "fleet" as FleetPage, label: "Fleet", icon: Truck },
  { id: "tracking" as FleetPage, label: "Tracking", icon: MapPin },
  { id: "reports" as FleetPage, label: "Reports", icon: BarChart3 },
];

const bottomItems = [
  { label: "Schedule", icon: Calendar },
  { label: "Team", icon: Users },
  { label: "Settings", icon: Settings },
];

export default function FleetLayout({ children, activePage, setActivePage }: FleetLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebar, setMobileSidebar] = useState(false);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Mobile overlay */}
      {mobileSidebar && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileSidebar(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:relative z-50 lg:z-auto flex flex-col h-full transition-all duration-300
          ${sidebarOpen ? "w-64" : "w-16"}
          ${mobileSidebar ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
        style={{ backgroundColor: "hsl(var(--sidebar-background))" }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 h-16 border-b border-sidebar-border">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
            <Truck className="w-4 h-4 text-white" />
          </div>
          {sidebarOpen && (
            <div className="animate-fade-in">
              <span className="text-white font-bold text-lg tracking-tight">FleetCtrl</span>
              <p className="text-sidebar-foreground text-xs opacity-60">Logistics Hub</p>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="ml-auto hidden lg:flex items-center justify-center w-6 h-6 rounded text-sidebar-foreground hover:text-white transition-colors"
          >
            <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${sidebarOpen ? "rotate-180" : ""}`} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {sidebarOpen && (
            <p className="text-xs font-semibold uppercase tracking-wider px-3 py-2 opacity-40 text-sidebar-foreground">
              Main Menu
            </p>
          )}
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { setActivePage(item.id); setMobileSidebar(false); }}
                className={`sidebar-item w-full ${isActive ? "sidebar-item-active" : "sidebar-item-inactive"} ${!sidebarOpen ? "justify-center" : ""}`}
                title={!sidebarOpen ? item.label : undefined}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {sidebarOpen && <span>{item.label}</span>}
                {sidebarOpen && isActive && <ChevronRight className="ml-auto w-3 h-3 opacity-70" />}
              </button>
            );
          })}

          {sidebarOpen && (
            <p className="text-xs font-semibold uppercase tracking-wider px-3 py-2 mt-4 opacity-40 text-sidebar-foreground">
              Management
            </p>
          )}
          {!sidebarOpen && <div className="border-t border-sidebar-border my-2" />}
          {bottomItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                className={`sidebar-item w-full sidebar-item-inactive ${!sidebarOpen ? "justify-center" : ""}`}
                title={!sidebarOpen ? item.label : undefined}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {sidebarOpen && <span>{item.label}</span>}
              </button>
            );
          })}

          {/* Shipment badge */}
          {sidebarOpen && (
            <div className="mt-4 mx-1 p-3 rounded-lg animate-fade-in" style={{ backgroundColor: "hsl(var(--sidebar-accent))" }}>
              <div className="flex items-center gap-2 mb-2">
                <Package className="w-4 h-4 text-primary" />
                <span className="text-xs font-semibold text-white">Active Shipments</span>
              </div>
              <div className="text-2xl font-bold text-white">42</div>
              <p className="text-xs text-sidebar-foreground opacity-70 mt-1">8 need attention</p>
              <div className="mt-2 h-1.5 rounded-full bg-black/20">
                <div className="h-full w-4/5 rounded-full bg-primary" />
              </div>
            </div>
          )}
        </nav>

        {/* User */}
        <div className="p-3 border-t border-sidebar-border">
          <div className={`flex items-center gap-3 px-2 py-2 rounded-lg cursor-pointer hover:bg-sidebar-accent transition-colors ${!sidebarOpen ? "justify-center" : ""}`}>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-bold">AD</span>
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">Admin User</p>
                <p className="text-xs text-sidebar-foreground opacity-60 truncate">admin@fleetctrl.com</p>
              </div>
            )}
            {sidebarOpen && <LogOut className="w-4 h-4 text-sidebar-foreground opacity-60 flex-shrink-0" />}
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-card border-b border-border flex items-center gap-4 px-4 lg:px-6 flex-shrink-0">
          <button
            onClick={() => setMobileSidebar(!mobileSidebar)}
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          >
            {mobileSidebar ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search vehicles, routes, drivers..."
                className="w-full pl-9 pr-4 py-2 text-sm bg-muted rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground"
              />
            </div>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-destructive" />
            </button>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center cursor-pointer">
              <span className="text-white text-xs font-bold">AD</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
