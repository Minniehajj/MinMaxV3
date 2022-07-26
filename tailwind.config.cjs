/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  mode: "jit",
  content: ["./src/**/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        'theme': {
          'white': '#F2F2F2',
          'black': '#1F1F1F',
          'pink': '#EB98B0',
          'pink-dark': '#972042',
          'blue': '#88AFD3',
          'blue-dark': '#274868',
        },
      },
      animation: ['hover', 'group-hover'],
      fontFamily:{
        'sans': ['Nunito Sans', ...defaultTheme.fontFamily.sans],
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),    
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar-hide'),
    require('tailwind-scrollbar'),
    require("tailwindcss-radix")({      
      variantPrefix: "rdx",
    })
  ],
}
