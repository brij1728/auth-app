/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FFFFFF',
        secondary: '#333',
        tertiary: '#f00',
        btn: '#3673fd',
      },
    },
  },
  plugins: [],
};
