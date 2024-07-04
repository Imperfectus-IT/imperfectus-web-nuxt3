<template>
  <div class="text-[16px]">
    <h4 class="!font-bold text-[16px] mb-4">
      Tu selección actual:
    </h4>
    <div class="lg:grid lg:grid-cols-3 lg:grid-rows-1 lg:gap-x-10">
      <div class="lg:col-start-3 lg:row-start-1">
        <h4 class="font-bold">
          Tipo de caja
        </h4>
        <Dropdown
          v-model="newItem.type"
          :options="boxTypes"
          option-label="name"
          option-value="code"
          placeholder="Selecciona un tipo de caja"
          class="w-72"
        />
      </div>
      <div class="lg:col-start-2">
        <h4 class="font-bold mt-6 lg:mt-0">
          Tamaño de caja
        </h4>
        <Dropdown
          v-model="newItem.size"
          :options="boxSizes"
          option-label="name"
          option-value="code"
          placeholder="Selecciona un tipo de caja"
          class="w-72"
        />
      </div>
      <div class="lg:col-start-1 lg:row-start-1">
        <h4 class="font-bold mt-5 lg:mt-0">
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
          v-model="newItem.exclusions"
          :options="listProducts"
          filter
          option-label="name"
          option-value="name"
          placeholder="Buscar "
          :selection-limit="6"
          class="w-full border-[1px] text-[16px] mt-3 rounded-xl mb-5"
        />
        <div class="flex justify-evenly lg:flex lg:gap-2 lg:justify-center">
          <Button
            label="Guardar"
            class="!px-5 !h-5 mb-2"
            @click="save"
          />
          <Button
            label="Cancelar"
            outlined
            class="!px-5 !h-5 mb-2"
            @click="close"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'
import type { ItemProduct } from '~/composables/admin/products/types/Product.ts'

const emits = defineEmits(['close', 'save'])
const { products } = useGetProductsHandler()
const listProducts: Ref<ItemProduct[]> = ref([])
const newItem = reactive({
  exclusions: [],
  size: '',
  type: '',
})
watch(products, () => {
  if (products.value.itemProducts) {
    listProducts.value = [
      ...products.value.itemProducts.fruits,
      ...products.value.itemProducts.vegetables,
    ].sort((a, b) => a.name.localeCompare(b.name))
  }
})
const save = () => emits('save')
const close = () => emits('close')
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
</script>
