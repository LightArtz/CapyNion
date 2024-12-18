/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#326270',
        secondary: '#936C2C',
        'container-primary': '#326270',
        'container-secondary': '#D5C4A1',
        'container-tertiary': '#B9DAE3',
        'text-light': '#FFFFFF',
        'text-secondary': '#795915',
        'text-tertiary': '#795915',
        background: '#B4E2F3',
        'primary-hover': '#487D8C',
        'primary-focus': '#5594A7',
      },
      fontFamily: {
        'hanken-grotesk': ['Hanken Grotesk', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
