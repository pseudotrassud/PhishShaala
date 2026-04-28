// Manages dark/light mode. Runs before page paint to avoid flash.
(function () {
    const KEY = 'phishshaala_theme';

    function applyTheme() {
        const stored = localStorage.getItem(KEY);
        if (stored === 'light') {
            document.documentElement.classList.remove('dark');
        } else {
            document.documentElement.classList.add('dark');
        }
        updateIcon();
    }

    function updateIcon() {
        document.addEventListener('DOMContentLoaded', function () {
            const icon = document.getElementById('theme-toggle-icon');
            if (!icon) return;
            icon.textContent = document.documentElement.classList.contains('dark') ? 'dark_mode' : 'light_mode';
        });
    }

    // Called from onclick on each page's toggle button
    window.toggleTheme = function () {
        const isDark = document.documentElement.classList.contains('dark');
        document.documentElement.classList.toggle('dark', !isDark);
        localStorage.setItem(KEY, isDark ? 'light' : 'dark');
        const icon = document.getElementById('theme-toggle-icon');
        if (icon) icon.textContent = isDark ? 'light_mode' : 'dark_mode';
    };

    applyTheme();
})();
