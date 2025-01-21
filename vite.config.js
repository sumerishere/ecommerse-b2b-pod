import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React libraries
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          
          // PDF-related libraries
          'pdf': ['jspdf', 'jspdf-autotable', 'pdf-lib'],
          
          // Carousel and slider libraries
          'carousel': ['react-slick', 'slick-carousel', 'swiper'],
          
          // Charts and icons
          'visualization': ['recharts', 'lucide-react', 'react-icons'],
          
          // UI utilities
          'ui': ['react-toastify', 'core-js']
        }
      }
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
