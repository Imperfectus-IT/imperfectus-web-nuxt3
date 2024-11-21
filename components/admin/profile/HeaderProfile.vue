<template>
  <div class="flex">
    <h2 class="font-recoleta-regular text-2xl font-normal w-[191px] xl:w-full">
      {{ $t("adminProfileForm.title") }}
    </h2>
    <NuxtLinkLocale :to="{ name: 'order' }">
      <Button
        class="lg:w-[168px]"
        :label="$t('string.misc.order')"
      />
    </NuxtLinkLocale>
  </div>
</template>

<script setup lang="ts">
</script>
