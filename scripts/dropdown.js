// Delegated listener for category dropdown items
document.addEventListener('click', (e) => {
  // robustly get the clicked .dropdown-item even if target is a text node or inner element
  let target = e.target;
  if (target.nodeType === 3) target = target.parentElement; // text node -> parent element
  const el = (target && target.closest) ? target.closest('.dropdown-item') : null;
  if (!el) return;
  const sheet = el.dataset.sheet;
  if (!sheet) return;
  e.preventDefault();
  console.log('[dropdown] selected sheet=', sheet);
  // Update dropdown button text (find nearest dropdown)
  const dropdown = el.closest('.dropdown');
  const btn = dropdown && dropdown.querySelector('.dropdown-toggle');
  if (btn) {
    // preserve caret by keeping inner HTML small (Bootstrap caret is via pseudo-element), so set text only
    btn.textContent = el.textContent.trim();
  }
  // Call existing loader
  if (typeof loadData === 'function') {
    loadData(sheet);
  } else {
    console.warn('loadData not defined');
  }
});
