<template>
  <div class="flex">
    <h2 class="font-recoleta-regular text-2xl font-normal w-[191px] xl:w-full">
      {{ $t("adminProfileForm.title") }}
    </h2>
    <NuxtLink class="hidden lg:block lg:w-full text-end" to="order">
      <Button
          class="lg:w-[168px]"
          :label="$t('string.misc.order')"
      />
    </NuxtLink>
  </div>
</template>
<script setup lang="ts">
</script>