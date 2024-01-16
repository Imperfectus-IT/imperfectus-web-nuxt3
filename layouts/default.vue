<script setup lang="ts">
import TKButton from "~/components/talkual-ui/primevue/TKButton/TKButton.vue";
</script>

<template>
  <div class="flex justify-center">
    <Button label="Submit" />
    <br/>
    <TKButton label="Suscripción" />
    <slot />
  </div>
</template>

<style scoped lang="scss">

</style>
