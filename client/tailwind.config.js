/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        md: { min: '800px' },
      },
      colors: {
        primary: {
          DEFAULT: '#f0f0f0',
          dark: '#021024',
        },
        text: {
          DEFAULT: '#C1EBFF',
          secondary: '#CCD0CF',
        },
      },
    },
  },
  plugins: [],
};
