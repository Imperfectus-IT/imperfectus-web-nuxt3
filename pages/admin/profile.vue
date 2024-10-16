<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
useHead({
  title: t('pages.admin.profile.title'),
  meta: [
    {
      name: 'description',
      content: t('pages.admin.profile.description'),
    },
  ],
})

definePageMeta({
  layout: 'admin',
  middleware: ['auth'],
})

defineI18nRoute({
  paths: {
    ca: '/el-meu-compte/perfil/',
    es: '/mi-cuenta/perfil/',
  },
})
const { personalData } = useProfileState()
const { isOpen: isModifyingProfile, handleToggle: handleToggleModifyProfile } = useToggle()
</script>

<template>
  <section class="w-full">
    <HeaderProfile />
    <div class="grid grid-cols-1 gap-5 lg:gap-0 lg:flex lg:flex-col-2">
      <ImageProfile class="hidden lg:block" />
      <div class="w-full my-auto">
        <PersonalData
          v-if="!isModifyingProfile"
          :personal-data="personalData"
          class="mt-6 lg:mt-0"
          @on-modify-data="handleToggleModifyProfile"
        />
        <PersonalDataForm
          v-if="isModifyingProfile"
          @on-modify-data="handleToggleModifyProfile"
        />
      </div>
    </div>
    <div class="w-full">
      <LanguagePreference class="mt-5 lg:mt-10" />
      <PaymentMethodCard class="mt-5 lg:mt-10" />
      <!--      <AddressProfile class="mt-5 lg:mt-10" /> -->
    </div>
    <PreferredProducts />
  </section>
</template>
