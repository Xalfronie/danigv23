/* ============================================================
   Lock Screen — Dani's Birthday
   
   SVG padlock that animates open on correct date entry.
   Validates: 0809, 08/09, 8/9, 8 de septiembre, 8 sep, etc.
   Error: shake + "preocúpate, Cataleya".
   Interactive hint toggle and smooth reveal.
   ============================================================ */

import { gsap, EASE, DUR, prefersReducedMotion } from './motion.js';
import { icon } from './svg-icons.js';
import { playGentleChime } from './music.js';

export function initLock(onUnlock) {
  const lockScreen = document.getElementById('lock');
  const lockIcon = lockScreen.querySelector('.lock-icon');
  const input = document.getElementById('fecha');
  const goBtn = document.getElementById('go-btn');
  const errorEl = document.getElementById('lock-error');
  const hintBtn = document.getElementById('lock-hint-btn');
  const hintBox = document.getElementById('lock-hint-box');

  // Set SVG lock icon
  lockIcon.innerHTML = icon('lock', { size: 80 });

  // Floating animation for lock icon
  if (!prefersReducedMotion) {
    gsap.to(lockIcon, {
      y: -10,
      rotation: 4,
      duration: 1.5,
      ease: EASE.float,
      yoyo: true,
      repeat: -1,
    });
  }

  // Add decorative floating particles to lock screen
  addLockParticles(lockScreen);

  // Hint toggle
  hintBtn?.addEventListener('click', () => {
    if (hintBox) {
      hintBox.hidden = !hintBox.hidden;
      if (!hintBox.hidden && !prefersReducedMotion) {
        gsap.fromTo(hintBox,
          { opacity: 0, y: -8 },
          { opacity: 1, y: 0, duration: 0.3, ease: EASE.out }
        );
      }
    }
  });

  function validate(value) {
    const v = value.toLowerCase().trim();
    const digits = v.replace(/\D/g, '');
    return (
      digits === '0809' ||
      digits === '89' ||
      digits === '809' ||
      digits.startsWith('0809') ||
      digits.startsWith('89') ||
      /^0?8\s*(de|\/|-)?\s*sep(tiembre)?/.test(v) ||
      v.includes('8 de sep') ||
      v.includes('brooklyn baby')
    );
  }

  function attempt() {
    if (validate(input.value)) {
      unlock();
    } else {
      showError();
    }
  }

  function showError() {
    errorEl.textContent = 'Mmm… preocúpate, Cataleya';
    // Change to locked icon
    lockIcon.innerHTML = icon('key', { size: 80 });

    if (!prefersReducedMotion) {
      // Shake input
      gsap.fromTo(input,
        { x: 0 },
        {
          x: [-12, 12, -12, 12, -6, 6, 0],
          duration: 0.5,
          ease: 'power2.out',
        }
      );
      // Shake error text
      gsap.fromTo(errorEl,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: DUR.short, ease: EASE.out }
      );
    }

    // Reset icon after a moment
    setTimeout(() => {
      lockIcon.innerHTML = icon('lock', { size: 80 });
    }, 2000);
  }

  function unlock() {
    playGentleChime(783.99); // G5 chime

    // Animate padlock to open state
    lockIcon.innerHTML = icon('lockOpen', { size: 80 });

    if (!prefersReducedMotion) {
      // Lock icon celebration
      gsap.to(lockIcon, {
        scale: 1.35,
        rotation: -10,
        duration: DUR.short,
        ease: EASE.outBack,
      });

      // Fade out lock screen
      gsap.to(lockScreen, {
        opacity: 0,
        duration: DUR.medium,
        delay: 0.5,
        ease: EASE.inOut,
        onComplete: () => {
          lockScreen.style.display = 'none';
          if (onUnlock) onUnlock();
        },
      });
    } else {
      setTimeout(() => {
        lockScreen.style.display = 'none';
        if (onUnlock) onUnlock();
      }, 300);
    }
  }

  // Event bindings
  goBtn?.addEventListener('click', attempt);
  input?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') attempt();
  });

  // Focus input on load
  setTimeout(() => input?.focus(), 400);
}

function addLockParticles(container) {
  if (prefersReducedMotion) return;

  const particleIcons = ['sakura', 'petal', 'heart', 'sparkles'];
  for (let i = 0; i < 12; i++) {
    const el = document.createElement('div');
    el.className = 'lock-particle';
    el.innerHTML = icon(particleIcons[i % particleIcons.length], { size: 18 + Math.random() * 18 });
    el.style.left = Math.random() * 100 + '%';
    el.style.top = Math.random() * 100 + '%';
    container.appendChild(el);

    gsap.to(el, {
      y: -30 + Math.random() * 60,
      x: -20 + Math.random() * 40,
      rotation: Math.random() * 360,
      opacity: 0.15 + Math.random() * 0.25,
      duration: 3 + Math.random() * 4,
      ease: EASE.float,
      yoyo: true,
      repeat: -1,
      delay: Math.random() * 2,
    });
  }
}

