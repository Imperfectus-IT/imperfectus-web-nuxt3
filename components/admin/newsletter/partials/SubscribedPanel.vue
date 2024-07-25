<template>
  <div
    class="lg:border-[1px] lg:order-2 lg:p-6 lg:rounded-lg lg:my-auto lg:flex lg:flex-col lg:w-1/2"
  >
    <h4 class="mt-6 font-bold text-[22px] lg:mb-6 lg:mt-0">
      {{ $t(`${textData}subscribed.title`) }}
    </h4>
    <p class="mt-6 lg:mt-0">
      {{ $t(`${textData}subscribed.description`) }}
    </p>
    <Button
      :pt="{
        root: 'bg-red-secondary px-2 py-2 cursor-pointer border-[1px] rounded-lg lg:mt-7',
      }"
      :label="$t(`${textData}subscribed.handleButton`)"
      class="mt-4 "
      @click="subscribeToNewsletter"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  textData: string
}>()
const emits = defineEmits(['unsubscribe'])
const subscribeToNewsletter = () => {
  emits('unsubscribe')
}
</script>
