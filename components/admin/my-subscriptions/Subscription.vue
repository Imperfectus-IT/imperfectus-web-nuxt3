<template>
  <Panel class="my-5 flex flex-col lg:p-2 lg:relative">
    <div
      class="flex flex-row gap-1 justify-start lg:order-2 lg:justify-start lg:gap-4 lg:mt-6 relative lg:items-center"
    >
      <Button
        :label="status"
        :pt="{
          root: ` bg-${backgroundColor()} py-1.5 px-4 rounded-lg text-[12px] lg:px-8 cursor-default`,
          label: '',
        }"
      />
      <Button
        outlined
        :label="'ID ' + subscription.id"
        :pt="{
          label: 'text-[12px]',
          root: 'px-4 py-1.5 bg-grey-quaternary bg-opacity-50 rounded-lg lg:px-8 cursor-default',
        }"
      />
      <Button
        outlined
        :label="frequency"
        :pt="{
          label: 'text-[12px]',
          root: 'px-4 py-1.5 bg-grey-quaternary bg-opacity-50 rounded-lg lg:px-8 cursor-default',
        }"
      />
      <p
        v-if="subscription.status === 'cancelled'"
        class="mt-5 lg:order-3 text-[14px] hidden lg:block lg:mt-0 lg:relative left-[35%] "
      >
        Fecha de cancelación: {{ cancelDate }}
      </p>
    </div>

    <SubscriptionItemCard
      v-for="(subscriptionItem, index) in subscription.subscriptionItems"
      :key="index"
      :next-delivery-date="subscription.nextPayment"
      :subscription-item="subscriptionItem"
      :preferred-day="subscription.preferredDay"
      :subscription-status="subscription.status"
      class="mt-8 lg:mt-2 lg:order-1"
    />

    <div class="flex justify-end ">
      <NuxtLink class="lg:absolute lg:top-5" :to="`/mi-cuenta/suscripciones/${subscription.id}`">
        <Button
        v-if="subscription.status === 'active'"
        class="text-right mt-4 lg:mt-0 "
        outlined
        :label="'Editar'"
        :pt="{
          root: 'border-[1px] border-[green-tertiary] px-4  py-2 rounded-lg text-[14px]',
          label: '',
        }"
        />
      </NuxtLink>
      
    </div>
    <Divider v-if="subscription.status !== 'cancelled'" class="lg:order-3" />

    <div
      v-if="subscription.status === 'active'"
      class="-mt-2 text-[14px] lg:order-4 flex flex-col lg:flex-row lg:justify-between lg:items-center"
    >
      <div class="flex flex-col lg:w-1/2 lg:py-4">
        <p class="leading-4">
          ¿Quieres gestionar las entregas de esta suscripción?
        </p>
        <p class="leading-4 mt-2">
          En esta sección puedes <span class="font-bold">cancelar</span>,<span
            class="font-bold"
            >donar</span
          >
          o <span class="font-bold">regalar</span> cualquiera de tus próximos
          pedidos
        </p>
      </div>
      <NuxtLink
        :to="`/mi-cuenta/suscripciones/proximas-entregas/${subscription.id}`"
      >
        <Button
          primary
          :label="'Gestionar próximas entregas'"
          :pt="{
            root: 'bg-green-primary mt-4 border-[1px] border-green-tertiary px-3 py-2 rounded-lg h-10 lg:m-0',
            label: 'text-[14px]',
          }"
        />
      </NuxtLink>
    </div>

    <div
      v-if="subscription.status === 'paused'"
      class="-mt-2 text-[14px] lg:order-4 flex flex-col lg:flex-row lg:justify-between lg:items-center"
    >
      <div class="flex flex-col lg:w-1/2 lg:py-4">
        <p class="leading-4">
          Tu suscripción está pausada. Si quieres recibir la caja antes de la
          fecha elegida cuando la pausaste, reactiva la suscripción.
        </p>
        <p class="leading-4 mt-2 font-bold">
          Fecha de reactivación programada:
          <span class="font-light hidden lg:inline-block">{{
            dayjs(props.subscription.nextPayment).format("DD-MM-YYYY")
          }}</span>
        </p>
        <p class="lg:hidden">
          {{ dayjs(props.subscription.nextPayment).format("DD-MM-YYYY") }}
        </p>
      </div>
      <Button
        primary
        :label="'Reactivar suscripción'"
        :pt="{
          root: 'bg-green-primary mt-4 border-[1px] border-green-tertiary px-3 py-2 rounded-lg lg:mt-0',
          label: 'text-[14px]',
        }"
      />
    </div>
    <p
      v-if="subscription.status === 'cancelled'"
      class="mt-5 lg:order-3 text-[14px] lg:hidden"
    >
      Fecha de cancelación: {{ cancelDate }}
    </p>
  </Panel>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import type { SubscriptionStatus } from "./types/SubscriptionStatus";

const props = defineProps<{
  subscription: Subscription;
}>();

const frequency = computed(() =>
  props.subscription.frequency === "weekly" ? "Semanal" : "Quincenal"
);
const status = computed(
  () =>
    subscriptionStatuses[props.subscription.status as keyof SubscriptionStatus]
);
const backgroundColor = () =>
  props.subscription.status === "active"
    ? "green-quaternary"
    : props.subscription.status === "paused"
    ? "orange-primary"
    : "red-secondary";

const subscriptionStatuses: SubscriptionStatus = {
  active: "Activa",
  paused: "Pausada",
  cancelled: "Cancelada",
  failed: "Failed",
  waiting: "Esperando...",
};

const cancelDate = computed(() =>
  dayjs(props.subscription.cancelledAt).format("DD/MM/YYYY")
);
</script>
