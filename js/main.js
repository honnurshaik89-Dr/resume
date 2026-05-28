// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar?.classList.toggle('scrolled', window.scrollY > 40);
});

// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
toggle?.addEventListener('click', () => {
  navLinks?.classList.toggle('open');
  const spans = toggle.querySelectorAll('span');
  spans[0]?.classList.toggle('rot45');
  spans[1]?.classList.toggle('hidden-bar');
  spans[2]?.classList.toggle('rotneg45');
});
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => navLinks?.classList.remove('open'));
});

// Active nav link based on current page
const page = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  const href = a.getAttribute('href');
  if (href === page || (page === '' && href === 'index.html')) {
    a.classList.add('active');
  }
});

// Publication filter
const filterBtns = document.querySelectorAll('.filter-btn');
const pubItems = document.querySelectorAll('.pub-item');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    pubItems.forEach(item => {
      if (filter === 'all' || item.dataset.type === filter) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// Intersection observer for fade-in animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.card, .pub-item, .grant-card, .award-item, .timeline-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(16px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// ── Site Visit Carousels ──
(function () {
  var _s = {};
  function init(el) {
    var id = el.id;
    var total = el.querySelectorAll('.carousel-slide').length;
    if (!id || !total) return;
    _s[id] = { idx: 0, total: total, paused: false };
    _show(id, 0);
    setInterval(function () { if (!_s[id].paused) _show(id, _s[id].idx + 1); }, 4500);
    el.addEventListener('mouseenter', function () { _s[id].paused = true; });
    el.addEventListener('mouseleave', function () { _s[id].paused = false; });
  }
  function _show(id, n) {
    var s = _s[id];
    if (!s) return;
    s.idx = ((n % s.total) + s.total) % s.total;
    var track = document.querySelector('#' + id + ' .carousel-track');
    if (track) track.style.transform = 'translateX(-' + (s.idx * 100) + '%)';
    document.querySelectorAll('#' + id + ' .carousel-dot').forEach(function (d, i) {
      d.classList.toggle('active', i === s.idx);
    });
  }
  window.carouselMove = function (id, dir) { _show(id, (_s[id] ? _s[id].idx : 0) + dir); };
  window.carouselGo   = function (id, n)   { _show(id, n); };
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.site-carousel').forEach(init);
  });
}());

// Mobile nav bar animation
const style = document.createElement('style');
style.textContent = `
  .nav-toggle span.rot45 { transform: rotate(45deg) translate(5px, 5px); }
  .nav-toggle span.hidden-bar { opacity: 0; }
  .nav-toggle span.rotneg45 { transform: rotate(-45deg) translate(5px, -5px); }
`;
document.head.appendChild(style);
