/* ==========================================================================
   Shayan Muhammad — High-Performance Portfolio JavaScript
   Canvas Particles, Typing Effect, Live Clock, Dropdowns & Project Filters
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ========== 1. PARTICLES BACKGROUND (CYAN/INDIGO GLOW) ==========
  const canvas = document.getElementById('particles-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: null, y: null, radius: 140 };

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    window.addEventListener('mouseout', () => {
      mouse.x = null;
      mouse.y = null;
    });

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.6;
        this.speedX = (Math.random() - 0.5) * 0.45;
        this.speedY = (Math.random() - 0.5) * 0.45;
        this.color = Math.random() > 0.5 ? 'rgba(0, 242, 254, ' : 'rgba(99, 102, 241, ';
        this.opacity = Math.random() * 0.4 + 0.15;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (mouse.x !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            this.x -= (dx / dist) * force * 2;
            this.y -= (dy / dist) * force * 2;
          }
        }

        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }
      draw() {
        ctx.fillStyle = this.color + this.opacity + ')';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function initParticles() {
      particles = [];
      const count = Math.min(Math.floor((canvas.width * canvas.height) / 14000), 90);
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    }
    initParticles();
    window.addEventListener('resize', initParticles);

    function connectParticles() {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            const opacity = (1 - dist / 130) * 0.12;
            ctx.strokeStyle = `rgba(0, 242, 254, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      connectParticles();
      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }


  // ========== 2. LIVE ISLAMABAD PKT CLOCK ==========
  const liveTimeEl = document.getElementById('liveTime');
  function updateIslamabadTime() {
    if (!liveTimeEl) return;
    try {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Karachi',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      const formatter = new Intl.DateTimeFormat('en-US', options);
      liveTimeEl.textContent = `${formatter.format(now)} PKT`;
    } catch (e) {
      liveTimeEl.textContent = 'UTC+5 PKT';
    }
  }
  updateIslamabadTime();
  setInterval(updateIslamabadTime, 1000);


  // ========== 3. SPECIALTIES DROPDOWN MENU ==========
  const dropdownBtn = document.getElementById('categoryDropdownBtn');
  const dropdownMenu = document.getElementById('categoryDropdownMenu');

  if (dropdownBtn && dropdownMenu) {
    dropdownBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = dropdownBtn.getAttribute('aria-expanded') === 'true';
      dropdownBtn.setAttribute('aria-expanded', !isExpanded);
      dropdownMenu.classList.toggle('show');
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!dropdownBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
        dropdownBtn.setAttribute('aria-expanded', 'false');
        dropdownMenu.classList.remove('show');
      }
    });

    // Handle dropdown item click
    dropdownMenu.querySelectorAll('.dropdown-item').forEach(item => {
      item.addEventListener('click', () => {
        dropdownBtn.setAttribute('aria-expanded', 'false');
        dropdownMenu.classList.remove('show');
        const filterVal = item.getAttribute('data-filter');
        if (filterVal) {
          triggerProjectFilter(filterVal);
        }
      });
    });
  }


  // ========== 4. TYPING EFFECT ==========
  const roles = [
    'Autonomous Agentic Pipelines',
    'Low-Latency Neural RAG',
    'High-Throughput Distributed Backends',
    'Edge Computer Vision & YOLOv8',
    'Full-Stack Architecture (React + FastAPI)'
  ];
  const typingEl = document.getElementById('typingText');
  if (typingEl) {
    let roleIndex = 0, charIndex = 0, isDeleting = false;

    function typeRole() {
      const current = roles[roleIndex];
      if (isDeleting) {
        typingEl.textContent = current.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typingEl.textContent = current.substring(0, charIndex + 1);
        charIndex++;
      }

      let speed = isDeleting ? 30 : 65;

      if (!isDeleting && charIndex === current.length) {
        speed = 2200;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        speed = 400;
      }

      setTimeout(typeRole, speed);
    }
    typeRole();
  }


  // ========== 5. INTERACTIVE PROJECT FILTER TABS ==========
  const filterPills = document.querySelectorAll('.filter-pill');
  const projectCards = document.querySelectorAll('.project-card');

  function triggerProjectFilter(filter) {
    filterPills.forEach(btn => {
      if (btn.getAttribute('data-filter') === filter) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    projectCards.forEach(card => {
      const category = card.getAttribute('data-category');
      if (filter === 'all' || category === filter) {
        card.style.display = 'flex';
        card.style.opacity = '0';
        card.style.transform = 'translateY(12px)';
        setTimeout(() => {
          card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 10);
      } else {
        card.style.display = 'none';
      }
    });
  }

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const filter = pill.getAttribute('data-filter');
      triggerProjectFilter(filter);
    });
  });


  // ========== 6. ANIMATED IMPACT COUNTERS ==========
  const statNumbers = document.querySelectorAll('.stat-number');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const countTo = parseInt(target.getAttribute('data-target') || '0', 10);
        let count = 0;
        const duration = 1800;
        const stepTime = 20;
        const increment = countTo / (duration / stepTime);

        const timer = setInterval(() => {
          count += increment;
          if (count >= countTo) {
            target.textContent = countTo + (countTo === 50 ? '<' : '+');
            if (countTo === 50) target.textContent = '<50';
            clearInterval(timer);
          } else {
            target.textContent = Math.floor(count);
          }
        }, stepTime);

        counterObserver.unobserve(target);
      }
    });
  }, { threshold: 0.3 });

  statNumbers.forEach(el => counterObserver.observe(el));


  // ========== 7. MOBILE NAVIGATION TOGGLE ==========
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navLinks');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }


  // ========== 8. SMOOTH SCROLL FOR INTERNAL ANCHORS ==========
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = 85;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

});
