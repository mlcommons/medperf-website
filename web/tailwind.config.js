const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      white: '#fff',
      black: '#000',
      'light-gray': '#F2F2F2',
      'dark-gray': '#848484',
      primary: '#CCEBD4',
      blue: '#2088EF',
      red: '#FF6D6A',
      orange: '#FFB354',
      yellow: '#FCF58E',
      violet: '#D383FF',
    },
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
      borderWidth: {
        3: '3px',
      },
      gridTemplateRows: {
        roles: '10rem 4rem 1fr 2rem',
      },
      scale: {
        80: '0.8',
      },
      spacing: {
        18: '4.5rem',
      },
    },
  },
  plugins: [],
};
