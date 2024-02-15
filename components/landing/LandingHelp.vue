<template>
  <div class="ml-4">
    <h2 class="font-bold text-[18px] font-solina-extended-book my-6">
      {{ $t('homeHelp.title') }}
    </h2>
    <p class="text-[20px] mr-4 mb-4">
      {{ $t('homeHelp.description') }}
    </p>
    <Button
      :label="$t('homeHelp.askBox')"
      raised
      :pt="{ label: 'text-[15px] font-bold py-1 px-4' }"
    />
  </div>
</template>