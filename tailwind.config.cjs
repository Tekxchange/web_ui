/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "lg-inner": "0 0 .125rem 0 inset",
      },
    },
  },
  plugins: [],
};
