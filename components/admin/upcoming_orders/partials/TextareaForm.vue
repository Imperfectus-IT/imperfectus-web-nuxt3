<template>
  <div class="mt-5">
    <label
      :for="name"
      :class="labelClass"
    >{{ labelText }}</label>
    <Textarea
      :id="name"
      v-model="comments"
      :pt="{
        root: 'bg-transparent border-[1px] p-2 rounded-lg w-full',
      }"
      :rows="rows"
      :class="textareaClass"
      @input="emitUpdateValue"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  name: string
  labelText: string
  textareaClass: string
  labelClass: string
  rows: number
}>()

const emit = defineEmits(['update-value'])

const emitUpdateValue = () => {
  emit('update-value', { data: comments.value, name: props.name })
}

const comments = ref<string>('')
</script>
