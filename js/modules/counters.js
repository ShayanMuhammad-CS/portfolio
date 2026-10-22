/**
 * Animated Impact Counters Engine
 * Triggers smooth increment counter animation when element enters viewport
 */
export class MetricCounters {
  constructor(selector = '.stat-number') {
    this.elements = document.querySelectorAll(selector);
    this.observer = null;
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.init();
  }

  init() {
    if (!this.elements.length) return;

    if (this.prefersReducedMotion || !('IntersectionObserver' in window)) {
      this.elements.forEach(el => this.setFinalValue(el));
      return;
    }

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateCounter(entry.target);
          this.observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    this.elements.forEach(el => this.observer.observe(el));
  }

  setFinalValue(target) {
    const countTo = parseInt(target.getAttribute('data-target') || '0', 10);
    target.textContent = countTo === 50 ? '<50' : `${countTo}+`;
  }

  animateCounter(target) {
    const countTo = parseInt(target.getAttribute('data-target') || '0', 10);
    let count = 0;
    const duration = 1800;
    const stepTime = 20;
    const increment = countTo / (duration / stepTime);

    const timer = setInterval(() => {
      count += increment;
      if (count >= countTo) {
        if (countTo === 50) {
          target.textContent = '<50';
        } else {
          target.textContent = `${countTo}+`;
        }
        clearInterval(timer);
      } else {
        target.textContent = Math.floor(count);
      }
    }, stepTime);
  }

  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
