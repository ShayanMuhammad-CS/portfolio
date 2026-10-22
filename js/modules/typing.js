/**
 * Typewriter Effect Engine
 * Cycles through architectural focus areas with typing and backspacing
 */
export class Typewriter {
  constructor(elementId = 'typingText', roles = null) {
    this.el = document.getElementById(elementId);
    this.roles = roles || [
      'Autonomous Agentic Pipelines',
      'Low-Latency Neural RAG',
      'High-Throughput Distributed Backends',
      'Edge Computer Vision & YOLOv8',
      'Full-Stack Architecture (React + FastAPI)'
    ];
    this.roleIndex = 0;
    this.charIndex = 0;
    this.isDeleting = false;
    this.timeoutId = null;
    this.typeSpeed = 65;
    this.deleteSpeed = 30;
    this.pauseEnd = 2200;
    this.pauseStart = 400;

    this.init();
  }

  init() {
    if (!this.el) return;
    this.type();
  }

  type() {
    if (!this.el) return;
    const current = this.roles[this.roleIndex];

    if (this.isDeleting) {
      this.el.textContent = current.substring(0, this.charIndex - 1);
      this.charIndex--;
    } else {
      this.el.textContent = current.substring(0, this.charIndex + 1);
      this.charIndex++;
    }

    let speed = this.isDeleting ? this.deleteSpeed : this.typeSpeed;

    if (!this.isDeleting && this.charIndex === current.length) {
      speed = this.pauseEnd;
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.roleIndex = (this.roleIndex + 1) % this.roles.length;
      speed = this.pauseStart;
    }

    this.timeoutId = setTimeout(() => this.type(), speed);
  }

  destroy() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }
}
