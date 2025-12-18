// Global data storage
window.jsonData = [];
window.lastLoadedSheet = null;

/**
 * Process and render data from Google Sheets
 * @param {Array} data - Raw data from Google Sheets JSONP
 */
function handleData(data) {
    if (!data || !Array.isArray(data) || data.length === 0) {
        console.error('[handleData] Invalid or empty data received');
        const container = document.querySelector('.card-container');
        if (container) {
            showEmptyState(container, 'No data available');
        }
        return;
    }
    
    const container = document.querySelector('.card-container');
    if (!container) {
        console.error('[handleData] Container not found');
        return;
    }
    
    // Clear previous data
    container.innerHTML = '';
    window.jsonData = [];
    
    try {
        // Process data (skip header row if it exists)
        const startIndex = data[0].length > 4 || (data[0] && typeof data[0][0] === 'string' && data[0][0].toLowerCase() === 'name') ? 1 : 0;
        
        for (let i = startIndex; i < data.length; i++) {
            const row = data[i];
            if (!row || row.length < 2) continue; // Skip invalid rows
            
            const [name = '', image = '', link = '', for0bj = ''] = row;
            
            // Skip empty rows
            if (!name.trim()) continue;
            
            const item = {
                name: String(name).trim(),
                image: String(image).trim() || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23ddd" width="200" height="200"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23999" font-size="16"%3ENo Image%3C/text%3E%3C/svg%3E',
                link: String(link).trim() || '#',
                for0bj: String(for0bj).trim() || 'N/A'
            };
            
            window.jsonData.push(item);
            
            // Create and append card element
            const card = document.createElement('m-card');
            card.setAttribute('name', item.name);
            card.setAttribute('image', item.image);
            card.setAttribute('link', item.link);
            card.setAttribute('for0bj', item.for0bj);
            
            container.appendChild(card);
        }
        
        console.log('[handleData] Successfully loaded', window.jsonData.length, 'items');
        
        // Show empty state if no valid data
        if (window.jsonData.length === 0) {
            showEmptyState(container, 'No valid products found in this sheet');
        }
    } catch (error) {
        console.error('[handleData] Error processing data:', error);
        showErrorMessage(container, 'Error processing data: ' + error.message);
    }
}

/**
 * Render filtered results
 * @param {Array} results - Results to render
 */
function renderResults(results) {
    const container = document.querySelector('.card-container');
    if (!container) return;
    
    if (!results || results.length === 0) {
        showEmptyState(container, 'No products found matching your search');
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
    
    console.log('[renderResults] Rendered', results.length, 'cards');
}
