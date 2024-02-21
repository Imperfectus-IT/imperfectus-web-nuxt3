<template>
  <div class="font-recoleta text-[26px] mt-16 mb-6 ml-4">
    <ul class="flex">
      <div class="flex items-center mr-8">
        <div 
          v-if="itemsType === 'fruits'"
          class="w-3 h-3 bg-green-primary rounded-xl mr-2"
        />
        <li
          class="font-recoleta-regular cursor-pointer"
          :class="itemsType === 'fruits' ? '' : 'text-grey-primary'"
          @click="handleItemToggle('fruits')"
        >
          {{ $t('homeProducts.fruits') }}
        </li>
      </div>
      <div class="flex items-center">
        <div
          v-if="itemsType === 'vegetables'"
          class="w-3 h-3 bg-green-primary rounded-xl mr-2"
        />
        <li
          class="font-recoleta-regular cursor-pointer"
          :class="itemsType === 'vegetables' ? '' : 'text-grey-primary'"
          @click="handleItemToggle('vegetables')"
        >
          {{ $t('homeProducts.vegetables') }}
        </li>
      </div>
    </ul>
  </div>
</template>

<script setup lang="ts">
const itemsType = ref<item>('fruits');

const emit = defineEmits(['toggle'])

const handleItemToggle = (type: item) => {
  itemsType.value = type;
  emit('toggle', type);
}
    
type item = ('fruits' | 'vegetables')
</script>
