/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: '#111111',
        coral: '#E8553D',
        warmwhite: '#FAFAF8',
        muted: '#6B6B6B',
        softgray: '#F0EFED',
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
