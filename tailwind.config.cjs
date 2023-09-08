/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "lg-inner": "0 0 .125rem 0 inset",
      },
      keyframes: {
        descendEnter: {
          "0%": { transform: "translate(0, -30px)", opacity: 0 },
          "100%": { transform: "translate(0, 0)", opacity: 1 },
        },
      },
      animation: {
        enter: "descendEnter .5s ease-out",
      },
    },
  },
  plugins: [],
};
