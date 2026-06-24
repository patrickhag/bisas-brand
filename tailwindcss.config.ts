import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          white: "#FFFFFF",
          lightGray: "#A0A0A0",
          nearBlack: "#1A1A1A",
          darkGray: "#555555",
          charcoal: "#2D2D2D",
          gold: "#8B7040",
          lightGold: "#F3DC8E",
          frostGray: "#D4D4D4",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
