/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {},
    fontFamily: {
      sans: ["Atkinson Hyperlegible", ...defaultTheme.fontFamily.sans],
      serif: ["Lexend Variable", ...defaultTheme.fontFamily.serif],
      display: ["DAA Font", ...defaultTheme.fontFamily.serif],
    },
  },
  plugins: [require("tailwind-nord"), require("tailwind-scrollbar")],
  darkMode: ["class", ".darkmode"],
};
