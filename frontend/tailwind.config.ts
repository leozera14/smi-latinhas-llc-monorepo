import { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/modules/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#FF5123",
          50: "#FFF5F2",
          100: "#FFE8E1",
          200: "#FFD1C5",
          300: "#FFB19F",
          400: "#FF8168",
          500: "#FF5123",
          600: "#F43F0C",
          700: "#D43209",
          800: "#A42807",
          900: "#7A1F05",
        },
        dark: {
          DEFAULT: "#232120",
          50: "#F1F1F1",
          100: "#E3E3E3",
          200: "#C7C7C7",
          300: "#A8A8A8",
          400: "#6E6E6E",
          500: "#232120",
          600: "#1D1B1A",
          700: "#171615",
          800: "#111010",
          900: "#0B0A0A",
        },
      },
    },
  },
  plugins: [],
};

export default config;
