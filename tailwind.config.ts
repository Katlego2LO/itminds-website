import type { Config } from "tailwindcss";

/**
 * Design tokens from the specification, section 4.2.
 * Brand values are sampled from the supplied PNG logo and must be
 * confirmed against the vector logo / brand guide (open item 4).
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f1f8ec",
          100: "#e0f0d4",
          500: "#4a9a1c",
          600: "#3f9a12",
          700: "#2f7a0c",
          800: "#255f0a",
        },
        slate: {
          brand: "#2a3848",
        },
        ink: { DEFAULT: "#1d2733", muted: "#566273", subtle: "#7a8594" },
        surface: { DEFAULT: "#ffffff", warm: "#f7f6f2", sunken: "#efeee9" },
        line: "#e3e1da",
        // Faculty accents: fills, borders and tags only
        faculty: {
          software: "#3f9a12",
          networking: "#1f6fb5",
          data: "#5b3fa0",
          support: "#d9701a",
          design: "#0f7c86",
          emerging: "#b3204f",
        },
        // Reserved for the Learn / Innovate / Empower graphic
        cycle: { learn: "#1f63c4", innovate: "#5aa61a", empower: "#e8791c" },
        // One high-contrast colour used only for the E-Learning button
        elearn: { DEFAULT: "#e8791c", hover: "#c9640f" },
      },
      fontFamily: {
        display: ['"Outfit Variable"', "system-ui", "sans-serif"],
        sans: ['"Source Sans 3 Variable"', "system-ui", "sans-serif"],
      },
      fontSize: { base: ["1.0625rem", "1.65"] },
      maxWidth: { page: "76rem" },
      borderRadius: { card: "0.75rem" },
      boxShadow: {
        card: "0 1px 2px rgb(29 39 51 / 0.05), 0 4px 16px rgb(29 39 51 / 0.05)",
      },
      transitionDuration: { 180: "180ms" },
    },
  },
  plugins: [],
};

export default config;
