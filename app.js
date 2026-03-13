document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    if (window.lucide) {
        window.lucide.createIcons();
    }

    // Tab Switching Logic
    const navItems = document.querySelectorAll('.nav-item');
    const screens = document.querySelectorAll('.screen');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const screenId = item.getAttribute('data-screen');
            if (!screenId) return;

            // Update Nav UI
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            // Update Screen UI
            screens.forEach(s => s.classList.remove('active-screen'));
            const targetScreen = document.getElementById(screenId);
            if (targetScreen) {
                targetScreen.classList.add('active-screen');
                // Scroll to top of the new screen
                targetScreen.scrollTo(0, 0);
            }
        });
    });

    // Enhanced "Scan" button logic
    const scanBtn = document.querySelector('.scan-action button');
    const scanOverlay = document.getElementById('scan-overlay');
    
    if (scanBtn && scanOverlay) {
        scanBtn.addEventListener('click', () => {
            scanOverlay.classList.remove('hidden');
            
            setTimeout(() => {
                scanOverlay.classList.add('hidden');
                
                // Switch to result screen
                const resultScreenId = 'screen-result';
                const targetScreen = document.getElementById(resultScreenId);
                
                if (targetScreen) {
                    screens.forEach(s => s.classList.remove('active-screen'));
                    targetScreen.classList.add('active-screen');
                    targetScreen.scrollTo(0, 0);
                    
                    // The "Search" tab should be highlighted when showing results
                    navItems.forEach(i => i.classList.remove('active'));
                    const searchNavItem = document.querySelector(`.nav-item[data-screen="screen-search"]`);
                    if (searchNavItem) {
                        searchNavItem.classList.add('active');
                    }
                }
            }, 2500);
        });
    }

    // Search simulation from Entry screen
    const searchEntryElements = document.querySelectorAll('.chip, .cat-item, #screen-search .search-input-box input');
    searchEntryElements.forEach(el => {
        const triggerEvent = el.tagName === 'INPUT' ? 'keypress' : 'click';
        el.addEventListener(triggerEvent, (e) => {
            if (triggerEvent === 'keypress' && e.key !== 'Enter') return;
            
            const targetScreen = document.getElementById('screen-result');
            if (targetScreen) {
                screens.forEach(s => s.classList.remove('active-screen'));
                targetScreen.classList.add('active-screen');
                targetScreen.scrollTo(0, 0);
            }
        });
    });

    // Next Step buttons
    const nextBtns = document.querySelectorAll('.btn-block');
    nextBtns.forEach(btn => {
        if (!btn.classList.contains('btn-primary')) return;
        btn.addEventListener('click', () => {
            console.log('Action triggered');
        });
    });
});
