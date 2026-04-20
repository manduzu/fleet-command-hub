// Shared sidebar for tyre module pages
function renderSidebar(active){
  const html = `
  <div class="px-4 py-4 flex items-center gap-2 border-b border-slate-800">
    <div class="w-9 h-9 rounded-lg bg-brand-600 flex items-center justify-center text-white"><i class="fas fa-truck-fast"></i></div>
    <div><div class="text-white font-bold text-sm">FleetCtrl</div><div class="text-[10px] text-slate-500 uppercase tracking-wider">ERP Suite</div></div>
  </div>
  <nav class="px-2 py-3 flex-1">
    <a href="dashboard.html" class="nav-link"><i class="fas fa-gauge-high w-4"></i>Dashboard</a>
    <a href="tracking.html" class="nav-link"><i class="fas fa-location-dot w-4"></i>Live Tracking</a>
    <div class="nav-section">Logistics</div>
    <a href="create-trip.html" class="nav-link"><i class="fas fa-route w-4"></i>Create Trip</a>
    <a href="pending-trips.html" class="nav-link"><i class="fas fa-hourglass-half w-4"></i>Pending Trips</a>
    <a href="complete-trips.html" class="nav-link"><i class="fas fa-flag-checkered w-4"></i>Completed Trips</a>
    <div class="nav-section">Fleet</div>
    <a href="trucks.html" class="nav-link"><i class="fas fa-truck w-4"></i>Trucks</a>
    <a href="trailers.html" class="nav-link"><i class="fas fa-trailer w-4"></i>Trailers</a>
    <a href="drivers.html" class="nav-link"><i class="fas fa-id-card w-4"></i>Drivers</a>
    <div class="nav-section">Incidents</div>
    <a href="breakdowns.html" class="nav-link"><i class="fas fa-screwdriver-wrench w-4"></i>Breakdowns</a>
    <a href="accidents.html" class="nav-link"><i class="fas fa-car-burst w-4"></i>Accidents</a>
    <div class="nav-section">Workshop</div>
    <a href="parts.html" class="nav-link"><i class="fas fa-gears w-4"></i>Parts</a>
    <button class="dropdown-btn open" onclick="this.classList.toggle('open');document.getElementById('tyreDD').classList.toggle('open');">
      <i class="fas fa-circle-notch w-4"></i><span class="flex-1 text-left">Tyre Management</span><i class="fas fa-chevron-down text-[10px]"></i>
    </button>
    <div class="dropdown-items open" id="tyreDD">
      <a href="tyres.html" class="sub-link ${active==='home'?'active':''}"><i class="fas fa-house w-4"></i>Command Center</a>
      <a href="tyres-archive.html" class="sub-link ${active==='archive'?'active':''}"><i class="fas fa-warehouse w-4"></i>Tyre Register</a>
      <a href="tyres-fitment.html" class="sub-link ${active==='fitment'?'active':''}"><i class="fas fa-truck-monster w-4"></i>Vehicle Fitment</a>
      <a href="tyres-inspection.html" class="sub-link ${active==='inspection'?'active':''}"><i class="fas fa-clipboard-check w-4"></i>Inspections</a>
      <a href="tyres-rotation.html" class="sub-link ${active==='rotation'?'active':''}"><i class="fas fa-rotate w-4"></i>Rotation & Replace</a>
      <a href="tyre-detail.html" class="sub-link ${active==='detail'?'active':''}"><i class="fas fa-magnifying-glass-chart w-4"></i>Tyre Lifecycle</a>
    </div>
  </nav>`;
  document.getElementById('sidebar').innerHTML = html;
}
