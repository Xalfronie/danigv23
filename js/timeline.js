/* ============================================================
   Timeline / History Section — Dani's Birthday
   
   Scroll-triggered entrance for the timeline.
   The vertical line draws itself on scroll.
   Events stagger in with SVG dot markers.
   ============================================================ */

import { gsap, ScrollTrigger, EASE, DUR, STAGGER, prefersReducedMotion, sectionEntrance } from './motion.js';
import { icon } from './svg-icons.js';

export function initTimeline() {
  const section = document.getElementById('historia');
  if (!section) return;

  // Set section header icon
  const header = section.querySelector('.section-header');
  if (header) {
    const iconSlot = header.querySelector('.header-icon');
    if (iconSlot) iconSlot.innerHTML = icon('tulip', { size: 32 });
  }

  // Set SVG dots for each timeline event
  const dots = section.querySelectorAll('.timeline-dot');
  const dotIcons = ['sakura', 'musicNote', 'heart'];
  dots.forEach((dot, i) => {
    dot.innerHTML = icon(dotIcons[i % dotIcons.length], { size: 28 });
  });

  // Animate the timeline line drawing
  const timelineLine = section.querySelector('.timeline');
  const events = section.querySelectorAll('.timeline-event');

  if (prefersReducedMotion) {
    return;
  }

  // Set initial states
  gsap.set(events, { opacity: 0, x: -30 });

  // Animate the vertical line
  if (timelineLine) {
    const pseudoLine = timelineLine;
    gsap.fromTo(pseudoLine,
      { '--line-scale': 0 },
      {
        '--line-scale': 1,
        duration: DUR.long,
        ease: EASE.out,
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          once: true,
        },
      }
    );

    // Inline style for the line scaleY
    gsap.set(timelineLine, { '--line-scale': 0 });
    const lineStyle = document.createElement('style');
    lineStyle.textContent = `
      .timeline::before {
        transform: scaleY(var(--line-scale, 0));
      }
    `;
    document.head.appendChild(lineStyle);
  }

  // Stagger events
  gsap.to(events, {
    opacity: 1,
    x: 0,
    duration: DUR.medium,
    ease: EASE.out,
    stagger: STAGGER.timeline,
    scrollTrigger: {
      trigger: section,
      start: 'top 70%',
      once: true,
    },
  });

  // Animate dots with scale
  gsap.fromTo(dots,
    { scale: 0 },
    {
      scale: 1,
      duration: DUR.short,
      ease: EASE.outBack,
      stagger: STAGGER.timeline,
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
        once: true,
      },
    }
  );
}
