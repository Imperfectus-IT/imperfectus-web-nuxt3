<template>
  <Panel>
    <h4 class="text-[26px] font-recoleta-medium text-center whitespace-normal ">
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
    <NuxtLink
      class="mt-10"
      :to="localePath({ name: 'admin-subscriptions-upcoming_orders-id' })"
    >
      <Button
        class="w-full"
        :label="$t(`${textData.section}date_picker.button`)"
      />
    </NuxtLink>
    <div class="text-[16px]">
      <Divider />
      <p
        v-for="(item, index) in textData.nextPaymentItems"
        :key="index"
        class="mt-3"
      >
        {{ $t(`${textData.section}nextPayment.item_${index}`, item.params) }}
      </p>
      <Divider />
      <p
        v-for="(item, index) in textData.nextDeliveryItems"
        :key="index"
        :class="index === 0 ? 'font-bold font-recoleta-regular text-[20px]' : ''"
        class="mt-3"
      >
        {{ $t(`${textData.section}nextDelivery.item_${index}`, item.params) }}
      </p>
      <Divider />
      <p
        v-for="(item, index) in textData.billingInfoItems"
        :key="index"
        class="mt-3"
      >
        {{ $t(`${textData.section}billingInfo.item_${index}`, item.params) }}
      </p>
    </div>
  </Panel>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const localePath = useLocalePath()
const { t } = useI18n()
const props = defineProps<{
  subscription: Subscription
}>()
const subscriptionTotal = ref<SubscriptionTotal>({
  shipping: 0,
  total: 0,
  subtotal: 0,
})

const { handleGetSubscriptionTotal } = useGetSubscriptionTotalHandler()

export type SubscriptionTotal = {
  shipping: number
  total: number
  subtotal: number
}

onMounted(async () => {
  await fetchCosts()
})

const fetchCosts = async () => {
  subscriptionTotal.value = await handleGetSubscriptionTotal(props.subscription)
}

const frequency = computed(() =>
  props.subscription.frequency === 'weekly' ? 'Semanal' : 'Quincenal',
)

const textData = computed(() => ({
  section: 'subscriptions.subscription.details.',
  nextPaymentItems: [
    { params: { date: props.subscription.nextPayment } },
    { params: { frequency: frequency.value } },
  ],
  nextDeliveryItems: [
    { params: {} },
    { params: { day: t(`string.day.${props.subscription.preferredDay}`) } },
    { params: { hour: t(`string.hour.${props.subscription.preferredHour}`) } },
  ],
  billingInfoItems: [
    { params: { quantity: props.subscription.subscriptionItems.length } },
    { params: { shipping: subscriptionTotal.value.shipping == 0.00 ? t('adminOrderPayment.free') : subscriptionTotal.value.shipping } },
    { params: { subtotal: subscriptionTotal.value.subtotal } },
    { params: { total: subscriptionTotal.value.total } },
  ],
}))
</script>
