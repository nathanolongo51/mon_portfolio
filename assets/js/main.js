/* ============================================
   CURSOR
============================================ */
const cursor = document.getElementById('cursor');
const trail  = document.getElementById('cursorTrail');
let mx = 0, my = 0, tx = 0, ty = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
});

(function animTrail() {
  tx += (mx - tx) * 0.13;
  ty += (my - ty) * 0.13;
  trail.style.left = tx + 'px';
  trail.style.top  = ty + 'px';
  requestAnimationFrame(animTrail);
})();

/* ============================================
   NAV SCROLL
============================================ */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

/* ============================================
   MOBILE MENU
============================================ */
const toggle   = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

toggle.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  const [s1, s2, s3] = toggle.querySelectorAll('span');
  if (open) {
    s1.style.transform = 'rotate(45deg) translate(5px, 5px)';
    s2.style.opacity = '0';
    s3.style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    s1.style.transform = s3.style.transform = '';
    s2.style.opacity = '';
  }
});

mobileLinks.forEach(l => l.addEventListener('click', () => {
  mobileMenu.classList.remove('open');
  toggle.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
}));

/* ============================================
   SCROLL REVEAL
============================================ */
// 1. On prépare les éléments à être révélés
document.querySelectorAll(
  '.service-item, .work-card, .tool-group, .about-content, .about-photo-area, .contact-left, .contact-right'
).forEach(el => el.classList.add('reveal'));

// 2. On observe le défilement proprement
(() => {
  const obs = new IntersectionObserver((entries, o) => {
    entries.forEach(e => { 
      if (e.isIntersecting) { 
        e.target.classList.add('visible'); 
        o.unobserve(e.target); 
      } 
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
})();

/* ============================================
   WORKS FILTER
============================================ */
const filterBtns = document.querySelectorAll('.filter-btn');
const workCards  = document.querySelectorAll('.work-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter');
    workCards.forEach(card => {
      const cat = card.getAttribute('data-cat');
      if (filter === 'all' || cat === filter) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

/* ============================================
   CONTACT FORM — WhatsApp
============================================ */
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name    = document.getElementById('name').value.trim();
    const tel     = document.getElementById('c-tel').value.trim();
    const type    = document.getElementById('projectType').value;
    const message = document.getElementById('message').value.trim();

    const text = encodeURIComponent(
      `*Bonjour Jonathan !*\n\n` +
      `Je vous contacte depuis votre portfolio.\n\n` +
      `*Nom :* ${name}\n` +
      `*Numero :* ${tel}\n` +
      `*Type de projet :* ${type || 'Non précisé'}\n\n` +
      `*Message :*\n${message}`
    );

    window.open(`https://wa.me/243821462002?text=${text}`, '_blank');
  });
}

/* ============================================
   SMOOTH SCROLL
============================================ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});