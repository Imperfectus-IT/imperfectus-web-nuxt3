<template>
  <Panel class="my-5 flex flex-col lg:p-2 lg:relative lg:min-w-[900px]">
    <SubscriptionHeader
      class="mb-6"
      :subscription="subscription"
    />
    <SubscriptionItemCard
      v-for="(subscriptionItem, index) in subscription.subscriptionItems"
      :key="index"
      :subscription-item="subscriptionItem"
      :preferred-day="subscription.preferredDay"
      :subscription-status="subscription.status"
      :next-payment="subscription.nextPayment"
      class="lg:mt-2 lg:order-1"
    />

    <div class="flex justify-end ">
      <NuxtLink
        class="lg:absolute lg:top-5"
        :to="`/mi-cuenta/suscripciones/${subscription.id}`"
      >
        <Button
          v-if="subscription.status === 'active'"
          class="text-right mt-4 lg:mt-0 "
          outlined
          :label="'Editar'"
          :pt="{
            root: 'border-[1px] border-[green-tertiary] px-4  py-2 rounded-lg text-[14px]',
          }"
        />
      </NuxtLink>
    </div>
    <Divider
      v-if="subscription.status !== 'cancelled'"
      class="lg:order-3"
    />

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
          >donar</span>
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
import dayjs from 'dayjs'

const props = defineProps<{
  subscription: Subscription
}>()

const cancelDate = computed(() =>
  dayjs(props.subscription.cancelledAt).format('DD/MM/YYYY'),
)
</script>
