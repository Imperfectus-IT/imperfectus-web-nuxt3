<template>
  <Panel
    :header="props.header ? props.header : $t(props.labelKey + '.header')"
    toggleable
    collapsed
  >
    <div
      v-for="(key, index) in Object.keys(props.data)"
      :key="index"
      class="text-[14px] flex flex-col"
    >
      <p class="mt-5">
        {{ $t(`${props.labelKey}.item_${index}`) }}
      </p>
      <p class="font-bold mt-1">
        {{ getShippingValue(key) }}
      </p>
    </div>

    <Button
      class="h-7 mt-6 mb-2"
      outlined
      :label="$t(props.labelKey + '.button_label')"
      @click="displayShippingInfoForm"
    />
  </Panel>
</template>

<script setup lang="ts">
const props = defineProps<{
  data: OrderShipping
  header?: string
  labelKey: string
}>()

const emit = defineEmits(['editShippingInfo'])

const displayShippingInfoForm = () => {
  emit('editShippingInfo')
}

const getShippingValue = (key: string) => {
  return props.data[key as keyof OrderShipping]
}
</script>
