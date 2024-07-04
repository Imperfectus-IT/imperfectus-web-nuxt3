<template>
  <div class="mb-10">
    <div class="flex flex-row gap-4 mt-2">
      <NuxtImg
        loading="lazy"
        format="webp"
        :src="subscriptionItem.image"
        alt="next-order"
        class="rounded-lg h-[100px] my-auto !w-[130px] lg:w-[300px]"
      />
      <div class="text-[14px] w-1/2 flex flex-col justify-center lg:w-2/3">
        <h4 class="font-semibold mb-2">
          {{ getBoxSize(subscriptionItem.sku) }} - {{ getBoxType(subscriptionItem.sku) }}
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
                + subscriptionItem.exclusions.length
            "
          />
          <ListItem
            v-if="preferredDay"
            main-class="flex gap-x-2 mb-1 whitespace-nowrap"
            dot-class="text-[8px] -mt-[1px] text-green-tertiary"
            :text="'Entrega: ' + $t(`string.day.${preferredDay}`)"
          />
          <ListItem
            v-if="frequency"
            main-class="flex gap-x-2 mb-1 whitespace-nowrap"
            dot-class="text-[8px] -mt-[1px] text-green-tertiary"
            :text="getFrequency"
          />
          <ListItem
            v-if="displayAmount"
            main-class="flex gap-x-2 mb-1 whitespace-nowrap"
            dot-class="text-[8px] -mt-[1px] text-green-tertiary"
            :text="subscriptionItem.amount + ' €'"
          />
          <ListItem
            v-if="nextPayment"
            main-class="flex gap-x-2 mb-1 whitespace-nowrap"
            dot-class="text-[8px] -mt-[1px] text-green-tertiary"
            :text="'Proxima entrega: ' + getDeliveryDate"
          />
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import type { SubscriptionItem } from '~/composables/admin/subscriptions/types/SubscriptionTypes.ts'
import { DayMapping } from '~/components/admin/my-subscriptions/DayMapping.ts'

const props = defineProps({
  subscriptionItem: {
    type: Object as () => SubscriptionItem,
    required: true,
  },
  preferredDay: {
    type: String,
    required: false,
  },
  subscriptionStatus: {
    type: String,
    required: true,
  },
  frequency: {
    type: String,
    required: false,
  },
  nextPayment: {
    type: String,
    required: false,
  },
  displayAmount: {
    type: Boolean,
    required: false,
    default: false,
  },
})

const getBoxSize = (sku: string) => {
  return sku.includes('IM')
    ? 'Caja mediana'
    : sku.includes('XL')
      ? 'Caja grande'
      : 'Caja pequeña'
}

const getBoxType = (sku: string) => {
  return sku.includes('FR')
    ? 'Fruta'
    : sku.includes('VG')
      ? 'Verdura'
      : sku.includes('Orange')
        ? 'Naranjas'
        : 'Fruta y verdura'
}

const getFrequency = computed(() =>
  props.frequency === 'weekly' ? 'Cada semana' : 'Cada dos semanas',
)

const getDeliveryDate = computed(() => {
  const days = DayMapping[props.preferredDay as keyof typeof DayMapping]
  console.log('DAYS', days)
  return dayjs(props.nextPayment).add(1, 'days').format('DD-MM-YYYY')
})
</script>
