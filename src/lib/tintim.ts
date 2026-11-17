/** Official Tintim snippet: scoped variables, HTTPS and account set before load. */
export const TINTIM_INITIALIZER = `
(function(window, document) {
  var existing = window.tt;
  window.tt = existing || {};
  window.tt.accountCode = '893db8f7-97bb-43b2-a908-97fc95741ca0';
  if (existing) return;
  var script = document.createElement('script');
  script.async = true;
  script.src = 'https://s.tintim.app/static/core/tintim-1.0.js';
  document.head.appendChild(script);
})(window, document);
`;
