/**
 * Contact Form Module
 * Handles client-side validation, asynchronous Formspree dispatch,
 * interactive loading states, and fallback routing (WhatsApp / Direct Email)
 */
export class ContactFormHandler {
  constructor(formId = 'contactForm') {
    this.form = document.getElementById(formId);
    if (!this.form) return;

    this.submitBtn = this.form.querySelector('button[type="submit"]');
    this.initialBtnContent = this.submitBtn ? this.submitBtn.innerHTML : 'Transmit Message';
    this.init();
  }

  init() {
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  async handleSubmit(e) {
    e.preventDefault();

    const nameInput = this.form.querySelector('#name');
    const emailInput = this.form.querySelector('#email');
    const serviceInput = this.form.querySelector('#service');
    const messageInput = this.form.querySelector('#message');

    const name = nameInput ? nameInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const service = serviceInput ? serviceInput.value : 'fulltime';
    const message = messageInput ? messageInput.value.trim() : '';

    // Basic Validation
    if (!name || !email || !message) {
      this.showMessage('Please complete all required fields.', 'error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      this.showMessage('Please enter a valid business email address.', 'error');
      return;
    }

    // Set Loading State
    this.setLoading(true);

    const action = this.form.getAttribute('action') || '';
    const isPlaceholder = action.includes('YOUR_FORM_ID');

    if (!isPlaceholder) {
      // Real Formspree / Backend API endpoint
      try {
        const formData = new FormData(this.form);
        const res = await fetch(action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (res.ok) {
          this.showSuccess(name, email);
          this.form.reset();
        } else {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || 'Server responded with error');
        }
      } catch (err) {
        console.warn('[Contact] Formspree dispatch failed, using direct client routing fallback:', err);
        this.showFallbackOptions(name, email, service, message);
      } finally {
        this.setLoading(false);
      }
    } else {
      // Placeholder endpoint: provide seamless zero-error client routing
      setTimeout(() => {
        this.setLoading(false);
        this.showFallbackOptions(name, email, service, message);
      }, 600);
    }
  }

  setLoading(isLoading) {
    if (!this.submitBtn) return;
    if (isLoading) {
      this.submitBtn.disabled = true;
      this.submitBtn.innerHTML = `
        <span class="icon">⚡</span>
        <span>Transmitting Inquiry...</span>
      `;
    } else {
      this.submitBtn.disabled = false;
      this.submitBtn.innerHTML = this.initialBtnContent;
    }
  }

  showMessage(text, type = 'info') {
    let alertBox = this.form.querySelector('.form-alert');
    if (!alertBox) {
      alertBox = document.createElement('div');
      alertBox.className = 'form-alert';
      this.form.insertBefore(alertBox, this.form.firstChild);
    }

    alertBox.className = `form-alert ${type}`;
    alertBox.textContent = text;

    setTimeout(() => {
      if (alertBox && alertBox.parentNode) {
        alertBox.parentNode.removeChild(alertBox);
      }
    }, 5000);
  }

  showSuccess(name, email) {
    const parent = this.form.parentElement;
    parent.innerHTML = `
      <div class="form-success-card">
        <div class="success-icon">✓</div>
        <h3>Inquiry Transmitted Successfully</h3>
        <p>Thank you <strong>${this.escapeHtml(name)}</strong>. Your project scope has been received.</p>
        <p class="success-sub">A technical response will be delivered to <strong>${this.escapeHtml(email)}</strong> within 2 hours.</p>
        <button type="button" class="btn btn-primary pill-btn" onclick="location.reload()">
          <span>Send Another Message</span>
        </button>
      </div>
    `;
  }

  showFallbackOptions(name, email, service, message) {
    const encodedBody = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nEngagement Scope: ${service}\n\nProject Scope & System Details:\n${message}`
    );
    const encodedSubject = encodeURIComponent(`Engineering Inquiry: ${name} (${service})`);
    const mailtoUrl = `mailto:shayanmuhammad.cs@gmail.com?subject=${encodedSubject}&body=${encodedBody}`;
    const whatsappUrl = `https://wa.me/923169884933?text=${encodedBody}`;

    const parent = this.form.parentElement;
    parent.innerHTML = `
      <div class="form-success-card">
        <div class="success-icon">✓</div>
        <h3>Inquiry Prepared!</h3>
        <p>Hello <strong>${this.escapeHtml(name)}</strong>, click below to transmit directly via your preferred channel:</p>
        
        <div class="fallback-actions">
          <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary pill-btn whatsapp-btn">
            <span>💬 Transmit via WhatsApp</span>
          </a>
          <a href="${mailtoUrl}" class="btn btn-outline pill-btn email-btn">
            <span>✉️ Transmit via Email</span>
          </a>
        </div>

        <p class="success-sub">Operating hours: <strong>09:00 - 18:00 PKT</strong> • Direct response &lt; 2 hrs.</p>
        <button type="button" class="btn-text-link" onclick="location.reload()">← Back to form</button>
      </div>
    `;
  }

  escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
}
