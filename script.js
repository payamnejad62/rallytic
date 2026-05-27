/* ═══════════════════════════════════════════════════════════
   ACE TENNIS ACADEMY — Animations & Interactions
   ═══════════════════════════════════════════════════════════ */

/* ── Page Loader ─────────────────────────────────────────── */
const loader     = document.getElementById('pageLoader');
const loaderFill = document.getElementById('loaderFill');
let prog = 0;

const loadInterval = setInterval(() => {
  prog += Math.random() * 18;
  if (prog >= 100) { prog = 100; clearInterval(loadInterval); }
  loaderFill.style.width = prog + '%';
}, 60);

window.addEventListener('load', () => {
  setTimeout(() => {
    loader.classList.add('hidden');
    startHeroCounters();
  }, 300);
});

/* ── Scroll Progress Bar ─────────────────────────────────── */
const progressBar = document.getElementById('scrollProgress');
const navbar      = document.getElementById('navbar');
const backToTop   = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  const y   = window.scrollY;
  const max = document.body.scrollHeight - window.innerHeight;
  progressBar.style.width = (y / max * 100) + '%';
  navbar.classList.toggle('scrolled', y > 40);
  backToTop.classList.toggle('show', y > 400);
  highlightNavLink();
  triggerParallax(y);
}, { passive: true });

backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ── Mobile nav toggle ───────────────────────────────────── */
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  navToggle.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link =>
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
  })
);

/* ── Active nav on scroll ────────────────────────────────── */
const sections = document.querySelectorAll('section[id]');
function highlightNavLink() {
  const y = window.scrollY + 100;
  sections.forEach(sec => {
    const id   = sec.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) link.classList.toggle('active', y >= sec.offsetTop && y < sec.offsetTop + sec.offsetHeight);
  });
}

/* ── Parallax hero bg ────────────────────────────────────── */
const heroBg = document.getElementById('heroBg');
function triggerParallax(y) {
  if (heroBg && y < window.innerHeight) {
    heroBg.style.transform = `translateY(${y * 0.35}px)`;
  }
}

/* ── Cursor glow ─────────────────────────────────────────── */
const cursorGlow = document.createElement('div');
cursorGlow.className = 'cursor-glow';
document.body.appendChild(cursorGlow);
document.addEventListener('mousemove', e => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top  = e.clientY + 'px';
}, { passive: true });

/* ── Typed text effect ───────────────────────────────────── */
const typedEl    = document.getElementById('typedText');
const phrases    = ['Tennis Game', 'Performance', 'Career', 'Technique', 'Game IQ'];
let phraseIndex  = 0;
let charIndex    = 0;
let isDeleting   = false;
let typingPaused = false;

function type() {
  if (!typedEl) return;
  const current = phrases[phraseIndex];
  if (isDeleting) {
    typedEl.textContent = current.slice(0, --charIndex);
  } else {
    typedEl.textContent = current.slice(0, ++charIndex);
  }

  if (!isDeleting && charIndex === current.length) {
    typingPaused = true;
    setTimeout(() => { isDeleting = true; typingPaused = false; type(); }, 2000);
    return;
  }
  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
  }
  setTimeout(type, isDeleting ? 55 : 90);
}
setTimeout(type, 1400);

/* ── Counter animation ───────────────────────────────────── */
function startHeroCounters() {
  document.querySelectorAll('.hero .counter').forEach(el => animateCounter(el));
}

function animateCounter(el) {
  const target   = parseInt(el.dataset.target, 10);
  const suffix   = el.dataset.suffix || '';
  const duration = 1800;
  const start    = performance.now();

  function step(now) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const ease     = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(ease * target) + (progress === 1 ? suffix : '');
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

/* ── Intersection Observer — reveal animations ───────────── */
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    io.unobserve(entry.target);
  });
}, { threshold: 0.12 });

function observe(selector, cls = 'fade-up', staggerMod = 4, delayStep = 0.1) {
  document.querySelectorAll(selector).forEach((el, i) => {
    el.classList.add(cls);
    el.style.transitionDelay = `${(i % staggerMod) * delayStep}s`;
    io.observe(el);
  });
}

observe('.coach-card',      'stagger', 4, 0.1);
observe('.facility-card',   'stagger', 3, 0.1);
observe('.class-card',      'stagger', 3, 0.12);
observe('.contact-item',    'stagger', 4, 0.1);
observe('.milestone',       'stagger', 4, 0.1);
observe('.about-img-wrap',  'reveal-left');
observe('.about-text',      'reveal-right');
observe('.reg-highlights',  'reveal-left');
observe('.register-form-wrap', 'reveal-right');

/* ── Animate section-header underline ────────────────────── */
const headerObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('animated');
      headerObs.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.section-header').forEach(h => headerObs.observe(h));

/* ── Counter in About (badges) ───────────────────────────── */
const aboutCounterObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.querySelectorAll('[data-target]').forEach(el => animateCounter(el));
    aboutCounterObs.unobserve(e.target);
  });
}, { threshold: 0.5 });
const aboutSection = document.getElementById('about');
if (aboutSection) aboutCounterObs.observe(aboutSection);

/* ── 3D tilt on cards ────────────────────────────────────── */
function initTilt(selector) {
  document.querySelectorAll(selector).forEach(card => {
    card.classList.add('tilt-card');

    card.addEventListener('mousemove', e => {
      const rect   = card.getBoundingClientRect();
      const cx     = rect.left + rect.width  / 2;
      const cy     = rect.top  + rect.height / 2;
      const dx     = (e.clientX - cx) / (rect.width  / 2);
      const dy     = (e.clientY - cy) / (rect.height / 2);
      const rotX   = -dy * 7;
      const rotY   =  dx * 7;
      card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(8px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform .5s cubic-bezier(0.16,1,0.3,1)';
      card.style.transform  = 'perspective(800px) rotateX(0) rotateY(0) translateZ(0)';
      setTimeout(() => { card.style.transition = ''; }, 500);
    });
  });
}
initTilt('.class-card');
initTilt('.coach-card');
initTilt('.facility-card');

/* ── Ripple on all .btn ──────────────────────────────────── */
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const rect   = this.getBoundingClientRect();
    const size   = Math.max(rect.width, rect.height) * 2;
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.cssText = `
      width:${size}px; height:${size}px;
      left:${e.clientX - rect.left - size/2}px;
      top:${e.clientY - rect.top  - size/2}px;
    `;
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

/* ── Magnetic button effect ──────────────────────────────── */
document.querySelectorAll('.magnetic-btn').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const rect = btn.getBoundingClientRect();
    const dx = (e.clientX - rect.left - rect.width  / 2) * 0.25;
    const dy = (e.clientY - rect.top  - rect.height / 2) * 0.25;
    btn.style.transform = `translate(${dx}px, ${dy}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

/* ── Class filter with animation ────────────────────────── */
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    const cards  = document.querySelectorAll('.class-card');

    cards.forEach((card, i) => {
      const level = card.dataset.level || '';
      const show  = filter === 'all' || level.includes(filter);

      if (show) {
        card.style.display = '';
        card.classList.remove('hidden');
        setTimeout(() => card.classList.add('fade-in'), 10);
        card.style.transitionDelay = `${(i % 3) * 0.07}s`;
        setTimeout(() => card.classList.remove('fade-in'), 500);
      } else {
        card.style.transitionDelay = '0s';
        card.classList.add('hidden');
      }
    });
  });
});

/* ── Form validation ─────────────────────────────────────── */
const registerForm = document.getElementById('registerForm');
const formSuccess  = document.getElementById('formSuccess');

function showErr(id, msg) {
  const el    = document.getElementById('err-' + id);
  const input = document.getElementById(id) || document.querySelector(`[name="${id}"]`);
  if (el) el.textContent = msg;
  if (input) input.classList.toggle('invalid', !!msg);
}
function clearErrors() {
  document.querySelectorAll('.err-msg').forEach(el => el.textContent = '');
  document.querySelectorAll('.invalid').forEach(el => el.classList.remove('invalid'));
}
const validEmail = e => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
const validPhone = p => /^[\d\s\+\-\(\)]{7,}$/.test(p);

registerForm && registerForm.addEventListener('submit', e => {
  e.preventDefault();
  clearErrors();
  let ok = true;
  const g = id => document.getElementById(id);

  if (!g('firstName').value.trim()) { showErr('firstName', 'First name is required.'); ok = false; }
  if (!g('lastName').value.trim())  { showErr('lastName',  'Last name is required.');  ok = false; }
  if (!g('email').value.trim())     { showErr('email', 'Email is required.'); ok = false; }
  else if (!validEmail(g('email').value.trim())) { showErr('email', 'Enter a valid email.'); ok = false; }
  if (!g('phone').value.trim())     { showErr('phone', 'Phone is required.'); ok = false; }
  else if (!validPhone(g('phone').value.trim())) { showErr('phone', 'Enter a valid phone number.'); ok = false; }
  const age = parseInt(g('age').value);
  if (!g('age').value || isNaN(age) || age < 4 || age > 90) { showErr('age', 'Enter a valid age (4–90).'); ok = false; }
  if (!g('experience').value) { showErr('experience', 'Please select a level.'); ok = false; }
  if (!g('program').value)    { showErr('program', 'Please select a program.'); ok = false; }
  if (!document.getElementById('consent').checked) { showErr('consent', 'You must agree to be contacted.'); ok = false; }
  if (!ok) return;

  const btn = document.getElementById('submitBtn');
  btn.textContent = 'Submitting…';
  btn.disabled = true;
  setTimeout(() => {
    registerForm.style.display = 'none';
    formSuccess.classList.add('show');
    formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 800);
});

/* ── Contact form ────────────────────────────────────────── */
const contactForm = document.getElementById('contactForm');
contactForm && contactForm.addEventListener('submit', e => {
  e.preventDefault();
  const btn = contactForm.querySelector('button[type="submit"]');
  btn.textContent = 'Message Sent! ✓';
  btn.style.background = '#2d6a2d';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = 'Send Message';
    btn.style.background = '';
    btn.disabled = false;
    contactForm.reset();
  }, 3000);
});

/* ── Pre-fill program from card ──────────────────────────── */
document.querySelectorAll('.class-card .btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const h3    = btn.closest('.class-card').querySelector('.card-header h3');
    const sel   = document.getElementById('program');
    if (!h3 || !sel) return;
    const map = {
      'Tennis Foundations': 'foundations',
      'Skill Builder':      'skillbuilder',
      'Elite Performance':  'elite',
      'Junior Stars':       'junior-stars',
      'Junior Academy':     'junior-academy',
      'Private Lessons':    'private',
    };
    for (const [name, val] of Object.entries(map)) {
      if (h3.textContent.includes(name)) { sel.value = val; break; }
    }
  });
});
