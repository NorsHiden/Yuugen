/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        yuugenBackgroundColor: "#000b0f",
        yuugenColorFirst: "#d3a78a",
        yuugenColorSecond: "#001a23",
        yuugenColorThird: "#007296",
      },
      fontFamily: {
        gilroyThin: ["gilroy-thin", "sans-serif"],
        gilroyLight: ["gilroy-light", "sans-serif"],
        gilroy: ["gilroy-regular", "sans-serif"],
        gilroyMedium: ["gilroy-medium", "sans-serif"],
        gilroyBold: ["gilroy-bold", "sans-serif"],
        gilroyExtraBold: ["gilroy-extrabold", "sans-serif"],
        gilroyBlack: ["gilroy-black", "sans-serif"],
        gilroySemiBold: ["gilroy-semibold", "sans-serif"],
      },
    },
  },
  plugins: [],
};
