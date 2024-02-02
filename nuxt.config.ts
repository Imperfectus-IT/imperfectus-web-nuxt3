// https://nuxt.com/docs/api/configuration/nuxt-config
import * as path from "path";

export default defineNuxtConfig({
  app: {
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "https://cdn.jsdelivr.net/npm/@mdi/font@7.4.47/css/materialdesignicons.min.css?display=swap",
        },
      ],
    },
  },
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
  typescript: {
    typeCheck: false,
  },
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/i18n",
    "nuxt-primevue",
    "@nuxt/image",
    "nuxt-svgo",
    "@nuxtjs/eslint-module",
    "@vee-validate/nuxt"
  ],
  primevue: {
    options: { unstyled: true },
    importPT: {
      as: "TalkualUI",
      from: path.resolve(__dirname, "./presets/talkual-ui/"),
    },
    components: {
      include: [
        "Button",
        "Card",
        "Carousel",
        "Image",
        "InputText",
        "Sidebar",
        "Toolbar",
      ],
    },
  },
  tailwindcss: {
    cssPath: "~/assets/scss/tailwind.scss",
    configPath: "tailwind.config",
  },
  i18n: {
    baseUrl: process.env.BASE_URL,
    locales: [
      {
        name: "Català",
        code: "ca",
        file: "ca-ES.ts",
        iso: "ca-ES",
      },
      {
        name: "Español",
        code: "es",
        file: "es-ES.ts",
        iso: "es-ES",
      },
    ],
    lazy: true,
    langDir: "lang/",
    strategy: "prefix_except_default",
    defaultLocale: "es",
  },
});
