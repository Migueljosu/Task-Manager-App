module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // ou 'media' ou 'class'
  theme: {
    extend: {
      colors: {
        brown: "#827055",
        gray: "#A79E8B",
        beige: "#D4CEB0",
        lightBeige: "#EDE7CF",
        darkBrown: "rgb(130, 112, 85)",
        grayBeige: "rgb(167, 158, 139)",
        beigeGreen: "rgb(212, 206, 176)",
        lightBeigeGreen: "rgb(237, 231, 207)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
