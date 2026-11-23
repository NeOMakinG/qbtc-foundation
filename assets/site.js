(() => {
  const doc = document.documentElement;
  // Mobile menu
  const burger = document.querySelector('.burger');
  const overlay = document.getElementById('menu');
  const setMenu = (open) => {
    doc.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    overlay.toggleAttribute('inert', !open);
  };
  burger.addEventListener('click', () => setMenu(!doc.classList.contains('menu-open')));
  overlay.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

  // Scroll reveals
  const io = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
  }), { rootMargin: '0px 0px -10% 0px' });
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

  // Current section in nav
  const links = [...document.querySelectorAll('.navlinks a[href^="#"]')];
  const spy = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (!en.isIntersecting) return;
    links.forEach((a) => a.toggleAttribute('aria-current', a.getAttribute('href') === '#' + en.target.id));
    links.forEach((a) => { if (a.hasAttribute('aria-current')) a.setAttribute('aria-current', 'true'); });
  }), { rootMargin: '-45% 0px -50% 0px' });
  links.forEach((a) => { const s = document.querySelector(a.getAttribute('href')); if (s) spy.observe(s); });

  // Tagline: words light up one by one as they cross the trigger line
  const tag = document.querySelector('.tagline p');
  if (tag) {
    tag.innerHTML = tag.textContent.trim().split(/\s+/).map((w) => `<span class="w">${w}</span> `).join('');
    const words = [...tag.querySelectorAll('.w')];
    let ticking = false;
    const update = () => {
      ticking = false;
      const line = window.innerHeight * 0.7;
      const r = tag.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, (line - r.top) / (r.height + window.innerHeight * 0.3)));
      const lit = Math.round(progress * words.length);
      words.forEach((w, i) => w.classList.toggle('on', i < lit));
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    new IntersectionObserver((en) => {
      if (en[0].isIntersecting) window.addEventListener('scroll', onScroll, { passive: true });
      else window.removeEventListener('scroll', onScroll);
      update();
    }).observe(tag);
  }

  // Event filters
  const tabs = [...document.querySelectorAll('.tab')];
  tabs.forEach((tab) => tab.addEventListener('click', () => {
    tabs.forEach((t) => t.setAttribute('aria-selected', String(t === tab)));
    document.querySelectorAll('.event').forEach((ev) => {
      ev.hidden = !(tab.dataset.filter === 'all' || ev.dataset.type === tab.dataset.filter);
    });
  }));

  // Sign-up form (demo behaviour kept from the original draft: nothing is sent)
  const form = document.getElementById('signupForm');
  if (form) form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;
    form.querySelectorAll('.field').forEach((f) => {
      const input = f.querySelector('input');
      const bad = input && !input.checkValidity();
      f.classList.toggle('bad', !!bad);
      if (bad) valid = false;
    });
    if (!form.querySelector('#consent').checked) { form.querySelector('#consent').focus(); valid = false; }
    if (!valid) { const first = form.querySelector('.bad input'); if (first) first.focus(); return; }
    form.querySelector('.ok').classList.add('show');
    form.querySelector('button[type="submit"]').textContent = 'You’re on the list';
  });

  // Explainer video slot
  const cfg = window.QBTC_SITE || {};
  const slot = document.getElementById('video');
  if (slot && cfg.videoSrc) {
    const box = slot.querySelector('.video');
    if (/\.(mp4|webm|mov)(\?|$)/i.test(cfg.videoSrc)) {
      const v = document.createElement('video');
      v.controls = true; v.playsInline = true; v.preload = 'metadata'; v.src = cfg.videoSrc;
      if (cfg.videoPoster) v.poster = cfg.videoPoster;
      box.appendChild(v);
    } else {
      const f = document.createElement('iframe');
      f.src = cfg.videoSrc; f.title = 'QBTC Foundation explainer video'; f.loading = 'lazy';
      f.allow = 'accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen';
      box.appendChild(f);
    }
    slot.hidden = false;
  }
})();
