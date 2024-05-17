<template>
  <div class="flex flex-col gap-1 ">
      <label :for="id" :class="labelClass">{{ labelText }}</label>
      <InputText
        :id="id"
        v-model="inputValue"
        :class="['rounded-md', inputClass]"
        @input="emitUpdateValue"
      />
    </div>
</template>

<script setup lang="ts">

const props = defineProps<{
  id: string,
  labelText: string,
  inputClass: string,
  labelClass: string
}>();

const emit = defineEmits(['update-value']);

const emitUpdateValue = () => {
  emit('update-value', { payload: inputValue.value, id: props.id })
}

const inputValue = ref<string>('');
</script>