<template>
  <div class="text-[16px] ">
    <h4 class="!font-bold text-[16px] mt-4">
      {{ $t(`${textData}title`) }}
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
        {{ $t(`${textData}boxType`) }}
      </h4>
      <Dropdown
        v-model="updateOrderItemData.type"
        :options="boxTypes"
        option-label="name"
        option-value="code"
        class="w-72"
      />
      <h4 class="font-bold mt-6">
        {{ $t(`${textData}boxSize`) }}
      </h4>
      <Dropdown
        v-model="updateOrderItemData.size"
        :options="boxSizes"
        option-label="name"
        option-value="code"
        class="w-72"
      />
      <div>
        <h4 class="font-bold mt-5">
          {{ $t(`${textData}exclusions.title`) }}
        </h4>
        <p class="font-bold mt-4">
          {{ $t(`${textData}exclusions.description_1`) }}
        </p>
        <p class="leading-7">
          {{ $t(`${textData}exclusions.description_2`) }}
        </p>
        <MultiSelect
          v-model="updateOrderItemData.exclusions"
          :options="[...fruitsItemProducts, ...vegetablesItemProducts]"
          filter
          :option-label="`name${getLanguage}`"
          option-value="id"
          :placeholder="$t(`${textData}exclusions.placeholder`)"
          :selection-limit="6"
          class="w-full border-[1px] text-[16px] mt-3 rounded-xl mb-5"
        />
        <Button
          :label="$t(`${textData}saveButton`)"
          class="!px-5 !h-5 mb-2"
          @click="save"
        />
        <Divider class="before:border-t-[1px] before:border-green-primary" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BoxProduct } from '~/composables/shared/products/domain/Product.ts'
import { useGenerateSku } from '~/composables/shared/utils/useGenerateSku.ts'

const props = defineProps<{
  exclusions: ItemProduct[]
  orderItem: OrderItem
  orderId: number
  subscription: number
}>()

const { locale } = useI18n()
const { generateSku } = useGenerateSku()
const { activeBoxProducts, fruitsItemProducts, vegetablesItemProducts } = useProductsState()
const displayEditOrder = ref(false)
const emits = defineEmits(['update-item'])
const textData = 'orders.order.edit.'
const getLanguage = computed(() => locale.value === 'es' ? 'Es' : 'Ca')

const updateOrderItemData = reactive({
  type: props.orderItem.sku.includes('FR')
    ? 'fruits'
    : props.orderItem.sku.includes('VG')
      ? 'vegetables'
      : 'mixed',
  size: props.orderItem.sku.includes('S')
    ? 'S'
    : props.orderItem.sku.includes('IM')
      ? 'IM'
      : 'XL',
  exclusions: [...props.exclusions.map((exclusion: ItemProduct) => exclusion.id)],
})

const toggleDisplayEditOrder = () => {
  displayEditOrder.value = !displayEditOrder.value
}

const save = () => {
  let newBoxProduct: BoxProduct | undefined
  const { type, size } = updateOrderItemData
  if (props.subscription) {
    const frequency = props.orderItem.sku.includes('1') ? '1' : '2'
    const sku = generateSku(type, size, frequency)
    newBoxProduct = activeBoxProducts.value.find((box: BoxProduct) => box.sku === sku)
  }
  else {
    const sku = generateSku(type, size)
    newBoxProduct = activeBoxProducts.value.find((box: BoxProduct) => box.sku === sku)
  }
  const { exclusions } = updateOrderItemData
  emits('update-item', { newBoxProduct, orderItemId: props.orderItem.id, exclusions, order: props.orderId })
  toggleDisplayEditOrder()
}

const boxTypes = [
  { name: 'Verdura y fruta', code: 'mixed' },
  { name: 'Sólo fruta', code: 'fruits' },
  { name: 'Sólo verdura', code: 'vegetables' },
]
const boxSizes = [
  { name: 'Pequeña', code: 'S' },
  { name: 'Mediana', code: 'IM' },
  { name: 'Grande', code: 'XL' },
]

// watch(products, () => {
//   if (products.value.itemProducts) {
//     listProducts.value = [
//       ...products.value.itemProducts.fruits,
//       ...products.value.itemProducts.vegetables,
//     ]
//   }
// })
export type updateOrderItemPayload = {
  newBoxProduct: BoxProduct
  orderItemId: number
  exclusions: number[]
  order: number
}
</script>
