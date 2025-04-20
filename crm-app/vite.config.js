import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import commonjs from '@rollup/plugin-commonjs';

export default defineConfig({
  plugins: [
    react(),
    commonjs({
      include: ['node_modules/react-big-calendar/**', 'node_modules/moment/**']
    })
  ],
  optimizeDeps: {
    include: [
      'react-big-calendar',
      'moment'
    ]
  }
});