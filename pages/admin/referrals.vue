<template>
  <div>
    <h4 class="font-recoleta-regular text-[40px] leading-[45px] whitespace-normal mb-4 lg:mb-8">
      {{ $t('referrals.title') }}
    </h4>
    <div class="flex flex-col gap-4">
      <div class="lg:flex lg:flex-row lg:justify-evenly">
        <NuxtImg
          src="/images/admin/referrals/referrals.webp"
          alt="referrals"
          loading="lazy"
          format="webp"
          class="w-[428px] hidden lg:block"
        />
        <Recommend
          :user-code="getUserCode"
          class="lg:!w-1/2"
        />
      </div>
      <UserCoupons />
      <FAQS />
    </div>
  </div>
</template>

<script setup lang="ts">
defineI18nRoute({
  paths: {
    es: '/mi-cuenta/referidos',
    ca: '/el-meu-compte/referits',
  },
})

definePageMeta({
  layout: 'admin',
})
const user = useStrapiUser()
const getUserCode = computed(() => user.value?.ref)
</script>
