/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#123A73",
          50: "#EAF0F9",
          100: "#CBDAEE",
          200: "#9BB8DC",
          300: "#6B95CA",
          400: "#3D71AF",
          500: "#1D5FAD",
          600: "#164B8C",
          700: "#123A73",
          800: "#0E2C57",
          900: "#0A1F3D",
          950: "#071429",
        },
        teal: {
          DEFAULT: "#0E6F82",
          50: "#E7F4F5",
          100: "#C4E4E7",
          200: "#8FC9CF",
          300: "#5AAEB7",
          400: "#2C919C",
          500: "#0E6F82",
          600: "#0B5A69",
          700: "#094652",
          800: "#07333C",
          900: "#052026",
        },
        sun: {
          DEFAULT: "#F2883C",
          50: "#FEF3E9",
          100: "#FDE1C4",
          200: "#FBC98F",
          300: "#F9AF5C",
          400: "#F5A83C",
          500: "#F2883C",
          600: "#DD6B1F",
          700: "#B4551A",
        },
        gold: {
          DEFAULT: "#F5A83C",
          light: "#FCC24C",
        },
        ink: "#12192B",
        paper: "#FBFCFE",
        mist: "#F1F5FA",
      },
      fontFamily: {
        display: ["'Fraunces'", "serif"],
        body: ["'Plus Jakarta Sans'", "sans-serif"],
        stub: ["'Space Mono'", "monospace"],
      },
      borderRadius: {
        pass: "1.75rem",
      },
      boxShadow: {
        card: "0 2px 0 0 rgba(18,25,43,0.06), 0 12px 28px -12px rgba(18,25,43,0.18)",
        pop: "0 18px 40px -14px rgba(18,58,115,0.35)",
      },
      maxWidth: {
        content: "1320px",
      },
    },
  },
  plugins: [],
}
