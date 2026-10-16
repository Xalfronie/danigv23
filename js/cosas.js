import { gsap, EASE, DUR, STAGGER, prefersReducedMotion, sectionEntrance, magneticEffect } from './motion.js';
import { icon } from './svg-icons.js';
import { playGentleChime } from './music.js';

const COSAS = [
  {
    icon: 'dachshund',
    label: 'Leyla',
    message: 'Leyla, la dueña de mi corazón (y de este cursor).',
    particles: ['paw', 'heart', 'dachshund'],
  },
  {
    icon: 'kuromiSkull',
    label: 'Kuromi',
    message: 'Un toque de Kuromi nunca está de más.',
    particles: ['kuromiSkull', 'star', 'sparkles'],
  },
  {
    icon: 'nigiri',
    label: 'Sushi',
    message: 'Plan oficial: sushi y postres hasta cansarnos.',
    particles: ['nigiri', 'maki', 'heart'],
  },
  {
    icon: 'ratChef',
    label: 'Ratatouille',
    message: '"Cualquiera puede cocinar"… y cualquiera puede ser tu favorita.',
    particles: ['ratChef', 'star', 'sparkles'],
  },
  {
    icon: 'blueprint',
    label: 'Arquitectura',
    message: 'Construyes planos y de paso lugares donde da gusto estar.',
    particles: ['blueprint', 'star', 'sparkles'],
  },
  {
    icon: 'sparkles',
    label: 'Preocúpate, Cataleya',
    message: 'Frase oficial. No se discute.',
    particles: ['sparkles', 'heart', 'sakura'],
  },
  {
    icon: 'star',
    label: 'A Amílcar le voy a decir',
    message: 'Y es que sí, le voy a decir.',
    particles: ['star', 'sparkles', 'heart'],
  },
  {
    icon: 'sakura',
    label: 'Flores rosadas',
    message: 'Hoy todas son para ti.',
    particles: ['sakura', 'peony', 'tulip', 'rose', 'petal'],
  },
];

const discoveredSet = new Set();

export function initCosas() {
  const section = document.getElementById('cosas');
  if (!section) return;

  // Set section header icon
  const headerIcon = section.querySelector('.header-icon');
  if (headerIcon) headerIcon.innerHTML = icon('heartFilled', { size: 32 });

  // Generate grid
  const grid = document.getElementById('cosas-grid');
  if (grid) {
    grid.innerHTML = COSAS.map((cosa, i) => `
      <button
        class="cosa-card"
        data-index="${i}"
        aria-label="${cosa.label}: ${cosa.message}"
        id="cosa-${i}"
        type="button"
      >
        <span class="cosa-discovered-badge" aria-hidden="true">${icon('heartFilled', { size: 14 })}</span>
        <span class="cosa-icon">${icon(cosa.icon, { size: 46 })}</span>
        <span class="cosa-label-text">${cosa.label}</span>
      </button>
    `).join('');
  }

  // Popup message
  const popup = document.getElementById('popup-message');
  const counterEl = document.getElementById('cosas-count');

  // Click handler
  grid?.addEventListener('click', (e) => {
    const card = e.target.closest('.cosa-card');
    if (!card) return;

    const index = parseInt(card.dataset.index, 10);
    const cosa = COSAS[index];
    if (!cosa) return;

    // Track discovery
    discoveredSet.add(index);
    card.classList.add('discovered');
    if (counterEl) counterEl.textContent = discoveredSet.size;

    // Chime feedback
    const notes = [523.25, 587.33, 659.25, 698.46, 783.99, 880.00, 987.77, 1046.50];
    playGentleChime(notes[index % notes.length]);

    // Update message
    if (popup) {
      if (!prefersReducedMotion) {
        gsap.fromTo(popup,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: DUR.short, ease: EASE.outBack }
        );
      }
      popup.textContent = cosa.message;
    }

    // Card press animation
    if (!prefersReducedMotion) {
      gsap.fromTo(card,
        { scale: 0.92 },
        { scale: 1, duration: DUR.short, ease: EASE.elastic }
      );
    }

    // Particle burst
    burstParticles(card, cosa.particles);

    // If all unlocked
    if (discoveredSet.size === COSAS.length && !section.dataset.allUnlocked) {
      section.dataset.allUnlocked = 'true';
      setTimeout(() => {
        if (popup) {
          popup.innerHTML = `
            <span style="display:inline-flex;align-items:center;gap:6px">
              ${icon('sparkles', { size: 24 })}
              ¡Desbloqueaste todos los detallitos! Te conozco tan bien...
              ${icon('sparkles', { size: 24 })}
            </span>
          `;
        }
        burstParticles(section, ['sakura', 'heart', 'star'], 24);
      }, 700);
    }
  });

  // Scroll-triggered entrance
  const cards = section.querySelectorAll('.cosa-card');
  sectionEntrance(section, cards, { stagger: STAGGER.cards });

  // Magnetic effect on desktop
  magneticEffect(cards);
}

/**
 * Burst SVG particles from an element's center
 */
function burstParticles(sourceEl, particleNames, count = 10) {
  if (prefersReducedMotion) return;

  const rect = sourceEl.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.className = 'burst-particle';
    el.setAttribute('aria-hidden', 'true');

    const pName = particleNames[i % particleNames.length];
    const size = 16 + Math.random() * 20;
    el.innerHTML = icon(pName, { size: Math.round(size) });
    el.style.width = size + 'px';
    el.style.height = size + 'px';
    el.style.left = centerX + 'px';
    el.style.top = centerY + 'px';

    document.body.appendChild(el);

    const angle = (Math.PI * 2 / count) * i + (Math.random() - 0.5) * 0.5;
    const distance = 60 + Math.random() * 100;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance - 40; // Bias upward

    gsap.fromTo(el,
      {
        x: 0,
        y: 0,
        scale: 0,
        rotation: 0,
      },
      {
        x: dx,
        y: dy,
        scale: 1,
        rotation: (Math.random() - 0.5) * 360,
        opacity: 0,
        duration: 0.8 + Math.random() * 0.5,
        ease: EASE.out,
        onComplete: () => el.remove(),
      }
    );
  }
}

