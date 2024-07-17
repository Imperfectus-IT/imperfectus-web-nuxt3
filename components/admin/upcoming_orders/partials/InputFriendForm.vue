<template>
  <div class="flex flex-col gap-1 ">
    <label
      :for="name"
      :class="labelClass"
    >{{ labelText }}</label>
    <InputText
      :id="name"
      v-model="inputValue"
      :class="['rounded-md', inputClass]"
      @input="emitUpdateValue"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  name: string
  labelText: string
  inputClass: string
  labelClass: string
}>()

const emit = defineEmits(['update-value'])
const inputValue = ref<string>('')
const emitUpdateValue = () => {
  emit('update-value', { data: inputValue.value, name: props.name })
}
</script>
