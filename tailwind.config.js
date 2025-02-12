/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#F7F2E2",
        secondary: "#880000",
        "yellow-color": "#ffc021",
        heading: "#1e1d23",
      },
    },
  },
  plugins: [require("daisyui")],
};
