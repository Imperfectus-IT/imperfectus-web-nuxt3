<template>
  <div v-if="!subscription">
    <CardSkeleton />
  </div>
  <div
    v-else
    class="lg:w-3/4"
  >
    <MobileHeader v-if="isMobile" />
    <DesktopHeader v-if="!isMobile" />
    <Panel
      v-for="(nextPaymentDate, index) in nextDeliveries"
      :key="index"
      class="mt-2 lg:mt-6"
    >
      <div class="flex flex-col lg:flex-row lg:justify-between">
        <div class="flex flex-col">
          <p class="text-[14px] mb-3">
            Próxima entrega: {{ getNextDeliveryDateFromNextPayment(nextPaymentDate) }}
          </p>
          <SubscriptionItemCard
            v-for="(subscriptionItem, cardIndex) in subscription.subscriptionItems"
            :key="cardIndex"
            :subscription-item="subscriptionItem"
            :subscription-status="subscription.status"
            :frequency="subscription.frequency"
            :display-amount="true"
          />
        </div>
        <div
          v-if="!isSkipped(nextPaymentDate) && !isDonated(nextPaymentDate)"
          class="flex flex-col gap-2 mt-3"
        >
          <Button
            :disabled="
              displayDonateToONG[index] || displayCancelDelivery[index]
            "
            outlined
            label="Regalar a un amigx"
            :pt="{
              root: 'focus:bg-green-quaternary border-[1px] rounded-lg h-12 lg:w-48 disabled:opacity-50',
            }"
            @click="setDisplayGiftToFriend(index, true)"
          />
          <Button
            :disabled="displayGiftToFriend[index] || displayCancelDelivery[index]"
            outlined
            :pt="{
              root: 'focus:bg-green-quaternary border-[1px] rounded-lg h-12 lg:w-48 disabled:opacity-50',
            }"
            label="Donar a ONG"
            @click="setDisplayDonateToONG(index, true)"
          />
          <Button
            :disabled="displayGiftToFriend[index] || displayDonateToONG[index]"
            outlined
            :pt="{
              root: 'focus:bg-green-quaternary border-[1px] rounded-lg h-12 lg:w-48 disabled:opacity-50',
            }"
            label="Cancelar entrega"
            @click="setDisplayCancelDelivery(index, true)"
          />
        </div>
        <div
          v-else-if="isDonated(nextPaymentDate)"
          class="lg:my-auto text-[16px] mt-4"
        >
          <div class="flex flex-row lg:relative">
            <span
              class="mdi mdi-check border-[2px] border-green-secondary text-green-secondary rounded-full w-[24px] h-[24px] text-center lg:absolute lg:-left-8"
            />
            <p class="text-end ml-2 lg:ml-0">
              Pedido donado
            </p>
          </div>
          <p
            class="underline mt-2 lg:text-right lg:mt-5 cursor-pointer"
            @click="handleCancelDonationToONG(nextPaymentDate)"
          >
            Cancelar donación
          </p>
        </div>
        <div
          v-else
          class="lg:my-auto text-[16px] mt-4"
        >
          <div class="flex flex-row lg:relative">
            <span
              class="mdi mdi-close border-[2px] border-red-primary text-red-primary rounded-full w-[24px] h-[24px] text-center lg:absolute lg:-left-8"
            />
            <p class="text-end ml-2 lg:ml-0">
              Pedido cancelado
            </p>
          </div>
          <p
            class="underline mt-2 lg:text-right lg:mt-5 cursor-pointer"
            @click="handleRemoveSkip(nextPaymentDate, index)"
          >
            Editar pedido
          </p>
        </div>
      </div>
      <GiftToFriend
        v-if="displayGiftToFriend[index]"
        @close-form="setDisplayGiftToFriend(index, false)"
        @gift-to-friend="(giveToFriendData: GiveToFriendForm) => handleGiveToFriend(giveToFriendData, index, nextPaymentDate)"
      />
      <DonateONG
        v-if="displayDonateToONG[index]"
        :subscription-id="subscription.id"
        @close-form="setDisplayDonateToONG(index, false)"
        @donate-to-ong="(ong: ONG) => handleDonateOrderToONG(subscription.id, ong, index, nextPaymentDate)"
      />
      <SkipAnOrder
        v-if="displayCancelDelivery[index]"
        @close-form="setDisplayCancelDelivery(index, false)"
        @skip-order="handleSkipOrder(nextPaymentDate, index)"
      />
    </Panel>
    <Toast />
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'
import type { ONG } from '~/components/admin/upcoming_orders/DonateONG.vue'
import { DayMapping } from '~/components/admin/my-subscriptions/DayMapping.ts'
import type { Subscription, SubscriptionShipping } from '~/composables/admin/subscriptions/domain/SubscriptionTypes.ts'
import type { GiveToFriendForm } from '~/components/admin/upcoming_orders/types/FormTypes.ts'
import type { DonationPayload } from '~/composables/admin/subscriptions/infrastructure/DonationPayload.ts'

const { t } = useI18n()

definePageMeta({
  layout: 'admin',
  middleware: ['auth'],
})

useHead({
  title: t('pages.admin.upcoming.title'),
})

defineI18nRoute({
  paths: {
    es: '/mi-cuenta/suscripciones/proximas-entregas/[id]',
    ca: '/el-meu-compte/subscripcions/properes-entregues/[id]',
  },
})
const route = useRoute()
const { isMobile } = useScreenSize()
const { subscriptions } = useGetSubscriptionsHandler()
const subscription = ref<Subscription>({} as Subscription)
const nextDeliveries = ref<string[]>([])
const skips = ref<string[]>([])
const donations = ref<string[]>([])
const displayGiftToFriend = ref<Record<string, boolean>>({})
const displayDonateToONG = ref<Record<string, boolean>>({})
const displayCancelDelivery = ref<Record<string, boolean>>({})
const textData = {
  donate: 'upcoming_orders.donate_to_ong.',
  skipOrder: 'upcoming_orders.skip_order.',
  giveToFriend: 'upcoming_orders.gift_to_friend.',
}
const getNextDeliveryDateFromNextPayment = (date: string) => {
  const daysToAdd = DayMapping[subscription.value.preferredDay]
  return dayjs(date).add(daysToAdd, 'day').format('DD-MM-YYYY')
}

const { donateToONG, cancelDonation, removeSkip, skipAnOrder, giveOrderToFriend } = useUpdateSubscriptionHandler()
const { getNextDatesFromFrequency } = useGetNextDatesFromFrequency()
const isSkipped = (date: string) => skips.value.includes(date)
const isDonated = (date: string) => donations.value?.includes(date)

const handleSkipOrder = async (paymentDate: string, index: number) => {
  skips.value.push(paymentDate)
  await skipAnOrder(subscription.value.id, skips.value, textData.skipOrder, t)
  setDisplayCancelDelivery(index, false)
}
const handleRemoveSkip = async (paymentDate: string, index: number) => {
  skips.value = skips.value.filter(skip => skip !== paymentDate)
  await removeSkip(subscription.value.id, skips.value, textData.skipOrder, t)
  setDisplayCancelDelivery(index, false)
}
// @TODO Refactor this method
const handleDonateOrderToONG = (subscriptionId: number, ong: ONG, index: number, nextPaymentDate: string) => {
  const purpose = 'donation'
  donateToONG({
    subscriptionId,
    givenTo: ong.name,
    purpose,
    newSubscriptionMeta: {
      shipping_address1: ong.address1,
      shipping_address2: ong.address2,
      shipping_city: ong.city,
      shipping_state: ong.state,
      shipping_country: ong.country,
      shipping_postcode: ong.postcode,
      shipping_phone: ong.phone,
      shipping_email: ong.email,
      shipping_firstname: ong.firstname,
      shipping_lastname: ong.lastname,
    },
    deliveryDate: calculateNextDeliveryDate(nextPaymentDate),
    paymentDate: nextPaymentDate,
  }, textData.donate, t)
  setDisplayDonateToONG(index, false)
}
const handleCancelDonationToONG = async (paymentDate: string) => {
  await cancelDonation(subscription.value.id, paymentDate, textData.donate, t)
}

const handleGiveToFriend = async (formData: SubscriptionShipping, index: number, nextPaymentDate: string) => {
  const giveToFriendData: DonationPayload = {
    purpose: 'gift',
    subscriptionId: subscription.value.id,
    deliveryDate: calculateNextDeliveryDate(nextPaymentDate),
    givenTo: formData.shippingFirstName + ' ' + formData.shippingLastName,
    date: nextPaymentDate,
    newSubscriptionMeta: formData,
  }
  await giveOrderToFriend(giveToFriendData, textData.giveToFriend, t)
  setDisplayGiftToFriend(index, false)
}

const setDisplayGiftToFriend = (index: number, value: boolean) => displayGiftToFriend.value[index] = value
const setDisplayDonateToONG = (index: number, value: boolean) => displayDonateToONG.value[index] = value
const setDisplayCancelDelivery = (index: number, value: boolean) => displayCancelDelivery.value[index] = value

watchEffect(() => {
  subscription.value = subscriptions.value.filter(
    (subscription: Subscription) =>
      subscription.id === parseInt(route.params.id as string),
  )[0]
  subscription.value ? skips.value = subscription.value?.skip : []
  subscription.value ? donations.value = subscription.value?.donations : []
  subscription.value
    ? (nextDeliveries.value = getNextDatesFromFrequency(
        subscription.value?.frequency,
        subscription.value?.nextPayment,
      ))
    : ''
})
const calculateNextDeliveryDate = (date: string) => {
  const dayNumber: number = DayMapping[subscription.value.preferredDay]
  const formattedDate = dayjs(date).format('YYYY-MM-DD')
  return dayjs(formattedDate).day(dayNumber).format('DD/MM/YYYY')
}
</script>
