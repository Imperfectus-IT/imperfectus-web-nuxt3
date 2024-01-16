// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    'nuxt-primevue',
    '@nuxtjs/tailwindcss'
  ],
  primevue: {
    unstyled: true,
    components: {
      exclude: ["Editor", "Chart"]
    }
  }
})
