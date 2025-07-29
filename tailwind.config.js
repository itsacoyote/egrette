/** @type {import('tailwindcss').Config} */
export default {
  darkMode: [
    "selector",
    "[data-theme=\"dark\"]",
  ],
  plugins: [ require("daisyui") ],
  daisyui: {
    themes: [
      "abyss",
      "cupcake",
    ],
  },
}
