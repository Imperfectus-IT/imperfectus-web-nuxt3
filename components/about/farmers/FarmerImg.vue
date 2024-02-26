<template>
    <div class="">
        <NuxtImg
            :src="image.url"
            :alt="'farmer_image'"
            format="webp"
            loading="lazy"
            class="rounded-[30px] border-2 border-green-primary object-cover "
            :class="image.class"
            :style="{
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