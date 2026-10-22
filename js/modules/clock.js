/**
 * Live Islamabad (PKT • UTC+5) Clock Engine
 * Keeps continuous real-time clock synced to Asia/Karachi time zone
 */
export class LiveClock {
  constructor(elementId = 'liveTime', timeZone = 'Asia/Karachi') {
    this.el = document.getElementById(elementId);
    this.timeZone = timeZone;
    this.timerId = null;
    this.formatter = null;

    try {
      this.formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: this.timeZone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
    } catch (e) {
      this.formatter = null;
    }

    this.init();
  }

  init() {
    if (!this.el) return;
    this.update();
    this.timerId = setInterval(() => this.update(), 1000);
  }

  update() {
    if (!this.el) return;
    if (this.formatter) {
      try {
        const formatted = this.formatter.format(new Date());
        this.el.textContent = `${formatted} PKT`;
        return;
      } catch (e) {
        // Fallback below
      }
    }
    this.el.textContent = 'UTC+5 PKT';
  }

  destroy() {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }
}
