<script setup lang="ts">
defineProps({
  isLoading: Boolean,
  width: {
    type: String,
    default: '150px',
  },
  height: {
    type: String,
    default: '150px',
  },
  image: {
    type: String,
    required: false,
  },
})
</script>

<template>
  <div
    v-if="isLoading"
    class="fixed top-0 left-0 z-40 h-full w-full overflow-hidden bg-opacity-50 bg-[#000000]"
  >
    <div
      class="absolute z-50 flex -translate-x-1/2 -translate-y-1/2 transform items-center justify-center top-[50%] left-[50%]"
    >
      <ProgressSpinner
        :style="{ width: width, height: height, stroke: '#002625' }"
        :pt="{
          circle: {
            stroke: '#002625',
            class: 'stroke-dasharray-[89,200] stroke-dashoffset-0 animate-[p-progress-spinner-dash_1.5s_ease-in-out_infinite] stroke-linecap-round',
          },
        }"
      />
      <img
        v-if="image"
        alt="loading"
        class="absolute top-1/2 left-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 transform"
        :src="image"
      >
    </div>
  </div>
</template>

<style scoped lang="scss">
@keyframes p-progress-spinner-color {
  100%, 0% {
    stroke: #00ff00;
  }
  40% {
    stroke: #00ff00;
  }
  66% {
    stroke: #00ff00;
  }
  80%, 90% {
    stroke: #00ff00;
  }
}
</style>
