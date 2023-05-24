import type { Config } from "tailwindcss"
import defaultTheme from "tailwindcss/defaultTheme"

export default {
  content: ["./app/**/*.{ts,tsx,jsx,js}", "./node_modules/flowbite-react/**/*.js"],
  theme: {
    fontFamily: {
      sans: ["Montserrat", ...defaultTheme.fontFamily.sans],
    },
    extend: {
      container: {
        center: true,
      },
      maxWidth: {
        "2xs": "16rem",
        "8xl": "90rem",
      },
      width: {
        sidebar: "var(--sidebar-width)",
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
  plugins: [
    require("@tailwindcss/typography"),
    require("flowbite/plugin"),
    // @ts-ignore
    function ({ addVariant }) {
      addVariant("supports-backdrop-blur", "@supports (backdrop-filter: blur(0)) or (-webkit-backdrop-filter: blur(0))")
    },
  ],
} satisfies Config
