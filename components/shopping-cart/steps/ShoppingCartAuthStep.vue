<script setup lang="ts">

</script>

<template>
  <div class="px-10 md:px-[28%] lg:px-[25%] 2xl:px-[20%] relative">
    <div class="flex items-center justify-center gap-3 mt-4">
      <div class="!absolute left-5 flex flex-row gap-3">
        <Button
          class="w-[2rem] h-[2rem] text-xl "
          icon="mdi mdi-chevron-left"
          rounded
          outlined
        />
        <span class="my-auto hidden lg:block">Volver</span>
      </div>
      <p class="font-recoleta-regular text-xl font-normal text-center lg:text-2xl">
        {{ $t('order.steps.orderItemResume') }}
      </p>
    </div>
  </div>
</template>
