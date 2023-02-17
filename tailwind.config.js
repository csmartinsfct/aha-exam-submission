// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: "media",
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        default: "#121212",
        white: "#ffffff",
        greyscale: "#181818",
        greyscaleLight: "#1B1B1B",
        greyscaleLighter: "#B2B2B2",
        greyscale50: "#F8F8F8",
        greyscale100: "#262626",
        greyscale400: "rgba(255,255,255,0.5)",
        greyscale500: "#929292",
        greyscale700: "#8B8B8B",
        greyscale800: "#1F1F1F",
        greyscale900: "#5d5d5d",
        orange: "#FF9B33",
        orange2: "#ffd05d",
        sidebarMobile: "rgba(24,24,24,0.2)",
      },
      fontFamily: {
        // font declaration in /app/layout.tsx
        ubuntu: ["var(--font-ubuntu)", "sans-serif"],
        opensans: ["var(--font-opensans)", "sans-serif"],
      },
      screens: {
        xm: "420px",
        ...defaultTheme.screens,
      },
      keyframes: {
        bounceLeft: {
          "0%%": {
            transform: "0",
          },
          "100%": {
            transform: "translateX(-25%)",
          },
        },
      },
      animation: {
        "bounce-left":
          "bounceLeft 0.4s alternate cubic-bezier(0, 0, 0.2, 1) infinite",
      },
    },
  },
  plugins: [],
};
