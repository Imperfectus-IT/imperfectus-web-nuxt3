module.exports = {
  root: true,
  extends: ["@nuxt/eslint-config", "plugin:vue/vue3-recommended", "prettier"],
  rules: {
    "vue/multi-word-component-names": "off",
    "vue/no-multiple-template-root": "off",
  }
};
