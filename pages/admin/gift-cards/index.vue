<template>
  <div class="px-8">
    <h4 class=" text-[34px] font-recoleta-regular my-4 lg:text-[50px] lg:mt-0">Tarjeta regalo</h4>
    <div class="lg:hidden">
      <p class="lg:hidden"> {{ $t('pages.admin.gift-cards.empty.box') }}</p>
      <p class="font-bold mt-4 lg:hidden"> {{ $t('pages.admin.gift-cards.empty.gift') }}</p>
      <NuxtLink class="lg:hidden" :to="localePath({ name: 'gift-card-gift-card-create'})">
        <Button :label="$t('pages.admin.gift-cards.buy')"
                :pt="{ root: 'bg-green-primary border-[1px] border-solid px-5 py-1.5 rounded-lg hover:bg-green-tertiary hover:text-green-primary my-5'}"/>
      </NuxtLink>
    </div>
    <div class="lg:flex lg:flex-row ">
      <NuxtImg alt="admin_gift_card" format="webp" loading="lazy" class="w-[300px] mx-auto lg:w-[400px]"
               src="/images/gift-card/gift-card-admin.webp"/>
      <div class="hidden lg:block lg:my-auto">
        <Panel class="w-2/3 mx-auto ">
          <p class="text-[18px]"> {{ $t('pages.admin.gift-cards.empty.box') }}</p>
          <p class="font-bold mt-4 text-[18px]"> {{ $t('pages.admin.gift-cards.empty.gift') }}</p>
          <NuxtLink :to="localePath({ name: 'gift-card-gift-card-create'})">
            <Button :label="$t('pages.admin.gift-cards.buy')" class="mt-6 mb-3"/>
          </NuxtLink>
        </Panel>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const localePath = useLocalePath();
definePageMeta({
  layout: 'admin',
  middleware: ['auth'],
})
</script>
