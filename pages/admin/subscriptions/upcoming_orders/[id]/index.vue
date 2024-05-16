<template>
  <div v-if="!subscription">cargando...</div>
  <div v-else class=" lg:w-3/4">
    <MobileHeader v-if="isMobile" />
    <DesktopHeader v-if="!isMobile" />
    <Panel v-for="nextDeliveryDate in nextDeliveries" class="mt-2 lg:mt-6">
      <div class="flex flex-col lg:flex-row lg:justify-between">
        <SubscriptionItemCard
          v-for="subscriptionItem in subscription.subscriptionItems"
          :subscription-item="subscriptionItem"
          :preferred-day="subscription.preferredDay"
          :subscription-status="subscription.status"
          :next-delivery-date="calculateNextDeliveryDate(nextDeliveryDate)"
        />
        <div class="flex flex-col gap-2 mt-3">
          <Button
            :disabled="deactivateButtons"
            outlined
            label="Regalar a un amigx"
          />
          <Button outlined label="Donar a ONG" />
          <Button outlined label="Cancelar entrega" />
        </div>
      </div>
    </Panel>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
import dayjs from "dayjs";
import type { DayMapping } from "~/components/admin/my-subscriptions/types/DayMapping";

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

const { isMobile } = useScreenSize();

const { subscriptions } = useGetSubscriptionsHandler();

const subscription = ref<Subscription>({} as Subscription);
const nextDeliveries = ref<string[]>([]);

const deactivateButtons = computed(() => {
  return dayjs(subscription.value?.nextPayment).isBefore(dayjs());
});

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
  }
  return dates;
};

watchEffect(() => {
  subscription.value = subscriptions.value.filter(
    (subscription: Subscription) =>
      subscription.id === parseInt(route.params.id as string)
  )[0];
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
