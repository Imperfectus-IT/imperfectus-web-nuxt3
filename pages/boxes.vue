<template>
    <div>
        {{ width }}
        <!-- <TKCarousel ></TKCarousel> -->
    </div>
</template>

<script setup lang="ts">

defineI18nRoute({
    paths: {
        ca: "/les-nostres-caixes/",
        es: "/nuestras-cajas/",
    }
});

const { addResize, removeResize, windowWidth } = useWindowSize();

const width = ref(windowWidth);
onMounted(() => {
    addResize();
});

onBeforeUnmount(() => {
    removeResize();
});

</script>
