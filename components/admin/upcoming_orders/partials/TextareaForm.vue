<template>
  <label :for="id" :class="labelClass">{{ labelText }}</label>
  <Textarea :rows="rows" @input="emitUpdateValue" class="mt-5" :id="id" :class="textareaClass" />
</template>

<script setup lang="ts">

const props = defineProps<{
  id: string,
  labelText: string,
  textareaClass: string,
  labelClass: string,
  rows: number
}>();

const emit = defineEmits(['update-value']);

const emitUpdateValue = () => {
  emit('update-value', { payload: inputValue.value, id: props.id })
}

const inputValue = ref<string>('');
</script>
