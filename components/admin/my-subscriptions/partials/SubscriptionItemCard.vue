<template>
  <div class="flex flex-row gap-4 mt-2">
    <NuxtImg
      loading="lazy"
      format="webp"
      :src="orderItem.image"
      width="140"
      height="100"
      alt="next-order"
      class="rounded-lg h-[100px] my-auto !w-[140px]"
    />
    <div class="text-[14px] w-1/2 flex flex-col justify-center">
      <h4 class="font-semibold mb-2 ">
        {{ getBoxSize(orderItem.sku) + ' - ' + getBoxType(orderItem.sku) }}
      </h4>
      <ul
        v-if="subscriptionStatus === 'active'"
        class="ml-[3px]"
      >
        <ListItem
          main-class="flex gap-x-2 mb-1 font-bold"
          dot-class="text-[8px] -mt-[1px] text-green-tertiary"
          :text="
            $t('profile.my_account.next_order.exclusions')
              + ' '
              + orderItem.exclusions.length
          "
        />
        <ListItem
          main-class="flex gap-x-2 mb-1 whitespace-nowrap"
          dot-class="text-[8px] -mt-[1px] text-green-tertiary"
          :text="'Entrega: ' + $t(`string.day.${preferredDay}`)"
        />
        <ListItem
          main-class="flex gap-x-2 mb-1"
          dot-class="text-[8px] -mt-[1px] text-green-tertiary"
          :text="'Próxima entrega: ' + calculateNextDeliveryDate"
        />
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import type { DayMapping } from '../types/DayMapping'

const props = defineProps<{
  orderItem: OrderItem
  preferredDay: keyof DayMapping
  nextPayment: string
  subscriptionStatus: string
}>()

const getBoxSize = (sku: string) => {
  return sku.includes('IM')
    ? 'Caja mediana'
    : sku.includes('XL')
      ? 'Caja grande'
      : 'Caja pequeña'
}

const dayMapping: DayMapping = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
}

const calculateNextDeliveryDate = computed(() => {
  const dayNumber: number = dayMapping[props?.preferredDay]
  return dayjs(props.nextPayment).day(dayNumber).format('DD/MM/YYYY')
})

const getBoxType = (sku: string) => {
  return sku.includes('FR')
    ? 'Fruta'
    : sku.includes('VG')
      ? 'Verdura'
      : sku.includes('Orange')
        ? 'Naranjas'
        : 'Fruta y verdura'
}
</script>
