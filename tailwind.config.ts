import type { Config } from "tailwindcss";
const defaultTheme = require("tailwindcss/defaultTheme");

export default <Partial<Config>>{
  content: [
    "docs/content/**/*.md",
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      aspectRatio: {
        auto: "auto",
        square: "1 / 1",
        video: "16 / 9",
      },
      screens: {
        xxs: "450px",
        xs: "540px",
        ...defaultTheme.screens,
      },
      fontFamily: {
        sans: ['"Poppins"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
};
