import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        border: "#d6d3d1",
        canvas: "#f5f5f4",
        ink: "#1c1917",
        muted: "#78716c",
        panel: "#ffffff",
        accent: "#0f766e",
        accentSoft: "#ccfbf1",
        danger: "#b91c1c"
      },
      boxShadow: {
        panel: "0 18px 40px -24px rgba(28, 25, 23, 0.28)"
      },
      borderRadius: {
        xl: "1rem"
      }
    }
  },
  plugins: []
};

export default config;