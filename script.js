// SculptFlow — minimal vanilla JS, no dependencies, no backend calls.

document.addEventListener('DOMContentLoaded', () => {

  /* Sticky header shadow on scroll -------------------------------- */
  const header = document.getElementById('siteHeader');
  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* Mobile nav toggle ----------------------------------------------- */
  const navToggle = document.getElementById('navToggle');
  const mobileNav = document.getElementById('mobileNav');
  navToggle.addEventListener('click', () => {
    const isOpen = document.body.classList.toggle('nav-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      document.body.classList.remove('nav-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* Hero reveal: one orchestrated moment on load --------------------- */
  const heroEls = [document.getElementById('revealHero'), document.getElementById('revealVisual')];
  requestAnimationFrame(() => {
    setTimeout(() => heroEls.forEach(el => el && el.classList.add('is-in')), 60);
  });

  /* FAQ accordion ----------------------------------------------------- */
  document.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-q');
    const answer = item.querySelector('.faq-a');
    btn.setAttribute('aria-expanded', 'false');
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // close all others (single-open accordion)
      document.querySelectorAll('.faq-item.open').forEach(openItem => {
        if (openItem !== item) {
          openItem.classList.remove('open');
          openItem.querySelector('.faq-a').style.maxHeight = null;
          openItem.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
        }
      });

      if (isOpen) {
        item.classList.remove('open');
        answer.style.maxHeight = null;
        btn.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* Demo request form — front-end only, no backend wired up ---------- */
  const demoForm = document.getElementById('demoForm');
  const demoStatus = document.getElementById('demoStatus');
  demoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = demoForm.elements['name'].value.trim();
    demoStatus.textContent = name
      ? `Thanks, ${name} — this form isn't wired up to send anywhere yet. Connect it to your CRM or inbox to start receiving real requests.`
      : `This form isn't wired up to send anywhere yet. Connect it to your CRM or inbox to start receiving real requests.`;
    demoForm.reset();
  });

});
