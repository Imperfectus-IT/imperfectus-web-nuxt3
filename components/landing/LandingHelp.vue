<template>
  <div class="px-4 lg:flex justify-evenly">
    <div 
      class="lg:w-1/2"
    >
      <h4 class="mb-6 text-[18px] text-wrap font-solina-extended-medium font-bold ">
      {{ $t('homeHelp.title') }}
    </h4>

    <p class="text-[20px] mr-4 mb-4 lg:text-[30px]">
      {{ $t("homeHelp.description") }}
    </p>
    <Button
      :label="$t('homeHelp.askBox')"
      raised
      :pt="{ label: 'text-[15px] font-bold py-1 px-4' }"
    />
    </div>
    <NuxtImg
      class="w-full mt-6 lg:w-[500px] lg:m-0"
      src="/images/landing/help/help.png"
    />
  </div>
</template>
