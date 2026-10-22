/**
 * Accessible Dropdown Navigation Engine
 * Manages click toggling, ARIA attributes, outside-click close, and filter triggering
 */
export class DropdownMenu {
  constructor({
    buttonId = 'categoryDropdownBtn',
    menuId = 'categoryDropdownMenu',
    onSelect = null
  } = {}) {
    this.btn = document.getElementById(buttonId);
    this.menu = document.getElementById(menuId);
    this.onSelect = onSelect;
    this.handleDocClick = this.handleDocClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);

    this.init();
  }

  init() {
    if (!this.btn || !this.menu) return;

    this.btn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggle();
    });

    document.addEventListener('click', this.handleDocClick);
    document.addEventListener('keydown', this.handleKeyDown);

    const items = this.menu.querySelectorAll('.dropdown-item');
    items.forEach(item => {
      item.addEventListener('click', () => {
        this.close();
        const filterVal = item.getAttribute('data-filter');
        if (filterVal && typeof this.onSelect === 'function') {
          this.onSelect(filterVal);
        }
      });
    });
  }

  toggle() {
    const isExpanded = this.btn.getAttribute('aria-expanded') === 'true';
    if (isExpanded) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    this.btn.setAttribute('aria-expanded', 'true');
    this.menu.classList.add('show');
  }

  close() {
    this.btn.setAttribute('aria-expanded', 'false');
    this.menu.classList.remove('show');
  }

  handleDocClick(e) {
    if (!this.btn.contains(e.target) && !this.menu.contains(e.target)) {
      this.close();
    }
  }

  handleKeyDown(e) {
    if (e.key === 'Escape' && this.menu.classList.contains('show')) {
      this.close();
      this.btn.focus();
    }
  }

  destroy() {
    document.removeEventListener('click', this.handleDocClick);
    document.removeEventListener('keydown', this.handleKeyDown);
  }
}
