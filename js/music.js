/* ============================================================
   Music Section — Dani's Birthday
   
   Audio player with fade in/out, canvas waveform visualizer,
   artist chips with interactive quotes and Web Audio chimes,
   and built-in romantic lofi synth fallback if MP3s are missing.
   ============================================================ */

import { gsap, EASE, DUR, prefersReducedMotion, sectionEntrance, magneticEffect } from './motion.js';
import { icon } from './svg-icons.js';

let audioEl = null;
let currentSrc = '';
let fadeInterval = null;
let audioCtx = null;
let analyser = null;
let sourceNode = null;
let canvasCtx = null;
let visualizerAnimId = null;
let isSynthPlaying = false;
let synthInterval = null;
let synthGain = null;

const ARTIST_QUOTES = {
  'Taylor Swift': {
    quote: '"And at once, you are the one I have been waiting for..."',
    note: 'Tu voz favorita sonando en cada viaje.',
  },
  'Álvaro Díaz': {
    quote: '"Para pedirte un ratito más..."',
    note: 'Nuestra canción para congelar el tiempo.',
  },
  'Twenty One Pilots': {
    quote: '"We’ve been here the whole time..."',
    note: 'Ritmos compartidos y gustos únicos.',
  },
  'Lana del Rey': {
    quote: '"Brooklyn Baby — La historia que lo comenzó todo."',
    note: '8 de septiembre: la mejor casualidad del mundo.',
  },
  'Cage the Elephant': {
    quote: '"Cigarette Daydreams — pero en los acordesss."',
    note: 'Mi frase más random que se convirtió en destino.',
  },
};

export function initMusic() {
  const section = document.getElementById('musica');
  if (!section) return;

  audioEl = document.getElementById('audio-player');

  // Set section header icon
  const headerIcon = section.querySelector('.header-icon');
  if (headerIcon) headerIcon.innerHTML = icon('headphones', { size: 32 });

  // Set song card icons
  const songA = section.querySelector('.song-a .song-icon');
  const songB = section.querySelector('.song-b .song-icon');
  if (songA) songA.innerHTML = icon('paw', { size: 56 });
  if (songB) songB.innerHTML = icon('wave', { size: 56 });

  // Set up play buttons
  const playBtns = section.querySelectorAll('.song-play-btn');
  playBtns.forEach(btn => {
    updateBtnIcon(btn, false);
    btn.addEventListener('click', () => handlePlay(btn));
  });

  // Set up artist chips with interactive quotes
  setupChips(section);

  // Set up visualizer canvases
  setupVisualizers(section);

  // Scroll-triggered entrance
  const cards = section.querySelectorAll('.song-card');
  const chips = section.querySelectorAll('.chip');
  sectionEntrance(section, [...cards, ...chips], { stagger: 0.1 });

  // Magnetic effect on buttons
  magneticEffect(playBtns);
}

function updateBtnIcon(btn, isPlaying) {
  const iconName = isPlaying ? 'pause' : 'play';
  const text = isPlaying ? ' Pausar' : ' Escuchar';
  btn.innerHTML = icon(iconName, { size: 18 }) + text;
}

function ensureAudioContext() {
  if (!audioCtx) {
    try {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      analyser = audioCtx.createAnalyser();
      analyser.fftSize = 128;
      synthGain = audioCtx.createGain();
      synthGain.gain.value = 0.15;
      synthGain.connect(analyser);
      analyser.connect(audioCtx.destination);
    } catch (e) {
      console.log('Web Audio not available', e);
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}

function handlePlay(btn) {
  const src = btn.dataset.src;
  const allBtns = document.querySelectorAll('.song-play-btn');

  // If already playing this source
  if (currentSrc === src && (isSynthPlaying || (audioEl && !audioEl.paused))) {
    stopAllAudio();
    allBtns.forEach(b => {
      b.classList.remove('playing');
      updateBtnIcon(b, false);
    });
    return;
  }

  // Stop previous
  stopAllAudio();
  allBtns.forEach(b => {
    b.classList.remove('playing');
    updateBtnIcon(b, false);
  });

  currentSrc = src;
  btn.classList.add('playing');
  updateBtnIcon(btn, true);

  ensureAudioContext();

  // Try real audio element
  if (audioEl) {
    audioEl.src = src;
    audioEl.volume = 0;
    const playPromise = audioEl.play();

    if (playPromise !== undefined) {
      playPromise.then(() => {
        // Connect real audio to visualizer if not connected
        if (audioCtx && !sourceNode) {
          try {
            sourceNode = audioCtx.createMediaElementSource(audioEl);
            sourceNode.connect(analyser);
          } catch (e) {
            // Already connected or cross-origin
          }
        }
        fadeIn();
        startVisualizer(btn.closest('.song-card'));
      }).catch(() => {
        // Audio file missing or autoplay blocked: play dreamy synthesized melody!
        startSynthMelody(btn.closest('.song-card'));
        showToast('Sonando melodía romántica de cumpleaños ✨');
      });
    }
  } else {
    startSynthMelody(btn.closest('.song-card'));
  }
}

function stopAllAudio() {
  if (audioEl && !audioEl.paused) {
    fadeOut(() => {
      audioEl.pause();
    });
  }
  stopSynthMelody();
  stopVisualizer();
}

function fadeIn() {
  clearInterval(fadeInterval);
  fadeInterval = setInterval(() => {
    if (!audioEl) return;
    if (audioEl.volume < 0.75) {
      audioEl.volume = Math.min(0.8, audioEl.volume + 0.05);
    } else {
      clearInterval(fadeInterval);
    }
  }, 100);
}

function fadeOut(callback) {
  clearInterval(fadeInterval);
  fadeInterval = setInterval(() => {
    if (!audioEl) return;
    if (audioEl.volume > 0.02) {
      audioEl.volume = Math.max(0, audioEl.volume - 0.08);
    } else {
      clearInterval(fadeInterval);
      audioEl.volume = 0;
      if (callback) callback();
    }
  }, 50);
}

/* --- Dreamy Lofi Synth Harmonizer (Fallback) -------------- */

const CHORD_FREQS = [
  [261.63, 329.63, 392.00, 493.88], // Cmaj7
  [220.00, 261.63, 329.63, 392.00], // Am7
  [174.61, 220.00, 261.63, 329.63], // Fmaj7
  [196.00, 246.94, 293.66, 392.00], // G7
];

let chordIndex = 0;

function startSynthMelody(songCard) {
  if (!audioCtx) return;
  isSynthPlaying = true;
  startVisualizer(songCard);

  function playChord() {
    if (!isSynthPlaying || !audioCtx) return;
    const chord = CHORD_FREQS[chordIndex % CHORD_FREQS.length];
    chordIndex++;

    const now = audioCtx.currentTime;
    chord.forEach((freq, i) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = i === 0 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.06);

      gain.gain.setValueAtTime(0, now + i * 0.06);
      gain.gain.linearRampToValueAtTime(0.04, now + i * 0.06 + 0.4);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.06 + 2.4);

      osc.connect(gain);
      gain.connect(synthGain);

      osc.start(now + i * 0.06);
      osc.stop(now + i * 0.06 + 2.5);
    });
  }

  playChord();
  clearInterval(synthInterval);
  synthInterval = setInterval(playChord, 2600);
}

function stopSynthMelody() {
  isSynthPlaying = false;
  clearInterval(synthInterval);
}

/* --- Artist Chips & Micro-chimes ------------------------- */

function setupChips(section) {
  const chipsContainer = section.querySelector('.chips');
  if (!chipsContainer) return;

  const artists = [
    { name: 'Taylor Swift', icon: 'star' },
    { name: 'Álvaro Díaz', icon: 'sparkles' },
    { name: 'Twenty One Pilots', icon: 'headphones' },
    { name: 'Lana del Rey', icon: 'sakura' },
    { name: 'Cage the Elephant', icon: 'musicNote' },
  ];

  chipsContainer.innerHTML = artists.map(a => `
    <button class="chip" role="listitem" type="button" data-artist="${a.name}">
      ${icon(a.icon, { size: 18 })}
      <span>${a.name}</span>
    </button>
  `).join('');

  chipsContainer.addEventListener('click', (e) => {
    const chip = e.target.closest('.chip');
    if (!chip) return;

    const artistName = chip.dataset.artist;
    const info = ARTIST_QUOTES[artistName];
    if (info) {
      showToast(`${artistName}: ${info.quote}`);
      playGentleChime();

      if (!prefersReducedMotion) {
        gsap.fromTo(chip,
          { scale: 0.9 },
          { scale: 1, duration: 0.3, ease: EASE.outBack }
        );
      }
    }
  });
}

export function playGentleChime(freq = 587.33) {
  try {
    ensureAudioContext();
    if (!audioCtx) return;
    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + 0.3);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.65);
  } catch (e) {
    // Audio context silent failure
  }
}

/* --- Toast Notification Helper --------------------------- */

function showToast(text) {
  const toast = document.getElementById('toast-notify');
  if (!toast) return;

  toast.innerHTML = text;
  toast.classList.add('visible');

  if (toast._timer) clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.classList.remove('visible');
  }, 4000);
}

/* --- Canvas Waveform Visualizer -------------------------- */

function setupVisualizers(section) {
  const canvases = section.querySelectorAll('.audio-visualizer canvas');
  canvases.forEach(canvas => {
    const ctx = canvas.getContext('2d');
    drawStaticWaves(ctx, canvas);
  });
}

function drawStaticWaves(ctx, canvas) {
  const w = canvas.width = canvas.offsetWidth * (window.devicePixelRatio > 1 ? 2 : 1);
  const h = canvas.height = canvas.offsetHeight * (window.devicePixelRatio > 1 ? 2 : 1);

  ctx.clearRect(0, 0, w, h);
  ctx.strokeStyle = 'rgba(142, 107, 191, 0.3)';
  ctx.lineWidth = 2;
  ctx.beginPath();

  for (let x = 0; x < w; x++) {
    const y = h / 2 + Math.sin(x * 0.05) * h * 0.2;
    if (x === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
}

function startVisualizer(songCard) {
  if (prefersReducedMotion) return;

  const canvas = songCard?.querySelector('.audio-visualizer canvas');
  if (!canvas) return;

  canvasCtx = canvas.getContext('2d');
  ensureAudioContext();

  const bufferLength = analyser ? analyser.frequencyBinCount : 32;
  const dataArray = new Uint8Array(bufferLength);

  function draw() {
    visualizerAnimId = requestAnimationFrame(draw);
    if (analyser) {
      analyser.getByteFrequencyData(dataArray);
    }

    const w = canvas.width;
    const h = canvas.height;
    canvasCtx.clearRect(0, 0, w, h);

    const barWidth = w / bufferLength;

    for (let i = 0; i < bufferLength; i++) {
      let val = dataArray[i];
      if (isSynthPlaying && val === 0) {
        val = 60 + Math.sin(Date.now() * 0.005 + i * 0.2) * 50;
      }
      const barHeight = Math.max(4, (val / 255) * h * 0.9);
      const x = i * barWidth;

      const hue = 320 + (i / bufferLength) * 45;
      canvasCtx.fillStyle = `hsla(${hue}, 65%, 72%, 0.75)`;

      const radius = Math.min(barWidth * 0.4, 3);
      const barY = (h - barHeight) / 2;

      canvasCtx.beginPath();
      canvasCtx.roundRect(x, barY, Math.max(2, barWidth - 2), barHeight, radius);
      canvasCtx.fill();
    }
  }

  draw();
}

function stopVisualizer() {
  if (visualizerAnimId) {
    cancelAnimationFrame(visualizerAnimId);
    visualizerAnimId = null;
  }
}

/** Play inarow62 (used by the letter section) */
export function playInarow() {
  if (!audioEl) {
    audioEl = document.getElementById('audio-player');
  }
  const btn = document.querySelector('.song-play-btn[data-src="audio/inarow62.mp3"]');
  if (btn) {
    handlePlay(btn);
  }
}


