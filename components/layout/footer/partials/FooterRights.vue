<template>
  <div
    class="bg-green-primary text-green-tertiary pt-2"
  >
    <h4
      class="text-[30px] font-recoleta text-center"
    >
      {{ $t('footerLegal.claim') }}
    </h4>
    <div class="text-center mt-2">
      <span class="mr-2">{{ new Date().getFullYear() }} TALKUAL. </span>
      <span>All rights reserved.</span>
    </div>
    <div
      class="flex flex-row justify-evenly items-center py-4"
    >
      <NuxtImg
        src="/images/logos/footer/logo1.png"
        alt="logo1"
        class="w-1/4"
      /> <NuxtImg
        src="/images/logos/footer/logo2.png"
        alt="logo1"
        class="w-1/4"
      />
      <NuxtImg
        src="/images/logos/footer/logo3.png"
        alt="logo1"
        class="w-1/4"
      />
    </div>
  </div>
</template>

