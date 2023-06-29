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
        green: "#0E320E",
        blue: "#0B1B34",
        red: "#310C15",
      },
    },
  },
  plugins: [],
};
