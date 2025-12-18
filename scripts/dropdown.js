/**
 * Handle dropdown category switching
 */
document.addEventListener('click', (e) => {
    let target = e.target;
    
    // Handle text nodes
    if (target.nodeType === 3) {
        target = target.parentElement;
    }
    
    // Find the closest dropdown-item
    const el = (target && target.closest) ? target.closest('.dropdown-item') : null;
    if (!el) return;
    
    const sheet = el.dataset.sheet;
    if (!sheet) return;
    
    e.preventDefault();
    console.log('[dropdown] Selected sheet:', sheet);
    
    // Update dropdown button text
    const dropdown = el.closest('.dropdown');
    const btn = dropdown && dropdown.querySelector('.dropdown-toggle');
    if (btn) {
        // Preserve the Bootstrap caret by only updating text content
        btn.textContent = el.textContent.trim();
    }
    
    // Store last loaded sheet for caching
    window.lastLoadedSheet = sheet;
    
    // Close dropdown after selection
    const bsDropdown = bootstrap && bootstrap.Dropdown 
        ? new bootstrap.Dropdown(btn) 
        : null;
    if (bsDropdown) {
        bsDropdown.hide();
    }
    
    // Load the data
    if (typeof loadData === 'function') {
        loadData(sheet);
    } else {
        console.warn('[dropdown] loadData function not available');
    }
});
