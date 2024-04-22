// https://nuxt.com/docs/api/configuration/nuxt-config
import * as path from "path";
import primevueLocales from "./lang/primevue-locales.ts";

export default defineNuxtConfig({
    app: {
        head: {
            title: 'TALKUAL',
            titleTemplate: '%s | TALKUAL',
            meta: [
                { charset: 'utf-8' },
                {
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1'
                },
                {
                    'http-equiv': 'cache-control',
                    content: 'no-cache'
                },
                {
                    hid: 'description',
                    name: 'description',
                    content: ''
                }
            ],
            link: [
                {
                    rel: "stylesheet",
                    href: "https://cdn.jsdelivr.net/npm/@mdi/font@7.4.47/css/materialdesignicons.min.css?display=swap",
                }
            ],
        },
    },
    runtimeConfig: {
        baseUrl: process.env.BASE_URL,
        STRAPI_URL: process.env.NUXT_PUBLIC_STRAPI_URL,
        public: {
            STRAPI_URL: process.env.NUXT_PUBLIC_STRAPI_URL,
        },
    },
    routeRules: {
        "/api/**": {proxy: process.env.NUXT_PUBLIC_STRAPI_URL, pathRewrite: {"^/api/": ""}},
        "/uploads/**": {proxy: process.env.NUXT_PUBLIC_STRAPI_URL},
    },
    components: [
        {
            path: "~/components",
            pathPrefix: false,
        },
    ],
    imports: {
        dirs: ["composables/**"],
    },
    typescript: {
        typeCheck: false,
    },
    devtools: {enabled: true},
    modules: [
        "@nuxtjs/tailwindcss",
        "nuxt-zod-i18n",
        "@nuxtjs/i18n",
        "nuxt-primevue",
        "@nuxt/image",
        "nuxt-svgo",
        "@nuxtjs/eslint-module",
        'vue3-carousel-nuxt',
        "@nuxtjs/strapi",
    ],
    primevue: {
        options: {
            unstyled: true,
            locale: {
                ...primevueLocales.es
            }
        },
        importPT: {
            as: "TalkualUI",
            from: path.resolve(__dirname, "./presets/talkual-ui/"),
        },
        components: {
            include: [
                "Button",
                "Calendar",
                "Card",
                "Carousel",
                "Checkbox",
                "Dialog",
                "Divider",
                "Dropdown",
                "Image",
                "InputText",
                "Menu",
                "MenuBar",
                "Multiselect",
                "OverlayPanel",
                "PanelMenu",
                "Password",
                "ProgressBar",
                "Rating",
                "Sidebar",
                "Skeleton",
                "Toolbar",
                "Rating",
                'Fieldset'
      ],
        },
    },
    tailwindcss: {
        cssPath: "~/assets/scss/tailwind.scss",
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
    zodI18n: {
        localeCodesMapping: {
            "es-ES": "es",
            "ca-ES": "ca",
        },
    },
    strapi: {
        prefix: "/api/",
        cookie: {
            path: "/",
            maxAge: 14 * 24 * 60 * 60,
            secure: process.env.NODE_ENV === "production",
            sameSite: true,
        },
        version: "v3",
    },
    image: {
        format: ["webp", "avif", "png"]
    }
});
