const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['NB International Regular', 'Helvetica', 'Arial', 'sans-serif'],
      mono: ['NB International Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace'],
    },
    fontSize: {
      sm: '.75rem',
      base: '1rem',
      lg: '1.5rem',
      xl: '1.75rem',
      '2xl': '2rem',
      '3xl': '3rem',
    },
    screens: {
      xs: '375px',
      ...defaultTheme.screens,
    },
    extend: {
    },
  },
  plugins: [],
};
