/* ============================================================
   Letter Section — Dani's Birthday
   
   Typewriter effect using GSAP TextPlugin.
   Starts when scrolled into view.
   Plays inarow62 in background.
   SVG confetti burst on completion.
   Heart emojis in text replaced with inline SVG hearts.
   ============================================================ */

import { gsap, EASE, DUR, prefersReducedMotion, sectionEntrance } from './motion.js';
import { icon, CONFETTI_ICONS } from './svg-icons.js';

/* The letter text — NOT to be modified */
const PARAGRAPHS = [
  'Dani, Danielita, Daniyivi, Jimenita, my Shayla...\nla verdad es que no me alcanzan los apodos para decirte lo importante que eres para mí.',
  'Todo empezó el 8 de septiembre con una historia de Instagram, una canción de Lana del Rey y yo diciéndote que me recordaba a otra por los acordes. Nunca imaginé que una frase tan random terminaría siendo mi mejor casualidad.',
  'Contigo me río de todo, hasta de cosas que nadie más entendería. Me encantan tus bromas, tu forma de ser, tus ojitos cuando sonríes, y hasta cuando te digo \u201Cpreocúpate, Cataleya\u201D. Contigo hasta el día más normal se siente como una escena de película, de esas que uno quiere volver a ver una y otra vez, como Ratatouille.',
  'Hoy cumples 23 años y quiero que sepas que me haces muy feliz. Quiero seguir conociéndote, descubrir todas las cosas que todavía no sé de ti, celebrar muchos más cumpleaños a tu lado, comer sushi y postres hasta cansarnos y llenar la vida de más recuerdos lindos juntos.',
  'Gracias por existir, por quedarte y por ser tú.',
  'Si pudiera pedir un deseo hoy, sería simplemente un ratito más contigo... y luego otro ratito más. {{heart}}',
  'Feliz cumpleaños, mi niña.',
  'Te quiero muchooooo.',
];

const FIRMA = '— Alfredo {{heart}} UWU NYA';

let started = false;
let audioCallback = null;

export function initLetter(onStartAudio) {
  audioCallback = onStartAudio;
  
  const section = document.getElementById('carta');
  if (!section) return;

  // Set section header icon
  const headerIcon = section.querySelector('.header-icon');
  if (headerIcon) headerIcon.innerHTML = icon('heart', { size: 32 });

  const paper = document.getElementById('letter-paper');
  if (!paper) return;

  // Create empty paragraphs + firma
  paper.innerHTML = PARAGRAPHS.map(() => '<p></p>').join('') + '<p class="firma"></p>';

  // Set up IntersectionObserver
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && !started) {
        started = true;
        observer.disconnect();

        // Start background music
        if (audioCallback) audioCallback();

        // Begin typewriter
        if (prefersReducedMotion) {
          showLetterInstant(paper);
        } else {
          typewriterEffect(paper);
        }
      }
    },
    { threshold: 0.3 }
  );

  observer.observe(paper);

  // Section entrance
  sectionEntrance(section, [paper]);
}

function showLetterInstant(paper) {
  const ps = paper.querySelectorAll('p:not(.firma)');
  const firma = paper.querySelector('.firma');

  PARAGRAPHS.forEach((text, i) => {
    if (ps[i]) {
      ps[i].innerHTML = replaceHearts(text);
    }
  });

  if (firma) {
    firma.innerHTML = replaceHearts(FIRMA);
  }
}

function typewriterEffect(paper) {
  const ps = paper.querySelectorAll('p:not(.firma)');
  const firma = paper.querySelector('.firma');
  let paraIndex = 0;

  function typeParagraph() {
    if (paraIndex >= PARAGRAPHS.length) {
      // Done — show firma and confetti
      showFirma(firma);
      return;
    }

    const p = ps[paraIndex];
    const text = PARAGRAPHS[paraIndex];
    const cleanText = text.replace('{{heart}}', '♥'); // Placeholder for typing
    let charIndex = 0;

    function typeChar() {
      if (charIndex <= cleanText.length) {
        const displayText = cleanText.slice(0, charIndex);
        p.textContent = displayText;
        charIndex++;
        setTimeout(typeChar, 22 + Math.random() * 12);
      } else {
        // Replace heart placeholder with SVG
        p.innerHTML = replaceHearts(text);
        paraIndex++;
        setTimeout(typeParagraph, 400);
      }
    }

    typeChar();
  }

  typeParagraph();
}

function showFirma(firmaEl) {
  if (!firmaEl) return;

  const firmaHtml = replaceHearts(FIRMA);

  if (prefersReducedMotion) {
    firmaEl.innerHTML = firmaHtml;
    launchConfetti();
    return;
  }

  // Typewriter for firma
  const cleanFirma = FIRMA.replace(/\{\{heart\}\}/g, '♥');
  let i = 0;

  function typeFirma() {
    if (i <= cleanFirma.length) {
      firmaEl.textContent = cleanFirma.slice(0, i);
      i++;
      setTimeout(typeFirma, 40);
    } else {
      firmaEl.innerHTML = firmaHtml;
      // Celebration!
      launchConfetti();

      // Reveal interactive action button
      const actions = document.getElementById('letter-actions');
      const ratitoBtn = document.getElementById('un-ratito-mas-btn');
      if (actions) {
        actions.style.opacity = '1';
        actions.style.transform = 'translateY(0)';
      }

      if (ratitoBtn) {
        ratitoBtn.addEventListener('click', () => {
          launchConfetti(80);
          ratitoBtn.classList.add('active');
          ratitoBtn.innerHTML = `Concedido: Todos los ratitos del mundo para ti ${icon('heartFilled', { size: 20 })}`;
          ratitoBtn.disabled = true;

          // Float heart burst from button
          const rect = ratitoBtn.getBoundingClientRect();
          for (let k = 0; k < 15; k++) {
            const h = document.createElement('div');
            h.className = 'burst-particle';
            h.innerHTML = icon('heartFilled', { size: 24 });
            h.style.left = (rect.left + rect.width / 2) + 'px';
            h.style.top = (rect.top + rect.height / 2) + 'px';
            document.body.appendChild(h);

            gsap.to(h, {
              x: (Math.random() - 0.5) * 160,
              y: -80 - Math.random() * 120,
              scale: 1.4,
              opacity: 0,
              duration: 1.2 + Math.random() * 0.6,
              ease: EASE.out,
              onComplete: () => h.remove(),
            });
          }
        }, { once: true });
      }
    }
  }

  setTimeout(typeFirma, 300);
}

/**
 * Replace {{heart}} tokens with inline SVG hearts
 */
function replaceHearts(text) {
  return text.replace(
    /\{\{heart\}\}/g,
    `<span class="inline-heart-text">${icon('heartFilled', { size: 18 })}</span>`
  );
}

/**
 * Launch SVG confetti celebration
 */
function launchConfetti(count = 50) {
  if (prefersReducedMotion) return;

  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const el = document.createElement('div');
      el.className = 'confetti-piece';
      el.setAttribute('aria-hidden', 'true');

      const confettiIcon = CONFETTI_ICONS[i % CONFETTI_ICONS.length];
      const size = 14 + Math.random() * 22;
      el.innerHTML = icon(confettiIcon, { size: Math.round(size) });
      el.style.width = size + 'px';
      el.style.height = size + 'px';
      el.style.left = Math.random() * 100 + 'vw';

      document.body.appendChild(el);

      gsap.fromTo(el,
        {
          y: -30,
          rotation: 0,
          opacity: 1,
        },
        {
          y: window.innerHeight + 50,
          x: (Math.random() - 0.5) * 200,
          rotation: 360 + Math.random() * 540,
          opacity: 0,
          duration: 3 + Math.random() * 3,
          ease: 'none',
          onComplete: () => el.remove(),
        }
      );
    }, i * 60);
  }
}

