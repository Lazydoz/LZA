# LazyShop - Modern E-Commerce Web App

A lightweight, modern e-commerce web application built with Web Components, Google Sheets JSONP API, and Bootstrap 5. Features dark theme, real-time search, shopping cart, and responsive design.

## ✨ Features

### Core Functionality
- 🛍️ **Product Browsing** - Browse products organized by categories
- 🔍 **Real-time Search** - Instant product search with debounce optimization
- 🛒 **Shopping Cart** - Add products to cart with localStorage persistence
- 📱 **Responsive Design** - Works perfectly on mobile, tablet, and desktop
- 🌓 **Dark Theme** - Toggle dark/light mode with system preference detection

### Technical Features
- ⚡ **Performance Optimized** - Lazy image loading, caching, debounced search
- 🔒 **Security** - XSS protection, HTML escaping, CORS handling
- 📦 **Web Components** - Custom elements for modularity (m-card, m-modal, m-header, m-footer)
- 🎨 **Modern CSS** - CSS variables for theming, smooth animations, mobile-first design
- 🔌 **Google Sheets Integration** - Dynamic data loading via JSONP from Google Sheets
- 💾 **Local Storage** - Cart and theme persistence

## 📋 Project Structure

```
LZA/
├── index.html                 # Main HTML file
├── style.css                  # Global styles & dark theme
├── public/
│   └── logo.png              # Brand logo
├── components/
│   ├── components.js         # Web Components registry
│   ├── card.js              # Product card component
│   ├── header.html          # Header with search & theme toggle
│   ├── footer.html          # Footer
│   ├── card_container.html  # Cards container with dropdown
│   └── modal.html           # Product detail modal
├── style/
│   └── card.css             # Card-specific styles
└── scripts/
    ├── utils.js             # Utility functions (debounce, cache, etc.)
    ├── handleData.js        # Data processing & rendering
    ├── loadData.js          # Google Sheets JSONP loader
    ├── search.js            # Search functionality with caching
    ├── dropdown.js          # Category dropdown handler
    ├── modalClose.js        # Modal close handler
    ├── theme.js             # Dark theme toggle
    ├── cart.js              # Shopping cart management
    └── pagination.js        # Pagination support
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Google Sheets with data in specific format
- (Optional) Local server for CORS testing

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/Lazydoz/LZA.git
cd LZA
```

2. **Prepare Google Sheets Data**
   - Create a Google Sheet with columns: `name`, `image`, `link`, `for0bj`
   - Deploy as Google Apps Script with JSONP support
   - Update the API URL in `scripts/loadData.js`

3. **Run locally**
```bash
# Using Python
python -m http.server 8000

# Or using Node.js (http-server)
npx http-server
```

4. **Open in browser**
```
http://localhost:8000
```

## 🎯 Configuration

### API Endpoint
Edit `scripts/loadData.js` to change the Google Apps Script URL:
```javascript
const parts = [
    'https://script.google.com',
    '/macros/s',
    '/YOUR_SCRIPT_ID_HERE',
    '/exec'
];
```

### Theme Colors
Customize colors in `style.css` by modifying CSS variables:
```css
:root {
    --primary: #0d6efd;
    --text-color: #111827;
    --card-bg: #ffffff;
    /* ... more variables */
}
```

### Cache TTL
Adjust cache time-to-live in `scripts/utils.js`:
```javascript
const dataCache = new DataCache(3600000); // 1 hour
```

## 📱 Responsive Breakpoints

- **Mobile** (320px - 640px)
- **Tablet** (641px - 1024px)
- **Desktop** (1025px+)

## 🔒 Security Considerations

1. **XSS Protection** - All user input is escaped
2. **Lazy Loading** - Images load on demand
3. **API Validation** - Data sanitization before rendering
4. **CORS Handling** - JSONP for cross-origin requests
5. **localStorage** - Cart data stored safely

## ⚡ Performance Optimizations

- **Image Lazy Loading** - Images load when visible
- **Search Debouncing** - 400ms delay to reduce function calls
- **Data Caching** - 1-hour cache for sheets and searches
- **DOM Optimization** - Efficient card rendering
- **CSS Optimization** - Minified styles with variables
- **Script Deferring** - Async script loading

## 🛠️ Browser Support

| Browser | Support |
|---------|---------|
| Chrome  | ✅ 90+  |
| Firefox | ✅ 88+  |
| Safari  | ✅ 14+  |
| Edge    | ✅ 90+  |

## 📚 API Reference

### Cart API
```javascript
// Add to cart
cartAPI.addToCart({ name: 'Product', image: 'url', link: 'url' });

// Get cart
const cart = cartAPI.getCart();

// Remove from cart
cartAPI.removeFromCart('Product Name');

// Clear cart
cartAPI.clearCart();

// Get total items
const total = cartAPI.getCartTotal();
```

### Pagination
```javascript
// Create pagination
const pagination = new Pagination(items, 12); // 12 items per page

// Render paginated cards
renderPaginatedCards(items, 1, 12);
```

### Utilities
```javascript
// Debounce function
const debouncedFn = debounce(fn, 300);

// Escape HTML
const safe = escapeHtml(userInput);

// Data Cache
const cache = new DataCache(3600000);
cache.set('key', value);
const data = cache.get('key');
```

## 🎨 Customization

### Change Primary Color
Edit `style.css`:
```css
:root {
    --primary: #your-color;
}
```

### Add New Categories
Edit `components/card_container.html`:
```html
<li><a class="dropdown-item" href="#" data-sheet="YOUR_SHEET">Category</a></li>
```

### Modify Card Design
Edit `style/card.css` or `components/card.js`

## 🐛 Troubleshooting

### Products not loading?
1. Check console for JSONP errors
2. Verify Google Apps Script URL
3. Check if sheet name matches

### Search not working?
1. Ensure data is loaded first
2. Check `handleData.js` for errors
3. Clear cache: `localStorage.clear()`

### Dark theme not persisting?
1. Check if localStorage is enabled
2. Clear browser cache
3. Check `scripts/theme.js` for errors

## 📈 Future Improvements

- [ ] Product filtering by price/category
- [ ] User authentication
- [ ] Payment integration (Stripe, PayPal)
- [ ] Order history
- [ ] Product reviews/ratings
- [ ] Admin dashboard
- [ ] PWA support
- [ ] i18n (internationalization)

## 📄 License

This project is licensed under the MIT License.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For issues and questions, please open an issue on GitHub.

---

**Made with ❤️ by Lazydoz**
