import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'carousel': ['react-slick', 'slick-carousel', 'swiper'],
          'visualization': ['recharts', 'lucide-react', 'react-icons'],
          'ui': ['react-toastify']
        }
      }
    },
    commonjsOptions: {
      // Add this to handle CommonJS modules better
      transformMixedEsModules: true
    },
    // Exclude problematic dependencies from optimization
    optimizeDeps: {
      exclude: ['jspdf', 'jspdf-autotable', 'pdf-lib']
    },
    chunkSizeWarningLimit: 1000,
  }
})

// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
