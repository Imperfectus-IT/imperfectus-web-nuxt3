<template>
  <div class="bg-green-tertiary text-green-quaternary text-[35px] p-8 leading-[43px] lg:text-[70px] lg:leading-[5rem] lg:p-20">
    <p class="inline">
      {{ $t('boxes.suppliers.description.1') }}
    </p>
    <p class="font-recoleta-regular text-green-primary  inline">
      {{ $t('boxes.suppliers.description.2.bold') }}
    </p>
    <p class="inline">
      {{ $t('boxes.suppliers.description.3') }}
    </p>
    <p class="inline font-recoleta-regular text-green-primary">
      {{ $t('boxes.suppliers.description.4.bold') }}
    </p>
    <p class="inline">
      {{ $t('boxes.suppliers.description.5') }}
    </p>
    <p class="inline font-recoleta-regular text-green-primary">
      {{ $t('boxes.suppliers.description.6.bold') }}
    </p>
    <div class="flex flex-row items-center mt-4">
      <div class="h-3 w-3 bg-green-primary rounded-xl mr-2" />
      <NuxtLink
        to="boxes"
        class="text-[16px]"
      >
        <p>{{ $t('homeKnowMore.more') }}</p>
      </NuxtLink>
    </div>
  </div>
</template>