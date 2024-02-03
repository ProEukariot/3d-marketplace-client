/** @type {import('tailwindcss').Config} */

module.exports = {
  important: true,
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        danger: "#e11d48",
      },
    },
  },
  plugins: [],
};
