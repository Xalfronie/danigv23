/* ============================================================
   SVG Icon Library — Dani's Birthday
   
   Visual language: rounded strokes (1.5-2px), pastel fills,
   24×24 viewBox, stroke-linecap/linejoin round.
   ============================================================ */

/**
 * Returns an SVG string for the given icon name.
 * @param {string} name
 * @param {object} opts - { size, className, fill, stroke }
 */
export function icon(name, opts = {}) {
  const { size, className = '', fill, stroke } = opts;
  const data = ICONS[name];
  if (!data) return '';
  let svg = data;
  if (className) svg = svg.replace('<svg', `<svg class="${className}"`);
  if (size) svg = svg.replace(/width="\d+"/, `width="${size}"`).replace(/height="\d+"/, `height="${size}"`);
  if (fill) svg = svg.replace(/fill="[^"]*"/g, `fill="${fill}"`);
  if (stroke) svg = svg.replace(/stroke="[^"]*"/g, `stroke="${stroke}"`);
  return svg;
}

/** Returns a DOM element from an icon name */
export function iconEl(name, opts = {}) {
  const wrapper = document.createElement('span');
  wrapper.innerHTML = icon(name, opts);
  return wrapper.firstElementChild;
}

/** Returns all icon names */
export function iconNames() {
  return Object.keys(ICONS);
}

export const ICONS = {
  /* ---- Flowers ---- */
  sakura: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g stroke="#D46A9A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="#F8C8DC">
      <path d="M12 2C12 2 14 5.5 14 7.5C14 9 13 10 12 10C11 10 10 9 10 7.5C10 5.5 12 2 12 2Z"/>
      <path d="M12 2C12 2 14 5.5 14 7.5C14 9 13 10 12 10C11 10 10 9 10 7.5C10 5.5 12 2 12 2Z" transform="rotate(72 12 12)"/>
      <path d="M12 2C12 2 14 5.5 14 7.5C14 9 13 10 12 10C11 10 10 9 10 7.5C10 5.5 12 2 12 2Z" transform="rotate(144 12 12)"/>
      <path d="M12 2C12 2 14 5.5 14 7.5C14 9 13 10 12 10C11 10 10 9 10 7.5C10 5.5 12 2 12 2Z" transform="rotate(216 12 12)"/>
      <path d="M12 2C12 2 14 5.5 14 7.5C14 9 13 10 12 10C11 10 10 9 10 7.5C10 5.5 12 2 12 2Z" transform="rotate(288 12 12)"/>
      <circle cx="12" cy="12" r="2.5" fill="#FFD9E8" stroke="#D46A9A"/>
    </g>
  </svg>`,

  peony: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g stroke="#D46A9A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="12" cy="7" rx="3.5" ry="5" fill="#FDE8F0" transform="rotate(0 12 12)"/>
      <ellipse cx="12" cy="7" rx="3.5" ry="5" fill="#F8C8DC" transform="rotate(60 12 12)"/>
      <ellipse cx="12" cy="7" rx="3.5" ry="5" fill="#FDE8F0" transform="rotate(120 12 12)"/>
      <ellipse cx="12" cy="7" rx="3.5" ry="5" fill="#F8C8DC" transform="rotate(180 12 12)"/>
      <ellipse cx="12" cy="7" rx="3.5" ry="5" fill="#FDE8F0" transform="rotate(240 12 12)"/>
      <ellipse cx="12" cy="7" rx="3.5" ry="5" fill="#F8C8DC" transform="rotate(300 12 12)"/>
      <circle cx="12" cy="12" r="3" fill="#FFD9E8" stroke="#D46A9A"/>
    </g>
  </svg>`,

  tulip: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g stroke="#D46A9A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 4C10 4 8 6 8 9C8 11 10 12 12 12C14 12 16 11 16 9C16 6 14 4 12 4Z" fill="#F8C8DC"/>
      <path d="M9 6C7.5 5 6 6 6 8C6 10 8 12 10 12" fill="#FDE8F0"/>
      <path d="M15 6C16.5 5 18 6 18 8C18 10 16 12 14 12" fill="#FDE8F0"/>
      <line x1="12" y1="12" x2="12" y2="21" stroke="#8BC49E" stroke-width="2"/>
      <path d="M12 17C10 16 8 17 8 17" stroke="#8BC49E" fill="none"/>
      <path d="M12 15C14 14 16 15 16 15" stroke="#8BC49E" fill="none"/>
    </g>
  </svg>`,

  rose: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g stroke="#D46A9A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 3C14 3 16 5 16 7C16 9 14 11 12 11C10 11 8 9 8 7C8 5 10 3 12 3Z" fill="#F8C8DC"/>
      <path d="M8 7C6 7 4 9 5 12C6 14 9 14 12 14C15 14 18 14 19 12C20 9 18 7 16 7" fill="#FDE8F0"/>
      <path d="M5 12C4 14 5 16 8 17C10 17.5 12 17 12 17C12 17 14 17.5 16 17C19 16 20 14 19 12" fill="#F8C8DC"/>
      <circle cx="12" cy="7" r="2" fill="#FFD9E8"/>
      <line x1="12" y1="17" x2="12" y2="22" stroke="#8BC49E" stroke-width="2"/>
    </g>
  </svg>`,

  /* ---- Animals ---- */
  dachshund: `<svg width="56" height="40" viewBox="0 0 56 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g stroke="#6B3E58" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <!-- body -->
      <ellipse cx="28" cy="22" rx="18" ry="8" fill="#D4956B"/>
      <!-- head -->
      <ellipse cx="48" cy="18" rx="7" ry="6" fill="#C4854E"/>
      <!-- snout -->
      <ellipse cx="53" cy="20" rx="3" ry="2.5" fill="#E8B88A"/>
      <circle cx="54" cy="19.5" r="1" fill="#6B3E58"/>
      <!-- eye -->
      <circle cx="49" cy="16" r="1.5" fill="#fff" stroke="#6B3E58"/>
      <circle cx="49.5" cy="15.8" r="0.7" fill="#6B3E58" stroke="none"/>
      <!-- ear -->
      <path d="M44 14C42 10 39 11 40 15" fill="#C4854E"/>
      <!-- legs -->
      <line x1="18" y1="28" x2="18" y2="35" stroke-width="2.5"/>
      <line x1="24" y1="29" x2="24" y2="36" stroke-width="2.5"/>
      <line x1="34" y1="29" x2="34" y2="36" stroke-width="2.5"/>
      <line x1="38" y1="28" x2="38" y2="35" stroke-width="2.5"/>
      <!-- paws -->
      <ellipse cx="18" cy="36" rx="2.5" ry="1.5" fill="#C4854E"/>
      <ellipse cx="24" cy="37" rx="2.5" ry="1.5" fill="#C4854E"/>
      <ellipse cx="34" cy="37" rx="2.5" ry="1.5" fill="#C4854E"/>
      <ellipse cx="38" cy="36" rx="2.5" ry="1.5" fill="#C4854E"/>
      <!-- tail -->
      <path d="M10 20C6 16 4 18 6 22" stroke-width="2" fill="none" class="dog-tail"/>
      <!-- collar -->
      <rect x="43" y="22" width="6" height="3" rx="1.5" fill="#F8C8DC" stroke="#D46A9A"/>
    </g>
  </svg>`,

  paw: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g fill="#F8C8DC" stroke="#D46A9A" stroke-width="1.5">
      <ellipse cx="12" cy="16" rx="5" ry="4"/>
      <ellipse cx="7" cy="9" rx="2.5" ry="3" transform="rotate(-15 7 9)"/>
      <ellipse cx="12" cy="7" rx="2.5" ry="3"/>
      <ellipse cx="17" cy="9" rx="2.5" ry="3" transform="rotate(15 17 9)"/>
    </g>
  </svg>`,

  /* ---- Kuromi-inspired ---- */
  kuromiSkull: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g stroke="#6B3E58" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <!-- hood -->
      <path d="M4 13C4 7.5 7.5 3 12 3C16.5 3 20 7.5 20 13" fill="#8E6BBF"/>
      <!-- ears -->
      <path d="M5 10C3 6 4 2 7 4" fill="#8E6BBF" stroke="#6B3E58"/>
      <path d="M19 10C21 6 20 2 17 4" fill="#8E6BBF" stroke="#6B3E58"/>
      <!-- face -->
      <ellipse cx="12" cy="14" rx="7" ry="6" fill="#fff"/>
      <!-- eyes -->
      <ellipse cx="9.5" cy="13" rx="1.5" ry="2" fill="#6B3E58"/>
      <ellipse cx="14.5" cy="13" rx="1.5" ry="2" fill="#6B3E58"/>
      <!-- skull mark on forehead -->
      <circle cx="12" cy="9" r="2" fill="#F8C8DC" stroke="#D46A9A" stroke-width="1"/>
      <line x1="10" y1="9" x2="14" y2="9" stroke="#D46A9A" stroke-width="1"/>
      <line x1="12" y1="7" x2="12" y2="11" stroke="#D46A9A" stroke-width="1"/>
      <!-- mouth -->
      <path d="M10 17C11 18 13 18 14 17" fill="none"/>
    </g>
  </svg>`,

  /* ---- Food ---- */
  nigiri: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g stroke="#6B3E58" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <!-- rice -->
      <path d="M5 14C5 11 8 10 12 10C16 10 19 11 19 14C19 17 16 19 12 19C8 19 5 17 5 14Z" fill="#FFF7F4"/>
      <!-- fish -->
      <path d="M6 12C6 9 9 7 12 7C15 7 18 9 18 12C18 12 15 13 12 13C9 13 6 12 6 12Z" fill="#FFB3A7"/>
      <!-- nori band -->
      <rect x="10" y="9" width="4" height="10" rx="1" fill="#4A6741" opacity="0.8"/>
    </g>
  </svg>`,

  maki: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g stroke="#6B3E58" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <!-- nori wrapper -->
      <circle cx="12" cy="12" r="8" fill="#4A6741"/>
      <!-- rice ring -->
      <circle cx="12" cy="12" r="6" fill="#FFF7F4"/>
      <!-- filling -->
      <circle cx="12" cy="12" r="3" fill="#FFB3A7"/>
      <!-- avocado piece -->
      <circle cx="10" cy="11" r="1.5" fill="#A8D5A2"/>
    </g>
  </svg>`,

  /* ---- Ratatouille ---- */
  ratChef: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g stroke="#6B3E58" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <!-- chef hat -->
      <path d="M7 8C7 4 10 2 12 2C14 2 17 4 17 8" fill="#fff"/>
      <ellipse cx="12" cy="8" rx="6" ry="2" fill="#fff"/>
      <!-- head -->
      <ellipse cx="12" cy="13" rx="5" ry="4.5" fill="#B8B8B8"/>
      <!-- ears -->
      <circle cx="7.5" cy="10" r="2.5" fill="#FFB3A7" stroke="#6B3E58"/>
      <circle cx="16.5" cy="10" r="2.5" fill="#FFB3A7" stroke="#6B3E58"/>
      <!-- eyes -->
      <circle cx="10" cy="12.5" r="1" fill="#6B3E58" stroke="none"/>
      <circle cx="14" cy="12.5" r="1" fill="#6B3E58" stroke="none"/>
      <!-- nose -->
      <ellipse cx="12" cy="14.5" rx="1.5" ry="1" fill="#FFB3A7"/>
      <!-- whiskers -->
      <line x1="5" y1="14" x2="9" y2="13.5"/>
      <line x1="5" y1="15.5" x2="9" y2="15"/>
      <line x1="15" y1="13.5" x2="19" y2="14"/>
      <line x1="15" y1="15" x2="19" y2="15.5"/>
      <!-- mouth -->
      <path d="M10.5 16C11 17 13 17 13.5 16" fill="none"/>
      <!-- body hint -->
      <path d="M9 17.5C9 17.5 10 21 12 21C14 21 15 17.5 15 17.5" fill="#B8B8B8"/>
    </g>
  </svg>`,

  /* ---- Architecture ---- */
  blueprint: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g stroke="#8E6BBF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <!-- triangle ruler -->
      <path d="M3 21L3 6L18 21Z" fill="#E8D5F0"/>
      <!-- ruler marks -->
      <line x1="3" y1="10" x2="5" y2="10"/>
      <line x1="3" y1="14" x2="5" y2="14"/>
      <line x1="3" y1="18" x2="5" y2="18"/>
      <line x1="7" y1="21" x2="7" y2="19"/>
      <line x1="11" y1="21" x2="11" y2="19"/>
      <line x1="15" y1="21" x2="15" y2="19"/>
      <!-- pencil -->
      <line x1="14" y1="3" x2="21" y2="10" stroke-width="2"/>
      <path d="M21 10L22 12L20 11Z" fill="#D46A9A"/>
    </g>
  </svg>`,

  /* ---- Music ---- */
  headphones: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g stroke="#8E6BBF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 17V12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12V17" fill="none"/>
      <rect x="2" y="14" width="4" height="7" rx="2" fill="#D9C7F2"/>
      <rect x="18" y="14" width="4" height="7" rx="2" fill="#D9C7F2"/>
    </g>
  </svg>`,

  musicNote: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g stroke="#D46A9A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="8" cy="18" r="3" fill="#F8C8DC"/>
      <line x1="11" y1="18" x2="11" y2="5"/>
      <path d="M11 5C11 5 15 3 18 4C18 4 18 8 14 9L11 10" fill="#FDE8F0"/>
    </g>
  </svg>`,

  /* ---- Nature ---- */
  wave: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g stroke="#8EB8D4" stroke-width="1.5" stroke-linecap="round" fill="none">
      <path d="M2 12C4 8 6 8 8 12C10 16 12 16 14 12C16 8 18 8 20 12C22 16 22 16 22 12"/>
      <path d="M2 17C4 14 6 14 8 17C10 20 12 20 14 17C16 14 18 14 20 17" opacity="0.5"/>
    </g>
  </svg>`,

  /* ---- Symbols ---- */
  heart: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 21C12 21 3 15 3 9C3 6.5 5 4 7.5 4C9.5 4 11 5.5 12 7C13 5.5 14.5 4 16.5 4C19 4 21 6.5 21 9C21 15 12 21 12 21Z" fill="#F8C8DC" stroke="#D46A9A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  heartFilled: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 21C12 21 3 15 3 9C3 6.5 5 4 7.5 4C9.5 4 11 5.5 12 7C13 5.5 14.5 4 16.5 4C19 4 21 6.5 21 9C21 15 12 21 12 21Z" fill="#D46A9A" stroke="#D46A9A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  cake: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g stroke="#D46A9A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <!-- base -->
      <rect x="3" y="12" width="18" height="9" rx="3" fill="#FDE8F0"/>
      <!-- frosting -->
      <path d="M3 14C5 12 7 14 9 12C11 10 13 12 15 10C17 12 19 14 21 12" fill="#F8C8DC" stroke="none"/>
      <path d="M3 14C5 12 7 14 9 12C11 10 13 12 15 10C17 12 19 14 21 12" fill="none"/>
      <!-- middle tier -->
      <rect x="6" y="8" width="12" height="4" rx="2" fill="#FFD9E8"/>
      <!-- candle -->
      <rect x="11" y="3" width="2" height="5" rx="1" fill="#D9C7F2"/>
      <!-- flame -->
      <path d="M12 1C12 1 13.5 2 13.5 3C13.5 3.8 12.8 4 12 4C11.2 4 10.5 3.8 10.5 3C10.5 2 12 1 12 1Z" fill="#FFD699"/>
    </g>
  </svg>`,

  lock: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g stroke="#8E6BBF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="5" y="11" width="14" height="10" rx="3" fill="#D9C7F2"/>
      <path d="M8 11V8C8 5.8 9.8 4 12 4C14.2 4 16 5.8 16 8V11" fill="none" class="lock-shackle"/>
      <circle cx="12" cy="16" r="1.5" fill="#8E6BBF"/>
      <line x1="12" y1="17.5" x2="12" y2="19"/>
    </g>
  </svg>`,

  lockOpen: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g stroke="#8E6BBF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="5" y="11" width="14" height="10" rx="3" fill="#CFEBDD"/>
      <path d="M8 11V8C8 5.8 9.8 4 12 4C14.2 4 16 5.8 16 8" fill="none"/>
      <circle cx="12" cy="16" r="1.5" fill="#8E6BBF"/>
    </g>
  </svg>`,

  key: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g stroke="#D46A9A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="8" cy="8" r="5" fill="#FDE8F0"/>
      <circle cx="8" cy="8" r="2" fill="#FFF7F4"/>
      <line x1="12" y1="12" x2="20" y2="20"/>
      <line x1="18" y1="18" x2="20" y2="16"/>
      <line x1="16" y1="20" x2="18" y2="18"/>
    </g>
  </svg>`,

  camera: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g stroke="#6B3E58" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M3 9C3 8 4 7 5 7H7L9 5H15L17 7H19C20 7 21 8 21 9V18C21 19 20 20 19 20H5C4 20 3 19 3 18V9Z" fill="#FDE8F0"/>
      <circle cx="12" cy="13" r="4" fill="#F8C8DC"/>
      <circle cx="12" cy="13" r="2" fill="#FFF7F4"/>
    </g>
  </svg>`,

  star: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L14.5 9H22L16 13.5L18.5 21L12 16.5L5.5 21L8 13.5L2 9H9.5L12 2Z" fill="#FFD699" stroke="#E8B845" stroke-width="1.5" stroke-linejoin="round"/>
  </svg>`,

  sparkle: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g fill="#FFD699" stroke="#E8B845" stroke-width="1">
      <path d="M12 2L13 9L20 8L14 12L18 19L12 14L6 19L10 12L4 8L11 9Z"/>
    </g>
  </svg>`,

  sparkles: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g stroke="#E8B845" stroke-width="1.5" stroke-linecap="round">
      <path d="M12 3V7M12 3L10 5M12 3L14 5" stroke="#FFD699"/>
      <path d="M19 8V12M19 8L17 10M19 8L21 10" stroke="#F8C8DC"/>
      <path d="M5 10V14M5 10L3 12M5 10L7 12" stroke="#D9C7F2"/>
      <path d="M14 17V21M14 17L12 19M14 17L16 19" stroke="#CFEBDD"/>
    </g>
  </svg>`,

  /* ---- Flower variants for curtain & petals ---- */
  sakuraSmall: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g fill="#F8C8DC" stroke="#D46A9A" stroke-width="1.2">
      <path d="M12 2C12 2 14 5.5 14 7.5C14 9 13 10 12 10C11 10 10 9 10 7.5C10 5.5 12 2 12 2Z"/>
      <path d="M12 2C12 2 14 5.5 14 7.5C14 9 13 10 12 10C11 10 10 9 10 7.5C10 5.5 12 2 12 2Z" transform="rotate(72 12 12)"/>
      <path d="M12 2C12 2 14 5.5 14 7.5C14 9 13 10 12 10C11 10 10 9 10 7.5C10 5.5 12 2 12 2Z" transform="rotate(144 12 12)"/>
      <path d="M12 2C12 2 14 5.5 14 7.5C14 9 13 10 12 10C11 10 10 9 10 7.5C10 5.5 12 2 12 2Z" transform="rotate(216 12 12)"/>
      <path d="M12 2C12 2 14 5.5 14 7.5C14 9 13 10 12 10C11 10 10 9 10 7.5C10 5.5 12 2 12 2Z" transform="rotate(288 12 12)"/>
      <circle cx="12" cy="12" r="2" fill="#FFD9E8"/>
    </g>
  </svg>`,

  /* Single petal for falling animation */
  petal: `<svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 0C8 0 14 5 14 12C14 16 11 19 8 20C5 19 2 16 2 12C2 5 8 0 8 0Z" fill="#F8C8DC" stroke="#D46A9A" stroke-width="0.8" opacity="0.8"/>
  </svg>`,

  petalDark: `<svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 0C8 0 14 5 14 12C14 16 11 19 8 20C5 19 2 16 2 12C2 5 8 0 8 0Z" fill="#D46A9A" stroke="#B8527A" stroke-width="0.8" opacity="0.7"/>
  </svg>`,

  petalLight: `<svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 0C8 0 14 5 14 12C14 16 11 19 8 20C5 19 2 16 2 12C2 5 8 0 8 0Z" fill="#FDE8F0" stroke="#F8C8DC" stroke-width="0.8" opacity="0.9"/>
  </svg>`,

  /* ---- Down arrow for scroll hint ---- */
  chevronDown: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 9L12 15L18 9" stroke="#6B3E58" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  /* ---- Play / Pause ---- */
  play: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 5V19L19 12L8 5Z" fill="#fff" stroke="#fff" stroke-width="1.5" stroke-linejoin="round"/>
  </svg>`,

  pause: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="5" width="4" height="14" rx="1" fill="#fff"/>
    <rect x="14" y="5" width="4" height="14" rx="1" fill="#fff"/>
  </svg>`,

  /* ---- Film / Clapperboard ---- */
  film: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g stroke="#8E6BBF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="7" width="18" height="14" rx="2" fill="#D9C7F2"/>
      <path d="M3 7L9 3L15 7" fill="#E8D5F0"/>
      <line x1="3" y1="12" x2="21" y2="12"/>
      <line x1="8" y1="7" x2="8" y2="21"/>
      <line x1="16" y1="7" x2="16" y2="21"/>
    </g>
  </svg>`,
};

/** Flower icons for curtain and petals */
export const FLOWER_ICONS = ['sakura', 'peony', 'tulip', 'rose', 'sakuraSmall'];
export const PETAL_ICONS = ['petal', 'petalDark', 'petalLight'];
export const CONFETTI_ICONS = ['heart', 'sakura', 'star', 'sparkle', 'petal'];

/**
 * Get a random flower SVG string for the curtain
 */
export function randomFlower(index = 0) {
  const name = FLOWER_ICONS[index % FLOWER_ICONS.length];
  return icon(name);
}

/**
 * Get a random petal SVG string
 */
export function randomPetal() {
  const name = PETAL_ICONS[Math.floor(Math.random() * PETAL_ICONS.length)];
  return icon(name);
}
