import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages serves this project repo under /portfolio/. Use that base for
// production builds so asset URLs resolve; keep '/' for local dev/preview.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/portfolio/' : '/',
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    css: false,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
}));
