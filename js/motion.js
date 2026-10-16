/* ============================================================
   Motion Design System — Dani's Birthday
   
   Single source of truth for all animation parameters.
   GSAP + ScrollTrigger + TextPlugin.
   ============================================================ */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

/* --- Reduced Motion Check -------------------------------- */
export const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* --- Easings --------------------------------------------- */
export const EASE = {
  /** Primary entrance — fast out, natural decel */
  out: 'power3.out',
  /** Playful bounces — buttons, cards */
  outBack: 'back.out(1.4)',
  /** Smooth transitions — fades, crossfades */
  inOut: 'power2.inOut',
  /** Curtain / dramatic reveals */
  curtain: 'power4.inOut',
  /** Elastic micro-interaction */
  elastic: 'elastic.out(1, 0.5)',
  /** Gentle float */
  float: 'sine.inOut',
};

/* --- Durations (seconds) --------------------------------- */
export const DUR = {
  micro: 0.2,
  short: 0.4,
  medium: 0.8,
  long: 1.6,
  xl: 2.4,
};

/* --- Stagger Presets -------------------------------------- */
export const STAGGER = {
  cards: 0.08,
  letters: 0.03,
  timeline: 0.15,
  petals: { each: 0.12, from: 'random' },
};

/* --- Reusable Animation Utilities ------------------------ */

/**
 * Fade + slide up entrance for a section.
 * Automatically sets up ScrollTrigger.
 */
export function sectionEntrance(container, children, opts = {}) {
  if (prefersReducedMotion) {
    gsap.set(container, { opacity: 1 });
    gsap.set(children, { opacity: 1, y: 0 });
    return;
  }

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: opts.start || 'top 80%',
      end: opts.end || 'top 30%',
      toggleActions: 'play none none none',
      once: true,
      ...opts.scrollTrigger,
    },
  });

  // Container fades in
  tl.fromTo(container,
    { opacity: 0 },
    { opacity: 1, duration: DUR.short, ease: EASE.out }
  );

  // Children stagger in
  if (children && (children.length || children instanceof Element)) {
    tl.fromTo(children,
      { opacity: 0, y: opts.yOffset || 30 },
      {
        opacity: 1,
        y: 0,
        duration: opts.duration || DUR.medium,
        ease: opts.ease || EASE.out,
        stagger: opts.stagger || STAGGER.cards,
      },
      '-=0.3'
    );
  }

  return tl;
}

/**
 * SVG stroke "draw" animation on scroll.
 */
export function strokeDraw(elements, opts = {}) {
  if (prefersReducedMotion) return;

  gsap.utils.toArray(elements).forEach(el => {
    const paths = el.querySelectorAll('path, line, circle, ellipse, rect, polyline, polygon');
    paths.forEach(path => {
      if (path.getTotalLength) {
        const len = path.getTotalLength();
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: opts.duration || DUR.long,
          ease: opts.ease || EASE.out,
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
        });
      }
    });
  });
}

/**
 * Magnetic hover effect for interactive elements.
 */
export function magneticEffect(elements) {
  if (prefersReducedMotion) return;
  const isTouchDevice = document.body.classList.contains('touch');
  if (isTouchDevice) return;

  gsap.utils.toArray(elements).forEach(el => {
    const strength = 0.3;

    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * strength;
      const y = (e.clientY - rect.top - rect.height / 2) * strength;
      gsap.to(el, { x, y, duration: DUR.short, ease: EASE.out });
    });

    el.addEventListener('mouseleave', () => {
      gsap.to(el, { x: 0, y: 0, duration: DUR.medium, ease: EASE.elastic });
    });
  });
}

/**
 * Parallax layer for decorative elements.
 */
export function parallaxLayer(element, speed = 0.5) {
  if (prefersReducedMotion) return;

  gsap.to(element, {
    y: () => window.innerHeight * speed * -0.3,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1.5,
    },
  });
}

/**
 * Letter-by-letter text reveal (without SplitText).
 */
export function splitTextReveal(element, opts = {}) {
  if (prefersReducedMotion) {
    element.style.opacity = '1';
    return;
  }

  const text = element.textContent;
  element.textContent = '';
  element.style.opacity = '1';

  const chars = text.split('').map(char => {
    const span = document.createElement('span');
    span.textContent = char === ' ' ? '\u00A0' : char;
    span.style.display = 'inline-block';
    span.style.opacity = '0';
    element.appendChild(span);
    return span;
  });

  return gsap.fromTo(chars,
    { opacity: 0, y: 20, rotateX: -90 },
    {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration: opts.duration || DUR.short,
      ease: opts.ease || EASE.outBack,
      stagger: opts.stagger || STAGGER.letters,
      delay: opts.delay || 0,
    }
  );
}

/**
 * Scroll progress bar update.
 */
export function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;

  gsap.to(bar, {
    width: '100%',
    ease: 'none',
    scrollTrigger: {
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.3,
    },
  });
}

export { gsap, ScrollTrigger };
