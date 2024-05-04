<script setup lang="ts">
const value = ref(null)
</script>

<template>
  <div class="flex flex-wrap justify-center gap-3">
    <InputOtp v-model="value" />
  </div>
</template>

<style scoped lang="scss">

</style>
