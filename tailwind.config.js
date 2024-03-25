/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors';
import { colors as colorapp } from './src/app/config/app';
export default {
  content: ['./src/**/*.{jsx,js}', './src/modules/**/*.{jsx,js}'],
  theme: {
    extend: {
      colors:{
        ...colors,
        ...colorapp
      },
      zIndex:{
        '100': '9999999'
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

