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
        primary: 'hsl(var(--color-beige-primary) / <alpha-value>)',
      },
      current: 'currentColor',
      green: {
        primary: 'hsl(var(--color-green-primary) / <alpha-value>)',
        secondary: 'hsl(var(--color-green-secondary) / <alpha-value>)',
        tertiary: 'hsl(var(--color-green-tertiary) / <alpha-value>)',
      },
      orange: {
        primary: 'hsl(var(--color-orange-primary) / <alpha-value>)',
        secondary: 'hsl(var(--color-orange-secondary) / <alpha-value>)',
      },
      red: {
        primary: 'hsl(var(--color-red-primary) / <alpha-value>)',
      },
      transparent: 'transparent',
    },
    extend: {},
  },
  plugins: [],
}

