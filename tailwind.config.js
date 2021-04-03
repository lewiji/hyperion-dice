const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    purge: [
        './public/**/*.html',
        './pages/**/*.{js,jsx,ts,tsx}',
        './src/**/*.{js,jsx,ts,tsx}'
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        screens: {
            'xs': '475px',
            ...defaultTheme.screens,
        },
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
