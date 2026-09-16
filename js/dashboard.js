/* 
  Oncura Cancer Care Center - Patient Dashboard Functionality
*/

document.addEventListener('DOMContentLoaded', () => {
    /* 0. Mobile Hamburger Menu */
    const hamburgerBtn = document.getElementById('dash-hamburger');
    const hamburgerMenu = document.getElementById('dash-hamburger-menu');
    const hamburgerBackdrop = document.getElementById('dash-hamburger-backdrop');

    const closeHamburgerMenu = () => {
        if (!hamburgerBtn || !hamburgerMenu || !hamburgerBackdrop) return;
        hamburgerMenu.hidden = true;
        hamburgerBackdrop.hidden = true;
        hamburgerBtn.setAttribute('aria-expanded', 'false');
    };

    const toggleHamburgerMenu = () => {
        if (!hamburgerBtn || !hamburgerMenu || !hamburgerBackdrop) return;
        const willOpen = hamburgerMenu.hidden;
        hamburgerMenu.hidden = !willOpen;
        hamburgerBackdrop.hidden = !willOpen;
        hamburgerBtn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
    };

    if (hamburgerBtn && hamburgerMenu && hamburgerBackdrop) {
        hamburgerBtn.addEventListener('click', (e) => {
            e.preventDefault();
            toggleHamburgerMenu();
        });

        const closeBtn = document.getElementById('dash-menu-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => closeHamburgerMenu());
        }

        hamburgerBackdrop.addEventListener('click', () => closeHamburgerMenu());

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeHamburgerMenu();
        });
    }

    /* 1. Dashboard Tab Navigation */
    const menuItems = document.querySelectorAll('.menu-item');
    const tabContents = document.querySelectorAll('.tab-content');

    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const target = item.getAttribute('data-tab');

            if (target === 'logout') {
                window.location.href = 'index.html';
                return;
            }

            // Remove active class from all menu items
            menuItems.forEach(mi => mi.classList.remove('active'));
            // Remove active class from all tab contents
            tabContents.forEach(tc => tc.classList.remove('active'));

            // Add active class to matching selections
            menuItems.forEach(mi => {
                if (mi.getAttribute('data-tab') === target) mi.classList.add('active');
            });
            const activeTab = document.getElementById(target);
            if (activeTab) {
                activeTab.classList.add('active');
            }

            closeHamburgerMenu();
        });
    });

    /* 2. Interactive Medication Reminder Toggle */
    const medButtons = document.querySelectorAll('.toggle-med');
    medButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const medCard = btn.closest('.med-item');
            if (medCard) {
                medCard.classList.toggle('taken');
                if (medCard.classList.contains('taken')) {
                    btn.innerHTML = '<i class="fa-solid fa-check"></i> Taken';
                    btn.classList.replace('btn-primary', 'btn-outline');
                } else {
                    btn.innerHTML = '<i class="fa-solid fa-check"></i> Mark Taken';
                    btn.classList.replace('btn-outline', 'btn-primary');
                }
            }
        });
    });

    /* 3. Hydration Tracker Counter */
    let currentHydration = 1.8;
    const goalHydration = 2.5;
    const hydrationCountEl = document.getElementById('hydration-count');
    const hydrationBarEl = document.getElementById('hydration-bar');
    const addWaterBtn = document.getElementById('addWaterBtn');
    const quickAddWater = document.getElementById('quickAddWater');

    const updateHydration = () => {
        currentHydration = Math.min(goalHydration, Math.round((currentHydration + 0.25) * 100) / 100);
        const percent = Math.min(100, Math.round((currentHydration / goalHydration) * 100));
        if (hydrationCountEl) {
            hydrationCountEl.textContent = `${currentHydration.toFixed(1)} / ${goalHydration} Liters (${percent}%)`;
        }
        if (hydrationBarEl) {
            hydrationBarEl.style.width = `${percent}%`;
        }
        if (currentHydration >= goalHydration) {
            alert('Congratulations! You have reached your 2.5 Liter daily hydration goal.');
        }
    };

    if (addWaterBtn) {
        addWaterBtn.addEventListener('click', updateHydration);
    }
    if (quickAddWater) {
        quickAddWater.addEventListener('click', updateHydration);
    }
});
