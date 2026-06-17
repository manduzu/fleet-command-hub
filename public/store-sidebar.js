// Unified sidebar shared by every page in the ERP.
// Two entry points exist for backward compatibility:
//   renderStoreSidebar(activeKey)  – used by store / workshop / procurement / finance pages
//   renderSidebar(activeKey)       – used by tyre-module pages (loaded via tyres-sidebar.js)
// Both delegate to _renderFleetSidebar below so navigation is identical everywhere.

function _renderFleetSidebar(active){
  active = active || '';
  const A = (k)=> active===k ? 'active' : '';
  const html = `
  <div class="px-4 py-4 flex items-center gap-2 border-b border-slate-800">
    <div class="w-9 h-9 rounded-lg bg-brand-600 flex items-center justify-center text-white" style="background:#2563EB"><i class="fas fa-truck-fast" style="color:#fff"></i></div>
    <div><div class="text-white font-bold text-sm" style="color:#fff">FleetCtrl</div><div class="text-[10px] text-slate-500 uppercase tracking-wider" style="color:#64748B;font-size:10px;letter-spacing:.08em">ERP Suite</div></div>
  </div>
  <nav class="px-2 py-3 flex-1 overflow-y-auto" style="padding:.75rem .5rem;flex:1;overflow-y:auto">

    <a href="dashboard.html" class="nav-link ${A('dash')}"><i class="fas fa-gauge-high w-4 fa-fw"></i>Dashboard</a>
    <a href="logistics-command-center.html" class="nav-link ${A('logCmd')}"><i class="fas fa-satellite-dish w-4 fa-fw"></i>Logistics Command</a>
    <a href="tracking.html" class="nav-link ${A('track')}"><i class="fas fa-location-dot w-4 fa-fw"></i>Live Tracking</a>
    <a href="orders.html" class="nav-link ${A('ord')}"><i class="fas fa-cart-shopping w-4 fa-fw"></i>Orders</a>
    <a href="reports.html" class="nav-link ${A('rep')}"><i class="fas fa-chart-bar w-4 fa-fw"></i>Reports</a>

    <div class="nav-section">Logistics</div>
    <button class="dropdown-btn ${['ctrip','cfleet','draft','pend','comp','tripv'].includes(active)?'open':''}" onclick="this.classList.toggle('open');document.getElementById('logDD').classList.toggle('open');">
      <i class="fas fa-route w-4 fa-fw"></i><span class="flex-1 text-left" style="flex:1;text-align:left">Trips & Fleets</span><i class="fas fa-chevron-down text-[10px]" style="font-size:10px"></i>
    </button>
    <div class="dropdown-items ${['ctrip','cfleet','draft','pend','comp','tripv'].includes(active)?'open':''}" id="logDD">
      <a href="create-trip.html" class="sub-link ${A('ctrip')}"><i class="fas fa-plus w-4 fa-fw"></i>Create Trip</a>
      <a href="create-fleet.html" class="sub-link ${A('cfleet')}"><i class="fas fa-layer-group w-4 fa-fw"></i>Create Fleet</a>
      <a href="draft-trips.html" class="sub-link ${A('draft')}"><i class="fas fa-file-pen w-4 fa-fw"></i>Draft Trips</a>
      <a href="pending-trips.html" class="sub-link ${A('pend')}"><i class="fas fa-hourglass-half w-4 fa-fw"></i>Pending Trips</a>
      <a href="complete-trips.html" class="sub-link ${A('comp')}"><i class="fas fa-flag-checkered w-4 fa-fw"></i>Completed Trips</a>
    </div>

    <div class="nav-section">Fleet</div>
    <button class="dropdown-btn ${['trucks','trailers','drivers','fmgmt','yard'].includes(active)?'open':''}" onclick="this.classList.toggle('open');document.getElementById('fleetDD').classList.toggle('open');">
      <i class="fas fa-truck w-4 fa-fw"></i><span class="flex-1 text-left" style="flex:1;text-align:left">Fleet Assets</span><i class="fas fa-chevron-down text-[10px]" style="font-size:10px"></i>
    </button>
    <div class="dropdown-items ${['trucks','trailers','drivers','fmgmt','yard'].includes(active)?'open':''}" id="fleetDD">
      <a href="trucks.html" class="sub-link ${A('trucks')}"><i class="fas fa-truck w-4 fa-fw"></i>Trucks</a>
      <a href="trailers.html" class="sub-link ${A('trailers')}"><i class="fas fa-trailer w-4 fa-fw"></i>Trailers</a>
      <a href="drivers.html" class="sub-link ${A('drivers')}"><i class="fas fa-id-card w-4 fa-fw"></i>Drivers</a>
      <a href="fleet-management.html" class="sub-link ${A('fmgmt')}"><i class="fas fa-sliders w-4 fa-fw"></i>Fleet Management</a>
      <a href="parking-yard.html" class="sub-link ${A('yard')}"><i class="fas fa-square-parking w-4 fa-fw"></i>Parking Yard</a>
    </div>

    <button class="dropdown-btn ${['brk','acc'].includes(active)?'open':''}" onclick="this.classList.toggle('open');document.getElementById('incDD').classList.toggle('open');">
      <i class="fas fa-triangle-exclamation w-4 fa-fw"></i><span class="flex-1 text-left" style="flex:1;text-align:left">Incidents</span><i class="fas fa-chevron-down text-[10px]" style="font-size:10px"></i>
    </button>
    <div class="dropdown-items ${['brk','acc'].includes(active)?'open':''}" id="incDD">
      <a href="breakdowns.html" class="sub-link ${A('brk')}"><i class="fas fa-screwdriver-wrench w-4 fa-fw"></i>Breakdowns</a>
      <a href="accidents.html" class="sub-link ${A('acc')}"><i class="fas fa-car-burst w-4 fa-fw"></i>Accidents</a>
    </div>

    <div class="nav-section">CRM & Billing</div>
    <button class="dropdown-btn ${['cdir','clist','cadd'].includes(active)?'open':''}" onclick="this.classList.toggle('open');document.getElementById('cliDD').classList.toggle('open');">
      <i class="fas fa-users w-4 fa-fw"></i><span class="flex-1 text-left" style="flex:1;text-align:left">Clients</span><i class="fas fa-chevron-down text-[10px]" style="font-size:10px"></i>
    </button>
    <div class="dropdown-items ${['cdir','clist','cadd'].includes(active)?'open':''}" id="cliDD">
      <a href="client-directory.html" class="sub-link ${A('cdir')}"><i class="fas fa-address-book w-4 fa-fw"></i>Directory</a>
      <a href="clients-list.html" class="sub-link ${A('clist')}"><i class="fas fa-list w-4 fa-fw"></i>Client List</a>
      <a href="clients-add.html" class="sub-link ${A('cadd')}"><i class="fas fa-user-plus w-4 fa-fw"></i>Add Client</a>
    </div>
    <button class="dropdown-btn ${['iall','iadd','iunin','icn'].includes(active)?'open':''}" onclick="this.classList.toggle('open');document.getElementById('invDD2').classList.toggle('open');">
      <i class="fas fa-file-invoice-dollar w-4 fa-fw"></i><span class="flex-1 text-left" style="flex:1;text-align:left">Invoicing</span><i class="fas fa-chevron-down text-[10px]" style="font-size:10px"></i>
    </button>
    <div class="dropdown-items ${['iall','iadd','iunin','icn'].includes(active)?'open':''}" id="invDD2">
      <a href="invoices-all.html" class="sub-link ${A('iall')}"><i class="fas fa-list-ul w-4 fa-fw"></i>All Invoices</a>
      <a href="invoices-add.html" class="sub-link ${A('iadd')}"><i class="fas fa-plus w-4 fa-fw"></i>Create Invoice</a>
      <a href="invoices-uninvoiced.html" class="sub-link ${A('iunin')}"><i class="fas fa-clock w-4 fa-fw"></i>Uninvoiced Trips</a>
      <a href="invoices-credit-note.html" class="sub-link ${A('icn')}"><i class="fas fa-receipt w-4 fa-fw"></i>Credit Notes</a>
    </div>

    <div class="nav-section">Stores Command</div>
    <a href="store-command-center.html" class="nav-link ${A('cmd')}"><i class="fas fa-warehouse w-4 fa-fw"></i>Command Center</a>
    <button class="dropdown-btn ${['lpo','grn','pinv','cn'].includes(active)?'open':''}" onclick="this.classList.toggle('open');document.getElementById('procDD').classList.toggle('open');">
      <i class="fas fa-file-invoice w-4 fa-fw"></i><span class="flex-1 text-left" style="flex:1;text-align:left">Procurement</span><i class="fas fa-chevron-down text-[10px]" style="font-size:10px"></i>
    </button>
    <div class="dropdown-items ${['lpo','grn','pinv','cn'].includes(active)?'open':''}" id="procDD">
      <a href="lpo-archive.html" class="sub-link ${A('lpo')}"><i class="fas fa-clipboard-list w-4 fa-fw"></i>LPOs</a>
      <a href="grn-archive.html" class="sub-link ${A('grn')}"><i class="fas fa-truck-ramp-box w-4 fa-fw"></i>GRNs</a>
      <a href="purchase-invoice-archive.html" class="sub-link ${A('pinv')}"><i class="fas fa-file-invoice-dollar w-4 fa-fw"></i>Purchase Invoices</a>
      <a href="credit-notes.html" class="sub-link ${A('cn')}"><i class="fas fa-receipt w-4 fa-fw"></i>Credit Notes</a>
    </div>
    <button class="dropdown-btn ${['reg','ledger','inv','sup','wh','cat','brn','br'].includes(active)?'open':''}" onclick="this.classList.toggle('open');document.getElementById('invDD').classList.toggle('open');">
      <i class="fas fa-boxes-stacked w-4 fa-fw"></i><span class="flex-1 text-left" style="flex:1;text-align:left">Inventory</span><i class="fas fa-chevron-down text-[10px]" style="font-size:10px"></i>
    </button>
    <div class="dropdown-items ${['reg','ledger','inv','sup','wh','cat','brn','br'].includes(active)?'open':''}" id="invDD">
      <a href="inventory-register.html" class="sub-link ${A('reg')}"><i class="fas fa-book w-4 fa-fw"></i>Inventory Register</a>
      <a href="stock-ledger.html" class="sub-link ${A('ledger')}"><i class="fas fa-scroll w-4 fa-fw"></i>Stock Ledger</a>
      <a href="store-inventory.html" class="sub-link ${A('inv')}"><i class="fas fa-cubes w-4 fa-fw"></i>Stock Levels</a>
      <a href="store-suppliers.html" class="sub-link ${A('sup')}"><i class="fas fa-handshake w-4 fa-fw"></i>Suppliers</a>
      <a href="store-warehouse.html" class="sub-link ${A('wh')}"><i class="fas fa-building w-4 fa-fw"></i>Warehouses</a>
      <a href="store-categories.html" class="sub-link ${A('cat')}"><i class="fas fa-tags w-4 fa-fw"></i>Categories</a>
      <a href="store-brands.html" class="sub-link ${A('brn')}"><i class="fas fa-bookmark w-4 fa-fw"></i>Brands</a>
      <a href="store-branch.html" class="sub-link ${A('br')}"><i class="fas fa-code-branch w-4 fa-fw"></i>Branches</a>
    </div>
    <button class="dropdown-btn ${['parts','jc','req','appr','iss'].includes(active)?'open':''}" onclick="this.classList.toggle('open');document.getElementById('wsDD').classList.toggle('open');">
      <i class="fas fa-screwdriver-wrench w-4 fa-fw"></i><span class="flex-1 text-left" style="flex:1;text-align:left">Workshop</span><i class="fas fa-chevron-down text-[10px]" style="font-size:10px"></i>
    </button>
    <div class="dropdown-items ${['parts','jc','req','appr','iss'].includes(active)?'open':''}" id="wsDD">
      <a href="parts.html" class="sub-link ${A('parts')}"><i class="fas fa-gears w-4 fa-fw"></i>Parts</a>
      <a href="jobcards.html" class="sub-link ${A('jc')}"><i class="fas fa-clipboard-list w-4 fa-fw"></i>Job Cards</a>
      <a href="spare-requisitions.html" class="sub-link ${A('req')}"><i class="fas fa-cart-plus w-4 fa-fw"></i>Spare Requisitions</a>
      <a href="spares-approval.html" class="sub-link ${A('appr')}"><i class="fas fa-thumbs-up w-4 fa-fw"></i>Spares Approval</a>
      <a href="spares-issue.html" class="sub-link ${A('iss')}"><i class="fas fa-truck-arrow-right w-4 fa-fw"></i>Spares Issue</a>
    </div>
    <button class="dropdown-btn ${['twar','swar','claim'].includes(active)?'open':''}" onclick="this.classList.toggle('open');document.getElementById('wrDD').classList.toggle('open');">
      <i class="fas fa-shield-halved w-4 fa-fw"></i><span class="flex-1 text-left" style="flex:1;text-align:left">Warranty</span><i class="fas fa-chevron-down text-[10px]" style="font-size:10px"></i>
    </button>
    <div class="dropdown-items ${['twar','swar','claim'].includes(active)?'open':''}" id="wrDD">
      <a href="tyres-warranty.html" class="sub-link ${A('twar')}"><i class="fas fa-circle-notch w-4 fa-fw"></i>Tyre Warranty</a>
      <a href="spares-warranty.html" class="sub-link ${A('swar')}"><i class="fas fa-gears w-4 fa-fw"></i>Spares Warranty</a>
      <a href="claim-detail.html" class="sub-link ${A('claim')}"><i class="fas fa-file-shield w-4 fa-fw"></i>Claim Detail</a>
    </div>

    <div class="nav-section">Tyres</div>
    <button class="dropdown-btn ${['home','archive','fitment','inspection','rotation','detail','repl','warranty','scrap'].includes(active)?'open':''}" onclick="this.classList.toggle('open');document.getElementById('tyreDD').classList.toggle('open');">
      <i class="fas fa-circle-notch w-4 fa-fw"></i><span class="flex-1 text-left" style="flex:1;text-align:left">Tyre Management</span><i class="fas fa-chevron-down text-[10px]" style="font-size:10px"></i>
    </button>
    <div class="dropdown-items ${['home','archive','fitment','inspection','rotation','detail','repl','warranty','scrap'].includes(active)?'open':''}" id="tyreDD">
      <a href="tyres.html" class="sub-link ${A('home')}"><i class="fas fa-house w-4 fa-fw"></i>Command Center</a>
      <a href="tyres-archive.html" class="sub-link ${A('archive')}"><i class="fas fa-warehouse w-4 fa-fw"></i>Tyre Register</a>
      <a href="tyres-fitment.html" class="sub-link ${A('fitment')}"><i class="fas fa-truck-monster w-4 fa-fw"></i>Vehicle Fitment</a>
      <a href="tyres-inspection.html" class="sub-link ${A('inspection')}"><i class="fas fa-clipboard-check w-4 fa-fw"></i>Inspections</a>
      <a href="tyres-rotation.html" class="sub-link ${A('rotation')}"><i class="fas fa-rotate w-4 fa-fw"></i>Rotation & Replace</a>
      <a href="tyre-detail.html" class="sub-link ${A('detail')}"><i class="fas fa-magnifying-glass-chart w-4 fa-fw"></i>Tyre Lifecycle</a>
      <a href="tyre-replacement-create.html" class="sub-link ${A('repl')}"><i class="fas fa-plus w-4 fa-fw"></i>Replacement</a>
      <a href="tyres-warranty.html" class="sub-link ${A('warranty')}"><i class="fas fa-shield-halved w-4 fa-fw"></i>Warranty Claims</a>
      <a href="tyre-scrap-yard.html" class="sub-link ${A('scrap')}"><i class="fas fa-recycle w-4 fa-fw"></i>Scrap Yard</a>
    </div>

    <div class="nav-section">Finance</div>
    <button class="dropdown-btn ${['pcDash','pcFloat','pcVou','pcRep','pcRec'].includes(active)?'open':''}" onclick="this.classList.toggle('open');document.getElementById('pcDD').classList.toggle('open');">
      <i class="fas fa-sack-dollar w-4 fa-fw"></i><span class="flex-1 text-left" style="flex:1;text-align:left">Petty Cash</span><i class="fas fa-chevron-down text-[10px]" style="font-size:10px"></i>
    </button>
    <div class="dropdown-items ${['pcDash','pcFloat','pcVou','pcRep','pcRec'].includes(active)?'open':''}" id="pcDD">
      <a href="petty-cash-dashboard.html" class="sub-link ${A('pcDash')}"><i class="fas fa-gauge-high w-4 fa-fw"></i>Command Center</a>
      <a href="petty-cash-floats.html" class="sub-link ${A('pcFloat')}"><i class="fas fa-wallet w-4 fa-fw"></i>Floats & Custodians</a>
      <a href="petty-cash-vouchers.html" class="sub-link ${A('pcVou')}"><i class="fas fa-receipt w-4 fa-fw"></i>Vouchers</a>
      <a href="petty-cash-replenish.html" class="sub-link ${A('pcRep')}"><i class="fas fa-money-bill-transfer w-4 fa-fw"></i>Replenishment</a>
      <a href="petty-cash-reconciliation.html" class="sub-link ${A('pcRec')}"><i class="fas fa-scale-balanced w-4 fa-fw"></i>Reconciliation</a>
    </div>
  </nav>`;
  const el = document.getElementById('sidebar');
  if (el) el.innerHTML = html;
}

function renderStoreSidebar(active){ _renderFleetSidebar(active); }
function renderSidebar(active){ _renderFleetSidebar(active); }
