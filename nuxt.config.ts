// https://nuxt.com/docs/api/configuration/nuxt-config
import * as path from 'path';
export default defineNuxtConfig({
    app: {
        head: {
            link: [{ rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/@mdi/font@7.4.47/css/materialdesignicons.min.css?display=swap' }]
        }
    },
    components: [
        {
            path: '~/components',
            pathPrefix: false,
        },
    ],
    typescript: {
        typeCheck: false
    },
    devtools: { enabled: true },
    modules: [
        '@nuxtjs/tailwindcss',
        'nuxt-primevue',
        '@nuxt/image',
        'nuxt-svgo'
    ],
    primevue: {
        options: { unstyled: true },
        importPT: { as: 'TalkualUI', from: path.resolve(__dirname, './presets/talkual-ui/') },
        components: {
            include: [
                'Button',
                'Card',
                'Carousel',
                'Image',
                'Toolbar',
            ]
        }
    },
    tailwindcss: {
        cssPath: '~/assets/scss/tailwind.scss',
        configPath: 'tailwind.config',
    },
})
