/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      container: {
        center: true,
      },
      colors: {
        main: "#0284C7",
        mainDark: "#0EA5E9",
      },
    },
  },
  plugins: [flowbite.plugin()],
  darkMode: "class",
};
