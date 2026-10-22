/**
 * Navigation & Smooth Scroll Engine
 * Manages mobile drawer toggle, outside clicks, and offset anchor scrolling
 */
export class Navigation {
  constructor({
    toggleId = 'navToggle',
    menuId = 'navLinks',
    navId = 'navbar',
    anchorSelector = 'a[href^="#"]',
    scrollOffset = 85
  } = {}) {
    this.toggle = document.getElementById(toggleId);
    this.menu = document.getElementById(menuId);
    this.nav = document.getElementById(navId);
    this.anchors = document.querySelectorAll(anchorSelector);
    this.scrollOffset = scrollOffset;

    this.init();
  }

  init() {
    this.bindMobileNav();
    this.bindSmoothScroll();
    this.bindScrollHeader();
  }

  bindMobileNav() {
    if (!this.toggle || !this.menu) return;

    this.toggle.addEventListener('click', () => {
      const isActive = this.toggle.classList.toggle('active');
      this.menu.classList.toggle('active');
      this.toggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    });

    // Close menu when a navigation link is clicked
    this.menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        this.closeMobileNav();
      });
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.menu.classList.contains('active')) {
        this.closeMobileNav();
        this.toggle.focus();
      }
    });
  }

  closeMobileNav() {
    if (this.toggle && this.menu) {
      this.toggle.classList.remove('active');
      this.menu.classList.remove('active');
      this.toggle.setAttribute('aria-expanded', 'false');
    }
  }

  bindSmoothScroll() {
    this.anchors.forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href');
        if (!targetId || targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          const top = target.getBoundingClientRect().top + window.scrollY - this.scrollOffset;
          window.scrollTo({ top, behavior: 'smooth' });

          // Update URL hash cleanly without scroll jump
          if (history.pushState) {
            history.pushState(null, '', targetId);
          }
        }
      });
    });
  }

  bindScrollHeader() {
    if (!this.nav) return;
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (window.scrollY > 40) {
            this.nav.classList.add('scrolled');
          } else {
            this.nav.classList.remove('scrolled');
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }
}
