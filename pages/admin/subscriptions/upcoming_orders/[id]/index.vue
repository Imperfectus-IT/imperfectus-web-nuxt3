<template>
  <div v-if="!subscription">cargando...</div>
  <div v-else class="lg:w-3/4">
    {{ subscription }}
    <MobileHeader v-if="isMobile" />
    <DesktopHeader v-if="!isMobile" />
    <Panel
      v-for="(nextPaymentDate, index) in nextDeliveries"
      class="mt-2 lg:mt-6"
    >
      <div class="flex flex-col lg:flex-row lg:justify-between">
        <div class="flex flex-col">
          <SubscriptionItemCard
            v-for="subscriptionItem in subscription.subscriptionItems"
            :subscription-item="subscriptionItem"
            :preferred-day="subscription.preferredDay"
            :subscription-status="subscription.status"
            :next-delivery-date="calculateNextDeliveryDate(nextPaymentDate)"
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
            :disabled="
              displayGiftToFriend[index] || displayCancelDelivery[index]
            "
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
        <div v-else-if="isDonated(nextPaymentDate)" class="lg:my-auto text-[16px] mt-4">
          <div class="flex flex-row lg:relative">
            <span
              class="mdi mdi-check border-[2px] border-green-secondary text-green-secondary rounded-full w-[24px] h-[24px] text-center lg:absolute lg:-left-8"
            ></span>
            <p class="text-end ml-2 lg:ml-0">Pedido donado</p>
          </div>
          <p
            @click="cancelDonation(nextPaymentDate)"
            class="underline mt-2 lg:text-right lg:mt-5 cursor-pointer"
          >
            Cancelar donación
          </p>
        </div>
        <div v-else class="lg:my-auto text-[16px] mt-4">
          <div class="flex flex-row lg:relative">
            <span
              class="mdi mdi-close border-[2px] border-red-primary text-red-primary rounded-full w-[24px] h-[24px] text-center lg:absolute lg:-left-8"
            ></span>
            <p class="text-end ml-2 lg:ml-0">Pedido cancelado</p>
          </div>
          <p
            @click="removeSkip(nextPaymentDate)"
            class="underline mt-2 lg:text-right lg:mt-5 cursor-pointer"
          >
            Editar pedido
          </p>
        </div>
      </div>
      <GiftToFriend
        v-if="displayGiftToFriend[index]"
        @close-form="setDisplayGiftToFriend(index, false)"
        @gift-to-friend="((payload: FormData) => giftToFriend(payload, index))"
      />
      <DonateONG
        :subscription-id="subscription.id"
        v-if="displayDonateToONG[index]"
        @close-form="setDisplayDonateToONG(index, false)"
        @donate-to-ong="(ong: ONG) => donateOrder(subscription.id, ong, index, nextPaymentDate)"
      />
      <SkipAnOrder
        v-if="displayCancelDelivery[index]"
        @close-form="setDisplayCancelDelivery(index, false)"
        @skip-order="skipOrder(subscription.id, nextPaymentDate, index)"
      />
    </Panel>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import type { DayMapping } from "~/components/admin/my-subscriptions/types/DayMapping";
import type { ONG } from "~/components/admin/upcoming_orders/DonateONG.vue";

definePageMeta({
  layout: "admin",
  middleware: ["auth"],
});

defineI18nRoute({
  paths: {
    es: "/mi-cuenta/suscripciones/proximas-entregas/[id]",
    ca: "/el-meu-compte/subscripcions/properes-entregues/[id]",
  },
});

const route = useRoute();
const { isMobile } = useScreenSize();
const { subscriptions } = useGetSubscriptionsHandler();
const subscription = ref<Subscription>({} as Subscription);
const nextDeliveries = ref<string[]>([]);
const skips = ref<string[]>([]);
const donations = ref<string[]>([]);
const displayGiftToFriend = ref<Record<string, boolean>>({});
const displayDonateToONG = ref<Record<string, boolean>>({});
const displayCancelDelivery = ref<Record<string, boolean>>({});

const isSkipped = (date: string) => {
  return skips.value.includes(date);
};

const isDonated = (date: string) => {
  return donations.value?.includes(date)
};

const skipOrder = (
  subscriptionID: number,
  paymentDate: string,
  index: number
) => {
  skips.value.push(paymentDate);

  setDisplayCancelDelivery(index, false);
};

const removeSkip = (paymentDate: string) => {
  skips.value = skips.value.filter((skip) => skip !== paymentDate);
};

const donateOrder = (
  subscriptionId: number,
  ong: ONG,
  index: number,
  nextPaymentDate: string
) => {
  const purpose = "donation";
  const { executeDonateToONG } = useUpdateSubscriptionHandler();

  executeDonateToONG({
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
  });
  setDisplayDonateToONG(index, false);
};

const cancelDonation = (paymentDate: string) => {
  console.log(paymentDate)
}

const giftToFriend = (formData: FormData, index: number) => {
  setDisplayGiftToFriend(index, false);
};

const setDisplayGiftToFriend = (index: number, value: boolean) => {
  displayGiftToFriend.value[index] = value;
};

const setDisplayDonateToONG = (index: number, value: boolean) => {
  displayDonateToONG.value[index] = value;
};

const setDisplayCancelDelivery = (index: number, value: boolean) => {
  displayCancelDelivery.value[index] = value;
};

const getNextDatesFromFrequency = (frequency: string): string[] => {
  const upperLimit = dayjs(subscription.value?.nextPayment).add(6, "months");
  let lowerLimit = dayjs(subscription.value?.nextPayment);
  const dates = [];
  if (frequency === "weekly") {
    dates.push(lowerLimit.format("YYYY-MM-DD"));
    while (lowerLimit.isBefore(upperLimit)) {
      lowerLimit = lowerLimit.add(1, "week");
      dates.push(lowerLimit.format("YYYY-MM-DD"));
    }
    dates.push(upperLimit.format("YYYY-MM-DD"));
  } else if (frequency === "biweekly") {
    dates.push(lowerLimit.format("YYYY-MM-DD"));
    while (lowerLimit.isBefore(upperLimit)) {
      lowerLimit = lowerLimit.add(2, "week");
      dates.push(lowerLimit.format("YYYY-MM-DD"));
    }
    dates.push(upperLimit.format("YYYY-MM-DD"));
  }
  return dates;
};

watchEffect(() => {
  subscription.value = subscriptions.value.filter(
    (subscription: Subscription) =>
      subscription.id === parseInt(route.params.id as string)
  )[0];
  subscription ? skips.value = subscription.value?.skip : [];
  subscription ? donations.value = subscription.value?.donations : [];
  subscription
    ? (nextDeliveries.value = getNextDatesFromFrequency(
        subscription.value?.frequency
      ))
    : "";
});

const dayMapping: DayMapping = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
};

const calculateNextDeliveryDate = (date: string) => {
  const dayNumber: number = dayMapping[subscription.value.preferredDay];
  const formattedDate = dayjs(date).format("YYYY-MM-DD");
  return dayjs(formattedDate).day(dayNumber).format("DD/MM/YYYY");
};
</script>
