// Initialize cache for search
const searchCache = new DataCache(600000); // 10 minutes
let currentSearchResults = [];

/**
 * Search products by keyword
 * @param {string} keyword - Search keyword
 * @param {Array} data - Products data array
 * @returns {Array} Filtered results
 */
function searchProducts(keyword, data) {
    if (!keyword.trim()) {
        return data;
    }
    
    const lowerKeyword = keyword.toLowerCase().trim();
    return data.filter(item => {
        const name = (item.name || '').toLowerCase();
        const for0bj = (item.for0bj || '').toLowerCase();
        return name.includes(lowerKeyword) || for0bj.includes(lowerKeyword);
    });
}

/**
 * Render search results to the DOM
 * @param {Array} results - Results to render
 */
function renderResults(results) {
    const container = document.querySelector('.card-container');
    if (!container) return;
    
    if (results.length === 0) {
        showEmptyState(container, 'No products found. Try a different search.');
        return;
    }
    
    container.innerHTML = '';
    results.forEach(item => {
        const card = document.createElement('m-card');
        card.setAttribute('name', item.name || '');
        card.setAttribute('image', item.image || '');
        card.setAttribute('link', item.link || '#');
        card.setAttribute('for0bj', item.for0bj || '');
        container.appendChild(card);
    });
    
    // Dispatch event for analytics/tracking
    window.dispatchEvent(new CustomEvent('search-completed', { 
        detail: { keyword: document.getElementById('searchBox').value, resultCount: results.length } 
    }));
}

/**
 * Handle search submission
 */
function handleSearch() {
    const keyword = document.getElementById('searchBox').value;
    
    if (!keyword.trim()) {
        renderResults(window.jsonData || []);
        return;
    }
    
    // Check cache first
    const cacheKey = `search_${keyword.toLowerCase()}`;
    if (searchCache.has(cacheKey)) {
        console.log('[search] Using cached results for:', keyword);
        currentSearchResults = searchCache.get(cacheKey);
        renderResults(currentSearchResults);
        return;
    }
    
    // Search and cache results
    currentSearchResults = searchProducts(keyword, window.jsonData || []);
    searchCache.set(cacheKey, currentSearchResults);
    renderResults(currentSearchResults);
}

// Debounced search for real-time search as user types
const debouncedSearch = debounce(handleSearch, 400);

// Form submission
document.addEventListener('submit', (event) => {
    if (event.target && event.target.matches('form.search-bar')) {
        event.preventDefault();
        handleSearch();
    }
});

// Real-time search as user types (in card container search)
document.addEventListener('input', (event) => {
    if (event.target && event.target.id === 'searchBox') {
        debouncedSearch();
    }
});

// Header search form
document.addEventListener('submit', (event) => {
    if (event.target && event.target.matches('form.search-form')) {
        event.preventDefault();
        const headerSearchBox = document.getElementById('headerSearchBox');
        const mainSearchBox = document.getElementById('searchBox');
        if (headerSearchBox && mainSearchBox) {
            mainSearchBox.value = headerSearchBox.value;
            handleSearch();
        }
    }
});

// Sync header search with main search
document.addEventListener('input', (event) => {
    if (event.target && event.target.id === 'headerSearchBox') {
        const mainSearchBox = document.getElementById('searchBox');
        if (mainSearchBox) {
            mainSearchBox.value = event.target.value;
        }
    }
});