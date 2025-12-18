/**
 * Pagination for card container
 */
class Pagination {
    constructor(items, itemsPerPage = 12) {
        this.items = items || [];
        this.itemsPerPage = itemsPerPage;
        this.currentPage = 1;
        this.totalPages = Math.ceil(this.items.length / this.itemsPerPage);
    }
    
    /**
     * Get items for current page
     */
    getCurrentPageItems() {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return this.items.slice(start, end);
    }
    
    /**
     * Go to specific page
     */
    goToPage(pageNumber) {
        if (pageNumber < 1 || pageNumber > this.totalPages) {
            console.warn('[pagination] Invalid page number:', pageNumber);
            return false;
        }
        this.currentPage = pageNumber;
        return true;
    }
    
    /**
     * Next page
     */
    nextPage() {
        return this.goToPage(this.currentPage + 1);
    }
    
    /**
     * Previous page
     */
    prevPage() {
        return this.goToPage(this.currentPage - 1);
    }
    
    /**
     * Update items and recalculate pages
     */
    setItems(items) {
        this.items = items || [];
        this.currentPage = 1;
        this.totalPages = Math.ceil(this.items.length / this.itemsPerPage);
    }
    
    /**
     * Get pagination info
     */
    getInfo() {
        return {
            currentPage: this.currentPage,
            totalPages: this.totalPages,
            itemsPerPage: this.itemsPerPage,
            totalItems: this.items.length,
            hasNextPage: this.currentPage < this.totalPages,
            hasPrevPage: this.currentPage > 1
        };
    }
}

/**
 * Render paginated cards
 */
function renderPaginatedCards(items, page = 1, itemsPerPage = 12) {
    const pagination = new Pagination(items, itemsPerPage);
    pagination.goToPage(page);
    
    const container = document.querySelector('.card-container');
    if (!container) return;
    
    // Clear container
    container.innerHTML = '';
    
    // Render cards for current page
    const pageItems = pagination.getCurrentPageItems();
    pageItems.forEach(item => {
        const card = document.createElement('m-card');
        card.setAttribute('name', item.name || '');
        card.setAttribute('image', item.image || '');
        card.setAttribute('link', item.link || '#');
        card.setAttribute('for0bj', item.for0bj || '');
        container.appendChild(card);
    });
    
    // Render pagination controls if needed
    if (pagination.totalPages > 1) {
        renderPaginationControls(pagination);
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Render pagination controls (prev/next buttons)
 */
function renderPaginationControls(pagination) {
    const info = pagination.getInfo();
    
    const paginationHtml = `
        <nav aria-label="Page navigation" style="margin-top: 40px; margin-bottom: 40px;">
            <ul class="pagination justify-content-center">
                <li class="page-item ${!info.hasPrevPage ? 'disabled' : ''}">
                    <button class="page-link" data-page="prev" ${!info.hasPrevPage ? 'disabled' : ''}>
                        ← Previous
                    </button>
                </li>
                
                <li class="page-item">
                    <span class="page-link" style="cursor: default;">
                        Page ${info.currentPage} of ${info.totalPages}
                    </span>
                </li>
                
                <li class="page-item ${!info.hasNextPage ? 'disabled' : ''}">
                    <button class="page-link" data-page="next" ${!info.hasNextPage ? 'disabled' : ''}>
                        Next →
                    </button>
                </li>
            </ul>
        </nav>
    `;
    
    const container = document.querySelector('.card-container');
    if (container) {
        const existingPagination = container.nextElementSibling;
        if (existingPagination && existingPagination.querySelector('nav')) {
            existingPagination.remove();
        }
        
        const paginationEl = document.createElement('div');
        paginationEl.innerHTML = paginationHtml;
        container.parentElement.insertBefore(paginationEl, container.nextSibling);
        
        // Add event listeners
        paginationEl.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-page]');
            if (!btn) return;
            
            const page = btn.dataset.page;
            if (page === 'prev' && pagination.prevPage()) {
                renderPaginatedCards(pagination.items, pagination.currentPage);
            } else if (page === 'next' && pagination.nextPage()) {
                renderPaginatedCards(pagination.items, pagination.currentPage);
            }
        });
    }
}

/**
 * Export to window
 */
window.Pagination = Pagination;
window.renderPaginatedCards = renderPaginatedCards;
