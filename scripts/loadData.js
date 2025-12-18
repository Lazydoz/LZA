// Create global data cache
const dataCache = new DataCache(3600000); // 1 hour TTL
let isLoading = false;

/**
 * Load data from Google Apps Script via JSONP
 * @param {string} sheetname - Sheet name to load
 */
function loadData(sheetname) {
    if (isLoading) return; // Prevent duplicate requests
    
    // Check if data is cached
    if (dataCache.has(sheetname)) {
        console.log('[loadData] Using cached data for:', sheetname);
        handleData(dataCache.get(sheetname));
        return;
    }
    
    isLoading = true;
    const container = document.querySelector('.card-container');
    if (!container) {
        console.error('[loadData] Container not found');
        isLoading = false;
        return;
    }
    
    // Show loading spinner
    showLoadingSpinner(container);
    
    const script = document.createElement('script');
    const parts = [
        'https://script.google.com',
        '/macros',
        '/s',
        '/AKfycbwj4e-9hLiCvBPXzV6GaJJLedDRcHOnbdC59z-ausEgx4IWL8vp53zfZ1QXcC-04cRMKQ',
        '/exec'
    ];
    
    const src = `${parts.join('')}?callback=handleDataWithCache&sheetname=${encodeURIComponent(sheetname)}`;
    console.log('[loadData] Loading sheet:', sheetname);
    
    script.src = src;
    script.async = true;
    
    // Handle errors
    script.onerror = function() {
        console.error('[loadData] Failed to load data from:', sheetname);
        isLoading = false;
        showErrorMessage(container, `Failed to load data from "${sheetname}". Check your connection or try again.`);
        document.body.removeChild(script);
    };
    
    // Set timeout for slow connections
    const timeout = setTimeout(() => {
        if (isLoading) {
            console.warn('[loadData] Request timeout for sheet:', sheetname);
            isLoading = false;
            showErrorMessage(container, 'Request timed out. Please try again.');
            if (script.parentNode) {
                script.parentNode.removeChild(script);
            }
        }
    }, 30000); // 30 seconds timeout
    
    // Store timeout ID to clear it when request completes
    script.timeoutId = timeout;
    
    document.body.appendChild(script);
}

/**
 * Handle data with caching
 * This is called by the JSONP callback
 */
function handleDataWithCache(data) {
    const sheetname = new URLSearchParams(window.location.search).get('sheetname');
    if (window.lastLoadedSheet && data && data.length > 0) {
        dataCache.set(window.lastLoadedSheet, data);
    }
    handleData(data);
    isLoading = false;
}

// Fallback if callback is called without sheetname
window.handleDataWithCache = handleDataWithCache;