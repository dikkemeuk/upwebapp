module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    daisyui: {
      styled: true,
      themes: false,
      rtl: false,
    },

  },
  plugins: [
    require('daisyui'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
