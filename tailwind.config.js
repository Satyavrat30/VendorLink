/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        vendor: {
          50: '#f0f9ff',
          500: '#3b82f6',
          600: '#2563eb'
        },
        supplier: {
          50: '#f0fdf4',
          500: '#22c55e',
          600: '#16a34a'
        },
        orange: {
          50: '#fff7ed',
          500: '#f97316',
          600: '#ea580c'
        }
      }
    },
  },
  plugins: [],
};