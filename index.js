/**
 * ==========================================================================
 * Shayan Muhammad — High-Performance Portfolio Orchestrator
 * Modular Architecture: Particles, Live Clock, Typewriter, Dropdowns,
 * Project Filters, Impact Counters, and Navigation
 * ==========================================================================
 */

import { ParticleEngine } from './js/modules/particles.js';
import { LiveClock } from './js/modules/clock.js';
import { Typewriter } from './js/modules/typing.js';
import { DropdownMenu } from './js/modules/dropdown.js';
import { ProjectFilter } from './js/modules/project-filter.js';
import { MetricCounters } from './js/modules/counters.js';
import { Navigation } from './js/modules/navigation.js';
import { ContactFormHandler } from './js/modules/contact.js';

export class PortfolioApp {
  constructor() {
    this.modules = {};
  }

  init() {
    // 1. Ambient Particles Background
    try {
      this.modules.particles = new ParticleEngine('particles-canvas');
    } catch (err) {
      console.warn('[Portfolio] Particles module init warning:', err);
    }

    // 2. Live Islamabad (PKT • UTC+5) Clock
    try {
      this.modules.clock = new LiveClock('liveTime');
    } catch (err) {
      console.warn('[Portfolio] Live clock module init warning:', err);
    }

    // 3. Multi-Role Typewriter Effect
    try {
      this.modules.typewriter = new Typewriter('typingText');
    } catch (err) {
      console.warn('[Portfolio] Typewriter module init warning:', err);
    }

    // 4. Project Category Filter
    try {
      this.modules.projectFilter = new ProjectFilter();
    } catch (err) {
      console.warn('[Portfolio] Project filter module init warning:', err);
    }

    // 5. Architecture Specialties Dropdown Menu
    try {
      this.modules.dropdown = new DropdownMenu({
        buttonId: 'categoryDropdownBtn',
        menuId: 'categoryDropdownMenu',
        onSelect: (filterCategory) => {
          if (this.modules.projectFilter) {
            this.modules.projectFilter.filter(filterCategory);
          }
        }
      });
    } catch (err) {
      console.warn('[Portfolio] Dropdown module init warning:', err);
    }

    // 6. Impact Metric Counters (IntersectionObserver)
    try {
      this.modules.counters = new MetricCounters('.stat-number');
    } catch (err) {
      console.warn('[Portfolio] Counters module init warning:', err);
    }

    // 7. Navigation, Mobile Drawer & Smooth Anchor Scrolling
    try {
      this.modules.navigation = new Navigation();
    } catch (err) {
      console.warn('[Portfolio] Navigation module init warning:', err);
    }

    // 8. Contact Form Asynchronous Handler
    try {
      this.modules.contact = new ContactFormHandler('contactForm');
    } catch (err) {
      console.warn('[Portfolio] Contact module init warning:', err);
    }
  }
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.__portfolioApp = new PortfolioApp();
    window.__portfolioApp.init();
  });
} else {
  window.__portfolioApp = new PortfolioApp();
  window.__portfolioApp.init();
}
