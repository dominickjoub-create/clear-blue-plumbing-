import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#050A14", // deep blue-black ground
          soft: "#0B1220",
          raise: "#131C2C",
          line: "#202C42",
        },
        aqua: {
          DEFAULT: "#1E86E8", // primary clear blue (from logo)
          bright: "#4FA9F5",
          deep: "#0C5FC0",
          glow: "#A6D4FF",
        },
        chalk: {
          DEFAULT: "#FFFFFF", // clean white
          dim: "#A7B0C0",
          faint: "#6B7488",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      boxShadow: {
        aqua: "0 0 0 1px rgba(30,134,232,0.35), 0 8px 30px -8px rgba(30,134,232,0.45)",
        lift: "0 20px 50px -20px rgba(0,0,0,0.8)",
      },
      keyframes: {
        "rise-in": {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "sweep": {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(120%)" },
        },
        "pulse-ring": {
          "0%": { boxShadow: "0 0 0 0 rgba(30,134,232,0.5)" },
          "70%": { boxShadow: "0 0 0 14px rgba(30,134,232,0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(30,134,232,0)" },
        },
        // A single droplet swelling then falling — used behind the wordmark.
        drip: {
          "0%": { transform: "translateY(0) scaleY(1)", opacity: "0" },
          "15%": { opacity: "1" },
          "80%": { transform: "translateY(14px) scaleY(1.15)", opacity: "1" },
          "100%": { transform: "translateY(20px) scaleY(0.6)", opacity: "0" },
        },
        // Expanding ripple ring.
        ripple: {
          "0%": { transform: "scale(0.4)", opacity: "0.55" },
          "100%": { transform: "scale(1.8)", opacity: "0" },
        },
      },
      animation: {
        "rise-in": "rise-in 0.7s cubic-bezier(0.22,1,0.36,1) both",
        sweep: "sweep 2.5s ease-in-out infinite",
        "pulse-ring": "pulse-ring 2s ease-out infinite",
        drip: "drip 2.6s ease-in infinite",
        ripple: "ripple 3s ease-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
