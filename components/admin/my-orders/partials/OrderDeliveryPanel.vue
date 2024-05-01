<template>
  <Panel :header="props.header ? props.header : $t(props.labelKey + '.header')">

      <div v-for="(key, index) in Object.keys(props.data)" :key="index" class="text-[14px] flex flex-col">
        <p class="mt-5">{{ $t(`${props.labelKey}.item_${index}`) }}</p>
        <p class="font-bold mt-1">{{ getBillingValue(key) }}</p>
      </div>

  </Panel>
</template>

<script setup lang="ts">

const props = defineProps<{
  data: OrderDelivery,
  header?: string,
  labelKey: string,
}>();

const getBillingValue = (key: string) => {
  return props.data[key as keyof OrderDelivery];
}
</script>