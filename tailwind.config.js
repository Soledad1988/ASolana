/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        myGray:'#666666',
        surgeGreen: '#00FFA3',
        PurpleDino: '#DC1FFF',
        OceanBlue: '#03E1FF'
      }
    },
  },
  plugins: [],
}

