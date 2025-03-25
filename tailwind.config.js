/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          sora: ['Sora', 'sans-serif'],
          'space-grotesk': ['Space Grotesk', 'sans-serif'],
          'fira-code': ['Fira Code', 'monospace'],
        },
      },
    },
    plugins: [],
}
  