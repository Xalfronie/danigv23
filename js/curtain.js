/* ============================================================
   Flower Curtain — Dani's Birthday
   
   Two halves filled with SVG flowers that open as a curtain
   via GSAP timeline. Petals fall after opening.
   ============================================================ */

import { gsap, EASE, DUR, prefersReducedMotion } from './motion.js';
import { icon, FLOWER_ICONS, randomPetal } from './svg-icons.js';

let petalInterval = null;

export function initCurtain(onComplete) {
  const curtain = document.getElementById('curtain');
  const leftHalf = curtain.querySelector('.curtain-left');
  const rightHalf = curtain.querySelector('.curtain-right');

  // Fill both halves with SVG flowers
  const flowersPerHalf = 120;
  [leftHalf, rightHalf].forEach(half => {
    for (let i = 0; i < flowersPerHalf; i++) {
      const wrapper = document.createElement('span');
      wrapper.className = 'curtain-flower';
      const flowerName = FLOWER_ICONS[i % FLOWER_ICONS.length];
      wrapper.innerHTML = icon(flowerName);
      // Vary the animation delay for organic sway
      const svg = wrapper.querySelector('svg');
      if (svg) {
        svg.style.animationDelay = (i % 9) * 0.22 + 's';
      }
      half.appendChild(wrapper);
    }
  });

  // Show curtain
  curtain.style.display = 'block';

  // Animate curtain opening
  if (prefersReducedMotion) {
    // Instant open
    setTimeout(() => {
      curtain.remove();
      startPetalRain();
      if (onComplete) onComplete();
    }, 300);
    return;
  }

  const tl = gsap.timeline({
    delay: 0.5,
    onComplete: () => {
      // Remove curtain from DOM
      setTimeout(() => curtain.remove(), 500);
      startPetalRain();
      if (onComplete) onComplete();
    },
  });

  // Open the halves like a stage curtain
  tl.to(leftHalf, {
    x: '-102%',
    duration: DUR.xl,
    ease: EASE.curtain,
  }, 0);

  tl.to(rightHalf, {
    x: '102%',
    duration: DUR.xl,
    ease: EASE.curtain,
  }, 0);

  // Fade the flowers slightly during opening
  tl.to([leftHalf, rightHalf], {
    opacity: 0.7,
    duration: DUR.long,
    ease: EASE.inOut,
  }, DUR.long);
}

/**
 * Create falling petal SVGs
 */
function startPetalRain() {
  if (prefersReducedMotion) return;

  const layer = document.getElementById('petals-layer');
  if (!layer) return;

  // Initial burst
  for (let i = 0; i < 15; i++) {
    setTimeout(() => dropPetal(layer), i * 200);
  }

  // Ongoing gentle rain
  petalInterval = setInterval(() => {
    dropPetal(layer);
  }, 4000);

  // Clean up after a while to save memory
  setTimeout(() => {
    if (petalInterval) {
      clearInterval(petalInterval);
      petalInterval = null;
    }
  }, 120000); // Stop after 2 minutes
}

function dropPetal(container) {
  const el = document.createElement('div');
  el.className = 'petal-svg';
  el.innerHTML = randomPetal();
  el.setAttribute('aria-hidden', 'true');

  const size = 14 + Math.random() * 18;
  const startX = Math.random() * window.innerWidth;
  el.style.left = startX + 'px';
  el.style.width = size + 'px';

  container.appendChild(el);

  const duration = 5 + Math.random() * 6;
  const swayAmount = 60 + Math.random() * 100;
  const rotation = 360 + Math.random() * 360;

  gsap.fromTo(el,
    {
      y: -50,
      x: 0,
      rotation: Math.random() * 180,
      opacity: 0.6 + Math.random() * 0.4,
    },
    {
      y: window.innerHeight + 50,
      x: (Math.random() - 0.5) * swayAmount,
      rotation: rotation,
      opacity: 0,
      duration: duration,
      ease: 'none',
      onComplete: () => el.remove(),
    }
  );
}

export function stopPetalRain() {
  if (petalInterval) {
    clearInterval(petalInterval);
    petalInterval = null;
  }
}
