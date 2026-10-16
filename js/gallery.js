/* ============================================================
   Gallery Section — Dani's Birthday
   
   Polaroid-style photos with GSAP drop/settle animation.
   Washi-tape accents, interactive lightbox modal with high-res zoom.
   Cinema frame with Ratatouille reference and resilient video player.
   ============================================================ */

import { gsap, EASE, DUR, STAGGER, prefersReducedMotion, sectionEntrance } from './motion.js';
import { icon } from './svg-icons.js';

export const PHOTOS_DATA = [
  {
    src: 'photos/IMG_4186.jpeg',
    caption: 'Mi cumpleañera favorita',
    tag: 'My Shayla',
    note: 'La sonrisa más linda que ilumina cualquier día.',
    rotation: -2.5,
  },
  {
    src: 'photos/gatoflores.jpg',
    caption: 'Tú en modo floral',
    tag: 'Michi & Flores',
    note: 'Flores rosadas para la persona más dulce y especial.',
    rotation: 2,
  },
  {
    src: 'photos/gatomatcha.jpg',
    caption: 'Matcha time',
    tag: 'Paz mental',
    note: 'Esos ratitos tranquilos donde todo está bien contigo.',
    rotation: -1.5,
  },
  {
    src: 'photos/gatossacandolengua.jpg',
    caption: 'Nuestra energía real',
    tag: 'Preocúpate, Cataleya',
    note: 'Risas cómplices y bromas que solo nosotros entendemos.',
    rotation: 3,
  },
  {
    src: 'photos/boladisco.jpg',
    caption: 'Brillo y fiesta',
    tag: 'Celebración 23',
    note: 'Para celebrar tus 23 años con toda la magia del mundo.',
    rotation: -2,
  },
  {
    src: 'photos/taylor.jpg',
    caption: 'Lover era',
    tag: 'Tus canciones',
    note: 'La banda sonora de los mejores momentos juntos.',
    rotation: 1.8,
  },
  {
    src: 'photos/gatoslocura.jpg',
    caption: 'Un poquito de caos',
    tag: 'Pura diversión',
    note: 'Porque contigo nunca jamás hay un momento aburrido.',
    rotation: -3,
  },
  {
    src: 'photos/happybday.jpg',
    caption: 'Feliz vuelta al sol',
    tag: '23 años increíbles',
    note: 'Que este nuevo año te traiga todo lo que tu corazón sueña.',
    rotation: 2.2,
  },
];

export function initGallery() {
  const section = document.getElementById('fotos');
  if (!section) return;

  // Set section header icon
  const headerIcon = section.querySelector('.header-icon');
  if (headerIcon) headerIcon.innerHTML = icon('camera', { size: 32 });

  // Generate polaroid grid with real photos
  const grid = document.getElementById('gallery-grid');
  if (grid) {
    grid.innerHTML = PHOTOS_DATA.map((item, i) => `
      <div
        class="polaroid"
        role="button"
        tabindex="0"
        aria-label="Abrir foto: ${item.caption}. ${item.note}"
        data-index="${i}"
        style="--rot: ${item.rotation}deg"
      >
        <span class="washi-tape" aria-hidden="true"></span>
        <div class="polaroid-photo" data-index="${i}">
          <img
            src="${item.src}"
            alt="Recuerdo con Dani — ${item.caption}"
            loading="lazy"
          >
          <div class="polaroid-zoom-hint" aria-hidden="true">
            ${icon('sparkles', { size: 20 })}
          </div>
        </div>
        <div class="polaroid-caption">
          <p class="polaroid-text">${item.caption}</p>
          <span class="polaroid-heart">${icon('heartFilled', { size: 16 })}</span>
        </div>
      </div>
    `).join('');

    // Fallbacks for any missing image
    grid.querySelectorAll('.polaroid-photo img').forEach(img => {
      img.addEventListener('error', () => {
        const parent = img.parentElement;
        const fallback = document.createElement('div');
        fallback.className = 'polaroid-fallback';
        fallback.innerHTML = icon('sakura', { size: 54 });
        parent.innerHTML = '';
        parent.appendChild(fallback);
      });
    });

    // Lightbox modal bindings
    setupLightbox(grid);
  }

  // Set up cinema frame
  setupCinema(section);

  // Animate polaroids on scroll
  animatePolaroids(section);
}

function setupLightbox(grid) {
  const modal = document.getElementById('lightbox-modal');
  if (!modal) return;

  const modalImg = modal.querySelector('.lightbox-img');
  const modalCaption = modal.querySelector('.lightbox-caption');
  const closeBtn = modal.querySelector('.lightbox-close');
  const backdrop = modal.querySelector('.lightbox-backdrop');

  function open(index) {
    const data = PHOTOS_DATA[index];
    if (!data) return;

    modalImg.src = data.src;
    modalImg.alt = data.caption;
    modalCaption.innerHTML = `
      <strong>${data.caption}</strong>
      <span>${data.note}</span>
    `;
    modal.hidden = false;
    document.body.style.overflow = 'hidden';

    if (!prefersReducedMotion) {
      gsap.fromTo(modal.querySelector('.lightbox-content'),
        { scale: 0.85, opacity: 0 },
        { scale: 1, opacity: 1, duration: DUR.short, ease: EASE.outBack }
      );
      gsap.fromTo(backdrop,
        { opacity: 0 },
        { opacity: 1, duration: DUR.short, ease: EASE.out }
      );
    }
  }

  function close() {
    if (modal.hidden) return;
    if (!prefersReducedMotion) {
      gsap.to(modal.querySelector('.lightbox-content'), {
        scale: 0.9,
        opacity: 0,
        duration: 0.2,
        ease: EASE.inOut,
        onComplete: () => {
          modal.hidden = true;
          document.body.style.overflow = '';
        },
      });
    } else {
      modal.hidden = true;
      document.body.style.overflow = '';
    }
  }

  // Click on polaroids
  grid.addEventListener('click', (e) => {
    const card = e.target.closest('.polaroid');
    if (!card) return;
    const index = parseInt(card.dataset.index, 10);
    open(index);
  });

  grid.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      const card = e.target.closest('.polaroid');
      if (!card) return;
      e.preventDefault();
      const index = parseInt(card.dataset.index, 10);
      open(index);
    }
  });

  // Close bindings
  closeBtn?.addEventListener('click', close);
  backdrop?.addEventListener('click', close);
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.hidden) close();
  });
}

function setupCinema(section) {
  const cinemaLabel = section.querySelector('.cinema-label');
  if (cinemaLabel) {
    cinemaLabel.innerHTML = `
      ${icon('film', { size: 22 })}
      Una peli para ti, como Ratatouille
      ${icon('ratChef', { size: 22 })}
    `;
  }

  // Video error fallback: interactive memory poster
  const video = section.querySelector('.cinema-frame video');
  if (video) {
    video.addEventListener('error', () => {
      const fallback = document.createElement('div');
      fallback.className = 'cinema-fallback';
      fallback.innerHTML = `
        <div class="cinema-fallback-inner">
          <img src="photos/poster.jpg" alt="Poster especial para Dani" class="cinema-poster-img" loading="lazy">
          <div class="cinema-overlay">
            <span class="cinema-play-glow">${icon('sparkles', { size: 36 })}</span>
            <p class="cinema-fallback-title">Nuestra historia en cartelera</p>
            <p class="cinema-fallback-sub">Como en Ratatouille: "La buena comida es como la música que puedes saborear, un color que puedes oler".</p>
          </div>
        </div>
      `;
      video.replaceWith(fallback);
    });
  }
}

function animatePolaroids(section) {
  const polaroids = section.querySelectorAll('.polaroid');
  const cinema = section.querySelector('.cinema-frame');

  if (prefersReducedMotion) return;

  // Polaroids initial state
  gsap.set(polaroids, {
    opacity: 0,
    y: 40,
    scale: 0.9,
  });

  gsap.to(polaroids, {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: DUR.medium,
    ease: EASE.outBack,
    stagger: {
      each: STAGGER.cards,
      from: 'start',
    },
    scrollTrigger: {
      trigger: section,
      start: 'top 75%',
      once: true,
    },
  });

  // Cinema frame slide up
  if (cinema) {
    gsap.fromTo(cinema,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: DUR.medium,
        ease: EASE.out,
        scrollTrigger: {
          trigger: cinema,
          start: 'top 85%',
          once: true,
        },
      }
    );
  }
}

