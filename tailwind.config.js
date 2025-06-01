/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        "deep-blue-1B": "#1B1C57",
        "light-white-F0": "#F0F3FD",
        "WH-dark-green": "#047857",
        "WH-light-green": "#D1FAE5",
        "WH-light-green-01": "#10B981",
        "WH-light-purple": "#626687",
        "WH-light-gray": "#E0E3EB",
        "WH-mild-gray": "#888B97",
        "WH-dark-gray": "#3C4563",
        "WH-gold": "#F59E0B",
        "WH-light-red": "#FEE2E2",
        "WH-dark-red": "#EF4444",
        "WH-light-pink": "#D1C4E9",
      },

      screens: {
        xs: "440px",
      },
    },
  },
  plugins: [require("daisyui")], // Add DaisyUI as a plugin
};
