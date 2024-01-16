/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    colors: {
      beige: {
        primary: '#FFFAE8',
      },
      current: 'currentColor',
      green: {
        primary: '#D9EF52',
        secondary: '#007D08',
        tertiary: '#002625',
      },
      orange: {
        primary: '#F8CA8E',
        secondary: '#F3A58F',
      },
      red: {
        primary: '#DC362E',
      },
      transparent: 'transparent',
    },
    extend: {},
  },
  plugins: [],
}

