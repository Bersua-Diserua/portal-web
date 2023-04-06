/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}", "./node_modules/flowbite-react/**/*.js"],
  theme: {
    extend: {
      container: {
        center: true,
      },
      maxWidth: {
        "2xs": "16rem",
        "8xl": "90rem",
      },
    },
    colors: {
      serua: "#9C7A54",
      dark: {
        1: "#171821",
        2: "#2B2B36",
      },
      accent: {
        green: "#A9DFD8",
        yellow: "#FEB95A",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("flowbite/plugin")],
}
