// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: [
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/test-utils",
    "@nuxt/ui",
    "@nuxtjs/seo",
    "@nuxtjs/i18n",
    "@pinia/nuxt",
    "@wagmi/vue/nuxt",
  ],
  devtools: { enabled: true },
  compatibilityDate: "2025-07-15",

  eslint: { config: { stylistic: true } },

  // https://i18n.nuxtjs.org/docs/getting-started/usage
  // https://nuxtseo.com/docs/site-config/guides/i18n
  i18n: {
    baseUrl: "https://example.com",
    defaultLocale: "en",
    locales: [
      {
        code: "en", name: "English", file: "en.json",
      },
    ],
  },

  pinia: { storesDirs: [ "./stores/**" ] },

})
