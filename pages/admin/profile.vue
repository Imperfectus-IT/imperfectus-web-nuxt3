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

// TODO handle save language on backend
const saveLanguage = (language: string) => {
  console.log(language);
}
</script>

<template>
  <section class="w-full 2xl:px-64">
    <HeaderProfile />
    <div class="grid grid-cols-1 gap-5 lg:gap-0 lg:flex lg:flex-col-2 lg:mt-10">
      <ImageProfile />
      <PersonalData />
    </div>
    <div class="w-full">
      <LanguagePreference
        :user-language="'es'"
        class="mt-5 lg:mt-10"
        @save_language="saveLanguage"
      />
      <PaymentMethodCard class="mt-5 lg:mt-10" />
      <AddressProfile class="mt-5 lg:mt-10" />
    </div>
  </section>
</template>
