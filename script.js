/* ── Navbar scroll effect ─────────────────────────────────── */
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  navbar.classList.toggle('scrolled', y > 40);
  backToTop.classList.toggle('show', y > 400);
  highlightNavLink();
});

backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ── Mobile nav toggle ────────────────────────────────────── */
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  navToggle.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
  });
});

/* ── Active nav link on scroll ───────────────────────────── */
const sections = document.querySelectorAll('section[id]');
function highlightNavLink() {
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    const id     = section.getAttribute('id');
    const link   = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) link.classList.toggle('active', scrollY >= top && scrollY < top + height);
  });
}

/* ── Class filter ─────────────────────────────────────────── */
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    document.querySelectorAll('.class-card').forEach(card => {
      const level = card.dataset.level || '';
      if (filter === 'all' || level.includes(filter)) {
        card.classList.remove('hidden');
        card.style.animation = 'none';
        requestAnimationFrame(() => {
          card.style.animation = '';
        });
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

/* ── Enrollment form validation ───────────────────────────── */
const registerForm = document.getElementById('registerForm');
const formSuccess  = document.getElementById('formSuccess');

function showErr(id, msg) {
  const el = document.getElementById('err-' + id);
  const input = document.getElementById(id) || document.querySelector(`[name="${id}"]`);
  if (el) el.textContent = msg;
  if (input) {
    if (msg) input.classList.add('invalid');
    else input.classList.remove('invalid');
  }
}

function clearErrors() {
  document.querySelectorAll('.err-msg').forEach(el => el.textContent = '');
  document.querySelectorAll('.invalid').forEach(el => el.classList.remove('invalid'));
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
  return /^[\d\s\+\-\(\)]{7,}$/.test(phone);
}

registerForm && registerForm.addEventListener('submit', e => {
  e.preventDefault();
  clearErrors();
  let valid = true;

  const get = id => document.getElementById(id);

  if (!get('firstName').value.trim()) { showErr('firstName', 'First name is required.'); valid = false; }
  if (!get('lastName').value.trim())  { showErr('lastName', 'Last name is required.'); valid = false; }

  if (!get('email').value.trim()) {
    showErr('email', 'Email address is required.'); valid = false;
  } else if (!validateEmail(get('email').value.trim())) {
    showErr('email', 'Please enter a valid email address.'); valid = false;
  }

  if (!get('phone').value.trim()) {
    showErr('phone', 'Phone number is required.'); valid = false;
  } else if (!validatePhone(get('phone').value.trim())) {
    showErr('phone', 'Please enter a valid phone number.'); valid = false;
  }

  const age = parseInt(get('age').value);
  if (!get('age').value || isNaN(age) || age < 4 || age > 90) {
    showErr('age', 'Please enter a valid age (4–90).'); valid = false;
  }

  if (!get('experience').value) { showErr('experience', 'Please select your experience level.'); valid = false; }
  if (!get('program').value)    { showErr('program', 'Please select a program.'); valid = false; }

  const consent = document.getElementById('consent');
  if (!consent.checked) { showErr('consent', 'You must agree to be contacted.'); valid = false; }

  if (!valid) return;

  const btn = document.getElementById('submitBtn');
  btn.textContent = 'Submitting…';
  btn.disabled = true;

  setTimeout(() => {
    registerForm.style.display = 'none';
    formSuccess.classList.add('show');
    formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 800);
});

/* ── Contact form ─────────────────────────────────────────── */
const contactForm = document.getElementById('contactForm');
contactForm && contactForm.addEventListener('submit', e => {
  e.preventDefault();
  const btn = contactForm.querySelector('button[type="submit"]');
  btn.textContent = 'Message Sent!';
  btn.style.background = '#2d6a2d';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = 'Send Message';
    btn.style.background = '';
    btn.disabled = false;
    contactForm.reset();
  }, 3000);
});

/* ── Scroll fade-in animation ─────────────────────────────── */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

function applyFadeUp(selector) {
  document.querySelectorAll(selector).forEach((el, i) => {
    el.classList.add('fade-up');
    el.style.transitionDelay = `${(i % 4) * 0.1}s`;
    observer.observe(el);
  });
}

applyFadeUp('.coach-card');
applyFadeUp('.facility-card');
applyFadeUp('.class-card');
applyFadeUp('.contact-item');
applyFadeUp('.milestone');

/* ── Smooth pre-fill from "Enroll Now" on class cards ─────── */
document.querySelectorAll('.class-card .btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const header  = btn.closest('.class-card').querySelector('.card-header h3');
    const select  = document.getElementById('program');
    if (!header || !select) return;

    const map = {
      'Tennis Foundations': 'foundations',
      'Skill Builder':      'skillbuilder',
      'Elite Performance':  'elite',
      'Junior Stars':       'junior-stars',
      'Junior Academy':     'junior-academy',
      'Private Lessons':    'private',
    };

    for (const [name, value] of Object.entries(map)) {
      if (header.textContent.includes(name)) {
        select.value = value;
        break;
      }
    }
  });
});
