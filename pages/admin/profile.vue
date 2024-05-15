<script setup lang="ts">
definePageMeta({
  layout: "admin",
  middleware: ["auth"],
});
defineI18nRoute({
  paths: {
    ca: "/el-meu-compte/perfil/",
    es: "/mi-cuenta/perfil/",
  },
});
const { personalData } = useProfileState();
const { isOpen: isModifyingProfile, handleToggle: handleToggleModifyProfile } =
  useToggle();
</script>

<template>
  <section class="w-full 2xl:px-64">
    <HeaderProfile />
    <div class="grid grid-cols-1 gap-5 lg:gap-0 lg:flex lg:flex-col-2 lg:mt-10">
      <ImageProfile class="hidden lg:block" />
      <PersonalData
        v-if="!isModifyingProfile"
        @on-modify-data="handleToggleModifyProfile"
        :personal-data="personalData"
        class="mt-6 lg:mt-0"
      />
      <PersonalDataForm
        v-if="isModifyingProfile"
        @on-modify-data="handleToggleModifyProfile"
      />
    </div>
    <div class="w-full">
      <LanguagePreference class="mt-5 lg:mt-10" />
      <PaymentMethodCard class="mt-5 lg:mt-10" />
      <AddressProfile class="mt-5 lg:mt-10" />
    </div>
    <PreferredProducts />
  </section>
</template>
