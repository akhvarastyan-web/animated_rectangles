import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/animated_rectangles/',
  plugins: [react()],
});
