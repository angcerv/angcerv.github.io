/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        boxShadow: {
          glow: '0 0 10px 4px rgba(0, 255, 255, 0.7)', // Resplandor teal
        },
        fontFamily: {
          sora: ['Sora', 'sans-serif'],
          'space-grotesk': ['Space Grotesk', 'sans-serif'],
          'fira-code': ['Fira Code', 'monospace'],  // Fuente Fira Code
        },
      },
    },
    plugins: [],
}
  