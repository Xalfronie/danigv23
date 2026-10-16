/* ============================================================
   Main — Dani's Birthday Website
   
   App entry point. Imports and orchestrates all modules.
   ============================================================ */

import '../css/style.css';
import { initCursor } from './cursor.js';
import { initLock } from './lock.js';
import { initCurtain } from './curtain.js';
import { initHero, animateHeroEntrance } from './hero.js';
import { initTimeline } from './timeline.js';
import { initMusic, playInarow } from './music.js';
import { initGallery } from './gallery.js';
import { initCosas } from './cosas.js';
import { initLetter } from './letter.js';
import { initScene3D } from './scene3d.js';
import { initScrollProgress, prefersReducedMotion } from './motion.js';
import { icon } from './svg-icons.js';

/* --- Detect touch device --------------------------------- */
if (matchMedia('(pointer:coarse)').matches) {
  document.body.classList.add('touch');
}

/* --- Initialize modules ---------------------------------- */

// Cursor (always active)
initCursor();

// Set footer content (no emojis)
const footer = document.querySelector('footer');
if (footer) {
  footer.innerHTML = `
    ${icon('sakura', { size: 24 })}
    hecho con cariño
    ${icon('sakura', { size: 24 })}
  `;
}

// Hero setup (before reveal)
initHero();

// Lock screen — everything starts here
initLock(onUnlock);

function onUnlock() {
  // Show main content
  const app = document.getElementById('app');
  if (app) app.hidden = false;

  // Open the flower curtain
  initCurtain(() => {
    // After curtain opens:
    onContentRevealed();
  });
}

function onContentRevealed() {
  // Start Three.js scene
  initScene3D();

  // Animate hero entrance
  animateHeroEntrance();

  // Initialize all sections
  initTimeline();
  initMusic();
  initGallery();
  initCosas();
  initLetter(() => {
    // Callback: play inarow62 when letter comes into view
    playInarow();
  });

  // Scroll progress bar
  initScrollProgress();

  // Load Spline viewer (optional, lazy)
  loadSpline();
}

/* --- Optional Spline Viewer ------------------------------ */
const SPLINE_URL = ''; // ← Set your Spline scene URL here

async function loadSpline() {
  const splineSection = document.getElementById('spline-section');

  if (!SPLINE_URL) {
    // Hide the entire section if no Spline URL is configured
    if (splineSection) splineSection.style.display = 'none';
    return;
  }

  const container = document.querySelector('.spline-container');
  if (!container) return;

  try {
    // Dynamically load Spline viewer
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://unpkg.com/@splinetool/viewer@1.4.0/build/spline-viewer.js';
    document.head.appendChild(script);

    script.onload = () => {
      const viewer = document.createElement('spline-viewer');
      viewer.setAttribute('url', SPLINE_URL);
      viewer.setAttribute('loading-anim-type', 'spinner-small-dark');

      // Remove fallback and add viewer
      const fallback = container.querySelector('.spline-fallback');
      if (fallback) fallback.remove();
      container.appendChild(viewer);
    };

    script.onerror = () => {
      console.log('Spline viewer failed to load — fallback stays');
    };
  } catch (e) {
    console.log('Spline not available:', e);
  }
}
