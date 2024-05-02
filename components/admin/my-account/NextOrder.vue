<template>
  <div
    class="border-green-tertiary border-[1px] rounded-lg p-4 mt-6 font-solina-extended-book"
  >
    <h4 class="font-recoleta-regular text-[30px]">
      {{ $t("profile.my_account.next_order.title") }}
    </h4>
    <Divider />
    <OrderItemCard v-for="(item, index) in order.orderItems" :key="index" :order-item="item" />
    <NuxtLink :to="`/mi-cuenta/pedidos/${order.id}`">
      <Button
        outlined
        :label="$t('profile.my_account.next_order.open_order')"
        class="ml-3 mt-6 bg-beige-primary lg:mt-0 lg:h-10 mr-4"
      />
    </NuxtLink>
  </div>
</template>
<script setup lang="ts">

defineProps<{
  order: Order;
}>();

</script>
