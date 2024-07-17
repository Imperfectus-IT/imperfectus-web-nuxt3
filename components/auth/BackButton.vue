<script setup lang="ts">
defineEmits(['goToBack'])
</script>
<template>
  <div class="!absolute left-5 flex flex-row gap-3">
    <Button
        class="w-[2rem] h-[2rem] text-xl "
        icon="mdi mdi-chevron-left"
        rounded
        outlined
        @click.prevent="$emit('goToBack')"
    />
    <span class="my-auto hidden lg:block">{{ $t('string.back') }}</span>
  </div>
</template>
