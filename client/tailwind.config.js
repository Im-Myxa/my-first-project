/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        mill: ['Sorts Mill Goudy', 'serif']
      },
      colors: {
        main: '#000000',
        title: '#b1a891',
        titleBolt: '#8b6c4d'
      }
    }
  },
  plugins: []
};
