import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0A0D0A",
        surface1: "#10141090",
        surface2: "#141A14",
        surface3: "#1A211A",
        hairline: "#1F2820",
        hairline2: "#283228",
        fg: "#EAF0E6",
        fgDim: "#9BA89B",
        fgMute: "#5E6B5E",
        accent: "#A8D847",
        accentDk: "#8FBE2E",
        accentBg: "rgba(168,216,71,0.10)",
        accentRing: "rgba(168,216,71,0.30)",
        accentInk: "#0E1A00",
        good: "#A8D847",
        med: "#F2B544",
        weak: "#E5685D",
      },
      borderRadius: {
        sm: "6px",
        md: "10px",
        lg: "14px",
        xl: "20px",
      },
      fontSize: {
        xs: "10px",
        sm: "11px",
        base: "13px",
        md: "15px",
        lg: "18px",
        xl: "24px",
        xxl: "36px",
      },
      fontFamily: {
        sans: ["Barlow", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
