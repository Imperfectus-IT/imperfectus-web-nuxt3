<template>
  <Container class="w-full">
    <div :class="containerClass">
      <h1
        v-if="isTitleH1"
        class="font-solina-condensed text-base mb-4 pl-4 pr-4 uppercase"
        :class="titleClass"
      >
        {{ value }}
      </h1>
      <h2
        v-else-if="isTitleH2"
        class="font-solina text-base mb-4 pl-4 pr-4 uppercase font-bold"
        :class="titleClass"
      >
        {{ value }}
      </h2>
      <p
        v-else
        class="font-solina-condensed text-base mb-4 pl-4 pr-4 uppercase"
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
    required: true
  },
  containerClass: {
    type: String,
    default: 'mt-6'
  },
  isTitleH1: {
    type: Boolean,
    default: false
  },
  isTitleH2: {
    type: Boolean,
    default: false
  },
  titleClass: {
    type: String,
    default: ''
  }
})

</script>

<style scoped lang="scss">
</style>
