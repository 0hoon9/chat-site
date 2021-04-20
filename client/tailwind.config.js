const theme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    fontFamily: {
      sans: [theme.fontFamily.sans],
      mono: [theme.fontFamily.mono],
    },
    colors: {
      yellow: colors.yellow,
      green: colors.green,
      gray: colors.trueGray,
      white: colors.white,
      red: colors.red,
      blue: {
        reallight: '#DBEAFE',
        light: '##BFDBFE',
        DEFAULT: '#93C5FD',
        dark: '#00001B',
        navy: '##00002D',
      },
      dark: {
        DEFAULT: '#111827',
      },
    },
    container: {
      padding: '2rem',
    },
    extend: {
      minWidth: {
        300: '300px',
      },
      width: {
        500: '500px',
      },
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'], // disabled button
    },
  },
};
