/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        main: ["Manrope", "sans-serif"],
      },
      colors: {
        dark: {
          DEFAULT: "#0D0E11",
          secondary: "#121419",
          lighter: "#171B24",
        },
        purple: {
          DEFAULT: "#BD00FF",
        },
        green: "#008000",
        blue: "#0077B6",
        red: "#FF2E00",
        gray: {
          DEFAULT: "#A9A9A9",
          darker: "#4F4F4F",
        },
        yellow: "#FAD643",
      },
    },
  },
  plugins: [],
};
