const path = require("path");
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      hotjarId: "",
    },
  },
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    "nuxt-icon",
    "nuxt-headlessui",
    "@nuxt/content",
    "@pinia/nuxt",
    "@nuxt/devtools",
    "nuxt-mapbox",
    "@nuxtjs/supabase",
    "@vueuse/nuxt",
    "@nuxt/image",
    "nuxt-gtag",
    "@nuxtjs/google-fonts",
  ],
  googleFonts: {
    families: {
      Poppins: true,
    },
  },
  // Optionally change the default prefix.
  headlessui: {
    prefix: "",
  },
  content: {
    sources: {
      // overwrite default source AKA `content` directory
      content: {
        driver: "fs",
        prefix: "/blog", // All contents inside this source will be prefixed with `/blog`
        base: path.resolve(__dirname, "content"),
        dir: "content",
      },
    },
    navigation: {
      fields: ["author", "created_at", "image", "description"],
    },
    markdown: {
      tags: {
        h1: "MyCustomH1",
        h5: "MyCustomH5",
        p: "MyCustomParagraph",
      },
    },
  },
  image: {
    provider: "netlify",
    domains: ["curacavi.s3.amazonaws.com", "cqvjuorqpvhyuxfdkhpt.supabase.co"],
  },
  imports: {
    dirs: ["./stores"],
  },
  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      "defineStore", // import { defineStore } from 'pinia'
      ["defineStore", "definePiniaStore"], // import { defineStore as definePiniaStore } from 'pinia'
    ],
  },
  mapbox: {
    accessToken: process.env.MAPBOX_TOKEN,
  },
  supabase: {
    redirect: false,
  },
  gtag: {
    id: process.env.GTAG,
  },
});
