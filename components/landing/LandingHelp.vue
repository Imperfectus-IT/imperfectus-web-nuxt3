<template>
  <div class="ml-4">
    <h4 class="mb-6 text-[18px] font-solina-extended-medium font-bold bg-red-primary">
      {{ $t('homeHelp.title') }}
    </h4>
    <p class="text-[20px] mr-4 mb-4">
      {{ $t('homeHelp.description') }}
    </p>
    <Button
      :label="$t('homeHelp.askBox')"
      raised
      :pt="{ label: 'text-[15px] font-bold py-1 px-4' }"
    />
    <NuxtImg
      class="w-full mt-6" 
      src="/images/landing/help/help.png"
    />
  </div>
</template>