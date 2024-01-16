// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {enabled: true},
    modules: [
        '@nuxtjs/tailwindcss',
        'nuxt-primevue'
    ],
    primevue: {
        options: { unstyled: true },
        importPT: { as: 'Tailwind', from: 'primevue/passthrough/tailwind' },
        components: {
            include: [
                'Button',
                'InputText',
            ]
        }
    },
    tailwindcss: {
        cssPath: '~/assets/css/tailwind.scss',
        configPath: 'tailwind.config',
    },
})
