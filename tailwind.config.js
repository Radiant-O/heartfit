/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'big-screen': "url('@/assets/img/bg_img/bg_3.jpg')",
        'small-screen': "url('@/assets/img/bg_img/bg_mobile.jpg')",
      },
      fontFamily: {
        "open-sans": ["Open Sans", "sans-serif"],
        "pacifico": ["Pacifico", "cursive"],
        "poppins": ["Poppins", "sans-serif"],
      },
      colors: {
        accent: {},
      },
    },
  },
  plugins: [],
};
