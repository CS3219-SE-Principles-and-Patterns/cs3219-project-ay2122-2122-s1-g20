module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins"],
      },
      colors: {
        purple: {
          dark: "#8488A3",
          DEFAULT: "#C4C1DE",
          light: "#EFF0F6",
        },
        blue: {
          light: "#F3F7FB",
          dark: "#B4CBE3",
        },
        yellow: {
          dark: "#FBEEB5",
        },
        body: {
          white: "#ffffff",
        },
        grey: {
          light: "#e5e6e4",
        },
        red: {
          warning: "#9D174D",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
