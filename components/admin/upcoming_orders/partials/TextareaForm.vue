<template>
  <div>
    <label
      :for="id"
      :class="labelClass"
    >{{ labelText }}</label>
    <Textarea
      :id="id"
      :rows="rows"
      class="mt-5"
      :class="textareaClass"
      @input="emitUpdateValue"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  id: string
  labelText: string
  textareaClass: string
  labelClass: string
  rows: number
}>()

const emit = defineEmits(['update-value'])

const emitUpdateValue = () => {
  emit('update-value', { payload: inputValue.value, id: props.id })
}

const inputValue = ref<string>('')
</script>
