/* ============================================================
   Hero Section — Dani's Birthday
   
   Animated title with letter-by-letter reveal,
   name rotation between apodos with GSAP transitions,
   countdown to Oct 17 2026.
   ============================================================ */

import { gsap, EASE, DUR, STAGGER, prefersReducedMotion, parallaxLayer } from './motion.js';
import { icon } from './svg-icons.js';

const APODOS = ['Daniela Jimena', 'Danielita', 'Daniyivi', 'Jimenita', 'My Shayla', 'Dani'];
let nameIndex = 0;
let nameInterval = null;

export function initHero() {
  setupIcons();
  setupCountdown();
  setupScrollHint();
}

export function animateHeroEntrance() {
  const heroSubtitle = document.querySelector('.hero-subtitle');
  const heroTitle = document.querySelector('#hero h1');
  const nombreEl = document.getElementById('nombre');
  const countdown = document.getElementById('countdown');
  const scrollHint = document.querySelector('.hero-scroll-hint');

  if (prefersReducedMotion) {
    // Just show everything
    [heroSubtitle, heroTitle, nombreEl, countdown, scrollHint].forEach(el => {
      if (el) el.style.opacity = '1';
    });
    startNameRotation(nombreEl);
    return;
  }

  // Set initial states
  gsap.set([heroSubtitle, countdown, scrollHint], { opacity: 0, y: 30 });
  gsap.set(heroTitle, { opacity: 0, scale: 0.8 });
  gsap.set(nombreEl, { opacity: 0 });

  const tl = gsap.timeline({ delay: 0.3 });

  // 1. Subtitle fades in
  tl.to(heroSubtitle, {
    opacity: 0.85,
    y: 0,
    duration: DUR.medium,
    ease: EASE.out,
  });

  // 2. Main title — big scale reveal
  tl.to(heroTitle, {
    opacity: 1,
    scale: 1,
    duration: DUR.long,
    ease: EASE.outBack,
  }, '-=0.4');

  // 4. Name appears
  tl.to(nombreEl, {
    opacity: 1,
    duration: DUR.medium,
    ease: EASE.out,
    onComplete: () => startNameRotation(nombreEl),
  }, '-=0.6');

  // 5. Countdown units stagger in
  tl.to(countdown, {
    opacity: 1,
    y: 0,
    duration: DUR.medium,
    ease: EASE.outBack,
  }, '-=0.3');

  // 6. Scroll hint
  tl.to(scrollHint, {
    opacity: 0.6,
    y: 0,
    duration: DUR.short,
    ease: EASE.out,
  }, '-=0.1');

  // Parallax for the hero icons
  const heroIcons = document.querySelector('.hero-icons');
  if (heroIcons) parallaxLayer(heroIcons, 0.3);
}

function setupIcons() {
  const iconsContainer = document.querySelector('.hero-icons');
  if (!iconsContainer) return;
  iconsContainer.innerHTML = `
    ${icon('cake', { size: 48 })}
    ${icon('dachshund')}
    ${icon('heartFilled', { size: 48 })}
  `;
}

function setupScrollHint() {
  const hint = document.querySelector('.hero-scroll-hint');
  if (!hint) return;
  // Add animated arrow
  const arrow = hint.querySelector('.scroll-arrow');
  if (arrow) {
    arrow.innerHTML = icon('chevronDown', { size: 20 });
  }

  // Gentle bounce
  if (!prefersReducedMotion) {
    gsap.to(hint, {
      y: 8,
      duration: 1.2,
      ease: EASE.float,
      yoyo: true,
      repeat: -1,
    });
  }
}

function startNameRotation(el) {
  if (nameInterval) clearInterval(nameInterval);

  nameInterval = setInterval(() => {
    nameIndex = (nameIndex + 1) % APODOS.length;
    const newName = APODOS[nameIndex];

    if (prefersReducedMotion) {
      el.textContent = newName;
      // Replace heart emoji text with SVG heart
      if (newName === 'Dani') {
        el.innerHTML = 'Dani ' + icon('heartFilled', { size: 28 });
      }
      return;
    }

    gsap.to(el, {
      opacity: 0,
      y: -15,
      duration: 0.3,
      ease: EASE.inOut,
      onComplete: () => {
        if (nameIndex === APODOS.length - 1) {
          // "Dani" with heart SVG
          el.innerHTML = `<span class="nombre-text">Dani </span>${icon('heartFilled', { size: 28 })}`;
        } else {
          el.innerHTML = `<span class="nombre-text">${newName}</span>`;
        }
        gsap.fromTo(el,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.4, ease: EASE.outBack }
        );
      },
    });
  }, 2800);
}

/* --- Countdown ------------------------------------------- */

function setupCountdown() {
  const cdEl = document.getElementById('countdown');
  if (!cdEl) return;

  function tick() {
    const target = new Date(2026, 9, 17); // Oct 17, 2026
    const now = new Date();
    const diff = target - now;

    if (diff <= 0) {
      cdEl.innerHTML = `
        <div style="font-family:var(--font-display);font-size:2.2rem;display:flex;align-items:center;gap:8px">
          ${icon('sparkles', { size: 28 })}
          ¡Hoy cumples 23!
          ${icon('sparkles', { size: 28 })}
        </div>
      `;
      return;
    }

    const units = [
      ['días', Math.floor(diff / 864e5)],
      ['horas', Math.floor(diff / 36e5) % 24],
      ['min', Math.floor(diff / 6e4) % 60],
      ['seg', Math.floor(diff / 1e3) % 60],
    ];

    cdEl.innerHTML = units.map(([label, value]) => `
      <div class="cd-unit">
        <b>${value}</b>
        <span>${label}</span>
      </div>
    `).join('');
  }

  tick();
  setInterval(tick, 1000);
}
