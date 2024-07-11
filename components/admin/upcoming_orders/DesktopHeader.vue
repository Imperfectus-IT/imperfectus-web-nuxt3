<template>
  <div class="flex flex-row items-center justify-between ">
    <h4 class="font-recoleta-regular text-[40px]">
      Próximas entregas
    </h4>
    <NuxtLink :to="localePath({ name: 'admin-subscriptions-id' })">
      <Button
        primary
        class=""
        :label="'Volver a la suscripción'"
      >
        <span class="mdi mdi-arrow-left mr-3" />Volver a la suscripción
      </Button>
    </NuxtLink>
  </div>
  <div class="flex flex-row 2xl:justify-around my-10">
    <NuxtImg
      loading="lazy"
      format="webp"
      alt="header"
      src="/images/admin/upcoming-orders/desktop-header.webp"
      class="w-[428px] h-[306px] hidden lg:block"
    />
    <div class="my-auto">
      <p class=" lg:w-[570px] border-[1px] p-5 rounded-xl">
        En esta sección puedes gestionar las entregas asociadas a tu
        suscripción. Puedes cancelar, donar o regalar cualquiera de tus próximos
        pedidos.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
</script>
