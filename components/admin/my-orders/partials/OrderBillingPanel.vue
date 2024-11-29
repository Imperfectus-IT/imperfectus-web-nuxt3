<template>
  <Panel
    :header="props.header ? props.header : $t(props.labelKey + '.header')"
  >
    <div class="flex flex-col !justify-center !h-full">
      <div
        v-for="(key, index) in Object.keys(props.data)"
        :key="index"
        class="text-[14px] my-auto"
      >
        <Divider v-if="index === Object.keys(props.data).length -1" />
        <p class="mt-5">
          {{ $t(`${props.labelKey}.item_${index}`) }}
        </p>
        <p
          v-if="key === 'state'"
          class="font-bold mt-1"
        >
          {{ getBillingValue(key) ? $t('pages.order.status.payed') : $t('pages.order.status.notPayed') }}
        </p>
        <p
          v-else
          class="font-bold mt-1"
        >
          {{ getBillingValue(key) }} {{ key !== 'state' ? '€' : '' }}
        </p>
      </div>
    </div>
  </Panel>
</template>

<script setup lang="ts">
const props = defineProps<{
  data: Billing
  header?: string
  labelKey: string
}>()

const getBillingValue = (key: string) => {
  return props.data[key as keyof Billing]
}
</script>
