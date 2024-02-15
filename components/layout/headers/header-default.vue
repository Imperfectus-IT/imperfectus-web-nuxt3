<template>
  <header>
    <Section :class="size">
      <Container>
        <slot />
      </Container>
    </Section>
  </header>
</template>

<script setup lang="ts">

defineProps({
  size: {
    type: String,
    default: null
  }
})

</script>

<style scoped lang="scss">

</style>
