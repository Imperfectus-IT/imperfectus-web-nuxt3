// In `pages/admin/profile.vue`
<script setup lang="ts">
import { useUpdateUserLanguageHandler } from '~/composables/admin/domain-user/update/updateLanguage/useUpdateUserLanguageHandler.ts'
import PersonalData from '~/components/admin/profile/PersonalData.vue'

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
const { t } = useI18n()
const { domainUser, handleGetDomainUser } = useGetUserHandler()
const personalData = computed(() => {
  return {
    username: domainUser.value.username,
    email: domainUser.value.email,
  }
})

onMounted(async () => !domainUser.value.id ? await handleGetDomainUser() : '')
const { isOpen: isModifyingProfile, handleToggle: handleToggleModifyProfile } = useToggle()
const { handleUpdatePersonalData } = useUpdateUserHandler()
const { handleUpdateUserLanguage } = useUpdateUserLanguageHandler()
const updatePersonalData = async (personalDataForm: PersonalData) => {
  const { id } = domainUser.value
  await handleUpdatePersonalData(id, personalDataForm, t)
  handleToggleModifyProfile()
}
const updateUserLanguage = async (language: string) => {
  const { id } = domainUser.value
  await handleUpdateUserLanguage(id, language, t)
}
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
          :personal-data="personalData"
          @on-modify-data="updatePersonalData"
        />
      </div>
    </div>
    <div class="w-full">
      <LanguagePreference
        :language="domainUser.language"
        class="mt-5 lg:mt-10"
        @update-language="updateUserLanguage"
      />
      <PaymentMethodCard class="mt-5 lg:mt-10" />
      <AddressProfile class="mt-5 lg:mt-10" />
    </div>
    <PreferredProducts />
  </section>
</template>
