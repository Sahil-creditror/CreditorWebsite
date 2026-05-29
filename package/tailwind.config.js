/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xxl: "1440px",
      },
      fontSize: {
        28: "28px",
        56: "56px",
      },
      colors: {
        primary: "#026fe2",
        secondary: "#1F2A2E",
        lightgray: "#F4F8FA",
        overlay: "#000A0B99",
        darkblack: "#273338",
        twilliteblack: "#181f22",
        gray: "#365564",
      },
      height: {
        "50vh": "50vh",
        "80vh": "80vh",
      },
      minHeight: {
        "70vh": "70vh",
      },
    },
  },
  plugins: [],
};