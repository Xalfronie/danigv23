import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'screen_desktop.html'),
      },
    },
  },
  server: {
    port: 3000,
    open: '/screen_desktop.html',
  },
  plugins: [
    {
      name: 'serve-desktop-as-root',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/' || req.url === '/index.html') {
            req.url = '/screen_desktop.html';
          }
          next();
        });
      },
      closeBundle() {
        const distDesktop = resolve(__dirname, 'dist/screen_desktop.html');
        const distIndex = resolve(__dirname, 'dist/index.html');
        if (fs.existsSync(distDesktop)) {
          fs.copyFileSync(distDesktop, distIndex);
        }
      },
    },
  ],
});
