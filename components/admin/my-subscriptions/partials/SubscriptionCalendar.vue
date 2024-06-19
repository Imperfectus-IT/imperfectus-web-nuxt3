<template>
  <Calendar
    v-model="today"
    inline
  >
    <template #date="slotProps">
      <div
        v-if="isCancelledDate(slotProps.date) "
        class="bg-orange-primary h-8 w-8 text-center rounded-md flex items-center justify-center"
      >
        {{ slotProps.date.day }}
      </div>
      <div
        v-else-if="isSkippedDate(slotProps.date) "
        class="bg-transparent h-8 w-8 rounded-md flex items-center justify-center"
      >
        {{ slotProps.date.day }}
      </div>
      <div
        v-else-if="isPaymentDate(slotProps.date) "
        class="bg-yellow-secondary h-8 w-8 text-center rounded-md flex items-center justify-center"
      >
        {{ slotProps.date.day }}
      </div>
      <div
        v-else-if="isNextDeliveryDate(slotProps.date) "
        class="bg-green-primary h-8 w-8 text-center rounded-md my-auto flex items-center justify-center"
      >
        {{ slotProps.date.day }}
      </div>

      <template v-else>
        {{ slotProps.date.day }}
      </template>
    </template>
  </Calendar>
  <div
    v-for="(item, index) in textData.items"
    :key="item"
    class="flex flex-row items-center mt-4 "
  >
    <div
      :class="`h-5 w-5 bg-${getBackgroundColor(index)} rounded-sm ${index === 0 ? 'border-[1px] border-green-tertiary' : ''}`"
    />
    <span class="ml-3 text-[16px]">{{ getSpanText(index) }}</span>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'
import { DayMapping } from '~/components/admin/my-subscriptions/DayMapping.ts'
import type { CalendarDate } from '~/components/admin/my-subscriptions/types/CalendarDate.ts'
import { useGetNextDatesFromFrequency } from '~/composables/admin/subscriptions/useGetNextDatesFromFrequency.ts'
import { useDateBuilder } from '~/composables/admin/subscriptions/useDateBuilder.ts'
import type { Subscription } from '~/composables/admin/subscriptions/types/SubscriptionTypes.ts'

const { t } = useI18n()
const { getNextDatesFromFrequency } = useGetNextDatesFromFrequency()
const { dateBuilder } = useDateBuilder()
const props = defineProps<{
  subscription: Subscription
}>()

const textData = {
  section: 'subscriptions.subscription.details.date_picker.',
  items: 4,
}

const today = dayjs().toDate()
const nextPaymentDates = computed(() => {
  return getNextDatesFromFrequency(props.subscription.frequency, props.subscription.nextPayment)
})

const nextDeliveryDates = computed(() => {
  const daysToAdd = DayMapping[props.subscription.preferredDay]
  return nextPaymentDates.value.map((date) => {
    return dayjs(date).add(daysToAdd, 'd').format('YYYY-MM-DD')
  })
})

const cancelledDates = computed(() => {
  const daysToAdd = DayMapping[props.subscription.preferredDay]
  const dates = props.subscription.skip.map((date) => {
    return dayjs(date).add(daysToAdd, 'd').format('YYYY-MM-DD')
  })
  console.log('DATES', dates)
  return dates
})

const isSkippedDate = (date: CalendarDate) => {
  const formattedDate = dateBuilder(date)
  return props.subscription.skip.includes(formattedDate)
}

const isPaymentDate = (date: CalendarDate) => {
  return nextPaymentDates.value.includes(dateBuilder(date))
}

const isNextDeliveryDate = (date: CalendarDate) => {
  return nextDeliveryDates.value.includes(dateBuilder(date)) && !props.subscription.skip.includes(dateBuilder(date))
}

const isCancelledDate = (date: CalendarDate) => {
  return cancelledDates.value.includes(dateBuilder(date))
}

const getBackgroundColor = (index: number) => {
  console.log(t(`${textData.section}item_${index}.color`))
  return t(`${textData.section}item_${index}.color`)
}

const getSpanText = (index: number) => {
  return t(`${textData.section}item_${index}.title`)
}
</script>
