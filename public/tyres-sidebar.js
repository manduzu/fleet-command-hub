// Backward-compatible shim — the unified sidebar lives in store-sidebar.js.
// Pages that previously included only tyres-sidebar.js will still get the
// full unified nav by loading the shared script and exposing renderSidebar().
(function(){
  if (typeof renderSidebar === 'function') return;
  var s = document.createElement('script');
  s.src = 'store-sidebar.js';
  s.onload = function(){ /* renderSidebar is defined inside store-sidebar.js */ };
  document.head.appendChild(s);
})();
