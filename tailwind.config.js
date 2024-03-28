/** @type {import('tailwindcss').Config} */

module.exports = {
  important: true,
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      spacing: {
        nav: "4rem",
      },
    },
  },
  plugins: [],
};
