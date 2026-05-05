// Shared sidebar for Store / Workshop / Procurement pages
function renderStoreSidebar(active){
  const A = (k)=> active===k ? 'active' : '';
  document.getElementById('sidebar').innerHTML = `
  <div class="px-4 py-4 flex items-center gap-2 border-b border-slate-800">
    <div class="w-9 h-9 rounded-lg bg-brand-600 flex items-center justify-center text-white"><i class="fas fa-truck-fast"></i></div>
    <div><div class="text-white font-bold text-sm">FleetCtrl</div><div class="text-[10px] text-slate-500 uppercase tracking-wider">ERP Suite</div></div>
  </div>
  <nav class="px-2 py-3 flex-1 overflow-y-auto">
    <a href="dashboard.html" class="nav-link"><i class="fas fa-gauge-high w-4"></i>Dashboard</a>
    <a href="tracking.html" class="nav-link"><i class="fas fa-location-dot w-4"></i>Live Tracking</a>

    <div class="nav-section">Fleet</div>
    <a href="trucks.html" class="nav-link"><i class="fas fa-truck w-4"></i>Trucks</a>
    <a href="trailers.html" class="nav-link"><i class="fas fa-trailer w-4"></i>Trailers</a>
    <a href="drivers.html" class="nav-link"><i class="fas fa-id-card w-4"></i>Drivers</a>

    <div class="nav-section">Stores Command</div>
    <a href="store-command-center.html" class="nav-link ${A('cmd')}"><i class="fas fa-warehouse w-4"></i>Command Center</a>
    <button class="dropdown-btn open" onclick="this.classList.toggle('open');document.getElementById('procDD').classList.toggle('open');">
      <i class="fas fa-file-invoice w-4"></i><span class="flex-1 text-left">Procurement</span><i class="fas fa-chevron-down text-[10px]"></i>
    </button>
    <div class="dropdown-items open" id="procDD">
      <a href="lpo-archive.html" class="sub-link ${A('lpo')}"><i class="fas fa-clipboard-list w-4"></i>LPOs</a>
      <a href="grn-archive.html" class="sub-link ${A('grn')}"><i class="fas fa-truck-ramp-box w-4"></i>GRNs</a>
      <a href="purchase-invoice-archive.html" class="sub-link ${A('pinv')}"><i class="fas fa-file-invoice-dollar w-4"></i>Purchase Invoices</a>
      <a href="credit-notes.html" class="sub-link ${A('cn')}"><i class="fas fa-receipt w-4"></i>Credit Notes</a>
    </div>
    <button class="dropdown-btn open" onclick="this.classList.toggle('open');document.getElementById('invDD').classList.toggle('open');">
      <i class="fas fa-boxes-stacked w-4"></i><span class="flex-1 text-left">Inventory</span><i class="fas fa-chevron-down text-[10px]"></i>
    </button>
    <div class="dropdown-items open" id="invDD">
      <a href="inventory-register.html" class="sub-link ${A('reg')}"><i class="fas fa-book w-4"></i>Inventory Register</a>
      <a href="stock-ledger.html" class="sub-link ${A('ledger')}"><i class="fas fa-scroll w-4"></i>Stock Ledger</a>
      <a href="store-inventory.html" class="sub-link ${A('inv')}"><i class="fas fa-cubes w-4"></i>Stock Levels</a>
      <a href="store-suppliers.html" class="sub-link ${A('sup')}"><i class="fas fa-handshake w-4"></i>Suppliers</a>
      <a href="store-warehouse.html" class="sub-link ${A('wh')}"><i class="fas fa-building w-4"></i>Warehouses</a>
    </div>
    <button class="dropdown-btn open" onclick="this.classList.toggle('open');document.getElementById('wsDD').classList.toggle('open');">
      <i class="fas fa-screwdriver-wrench w-4"></i><span class="flex-1 text-left">Workshop</span><i class="fas fa-chevron-down text-[10px]"></i>
    </button>
    <div class="dropdown-items open" id="wsDD">
      <a href="jobcards.html" class="sub-link ${A('jc')}"><i class="fas fa-clipboard-list w-4"></i>Job Cards</a>
      <a href="spare-requisitions.html" class="sub-link ${A('req')}"><i class="fas fa-cart-plus w-4"></i>Spare Requisitions</a>
      <a href="spares-approval.html" class="sub-link ${A('appr')}"><i class="fas fa-thumbs-up w-4"></i>Spares Approval</a>
      <a href="spares-issue.html" class="sub-link ${A('iss')}"><i class="fas fa-truck-arrow-right w-4"></i>Spares Issue</a>
    </div>
    <button class="dropdown-btn open" onclick="this.classList.toggle('open');document.getElementById('wrDD').classList.toggle('open');">
      <i class="fas fa-shield-halved w-4"></i><span class="flex-1 text-left">Warranty</span><i class="fas fa-chevron-down text-[10px]"></i>
    </button>
    <div class="dropdown-items open" id="wrDD">
      <a href="tyres-warranty.html" class="sub-link ${A('twar')}"><i class="fas fa-circle-notch w-4"></i>Tyre Warranty</a>
      <a href="spares-warranty.html" class="sub-link ${A('swar')}"><i class="fas fa-gears w-4"></i>Spares Warranty</a>
    </div>

    <div class="nav-section">Tyres</div>
    <a href="tyres.html" class="nav-link"><i class="fas fa-circle-notch w-4"></i>Tyre Management</a>
  </nav>`;
}
