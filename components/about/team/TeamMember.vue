
import type divider from '~/presets/talkual-ui/divider';
<template>
  <div>
    <NuxtImg
      :class="'transform transition-all duration-300 hover:'"
      width="300"
      :src="`/images/about/team/${images[currentImage]}`"
      loading="lazy"
      format="webp"
      @mouseover="showTest"
      @mouseout="currentImage = 0"
    />
    <NuxtImg
      :alt="'test'"
      :class="'transform transition-all duration-300 hover:'"
      width="300"
      :src="`/images/about/team/${images[currentImage]}`"
      loading="lazy"
      format="webp"
      @mouseover="currentImage = 1"
      @mouseout="currentImage = 0"
    />
    <div class="">
      <p>{{ name }}</p>
      <p>{{ position }}</p>
    </div>
</div>
  </template>

<script setup lang="ts">

const test = ref(0);

const showTest = () => {
  console.log(test.value);
};

</script>