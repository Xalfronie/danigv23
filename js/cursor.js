/* ============================================================
   Custom Cursor — SVG Dachshund (Leyla)
   
   Desktop: follows mouse with GSAP inertia, reacts to
   interactive elements (jumps, flips direction),
   leaves gentle fading pawprints on trail.
   Mobile: runs across bottom of screen on tap with bounce.
   ============================================================ */

import { gsap, EASE, DUR, prefersReducedMotion } from './motion.js';
import { icon } from './svg-icons.js';

let cursorEl, mobileDog;
let cursorX = 0, cursorY = 0;
let lastX = 0, lastY = 0;
let isOverInteractive = false;
let distanceSinceLastPaw = 0;

export function initCursor() {
  const isTouchDevice = document.body.classList.contains('touch');

  if (!isTouchDevice) {
    initDesktopCursor();
  } else {
    initMobileDog();
  }
}

function initDesktopCursor() {
  cursorEl = document.getElementById('dog-cursor');
  if (!cursorEl) return;

  // Render SVG dachshund immediately so there is zero delay
  cursorEl.innerHTML = icon('dachshund');
  cursorEl.style.display = 'block';

  // Optional PNG override if user provided one
  const img = new Image();
  img.src = 'img/salchicha.png';
  img.onload = () => {
    cursorEl.innerHTML = '';
    img.alt = 'Leyla el perrito cursor';
    img.style.width = '56px';
    img.draggable = false;
    cursorEl.appendChild(img);
  };

  // Mouse move listener
  const onMove = (e) => {
    cursorX = e.clientX;
    cursorY = e.clientY;

    // Track distance for pawprints
    const dx = cursorX - lastX;
    const dy = cursorY - lastY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    distanceSinceLastPaw += dist;

    if (distanceSinceLastPaw > 65 && !prefersReducedMotion) {
      dropPawPrint(cursorX, cursorY, dx > 0 ? 1 : -1);
      distanceSinceLastPaw = 0;
    }
  };

  window.addEventListener('mousemove', onMove, { passive: true });

  // Ticker for buttery smooth follow
  gsap.ticker.add(() => {
    const dx = cursorX - lastX;
    const scaleX = dx < -1 ? -1 : dx > 1 ? 1 : (cursorEl._lastScaleX || 1);
    cursorEl._lastScaleX = scaleX;

    gsap.set(cursorEl, {
      x: cursorX - 28,
      y: cursorY - 20,
      scaleX: scaleX,
    });
    lastX = cursorX;
    lastY = cursorY;
  });

  // React to interactive elements
  const interactiveEls = 'button, a, .cosa-card, .polaroid, .chip, input, .btn';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(interactiveEls)) {
      if (!isOverInteractive && !prefersReducedMotion) {
        isOverInteractive = true;
        gsap.to(cursorEl, {
          y: cursorY - 35,
          duration: 0.16,
          ease: EASE.outBack,
          yoyo: true,
          repeat: 1,
        });
      }
    } else {
      isOverInteractive = false;
    }
  }, { passive: true });
}

function dropPawPrint(x, y, dir) {
  const paw = document.createElement('div');
  paw.className = 'paw-print';
  paw.innerHTML = icon('paw', { size: 14 });
  paw.style.left = (x - 7) + 'px';
  paw.style.top = (y + 10) + 'px';
  paw.style.transform = `scaleX(${dir}) rotate(${(Math.random() - 0.5) * 20}deg)`;
  document.body.appendChild(paw);

  gsap.to(paw, {
    opacity: 0,
    scale: 0.8,
    duration: 1.4,
    ease: 'power2.out',
    onComplete: () => paw.remove(),
  });
}

function initMobileDog() {
  mobileDog = document.getElementById('mobile-dog');
  if (!mobileDog) return;

  mobileDog.innerHTML = icon('dachshund');
  mobileDog.style.display = 'block';

  const img = new Image();
  img.src = 'img/salchicha.png';
  img.onload = () => {
    mobileDog.innerHTML = '';
    img.alt = 'Leyla';
    img.style.width = '56px';
    img.draggable = false;
    mobileDog.appendChild(img);
  };

  let running = false;
  document.addEventListener('touchstart', (e) => {
    if (running || prefersReducedMotion) return;
    running = true;

    const touchX = e.touches[0].clientX;
    const fromRight = touchX > window.innerWidth / 2;

    gsap.fromTo(mobileDog,
      { x: fromRight ? window.innerWidth + 60 : -60, scaleX: fromRight ? -1 : 1 },
      {
        x: fromRight ? -60 : window.innerWidth + 60,
        duration: 2.2,
        ease: 'power1.inOut',
        onComplete: () => { running = false; },
      }
    );
  }, { passive: true });
}

