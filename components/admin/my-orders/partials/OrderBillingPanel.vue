<template>
  <Panel
    :header="props.header ? props.header : $t(props.labelKey + '.header')"
  >
    <div class="flex flex-col !justify-center !h-full my-auto text-[14px]">
      <div class="mt-5">
        <p>{{ $t(`${props.labelKey}.item_0`) }}</p>
        <p class="font-bold mt-1">
          {{ data.state ? $t(`${props.labelKey}.order_paid`) : $t(`${props.labelKey}.order_not_paid`) }}
        </p>
      </div>
      <div class="mt-5">
        <p>{{ $t(`${props.labelKey}.item_1`) }}</p>
        <p class="font-bold mt-1">
          {{ data.amount }}€
        </p>
      </div>
      <div
        v-if="data.coupon"
        class="mt-5"
      >
        <p>{{ $t(`${props.labelKey}.item_2`) }}</p>
        <p class="font-bold mt-1">
          {{ data.coupon.coupon }} ({{ data.coupon.discountValue }}%)
        </p>
        <div class="mt-5">
          <p>{{ $t(`${props.labelKey}.item_3`) }}</p>
          <p class="font-bold mt-1">
            {{ data.saved }}€
          </p>
        </div>
      </div>
      <div class="mt-5">
        <p>{{ $t(`${props.labelKey}.item_4`) }}</p>
        <p class="font-bold mt-1">
          {{ data.shippingCosts ? data.shippingCosts + '€' : $t(`${props.labelKey}.free_shipping`) }}
        </p>
      </div>
      <Divider />
      <div class="mt-2">
        <p>{{ $t(`${props.labelKey}.item_5`) }}</p>
        <p class="font-bold mt-1">
          {{ data.total }}€
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
