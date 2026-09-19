/* 
  Oncura Cancer Care Center - Core Logic
  Theme Toggle, RTL Support, Navigation
*/

document.addEventListener('DOMContentLoaded', () => {
    /* 1. Theme Toggle Management */
    const themeToggles = document.querySelectorAll('.toggle-btn-theme, #theme-toggle, #mobile-theme-toggle');
    const htmlElement = document.documentElement;

    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-theme', savedTheme);
    updateThemeIcons(savedTheme);

    function updateThemeIcons(theme) {
        const icon = theme === 'dark' ? '☀️' : '🌙';
        themeToggles.forEach(btn => {
            if (btn.tagName === 'BUTTON' || (btn.tagName === 'DIV' && !btn.querySelector('span'))) {
                btn.textContent = icon;
            } else if (btn.querySelector('span')) {
                btn.querySelector('span').textContent = icon;
            }
        });
    }

    function toggleTheme() {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcons(newTheme);
    }

    themeToggles.forEach(btn => btn.addEventListener('click', toggleTheme));

    /* 2. RTL Support Toggle */
    const rtlToggles = document.querySelectorAll('#rtl-toggle, #mobile-rtl-toggle, #dash-rtl-toggle');

    // Load saved direction
    const savedDir = localStorage.getItem('direction') || 'ltr';
    htmlElement.setAttribute('dir', savedDir);

    function toggleRTL() {
        const currentDir = htmlElement.getAttribute('dir');
        const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
        htmlElement.setAttribute('dir', newDir);
        localStorage.setItem('direction', newDir);
    }

    rtlToggles.forEach(btn => btn.addEventListener('click', toggleRTL));

    /* Password Visibility Toggle */
    document.querySelectorAll('.password-toggle-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const wrapper = btn.closest('.password-input-wrapper');
            const input = wrapper ? wrapper.querySelector('input') : null;
            const icon = btn.querySelector('i');
            if (input) {
                if (input.type === 'password') {
                    input.type = 'text';
                    if (icon) {
                        icon.classList.remove('fa-eye');
                        icon.classList.add('fa-eye-slash');
                    }
                } else {
                    input.type = 'password';
                    if (icon) {
                        icon.classList.remove('fa-eye-slash');
                        icon.classList.add('fa-eye');
                    }
                }
            }
        });
    });

    /* 3. Active Nav Link Highlighting */
    (function setActiveNavLinks() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        // Desktop nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            const linkPage = link.getAttribute('href');
            if (linkPage === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
        // Mobile drawer links
        document.querySelectorAll('.mobile-link').forEach(link => {
            const linkPage = link.getAttribute('href');
            if (linkPage === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    })();

    /* 4. Mobile Menu (Hamburger) */
    const hamburger = document.getElementById('hamburger');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const drawerOverlay = document.getElementById('drawer-overlay');
    const drawerClose = document.getElementById('drawer-close');

    function toggleMenu() {
        mobileDrawer.classList.toggle('open');
        drawerOverlay.classList.toggle('visible');
        document.body.style.overflow = mobileDrawer.classList.contains('open') ? 'hidden' : 'auto';
    }

    if (hamburger) hamburger.addEventListener('click', toggleMenu);
    if (drawerOverlay) drawerOverlay.addEventListener('click', toggleMenu);
    if (drawerClose) drawerClose.addEventListener('click', toggleMenu);

    // Close menu on link click
    const mobileLinks = document.querySelectorAll('.mobile-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileDrawer.classList.remove('open');
            drawerOverlay.classList.remove('visible');
            document.body.style.overflow = 'auto';
        });
    });

    /* 5. Hero Animations Trigger */
    const heroH1 = document.querySelector('.hero h1');
    const heroP = document.querySelector('.hero p');
    const heroBtns = document.querySelector('.hero-btns');

    if (heroH1) {
        setTimeout(() => heroH1.classList.add('animate-slideUp'), 500);
        setTimeout(() => heroP.classList.add('animate-slideUp'), 1000);
        setTimeout(() => heroBtns.classList.add('animate-slideUp'), 1500);
    }

    /* 6. Scroll Animations (Simple Intersection Observer) */
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    /* 7. Advanced Hero Logic */
    const keywords = document.querySelectorAll('.dynamic-keyword');
    if (keywords.length > 0) {
        let currentIdx = 0;
        setInterval(() => {
            keywords[currentIdx].classList.remove('active');
            currentIdx = (currentIdx + 1) % keywords.length;
            keywords[currentIdx].classList.add('active');
        }, 3000);
    }

    // Layered Parallax
    const mainCard = document.querySelector('.glass-card-main');
    const subCards = document.querySelectorAll('.floating-sub-card');

    if (mainCard) {
        document.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth / 2 - e.pageX) / 30;
            const y = (window.innerHeight / 2 - e.pageY) / 30;

            mainCard.style.transform = `translate(-50%, -50%) rotateY(${x}deg) rotateX(${y}deg)`;

            subCards.forEach((card, index) => {
                const depth = (index + 1) * 10;
                const offsetX = (window.innerWidth / 2 - e.pageX) / depth;
                const offsetY = (window.innerHeight / 2 - e.pageY) / depth;
                card.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
            });
        });
    }

    /* 8. Back to Top Button Injection & Logic */
    const backToTopBtn = document.createElement('div');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTopBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    /* 9. FAQ Accordion Dropdown */
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const header = item.querySelector('.faq-header');
            const content = item.querySelector('.faq-content');

            // Initialize active items
            if (item.classList.contains('active') && content) {
                content.style.maxHeight = content.scrollHeight + 'px';
            }

            if (header && content) {
                header.addEventListener('click', () => {
                    const isOpen = item.classList.contains('active');

                    // Close other items in the accordion
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item && otherItem.classList.contains('active')) {
                            otherItem.classList.remove('active');
                            const otherBtn = otherItem.querySelector('.faq-header');
                            const otherContent = otherItem.querySelector('.faq-content');
                            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
                            if (otherContent) otherContent.style.maxHeight = null;
                        }
                    });

                    // Toggle current item
                    if (isOpen) {
                        item.classList.remove('active');
                        header.setAttribute('aria-expanded', 'false');
                        content.style.maxHeight = null;
                    } else {
                        item.classList.add('active');
                        header.setAttribute('aria-expanded', 'true');
                        content.style.maxHeight = content.scrollHeight + 'px';
                    }
                });
            }
        });

        // Recalculate heights when resized to keep dynamic layout smooth
        window.addEventListener('resize', () => {
            faqItems.forEach(item => {
                if (item.classList.contains('active')) {
                    const content = item.querySelector('.faq-content');
                    if (content) {
                        content.style.maxHeight = content.scrollHeight + 'px';
                    }
                }
            });
        });
    }
});

