<template>
  <div class="px-4 lg:flex justify-evenly lg:-ml-10 lg:-mb-20">
    <div
      class="lg:w-1/2"
    >
      <h4 class="mb-6 text-[18px] text-wrap font-solina-extended-medium font-bold ">
      {{ $t('homeHelp.title') }}
    </h4>

    <p class="text-[20px] mr-4 mb-4 lg:text-[30px] leading-7 lg:leading-9">
      {{ $t("homeHelp.description") }}
    </p>
    <Button
      class="mt-8"
      :label="$t('homeHelp.askBox')"
      raised
      :pt="{ label: 'text-[15px] font-bold py-1 px-4' }"
    />
    </div>
    <NuxtImg
      class="w-full mt-6 lg:w-[400px] lg:m-0 "
      src="/images/landing/help/help.png"
      loading="lazy"
      format="webp"
    />
  </div>
</template>
