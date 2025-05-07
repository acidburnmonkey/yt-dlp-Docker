import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/files': 'http://localhost:5000',
      '/download': 'http://localhost:5000',
    },
  },
  root: '.', // <-- tells Vite where to look for index.html
  build: {
    outDir: 'dist', // output folder
    emptyOutDir: true,
  },
});
