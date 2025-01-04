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

  site: {
    url: process.env.SITE_URL,
    name: process.env.CUSTOM_SITE_NAME,
    description: process.env.SITE_DESCRIPTION,
    defaultLocale: "es", // not needed if you have @nuxtjs/i18n installed
  },

  devtools: { enabled: true },

  modules: [
    "@pinia/nuxt",
    "@nuxt/devtools",
    "nuxt-mapbox",
    "@vueuse/nuxt",
    "@nuxt/image",
    "nuxt-gtag",
    "@nuxt/fonts",
    "nuxt-clarity-analytics",
    "@nuxt/ui",
    "nuxt-headlessui",
    "@nuxtjs/seo",
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

  headlessui: {
    prefix: "",
  },

  image:
    process.env.IMAGE_PROVIDER === "netlify"
      ? {
          provider: "netlify",
          domains: [
            "curacavi.s3.amazonaws.com",
            "cqvjuorqpvhyuxfdkhpt.supabase.co",
            "backend.curacavi.info",
          ],
        }
      : {
          domains: [
            "curacavi.s3.amazonaws.com",
            "cqvjuorqpvhyuxfdkhpt.supabase.co",
            "backend.curacavi.info",
          ],
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

  gtag: {
    id: process.env.GTAG,
  },

  ogImage: {
    enabled: process.env.SSR_VALUE === "true",
  },

  sitemap: {
    enabled: true,
    exclude: ["/welcome"],
    sources: process.env.SSR_VALUE === "true" ? ["/api/__sitemap__/urls"] : [],
    autoI18n: false,
    sitemapName: "sitemap_index.xml",
  },

  robots: {
    enabled: true,
    sitemap: "/sitemap_index.xml",
  },

  seoExperiments: {
    enabled: true,
  },

  schemaOrg: {
    enabled: true,
  },

  linkChecker: {
    enabled: true,
  },

  seo: {
    fallbackTitle: false,
  },

  compatibilityDate: "2025-01-04",
});
