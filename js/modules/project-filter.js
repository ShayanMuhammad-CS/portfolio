/**
 * Project Category Filter Engine
 * Animates category switching with GPU opacity & transform transitions
 */
export class ProjectFilter {
  constructor({
    pillsSelector = '.filter-pill',
    cardsSelector = '.project-card'
  } = {}) {
    this.pills = document.querySelectorAll(pillsSelector);
    this.cards = document.querySelectorAll(cardsSelector);

    this.init();
  }

  init() {
    if (!this.pills.length || !this.cards.length) return;

    this.pills.forEach(pill => {
      pill.addEventListener('click', () => {
        const filter = pill.getAttribute('data-filter');
        if (filter) {
          this.filter(filter);
        }
      });
    });
  }

  filter(category) {
    // 1. Update filter pills active state
    this.pills.forEach(btn => {
      const match = btn.getAttribute('data-filter') === category;
      btn.classList.toggle('active', match);
      btn.setAttribute('aria-pressed', match ? 'true' : 'false');
    });

    // 2. Filter project cards with smooth transitions
    this.cards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      const shouldShow = (category === 'all' || cardCategory === category);

      if (shouldShow) {
        card.style.display = 'flex';
        card.style.opacity = '0';
        card.style.transform = 'translateY(12px)';
        requestAnimationFrame(() => {
          card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        });
      } else {
        card.style.display = 'none';
      }
    });
  }
}
