<template>
    <div :class="containerClass">
      <NuxtImg
        loading="lazy"
        format="webp"
        :src="image"
        :alt="image" 
        :class="imageClass"
      />
      <slot name="text" />
    </div>
</template>

<script setup lang="ts">
import type { ImageTextCardType } from './types/imageTextCardType'

defineProps<ImageTextCardType>()

</script>