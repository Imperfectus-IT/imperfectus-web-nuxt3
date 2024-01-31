/** @type {import("tailwindcss").Config} */

export default {
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "presets/**/*.{js,vue,ts}",
        "./app.vue",
        "./error.vue",
    ],
    theme: {
        colors: {
            beige: {
                primary: "#FFFAE8",
            },
            current: "currentColor",
            white: '#ffffff',
            green: {
                primary: "#D9EF52",
                secondary: "#007D08",
                tertiary: "#002625",
                quaternary: "#e5F8C4",
            },
            orange: {
                primary: "#F8CA8E",
                secondary: "#F3A58F",
            },
            red: {
                primary: "#DC362E",
            },
            transparent: "transparent",
        },
        fontSize: {
            xs: ['0.75rem', '0.875rem'],
            sm: ['0.875rem', '1.0625rem'],
            base: ['1rem', '1.3125rem'],
            lg: ['1.25rem', '1.5rem'],
            xl: ['1.5625rem', '2.125rem'],
            '2xl': ['2.5rem', '3.125rem']
        },
        boxShadow: {
            sm: '0 4px 4px 0 rgba(0, 0, 0, 0.25)',
            md: '4px 4px 4px 0 rgba(0, 0, 0, 0.25)',
        },
        borderRadius: {
            lg: '0.625rem',
            xl: '0.9375rem',
        },
        extend: {
            fontFamily: {
                recoleta: ["Recoleta Regular", "Recoleta Medium", "Recoleta SemiBold"],
                solina: ["Solina Extended Book", "Solina Extended Medium"],
            },
        },
    },
    plugins: [],
}

