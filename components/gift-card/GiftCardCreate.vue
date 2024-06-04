<template>
  <div class="bg-green-quaternary mt-12 px-8 pb-14 lg:px-20">
    <h4 class="text-[56px] font-recoleta-regular leading-[52px] pt-12 !whitespace-normal">
      {{ $t("gift-card.create.title") }}
    </h4>
    <p class="text-[20px] font-bold my-6">
      {{ $t("gift-card.create.choose_design") }}
    </p>
    <GiftCardCarousel />
    <GiftCardCreateForm />

    <div class="mt-8">
      <span class="text-[20px]">{{
        $t("gift-card.create.form.description")
      }}</span>
      <NuxtLink :to="localePath({ name: 'legal-conditions'})">
        <span class="underline text-[20px]">{{ ' ' + $t("gift-card.create.form.description_link") }}</span>
      </NuxtLink>
    </div>
    <Button :pt="{ root: 'bg-green-primary w-2/3 mt-12 font-bold py-1 lg:py-2 lg:w-1/4 rounded-md' }" :label="$t('gift-card.create.form.button')" />
  </div>
  
</template>

<script setup lang='ts'>
const localePath = useLocalePath()
</script>
