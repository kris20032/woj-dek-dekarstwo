// STOLBASZ — drobna interaktywność (nav mobile + reveal)
(function () {
  // mobilne menu
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { links.classList.remove('open'); });
    });
  }

  // reveal przy scrollu
  var els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    els.forEach(function (el) { el.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  els.forEach(function (el) { io.observe(el); });
})();

// nav kondensuje się po przewinięciu (cienka linia + niższy pasek) — addytywne, lekkie
(function () {
  var nav = document.querySelector('.nav') || document.querySelector('header');
  if (!nav) return;
  var ticking = false;
  function upd() { nav.classList.toggle('is-stuck', window.scrollY > 24); ticking = false; }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(upd); }
  }, { passive: true });
  upd();
})();

/* === rodzina: fachowcy === */
/* === rodzina FACHOWCY ===
   TYLKO suwak PRZED/PO (before/after). NAV NIE chowa się (auto-hide) - telefon-CTA ma być ZAWSZE widoczny (decyzja FAZA 3).
   is-stuck (przezroczysty->cień) obsługuje base.js. */
(function () {
  var sliders = document.querySelectorAll('[data-ba]');
  if (!sliders.length) return;
  sliders.forEach(function (s) {
    var dragging = false;
    function setPos(clientX) {
      var r = s.getBoundingClientRect();
      var p = ((clientX - r.left) / r.width) * 100;
      p = Math.max(3, Math.min(97, p));
      s.style.setProperty('--ba-pos', p + '%');
    }
    function down(e) { dragging = true; setPos(e.touches ? e.touches[0].clientX : e.clientX); }
    function move(e) { if (dragging) setPos(e.touches ? e.touches[0].clientX : e.clientX); }
    function up() { dragging = false; }
    s.addEventListener('pointerdown', down);
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerup', up);
    s.addEventListener('touchstart', down, { passive: true });
    s.addEventListener('touchmove', move, { passive: true });
    s.addEventListener('touchend', up);
  });
})();
