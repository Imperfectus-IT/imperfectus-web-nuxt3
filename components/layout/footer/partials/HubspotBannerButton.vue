<script setup lang="ts">
const { isInverse } = withDefaults(defineProps<{
  isInverse?: boolean
}>(), {
  isInverse: false
})

const isHubspotButtonHidden = useState("isHubspotButtonHidden", () => false)
</script>

<template>

</template>

<style scoped lang="scss">

</style>
