<template>
  <Container class="w-full">
    <div :class="containerClass">
      <h1
        v-if="isTitleH1"
        class="text-base uppercase font-solina-condensed"
        :class="titleClass"
      >
        {{ value }}
      </h1>
      <h2
        v-else-if="isTitleH2"
        class="text-base font-bold uppercase font-solina-condensed"
        :class="titleClass"
      >
        {{ value }}
      </h2>
      <p
        v-else
        class="font-recoleta-regular"
        :class="titleClass"
      >
        {{ value }}
      </p>
    </div>
  </Container>
</template>

<script setup lang="ts">
defineProps({
  value: {
    type: String,
    required: true,
  },
  containerClass: {
    type: String,
    default: '',
  },
  isTitleH1: {
    type: Boolean,
    default: false,
  },
  isTitleH2: {
    type: Boolean,
    default: false,
  },
  titleClass: {
    type: String,
    default: '',
  },
})
</script>

<style scoped lang="scss"></style>
