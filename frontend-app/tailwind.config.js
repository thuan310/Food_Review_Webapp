/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-red": {
          DEFAULT: "#FF6868",
          100: "#FFE0D4",
        },
        "kem":"#FFF7EC"
      },

    },
  },
  plugins: [],
}

