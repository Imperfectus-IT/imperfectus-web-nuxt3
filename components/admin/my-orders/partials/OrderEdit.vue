<template>
  <div class="text-[16px]">
    <h4 class="!font-bold text-[16px] mt-4">
      ¿Quieres editar tu caja?
    </h4>
    <Divider class="mt-2 !w-2/3" />
    <Button
      v-if="!displayEditOrder"
      label="Editar"
      outlined
      class="!px-5 !h-5 mb-2"
      @click="toggleDisplayEditOrder"
    />
    <div v-if="displayEditOrder">
      <h4 class="font-bold">
        Tipo de caja
      </h4>
      <Dropdown
        v-model="editOrderData.type"
        :options="boxTypes"
        option-label="name"
        option-value="code"
        placeholder="Selecciona un tipo de caja"
        class="w-72"
      />
      <h4 class="font-bold mt-6">
        Tamaño de caja
      </h4>
      <Dropdown
        v-model="editOrderData.size"
        :options="boxSizes"
        option-label="name"
        option-value="code"
        placeholder="Selecciona un tipo de caja"
        class="w-72"
      />
      <div>
        <h4 class="font-bold mt-5">
          ¿Quieres excluir algun alimento?
        </h4>
        <p class="font-bold mt-4">
          Puedes excluir hasta 6 alimentos.
        </p>
        <p class="leading-7">
          Aún así, cada viernes enviamos un email con las frutas y verduras que
          habrá en la caja de la siguitente semana para que así puedas editar
          las exclusiones dependiendo del contenido de la caja.
        </p>
        <MultiSelect
          v-model="editOrderData.exclusions"
          :options="listProducts"
          filter
          option-label="name"
          option-value="name"
          placeholder="Buscar "
          :selection-limit="6"
          class="w-full border-[1px] text-[16px] mt-3 rounded-xl mb-5"
        />
        <Button
          label="Guardar"
          class="!px-5 !h-5 mb-2"
          @click="toggleDisplayEditOrder"
        />
        <Divider class="before:border-t-[1px] before:border-green-primary" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  exclusions: string[]
  orderItem: OrderItem
}>()

const editOrderData = reactive({
  type: props.orderItem.sku.includes('FR')
    ? 'FR'
    : props.orderItem.sku.includes('VG')
      ? 'VG'
      : 'MX',
  size: props.orderItem.sku.includes('S')
    ? 'S'
    : props.orderItem.sku.includes('IM')
      ? 'IM'
      : 'XL',
  exclusions: props.exclusions,
  coupon: null,
})

const displayEditOrder = ref(false)

const toggleDisplayEditOrder = () => {
  displayEditOrder.value = !displayEditOrder.value
}

const boxTypes = [
  { name: 'Verdura y fruta', code: 'MX' },
  { name: 'Sólo fruta', code: 'FR' },
  { name: 'Sólo verdura', code: 'VG' },
]

const boxSizes = [
  { name: 'Pequeña', code: 'S' },
  { name: 'Mediana', code: 'IM' },
  { name: 'Grande', code: 'XL' },
]

const { products } = useGetProductsHandler()

const listProducts: Ref<ItemProduct[]> = ref([])

watch(products, () => {
  if (products.value.itemProducts) {
    listProducts.value = [
      ...products.value.itemProducts.fruits,
      ...products.value.itemProducts.vegetables,
    ].sort((a, b) => a.name.localeCompare(b.name))
  }
})
</script>
