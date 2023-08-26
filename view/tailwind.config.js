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
    },
  },
  plugins: [],
};
