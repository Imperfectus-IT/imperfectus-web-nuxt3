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
    <InputText
      v-model="email"
      class="rounded-none border-0 border-b border-green-tertirary"
      type="text"
      :placeholder="$t(`${textData}inputPlaceholder`)"
    />
    <Button
      label="Enviar"
      class="mt-4 lg:w-1/4"
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
