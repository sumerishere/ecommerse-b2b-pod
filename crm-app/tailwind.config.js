export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom colors that match your UI
        'primary': '#6366f1', // Indigo color used in the dashboard
        'secondary': '#8b5cf6', // Purple color used for active elements
      },
      boxShadow: {
        'card': '0 2px 5px rgba(0,0,0,0.1)',
      }
    },
  },
  plugins: [],
}