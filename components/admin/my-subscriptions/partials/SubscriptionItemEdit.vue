<template>
  <div class="text-[16px]">
    <div class="lg:grid lg:grid-cols-3 lg:grid-rows-1 lg:gap-x-10">
      <div class="lg:col-start-3 lg:row-start-1">
        <h4 class="font-bold">
          Tipo de caja
        </h4>
        <Dropdown
          v-model="updateSubscriptionItemData.type"
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
          v-model="updateSubscriptionItemData.size"
          :options="boxSizes"
          option-label="name"
          option-value="code"
          placeholder="Selecciona un tipo de caja"
          class="w-72"
        />
      </div>
      <div class="lg:col-start-1 lg:row-start-1">
        <h4 class="font-bold mt-5 lg:mt-0">
          {{ $t(`${textData}exclusionsTitle`) }}
        </h4>
        <p class="font-bold mt-4">
          {{ $t(`${textData}exclusionsParagraph1`) }}
        </p>
        <p class="leading-7">
          {{ $t(`${textData}exclusionsParagraph2`) }}
        </p>
        <MultiSelect
          v-model="updateSubscriptionItemData.exclusions"
          :options="products.itemProducts"
          filter
          option-label="nameEs"
          option-value="id"
          placeholder="Buscar "
          :selection-limit="6"
          class="w-full border-[1px] text-[16px] mt-3 rounded-xl mb-5"
        />
        <div class="flex justify-evenly lg:flex lg:gap-6 lg:justify-center lg:col-span-3 lg:mb-5">
          <Button
            :label="$t(`${textData}saveButton`)"
            class="!px-5 !h-5 mb-2"
            @click="save"
          />
          <Button
            :label="$t(`${textData}cancelButton`)"
            outlined
            class="!px-5 !h-5 mb-2"
            @click="close"
          />
        </div>
      </div>
      <Divider class="before:border-t-[1px] before:border-green-primary lg:hidden" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BoxProduct, ItemProduct } from '@/composables/shared/products/domain/Product.ts'
import type { SubscriptionItem } from '~/composables/admin/subscriptions/domain/SubscriptionTypes.ts'
import { useGenerateSku } from '~/composables/shared/utils/useGenerateSku.ts'

const props = defineProps<{
  exclusions: ItemProduct[]
  subscriptionItem: SubscriptionItem
  frequency: string
}>()
const { generateSku } = useGenerateSku()
const textData = 'subscriptions.subscription.modifyItem.'
const { products } = useProductsState()
const emits = defineEmits(['save', 'close'])

const save = () => {
  const { type, size } = updateSubscriptionItemData
  const sku = generateSku(type, size, props.frequency)
  const newBoxProduct: BoxProduct | undefined = products.value.boxProducts.find((box: BoxProduct) => box.sku === sku)
  const { exclusions } = updateSubscriptionItemData
  emits('save', { newBoxProduct, subscriptionItemId: props.subscriptionItem.id, exclusions })
}
const close = () => emits('close')

const updateSubscriptionItemData = reactive({
  type: props.subscriptionItem.sku.includes('FR')
    ? 'fruits'
    : props.subscriptionItem.sku.includes('VG')
      ? 'vegetables'
      : 'mixed',
  size: props.subscriptionItem.sku.includes('S')
    ? 'S'
    : props.subscriptionItem.sku.includes('IM')
      ? 'IM'
      : 'XL',
  exclusions: [...props.exclusions.map((exclusion: ItemProduct) => exclusion.id)],
})
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
</script>
