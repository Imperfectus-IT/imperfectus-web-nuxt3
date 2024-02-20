<template>
  <footer>
    <span class="footer-top"></span>
    <div class="bg-green-tertiary text-green-quaternary p-8">
      <FooterLinks />
      <FooterContact />
      <FooterLogos />
    </div>
    <FooterRights :dark="false" />
  </footer>
</template>

<script setup lang="ts">
import { useI18n } from "#imports";
const availableLanguages = ref(["CA", "ES"]);
const i18n = useI18n();

const currentLanguage = ref("es");

const changeLanguage = (lang: string) => {
  currentLanguage.value = lang;
  i18n.locale.value = lang;
  console.log(currentLanguage.value);
};
</script>
<style scoped lang="scss">
.footer-top {
  display: block;
  position: relative;
  top: 5px;
  width: 100%;
  height: 50px;
  background-image: url("/images/footer/footer-top.png");
}
</style>
