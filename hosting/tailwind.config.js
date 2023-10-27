/** @type {import('tailwindcss').Config} */
const { createThemes } = require('tw-colors');

module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extends: {}
  },
  plugins: [
    createThemes({
          light: { 
            'primary': '#3b363f',
            'main': '#fc6e83',
            'main2': '#474747',
            'sub': '#8e5568',
            'sub2': '#332e38',
            'txt': '#e6d5d3',
            'err': '#f52443',
            'err2': '#bd001c',
            'err3': '#ff0a2f',
            'err4': '#000000',
          },
          serika: {
            'primary': '#e1e1e3',
            'main': '#e2b714',
            'main2': '#e2b714',
            'sub': '#aaaeb3',
            'sub2': '#d1d3d8',
            'txt': '#323437',
            'err': '#da3333',
            'err2': '#791717',
            'err3': '#da3333',
            'err4': '#791717',
          },
          serika_dark: {
            'primary': '#323437',
            'main': '#e2b714',
            'main2': '#e2b714',
            'sub': '#646669',
            'sub2': '#2c2e31',
            'txt': '#d1d0c5',
            'err': '#ca4754',
            'err2': '#7e2a33',
            'err3': '#ca4754',
            'err4': '#7e2a33',
          },
          sonokai: {
            'primary': '#2c2e34',
            'main': '#9ed072',
            'main2': '#f38c71',
            'sub': '#e7c664',
            'sub2': '#232429',
            'txt': '#e2e2e3',
            'err': '#fc5d7c',
            'err2': '#ecac6a',
            'err3': '#fc5d7c',
            'err4': '#ecac6a',
          },
      })
  ],
}

