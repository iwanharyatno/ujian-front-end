const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      gridTemplateRows: {
        admin: 'auto 1fr',
      },
      colors: {
        primary: colors.blue[400],
        warning: colors.yellow[400],
        danger: colors.red[400],
        'warning-fade': colors.yellow[200],
        'warning-dark': colors.yellow[500],
        'primary-fade': colors.blue[200],
        'primary-dark': colors.blue[500],
        'danger-dark': colors.red[500],
        'primary-admin': colors.sky[500],
        'primary-admin-dark': colors.sky[700],
      }
    },
  },
  plugins: [],
}
