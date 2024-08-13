<script setup lang="ts"></script>

<template>
  <div class="bg-green-tertiary flex flex-col text-beige-primary">
    <div
      id="request-box-form"
      class="mt-12 block self-center text-center "
    >
      <div class="pl-[15px] pr-[15px] pb-[20px]">
        <SectionTitle
          :value="$t('pages.companies.form.title')"
          class="mb-6"
          title-class="text-xl -mt-4 text-beige-primary lg:text-[36px]"
        />

        <span class="mb-6 block text-center font-solina-extended-medium">
          {{ $t("pages.companies.form.description") }}
        </span>

        <span class="mb-6 block text-center font-solina-extended-medium">
          {{ $t("pages.companies.form.availableFor") }}
        </span>
      </div>

      <HubSpotForm
        class="rounded-md ml-4 mr-4 mb-12 lg:w-1/2 lg:mx-auto"
        form="b2b"
      />
    </div>
  </div>
</template>
