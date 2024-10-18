<template>
  <div
    class="lg:border-[1px] lg:order-2 lg:p-6 lg:rounded-lg lg:my-auto lg:flex lg:flex-col lg:w-1/2"
  >
    <p class="mt-6 lg:mt-0">
      {{ $t(`${textData}description_1`) }}
    </p>
    <p class="mt-2">
      {{ $t(`${textData}description_2`) }}
    </p>
    <Button
      label="Quiero suscribirme a la newsletter"
      class="mt-4 lg:w-full"
      @click="subscribeToNewsletter"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  textData: string
}>()
const emits = defineEmits(['subscribe'])
const email = ref<string>('')
const subscribeToNewsletter = () => {
  emits('subscribe')
}
</script>
