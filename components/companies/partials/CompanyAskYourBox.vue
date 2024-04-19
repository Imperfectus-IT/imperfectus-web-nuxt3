<script setup lang="ts"></script>

<template>
  <div class="bg-green-tertiary flex flex-col text-beige-primary">
    <div
      id="request-box-form"
      class="mt-12 block self-center text-center md:w-[650px] md:pr-0 md:pl-0"
    >
      <div class="pl-[15px] pr-[15px] pb-[20px]">
        <SectionTitle
          :value="$t('pages.companies.form.title')"
          class="mb-6"
          title-class="text-lg text-beige-primary"
        />

        <span class="mb-6 block text-center font-solina-extended-medium">
          {{ $t("pages.companies.form.description") }}
        </span>

        <span class="mb-6 block text-center font-solina-extended-medium">
          {{ $t("pages.companies.form.availableFor") }}
        </span>
      </div>

      <HubSpotForm class="rounded-md ml-4 mr-4 mb-12" form="b2b" />
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
