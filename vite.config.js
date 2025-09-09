import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',
  publicDir: '../public',
  build: {
    outDir: '../build',
  },
  server: {
    strictPort: true,
    host: '0.0.0.0',
    allowedHosts: ['.trycloudflare.com'],
  },
});
