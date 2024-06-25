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
        <p class="font-bold mt-1">
          {{ getBillingValue(key) }}
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

const { isDesktop } = useScreenSize()

const getBillingValue = (key: string) => {
  return props.data[key as keyof Billing]
}
</script>
