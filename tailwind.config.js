/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      "dark",
      "light",
      "emerald",
      "night",
      "dracula",
      "halloween",
      "coffee",
      "aqua",
      "cupcake",
      "cyberpunk",
    ],
  },
  plugins: [require("daisyui")],
};
