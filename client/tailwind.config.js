/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    screens: {
      lg: { max: '1999.99px' },
      sg: { max: '1299.99px' },
      md: { max: '1023.99px' },
      sm: { max: '767.99px' },
      xs: { max: '479.99px' }
    },
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif']
      },
      colors: {
        main: '#000000'
      }
    }
  },
  plugins: []
};
