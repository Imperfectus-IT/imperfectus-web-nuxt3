import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
    {
        files: ['*.vue'],
        rules: {
            "vue/multi-word-component-names": "off",
            "vue/no-multiple-template-root": "off",
        }
    },
)
    .prepend(

    )
    // Override some rules in a specific config, based on their name
    .override('nuxt/typescript', {
        rules: {
            '@typescript-eslint/ban-types': 'off'
        }
    })
// ...you can chain more operations as needed
