<template>
  <div>
    <h4 class="!font-bold text-[14px] mt-4">¿Quieres editar tu pedido?</h4>
    <Divider class="mt-2 !w-2/3" />
    <Button
      v-if="!displayEditOrder"
      label="Editar"
      outlined
      class="!px-5 !h-5 !text-[14px] mb-2"
    />
    <div v-if="displayEditOrder">
      <h4>Tipo de caja</h4>
      <Dropdown
        v-model="editOrderData.sku"
        :options="boxes"
        option-label="name"
        option-value="code"
        placeholder="Selecciona un tipo de caja"
        class="w-72"
      />
      {{ editOrderData }}
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  // order: Order;
  exclusions: string[];
  sku: string;
}>();

const editOrderData = reactive({
  sku: props.sku,
});

const displayEditOrder = ref(true);

const boxes = [
  { name: "Verdura y fruta", code: "MX" },
  { name: "Sólo fruta", code: "FR" },
  { name: "Sólo verdura", code: "VG" },
];
</script>
