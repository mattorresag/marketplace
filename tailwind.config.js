/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#133DA5",

          secondary: "#F28444",

          accent: "#1dcdbc",

          neutral: "#4F5253",

          "base-100": "#ffffff",

          info: "#2a96c1",

          success: "#48b748",

          warning: "#ebcd0c",

          error: "#f95f52",
        },
      },
    ],
  },
  theme: {
    extend: {
      backgroundImage: {
        "background-login": "url('/assets/images/backgrounds/bg-login.png')",
      },
      colors: {
        secondary: {
          50: "#ffb676",
          100: "#F2C068",
          200: "#ffa262",
          300: "#F7AA57",
          400: "#fc8e4e",
          500: "#F28444",
          600: "#e87a3a",
          700: "#de7030",
          800: "#d46626",
          900: "#ca5c1c",
        },
        primary: {
          50: "#4c5faa",
          100: "#4255a0",
          200: "#384b96",
          300: "#3B53E0",
          400: "#243782",
          500: "#133DA5",
          600: "#10236e",
          700: "#061964",
          800: "#1A2D78",
          900: "#000550",
        },
        error: {
          50: "#ff9184",
          100: "#f8bcae",
          200: "#ff7d70",
          300: "#ff7366",
          400: "#ff695c",
          500: "#f95f52",
          600: "#ef5548",
          700: "#e54b3e",
          800: "#db4134",
          900: "#d1372a",
        },
        warning: {
          50: "#ffff3e",
          100: "#fff534",
          200: "#ffeb2a",
          300: "#F4E18C",
          400: "#f5d716",
          500: "#ebcd0c",
          600: "#e1c302",
          700: "#d7b900",
          800: "#cdaf00",
          900: "#c3a500",
        },
        success: {
          50: "#7ae97a",
          100: "#70df70",
          200: "#66d566",
          300: "#AFD49E",
          400: "#52c152",
          500: "#48b748",
          600: "#3ead3e",
          700: "#34a334",
          800: "#2a992a",
          900: "#208f20",
        },
        info: {
          50: "#5cc8f3",
          100: "#52bee9",
          200: "#48b4df",
          300: "#AFCCE3",
          400: "#34a0cb",
          500: "#2a96c1",
          600: "#208cb7",
          700: "#1682ad",
          800: "#0c78a3",
          900: "#026e99",
        },
        graylight: {
          50: "#ffffff",
          100: "#f9fcfe",
          200: "#eff2f4",
          300: "#e5e8ea",
          400: "#dbdee0",
          500: "#d1d4d6",
          600: "#c7cacc",
          700: "#bdc0c2",
          800: "#b3b6b8",
          900: "#a9acae",
        },
        graydark: {
          50: "#d0d5d7",
          100: "#c6cbcd",
          200: "#bcc1c3",
          300: "#b2b7b9",
          400: "#a8adaf",
          500: "#9ea3a5",
          600: "#94999b",
          700: "#8a8f91",
          800: "#808587",
          900: "#767b7d",
        },
        neutral: {
          50: "#F3F2F7",
          100: "#CED6DE",
          200: "#D1D4D6",
          300: "#9EA3A5",
          400: "#6D7173",
          500: "#4F5253",
          600: "#94999b",
          700: "#3B3F41",
          800: "#252729",
          900: "#252729",
        },
      },
      fontFamily: {
        sans: ["Source Sans Pro", "ui-sans-serif", "system-ui"],
        fontWeight: {
          normal: "500",
        },
      },
    },
  },

  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
