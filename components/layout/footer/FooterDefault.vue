<template>
  <footer>
    <Container>
      <div class="relative w-full pl-4 bg-green-tertiary">
        <div class="flex flex-row absolute left-72 top-8">
          <div
            v-for="(lang, index) in availableLanguages"
            :key="index"
          >
            <b-button
              class="mr-3 font-bold text-green-quaternary disabled:text-red-primary"
              :disabled="true"
              @click="() => changeLanguage(lang)"
            >
              {{ lang }}
            </b-button>
          </div>
        </div>

        <FooterLinks />
        <FooterAboutUs /> 
        <FooterLegal />     
        <FooterContact />      
        <FooterLogos />
      </div>
    </Container>
    <FooterRights :dark="false" />
  </footer>
</template>

<script setup lang="ts">
import { useI18n } from '#imports';
const availableLanguages = ref(['CA', 'ES'])
const i18n = useI18n()

const currentLanguage = ref('es')

const changeLanguage = (lang: string) => {
  currentLanguage.value = lang
  i18n.locale.value = lang
  console.log(currentLanguage.value)
}
</script>
