<template>
  <div>
    <h4 class="!font-bold text-[14px] mt-4">
      ¿Quieres editar tu pedido?
    </h4>
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
    </div>
    <div>
      <h4>Quieres excluir algun alimento</h4>
      <p class="font-bold">
        Puedes excluir hasta 6 alimentos
      </p>
      <p>
        Aún así, cada viernes enviamos un email con las frutas y verduras que
        habrá en la caja de la siguitente semana para que así puedas editar las
        exclusiones dependiendo del contenido de la caja.
      </p>
      {{ editOrderData.exclusions }}
      <MultiSelect
        v-model="editOrderData.exclusions"
        :options="products"
        filter
        option-label=""
        option-value=""
        placeholder="Buscar producto"
        :selection-limit="6"
        class="w-full border-[1px] rounded-md text-[16px] mt-3"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  products: string[]
  exclusions: string[]
  sku: string
}>()

const editOrderData = reactive({
  sku: props.sku,
  exclusions: props.exclusions,
  coupon: null,
})

const displayEditOrder = ref(true)

const boxes = [
  { name: 'Verdura y fruta', code: 'MX' },
  { name: 'Sólo fruta', code: 'FR' },
  { name: 'Sólo verdura', code: 'VG' },
]

const products = props.products
</script>
