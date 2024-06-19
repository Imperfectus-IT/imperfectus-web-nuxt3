<template>
  <Panel>
    <h4 class="font-recoleta-semibold text-center text-[25px] ">
      {{ $t(`${textData.section}title`) }}
    </h4>
    <SubscriptionItemCard
      v-for="(item, index) in subscription.subscriptionItems"
      :key="index"
      :subscription-item="item"
      :preferred-day="subscription.preferredDay"
      :next-delivery-date="subscription.nextPayment"
      :subscription-status="subscription.status"
    />
    <SubscriptionCalendar :subscription="subscription" />
  </Panel>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const props = defineProps<{
  subscription: Subscription
}>()

const textData = {
  section: 'subscriptions.subscription.details.',
}

const getBackgroundColor = (index: number) => {
  console.log(t(`${textData.section}date_picker.item_${index}.color`))
  return t(`${textData.section}date_picker.item_${index}.color`)
}

const getSpanText = (index: number) => {
  return t(`${textData.section}date_picker.item_${index}.title`)
}
</script>
