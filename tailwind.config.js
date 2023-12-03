/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors';
export default {
  content: ['./src/**/*.jsx', './src/modules/**/*.jsx'],
  theme: {
    extend: {
      colors:{
        ...colors,
        primary: '#0b56a7',
        secondary: '#389fae',
        primarylite: '#207ba8',
        secondarylite: '#4dc9b1'
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

