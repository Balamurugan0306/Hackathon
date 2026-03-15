/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ["Orbitron", "sans-serif"],
        space: ["Space Grotesk", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        neon: {
          blue: "#00f2fe",
          purple: "#7b2ff7",
          pink: "#ff007f",
          cyan: "#4facfe",
        },
        dark: {
          DEFAULT: "#0a0a0c",
          card: "rgba(255, 255, 255, 0.05)",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "glass-gradient":
          "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
    },
  },
  plugins: [],
};
