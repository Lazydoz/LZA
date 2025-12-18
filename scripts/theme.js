// Dark Theme Toggle with localStorage persistence
(function() {
    const THEME_KEY = 'lazyshop-theme';
    const DARK_THEME_CLASS = 'dark-theme';
    
    function initTheme() {
        // Check localStorage for saved theme
        const savedTheme = localStorage.getItem(THEME_KEY);
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            document.documentElement.classList.add(DARK_THEME_CLASS);
            updateThemeButton(true);
        } else {
            document.documentElement.classList.remove(DARK_THEME_CLASS);
            updateThemeButton(false);
        }
    }
    
    function updateThemeButton(isDark) {
        const button = document.getElementById('themeToggle');
        if (button) {
            button.textContent = isDark ? '☀️' : '🌙';
            button.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');
        }
    }
    
    function toggleTheme() {
        const isDark = document.documentElement.classList.toggle(DARK_THEME_CLASS);
        localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
        updateThemeButton(isDark);
    }
    
    // Delegated listener for theme toggle button
    document.addEventListener('click', (e) => {
        if (e.target && e.target.id === 'themeToggle') {
            toggleTheme();
        }
    });
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem(THEME_KEY)) {
            initTheme();
        }
    });
    
    // MutationObserver to handle dynamic header insertion
    const observer = new MutationObserver(() => {
        const button = document.getElementById('themeToggle');
        if (button && !button.hasListener) {
            button.hasListener = true;
            const isDark = document.documentElement.classList.contains(DARK_THEME_CLASS);
            updateThemeButton(isDark);
        }
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
    
    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTheme);
    } else {
        initTheme();
    }
})();
