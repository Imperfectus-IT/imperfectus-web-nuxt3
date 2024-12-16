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

const { user } = useUserState()
const { handleUpdatePersonalData } = useUpdatePersonalDataHandler()
const { isOpen: isModifyingProfile, handleToggle: handleToggleModifyProfile } = useToggle()
const { isOpen: isModifyingPassword, handleToggle: handleToggleModifyPassword } = useToggle()

const handlePersonalForm = async (newPersonalData: PersonalData) => {
  await handleUpdatePersonalData(user.value.id, newPersonalData)
  handleToggleModifyProfile()
}
</script>

<template>
  <section class="w-full">
    <HeaderProfile />
    <div class="grid grid-cols-1 gap-5 lg:gap-0 lg:flex lg:flex-col-2">
      <ImageProfile class="hidden lg:block" />
      <div class="w-full my-auto">
        <PersonalData
          v-if="!isModifyingProfile && !isModifyingPassword"
          :user="user"
          class="mt-6 lg:mt-0"
          @on-modify-data="handleToggleModifyProfile"
          @on-modify-password="handleToggleModifyPassword"
        />

        <PersonalDataForm
          v-if="isModifyingProfile"
          :user="user"
          @on-modify-data="handlePersonalForm"
          @on-cancel="handleToggleModifyProfile"
        />

        <PasswordForm
          v-if="isModifyingPassword"
          class="mt-5"
          :email="user.email"
          @on-cancel="handleToggleModifyPassword"
          @on-modify-password="handleToggleModifyPassword"
        />
      </div>
    </div>
    <div class="w-full">
      <LanguagePreference
        :user="user"
        class="mt-5 lg:mt-10"
      />
      <PaymentMethodCard class="mt-5 lg:mt-10" />
    </div>
    <PreferredProducts :user="user" />
  </section>
  <Toast />
</template>
