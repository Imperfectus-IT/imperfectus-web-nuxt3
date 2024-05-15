/** @type {import("tailwindcss").Config} */

export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    'presets/**/*.{js,vue,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    colors: {
      beige: {
        primary: '#FFFAE8',
        secondary: '#FFF2C1',
      },
      blue: {
        primary: '#2AA8D7',
      },
      white: {
        primary: '#fff',
      },
      black: {
        primary: '#000',
      },
      green: {
        primary: '#D9EF52',
        secondary: '#007D08',
        tertiary: '#002423',
        quaternary: '#e5F8C4',
      },
      grey: {
        primary: '#2F2F2F',
        secondary: '#B1B1B1',
        tertiary: '#B3B3B3',
        quaternary: '#D7D0B1'
      },
      orange: {
        primary: '#F8CA8E',
        secondary: '#A3A3A3',
      },
      red: {
        primary: '#DC362E',
        secondary: '#F3A58F',
      },
      yellow: {
        primary: 'gold',
      },
      transparent: 'transparent',
      current: 'currentColor',
    },
    fontSize: {
      'xs': ['0.75rem', '0.875rem'],
      'sm': ['0.875rem', '1.0625rem'],
      'base': ['1rem', '1.3125rem'],
      'lg': ['1.25rem', '1.5rem'],
      'xl': ['1.5625rem', '2.125rem'],
      '2xl': ['2.5rem', '3.125rem'],
    },
    boxShadow: {
      sm: '0 4px 4px 0 rgba(0, 0, 0, 0.25)',
      md: '4px 4px 4px 0 rgba(0, 0, 0, 0.25)',
    },
    borderRadius: {
      none: '0',
      sm: '0.125rem',
      DEFAULT: '0.25rem',
      md: '0.375rem',
      lg: '0.625rem',
      xl: '0.9375rem',
      xxl: '50%',
    },
    extend: {
      fontFamily: {
        'recoleta-regular': ['Recoleta Regular'],
        'recoleta-medium': ['Recoleta Medium'],
        'recoleta-semibold': ['Recoleta SemiBold'],
        'solina-extended-book': ['Solina Extended Book'],
        'solina-extended-medium': ['Solina Extended Medium'],
        'solina-condensed-bold': ['Solina Condensed Bold'],
      },
      animation: {
        scaleAnimation: 'scaleAnimation 1s ease-in-out',
      },
      transitionDelay: {
        0: '0ms',
        1000: '1000ms',
        2000: '2000ms',
        3000: '3000ms',
      },
      animationDelay: {
        0: '0ms',
        500: '500ms',
        1000: '1000ms',
        1500: '1500ms',
        2000: '2000ms',
        3000: '3000ms',
      },
    },
  },
  plugins: [
    require('tailwindcss-animations'),
  ],
  build: {
    postcss: {
      plugins: {
        autoprefixer: {},
      },
    },
  },
}
