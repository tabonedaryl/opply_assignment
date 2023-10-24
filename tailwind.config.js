/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7A34FF',
        'primary-over': '#6F2DED',
        secondary: '#48B7E5',
        'secondary-over': '#4EB4DE',
      }
    },
  },
  plugins: [],
}

