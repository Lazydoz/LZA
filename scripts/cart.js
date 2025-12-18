/**
 * Shopping Cart Management with localStorage
 */
(function() {
    const CART_KEY = 'lazyshop-cart';
    
    /**
     * Initialize cart from localStorage
     */
    function getCart() {
        const cartStr = localStorage.getItem(CART_KEY);
        return cartStr ? JSON.parse(cartStr) : [];
    }
    
    /**
     * Save cart to localStorage
     */
    function saveCart(cart) {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
        updateCartUI();
        window.dispatchEvent(new CustomEvent('cart-updated', { detail: cart }));
    }
    
    /**
     * Add item to cart
     */
    function addToCart(product) {
        const cart = getCart();
        const existingItem = cart.find(item => item.name === product.name);
        
        if (existingItem) {
            existingItem.quantity += product.quantity || 1;
        } else {
            cart.push({
                ...product,
                quantity: product.quantity || 1,
                addedAt: new Date().toISOString()
            });
        }
        
        saveCart(cart);
        showCartNotification(`Added "${product.name}" to cart!`, 'success');
    }
    
    /**
     * Remove item from cart
     */
    function removeFromCart(productName) {
        const cart = getCart();
        const updatedCart = cart.filter(item => item.name !== productName);
        saveCart(updatedCart);
        showCartNotification(`Removed from cart`, 'info');
    }
    
    /**
     * Update item quantity
     */
    function updateQuantity(productName, quantity) {
        const cart = getCart();
        const item = cart.find(item => item.name === productName);
        
        if (item) {
            if (quantity <= 0) {
                removeFromCart(productName);
            } else {
                item.quantity = quantity;
                saveCart(cart);
            }
        }
    }
    
    /**
     * Clear entire cart
     */
    function clearCart() {
        localStorage.removeItem(CART_KEY);
        updateCartUI();
        window.dispatchEvent(new CustomEvent('cart-cleared'));
    }
    
    /**
     * Get cart total
     */
    function getCartTotal() {
        return getCart().reduce((sum, item) => sum + item.quantity, 0);
    }
    
    /**
     * Update cart UI (badge count, etc.)
     */
    function updateCartUI() {
        const total = getCartTotal();
        const badge = document.getElementById('cart-badge');
        
        if (badge) {
            if (total > 0) {
                badge.textContent = total;
                badge.style.display = 'block';
            } else {
                badge.style.display = 'none';
            }
        }
    }
    
    /**
     * Show cart notification toast
     */
    function showCartNotification(message, type = 'info') {
        const toastHtml = `
            <div class="alert alert-${type === 'success' ? 'success' : 'info'} alert-dismissible fade show position-fixed" 
                 style="top: 20px; right: 20px; z-index: 9999; min-width: 300px;" role="alert">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;
        
        const toastContainer = document.createElement('div');
        toastContainer.innerHTML = toastHtml;
        document.body.appendChild(toastContainer.firstElementChild);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            const alert = document.querySelector('.alert');
            if (alert) {
                const bsAlert = new bootstrap.Alert(alert);
                bsAlert.close();
            }
        }, 3000);
    }
    
    /**
     * Export API to window object
     */
    window.cartAPI = {
        getCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        updateCartUI
    };
    
    // Initialize cart UI on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', updateCartUI);
    } else {
        updateCartUI();
    }
    
    // Listen for cart-updated events from card.js
    window.addEventListener('cart-updated', (e) => {
        console.log('[cart] Cart updated:', e.detail);
    });
})();
