# Feliz Cumpleaños, Dani 🌸

Sitio web interactivo de cumpleaños para Daniela Jimena. Experiencia animada con Three.js, GSAP y SVG ilustrado a mano.

## Estructura de carpetas

```
danigv/
├── index.html              ← Página principal
├── css/style.css            ← Design DNA + estilos
├── js/                      ← Módulos JS (motion, scene3d, etc.)
├── public/
│   ├── audio/
│   │   ├── inarow62.mp3     ← Canción de Álvaro Díaz
│   │   └── cherry-waves.mp3 ← Canción de Deftones
│   ├── photos/
│   │   ├── 1.jpg … 6.jpg    ← Fotos para las polaroids
│   │   └── poster.jpg       ← Poster del video
│   ├── video/
│   │   └── cine.mp4         ← Video cinematográfico
│   └── img/
│       ├── salchicha.png     ← Cursor perrito (PNG transparente, máx 128px)
│       └── kuromi.png        ← Personaje Kuromi (opcional)
├── package.json
└── vite.config.js
```

## Cómo personalizar

### Fotos
Reemplaza `public/photos/1.jpg` hasta `6.jpg` con tus fotos. Puedes agregar más editando el array `CAPTIONS` en `js/gallery.js`.

### Audio
Coloca los archivos `.mp3` en `public/audio/`. Los nombres deben coincidir con los data-src en el HTML.

### Video
Coloca tu video en `public/video/cine.mp4` y su poster en `public/photos/poster.jpg`.

### Cursor personalizado
Reemplaza `public/img/salchicha.png` con tu PNG transparente (máximo 128px de ancho). Si no existe, se usa un perro salchicha SVG ilustrado.

### Kuromi
Si tienes tu propio PNG de Kuromi, colócalo en `public/img/kuromi.png`. El sitio siempre usa una versión SVG propia inspirada en el personaje.

### Escena de Spline
Abre `js/main.js` y cambia la variable `SPLINE_URL`:
```js
const SPLINE_URL = 'https://prod.spline.design/tu-escena/scene.splinecode';
```
Si se deja vacío, se muestra un fallback SVG.

## Desarrollo local

```bash
# Instalar dependencias (usa Node 20+)
npm install

# Servidor de desarrollo
npm run dev

# Build para producción
npm run build
```

## Deploy en Vercel

1. Sube el repositorio a GitHub
2. Conecta el repo en [vercel.com](https://vercel.com)
3. Vercel detecta Vite automáticamente
4. Build command: `npm run build`
5. Output directory: `dist`
6. ¡Listo!

También puedes usar la CLI:
```bash
npx vercel --prod
```

## Contraseña de bloqueo

La fecha de desbloqueo es **08/09** (8 de septiembre). Acepta: `0809`, `08/09`, `8/9`, `8 de septiembre`.

## Tecnologías

- **Vite 5** — Bundler
- **GSAP 3.12.5** — Animaciones + ScrollTrigger + TextPlugin
- **Three.js 0.160.0** — Escena 3D de flores
- **SVG ilustrado a mano** — Cero emojis como recurso visual
- **@splinetool/viewer** — Escena 3D interactiva (opcional)
