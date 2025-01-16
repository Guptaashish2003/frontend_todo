/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customGreen: 'rgb(42, 116, 0)', // Add your custom RGB color here
      },
    },
  },
  plugins: [],
}

