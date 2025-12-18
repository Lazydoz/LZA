// Utility functions for debounce, caching, and common operations

/**
 * Debounce function to limit function calls
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, delay = 300) {
    let timeoutId = null;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

/**
 * Simple in-memory cache with TTL (Time To Live)
 */
class DataCache {
    constructor(ttl = 3600000) { // 1 hour default
        this.cache = new Map();
        this.ttl = ttl;
    }
    
    set(key, value) {
        this.cache.set(key, {
            value,
            timestamp: Date.now()
        });
    }
    
    get(key) {
        const item = this.cache.get(key);
        if (!item) return null;
        
        if (Date.now() - item.timestamp > this.ttl) {
            this.cache.delete(key);
            return null;
        }
        
        return item.value;
    }
    
    has(key) {
        return this.get(key) !== null;
    }
    
    clear() {
        this.cache.clear();
    }
}

/**
 * Safely escape HTML to prevent XSS
 * @param {string} text - Text to escape
 * @returns {string} Escaped HTML
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Show loading spinner
 * @param {HTMLElement} container - Container to show spinner in
 */
function showLoadingSpinner(container) {
    container.innerHTML = `
        <div class="d-flex justify-content-center align-items-center p-5">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    `;
}

/**
 * Show error message
 * @param {HTMLElement} container - Container to show error in
 * @param {string} message - Error message
 */
function showErrorMessage(container, message) {
    container.innerHTML = `
        <div class="alert alert-danger m-3" role="alert">
            <strong>Error:</strong> ${escapeHtml(message)}
        </div>
    `;
}

/**
 * Show empty state message
 * @param {HTMLElement} container - Container to show message in
 * @param {string} message - Empty state message
 */
function showEmptyState(container, message = 'No products found') {
    container.innerHTML = `
        <div class="alert alert-info m-3 text-center" role="alert">
            ${escapeHtml(message)}
        </div>
    `;
}

/**
 * Throttle function to limit function calls
 * @param {Function} func - Function to throttle
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Throttled function
 */
function throttle(func, delay = 300) {
    let lastCall = 0;
    return function(...args) {
        const now = Date.now();
        if (now - lastCall >= delay) {
            lastCall = now;
            func.apply(this, args);
        }
    };
}

/**
 * Format date to readable string
 * @param {Date} date - Date object
 * @returns {string} Formatted date string
 */
function formatDate(date) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
}

// Export for use in other modules
window.DataCache = DataCache;
window.debounce = debounce;
window.throttle = throttle;
window.escapeHtml = escapeHtml;
window.showLoadingSpinner = showLoadingSpinner;
window.showErrorMessage = showErrorMessage;
window.showEmptyState = showEmptyState;
window.formatDate = formatDate;
