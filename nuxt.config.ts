const path = require("path");
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: process.env.SSR_VALUE === "true",
  runtimeConfig: {
    apiBackend: "",
    public: {
      apiBackend: "",
      hotjarId: "",
    },
  },
  devtools: { enabled: true },
  modules: [
    "@nuxt/content",
    "@pinia/nuxt",
    "@nuxt/devtools",
    "nuxt-mapbox",
    "@vueuse/nuxt",
    "@nuxt/image",
    "nuxt-gtag",
    "@nuxt/fonts",
    "nuxt-clarity-analytics",
    "@nuxt/ui",
    "nuxt-headlessui"
  ],
  fonts: {
    families: [
      {
        name: "Poppins",
        provider: "google",
        weights: [
          "100",
          "200",
          "300",
          "400",
          "500",
          "600",
          "700",
          "800",
          "900",
        ],
      },
    ],
  },
  // Optionally change the default prefix.
  headlessui: {
    prefix: "",
  },
  image:
    process.env.PRODUCTION === "true"
      ? {
          provider: "netlify",
          domains: [
            "curacavi.s3.amazonaws.com",
            "cqvjuorqpvhyuxfdkhpt.supabase.co",
            "backend.curacavi.info",
          ],
        }
      : {},
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
  gtag: {
    id: process.env.GTAG,
  },
});