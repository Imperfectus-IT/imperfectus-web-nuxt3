// https://nuxt.com/docs/api/configuration/nuxt-config
import * as path from 'path'
import primevueLocales from './lang/primevue-locales.ts'

export default defineNuxtConfig({
  app: {
    head: {
      title: 'TALKUAL',
      titleTemplate: '%s | TALKUAL',
      meta: [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
        {
          'http-equiv': 'cache-control',
          'content': 'no-cache',
        },
        {
          hid: 'description',
          name: 'description',
          content: '',
        },
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/@mdi/font@7.4.47/css/materialdesignicons.min.css?display=swap',
        },
      ],
    },
  },
  runtimeConfig: {
    baseUrl: process.env.BASE_URL,
    STRAPI_URL: process.env.STRAPI_URL,
    NODE_ENV: process.env.NUXT_PUBLIC_NODE_ENV,
    public: {
      baseUrl: process.env.BASE_URL,
      STRAPI_URL: process.env.NUXT_PUBLIC_STRAPI_URL,
      NODE_ENV: process.env.NUXT_PUBLIC_NODE_ENV,
    },
  },
  // routeRules: {
  //   '/api/**': { proxy: process.env.NUXT_PUBLIC_STRAPI_URL, pathRewrite: { '^/api/': '' } },
  //   '/uploads/**': { proxy: process.env.NUXT_PUBLIC_STRAPI_URL },
  // },
  nitro: {
    devProxy: {
      '/api': {
        target: process.env.STRAPI_URL, // URL del backend Strapi
        changeOrigin: true, // Cambia el origen de la solicitud
        prependPath: true, // Añade el prefijo en las solicitudes
        pathRewrite: { '^/api': '' }, // Elimina el prefijo '/api' antes de enviarlo al backend
      },
      '/uploads': {
        target: process.env.NUXT_PUBLIC_STRAPI_URL, // URL para recursos estáticos
        changeOrigin: true,
      },
    },
  },
  hooks: {
    'pages:extend'(pages) {
      pages.push({
        name: 'gift-card-payment-completed',
        path: '/gift-card-payment-completed/',
        file: '~/pages/gift-card/payment-completed.vue',
      },
      {
        name: 'order-payment-completed',
        path: '/payment-completed/:slug?',
        file: '~/pages/order/status.vue',
      },
      {
        name: 'order-payment-failed',
        path: '/payment-failed/:slug?',
        file: '~/pages/order/status.vue',
      },
      {
        name: 'payment-added',
        path: '/add-payment-completed',
        redirect: '/mi-cuenta/perfil',
      },
      )

      function removePagesMatching(pattern: RegExp, pages: NuxtPage[] = []) {
        const pagesToRemove = []
        for (const page of pages) {
          if (pattern.test(page.file)) {
            pagesToRemove.push(page)
          }
          else {
            removePagesMatching(pattern, page.children)
          }
        }
        for (const page of pagesToRemove) {
          pages.splice(pages.indexOf(page), 1)
        }
      }

      removePagesMatching(/\.ts$/, pages)
    },
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  imports: {
    dirs: ['composables/**'],
  },
  typescript: {
    typeCheck: false,
  },
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2024-08-26',
  experimental: {
    typedPages: true,
  },
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/test-utils/module',
    '@nuxtjs/strapi',
    '@nuxtjs/tailwindcss',
    'nuxt-mdi',
    'nuxt-primevue',
    'nuxt-svgo',
    'nuxt-zod-i18n',
    '@nuxtjs/i18n',
    'vue3-carousel-nuxt',
    '@nuxtjs/mdc',
    '@nuxtjs/device',
  ],
  primevue: {
    options: {
      unstyled: true,
      locale: {
        ...primevueLocales.es,
      },
    },
    importPT: {
      as: 'TalkualUI',
      from: path.resolve(__dirname, './presets/talkual-ui/'),
    },
    components: {
      include: [
        'Button',
        'Calendar',
        'Card',
        'Carousel',
        'Checkbox',
        'Dialog',
        'Divider',
        'Dropdown',
        'Fieldset',
        'IconField',
        'Image',
        'InputIcon',
        'InputGroup',
        'InputOtp',
        'InputText',
        'Menu',
        'MenuBar',
        'Message',
        'Multiselect',
        'OverlayPanel',
        'Panel',
        'PanelMenu',
        'Password',
        'ProgressBar',
        'ProgressSpinner',
        'RadioButton',
        'Rating',
        'Sidebar',
        'Skeleton',
        'Steps',
        'Textarea',
        'Timeline',
        'Toast',
        'Toolbar',
        'VirtualScroller',
      ],
    },
  },
  tailwindcss: {
    cssPath: '~/assets/scss/tailwind.scss',
  },
  i18n: {
    baseUrl: process.env.BASE_URL,
    locales: [
      {
        name: 'Català',
        code: 'ca',
        file: 'ca-ES.ts',
        language: 'ca-ES',
      },
      {
        name: 'Español',
        code: 'es',
        file: 'es-ES.ts',
        language: 'es-ES',
      },
    ],
    lazy: true,
    langDir: 'lang/',
    strategy: 'prefix_except_default',
    defaultLocale: 'es',
  },
  zodI18n: {
    localeCodesMapping: {
      'es-ES': 'es',
      'ca-ES': 'ca',
    },
  },
  strapi: {
    prefix: '/api/',
    cookie: {
      path: '/',
      maxAge: 14 * 24 * 60 * 60,
      secure: process.env.NODE_ENV === 'production',
      sameSite: true,
    },
    version: 'v3',
  },
  image: {
    format: ['webp', 'avif', 'png'],
  },
  eslint: {
    checker: true,
    config: {
      stylistic: true,
    },
  },
})
