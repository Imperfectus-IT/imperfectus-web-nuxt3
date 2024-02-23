<template>
    <div>
        <NuxtImg
            :src="image.url"
            :alt="'farmer_image'"
            :height="image.height + 'px'"
            format="webp"
            loading="lazy"
            class="rounded-xl border-2 border-green-primary absolute object-cover"
            :style="{
                top: `${image.top}px`,
                left: `${image.left}px`,
                right: `${image.right}px`,
                bottom: `${image.bottom}px`,
                width: `${image.width}%`,
                height: `${image.height}px`
            }"
        />
    </div>
</template>

<script setup lang="ts">
import type { Image } from '~/pages/farmers.vue';

defineProps({
    image: {
        type: Object as () => Image,
        required: true
    }
})
</script>