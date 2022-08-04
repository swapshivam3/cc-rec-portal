module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        ccblack: '#1C1C1Cd9',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
