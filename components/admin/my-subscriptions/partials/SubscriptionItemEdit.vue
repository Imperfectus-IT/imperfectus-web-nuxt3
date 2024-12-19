<template>
  <div class="text-[16px]">
    <div class="lg:grid lg:grid-cols-3 lg:grid-rows-1 lg:gap-x-10">
      <div
        v-if="!isOrangeProduct"
        class="lg:col-start-3 lg:row-start-1"
      >
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
      <div :class="isOrangeProduct ? 'lg:col-start-1 min-h-[90px]' : 'lg:col-start-2 min-h-[90px]' ">
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
      <div
        v-if="!isOrangeProduct"
        class="lg:col-start-1 lg:row-start-1"
      >
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
          :options="sortedProducts"
          filter
          :option-label="`name${getLanguage}`"
          option-value="id"
          :placeholder="$t(`${textData}exclusionsPlaceholder`)"
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
      </div>
      <div class="flex justify-evenly gap-2 lg:flex lg:gap-6 lg:justify-start lg:col-span-3 lg:mb-5">
        <Button
          :label="$t(`${textData}saveButton`)"
          class="!px-5 !h-5 mb-2 !py-6"
          @click="save"
        />
        <Button
          :label="$t(`${textData}cancelButton`)"
          outlined
          class="!px-5 !h-5 mb-2 !py-6"
          @click="close"
        />
      </div>
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
const { locale } = useI18n()
const { generateSku } = useGenerateSku()
const textData = 'subscriptions.subscription.modifyItem.'
const { fruitsItemProducts, vegetablesItemProducts, activeBoxProducts } = useProductsState()
const emits = defineEmits(['save', 'close'])
const getLanguage = computed(() => locale.value === 'es' ? 'Es' : 'Ca')
const isLimitReached = computed(() => updateSubscriptionItemData.exclusions.length >= 6)
const sortedProducts = useSortProductsByLanguage([...fruitsItemProducts.value, ...vegetablesItemProducts.value])
const isOrangeProduct = computed(() => props.subscriptionItem.sku.includes('Orange'))

const save = () => {
  const { type, size } = updateSubscriptionItemData
  const sku = generateSku(type, size, props.frequency)
  const newBoxProduct: BoxProduct | undefined = activeBoxProducts.value.find((box: BoxProduct) => box.sku === sku)
  const { exclusions } = updateSubscriptionItemData
  return emits('save', { newBoxProduct, subscriptionItemId: props.subscriptionItem.id, exclusions })
}
const close = () => emits('close')

const updateSubscriptionItemData = reactive({
  type: props.subscriptionItem.sku.includes('FR')
    ? 'fruits'
    : props.subscriptionItem.sku.includes('VG')
      ? 'vegetables'
      : isOrangeProduct.value
        ? 'orange'
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
