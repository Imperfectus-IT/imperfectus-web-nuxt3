<template>
  <div class="text-[16px] ">
    <h4 class="!font-bold text-[16px] mt-4">
      {{ $t(`${textData}title`) }}
    </h4>
    <div class="flex flex-col">
      <Divider class="mt-2 !w-2/3" />
      <Button
        v-if="!displayEditOrder"
        label="Editar"
        outlined
        class="!h-5 mb-5 w-2/5 lg:w-1/5"
        @click="toggleDisplayEditOrder"
      />
    </div>
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
          :options="sortedProducts"
          filter
          :option-label="`name${getLanguage}`"
          option-value="id"
          :option-disabled="(item: ItemProduct) => isLimitReached && !updateOrderItemData.exclusions?.includes(item.id as number)"
          :placeholder="$t(`${textData}exclusions.placeholder`)"
          class="w-full border-[1px] text-[16px] mt-3 rounded-xl mb-5"
          :pt-options="{
            mergeProps: true,
            mergeSections: true,
          }"
          :pt="{
            itemCheckbox: {
              box: ({ context }) => ({
                class: ['border-2 rounded-md w-6 h-6 flex items-center justify-center', { 'opacity-60': !context.checked && isLimitReached }],
              }),
              input: ({ context }) => ({
                class: ['peer w-full h-full absolute top-0 left-0 z-10 p-0 m-0 opacity-0 rounded-md outline-none border-2 border-green-tertiary appareance-none cursor-pointer', { '!cursor-not-allowed': !context.checked && isLimitReached }],
              }),
            },
          }"
        />
        <Button
          :label="$t(`${textData}saveButton`)"
          class="!px-5 !h-5 mb-2"
          @click="save"
        />
        <!--        <Divider class="before:border-t-[1px] before:border-green-primary" /> -->
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
const isLimitReached = computed(() => updateOrderItemData.exclusions.length >= 6)

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

const sortedProducts = useSortProductsByLanguage([...fruitsItemProducts.value, ...vegetablesItemProducts.value])

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

export type updateOrderItemPayload = {
  newBoxProduct: BoxProduct
  orderItemId: number
  exclusions: number[]
  order: number
}
</script>
