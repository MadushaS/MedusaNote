/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ["./public/*.{html,js}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      fontFamily: {
      'sans': ['Quicksand', ...defaultTheme.fontFamily.sans],
      }
    }
  },
  plugins: [require("daisyui")],
  daisyui:{
    themes:["light","dark","aqua","dracula","winter","coffee"]
  }
};
