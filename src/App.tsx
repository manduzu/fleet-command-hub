import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import FleetLayout from "@/components/fleet/FleetLayout";
import DashboardPage from "@/pages/fleet/DashboardPage";
import FleetPage from "@/pages/fleet/FleetPage";
import TrackingPage from "@/pages/fleet/TrackingPage";
import ReportsPage from "@/pages/fleet/ReportsPage";
import DriversPage from "@/pages/fleet/DriversPage";
import PartsPage from "@/pages/fleet/PartsPage";
import TyresPage from "@/pages/fleet/TyresPage";
import OrdersPage from "@/pages/fleet/OrdersPage";

const queryClient = new QueryClient();

export type FleetPage =
  | "dashboard"
  | "fleet"
  | "tracking"
  | "reports"
  | "drivers"
  | "parts"
  | "tyres"
  | "orders";

const App = () => {
  const [activePage, setActivePage] = useState<FleetPage>("dashboard");

  const renderPage = () => {
    switch (activePage) {
      case "dashboard": return <DashboardPage />;
      case "fleet":     return <FleetPage />;
      case "tracking":  return <TrackingPage />;
      case "reports":   return <ReportsPage />;
      case "drivers":   return <DriversPage />;
      case "parts":     return <PartsPage />;
      case "tyres":     return <TyresPage />;
      case "orders":    return <OrdersPage />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Sonner />
      <FleetLayout activePage={activePage} setActivePage={setActivePage}>
        {renderPage()}
      </FleetLayout>
    </QueryClientProvider>
  );
};

export default App;
