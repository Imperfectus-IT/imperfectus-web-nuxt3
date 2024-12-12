<script setup lang="ts">
import { useGetLocaleLanguage } from '~/composables/shared/useGetLocaleLanguage.ts'
import { createEmpty as createEmptyShoppingCartItem } from '@/composables/shopping-cart/domain/Item.ts'

onMounted(() => shoppingCart.value.currentItem = createEmptyShoppingCartItem())
const toast = useToast()
const { errorToast, successToast } = useToastService()
const { t } = useI18n()
const emit = defineEmits([GO_TO_STEP_EVENT])

const { locale } = useI18n()
const { shoppingCart } = useShoppingCartState()
const { setShoppingCart } = useLocalStorageShoppingCartRepository()
const { getLocaleName } = useGetLocaleLanguage(locale.value)
const { executeGetOrderAmount } = useGetOrderAmount()

onMounted(async () => {
  const newAmount = await executeGetOrderAmount({ items: shoppingCart.value.items })
  shoppingCart.value.amount.subtotal = parseFloat(shoppingCart.value.items.reduce((acc, item) => acc + item.product.priceWithTax, 0).toFixed(2))
  shoppingCart.value.amount.shippingCost = newAmount.shipping.toFixed(2)
  shoppingCart.value.amount.saved = newAmount.savedWithTax.toFixed(2)
  shoppingCart.value.amount.total = newAmount.total.toFixed(2)
})

const handleNewProduct = () => {
  emit(GO_TO_STEP_EVENT, CUSTOMIZE_STEP)
  shoppingCart.value.currentItem = createEmptyShoppingCartItem()
}

const removeItem = (id: string) => {
  if (shoppingCart.value.items.length === 1) {
    errorToast(toast, t('validations.one.item.required.title'), t('validations.one.item.required.description'))
  }
  else {
    shoppingCart.value.items = shoppingCart.value.items.filter(item => item.uuid !== id)
    successToast(toast, 'Producto eliminado', 'El producto ha sido eliminado correctamente')
  }
}
const goToNextStep = () => {
  setShoppingCart(shoppingCart.value)
  emit(GO_TO_STEP_EVENT, SHIPPING_STEP)
}
const goBack = () => {
  shoppingCart.value.currentItem = shoppingCart.value.items[shoppingCart.value.items.length - 1]
  shoppingCart.value.items.splice(shoppingCart.value.items.length - 1, 1)
  emit(GO_TO_STEP_EVENT, PURCHASE_TYPE_STEP)
}

const incrementQuantity = (uuid: string) => {
  shoppingCart.value.items.find(item => item.uuid === uuid).quantity++
}
const decrementQuantity = (uuid: string) => {
  const item = shoppingCart.value.items.find(item => item.uuid === uuid)
  item.quantity > 1 ? item.quantity-- : ''
}
</script>

<template>
  <div class="">
    <Toast />
    <ShoppingCartResumeBox
      class="px-8 md:px-[28%] lg:px-[25%] 2xl:px-[20%] relative"
      :display-next-step-button="true"
      @go-to-next-step="goToNextStep"
      @add-new-product="handleNewProduct"
    >
      <template #title>
        <h4 class="text-[26px] font-recoleta-regular lg:text-[40px] text-center mb-4">
          Resumen de caja
        </h4>
        <div class="!absolute left-4 top-1 lg:left-[35px] flex flex-row gap-3 lg:top-5">
          <Button
            class="w-[2rem] h-[2rem] text-xl "
            icon="mdi mdi-chevron-left"
            rounded
            outlined
            @click.prevent="goBack"
          />
          <span class="my-auto hidden lg:block">{{ $t('string.back') }}</span>
        </div>
      </template>
      <template #boxCard>
        <div
          v-for="(item, index) in shoppingCart.items"
          :key="index"
          class="lg:flex mb-5 lg:mb-0 lg:gap-4 lg:flex-wrap lg:justify-center"
        >
          <NuxtImg
            :src="item.product.image"
            loading="lazy"
            format="webp"
            class="rounded-lg mt-6 w-full lg:w-1/3"
          />
          <div class="p-4 lg:my-auto lg:p-0 lg:py-4 mt-5">
            <div class="flex justify-between items-center">
              <span class="font-bold my-3 lg:my-1 text-lg lg:text-md">{{ item.product[`name${getLocaleName}`] }}</span>
              <span class="font-bold text-lg inline lg:ml-20">{{ item.product.priceWithTax }} €</span>
            </div>
            <ul class="list-square ml-5 text-base leading-4 mt-2 lg:mt-6 lg:text-md lg:leading-[18px]">
              <li
                v-if="item.frequency"
                class="mb-3"
              >
                {{ item?.frequency ?$t(`boxes.frequency.${item?.frequency}`) : '-' }}
              </li>
              <li class="mb-3">
                {{ item?.boxType ? $t(`string.box.${item?.boxType}`) : '-' }}
              </li>
              <li class="mb-3">
                {{ $t('adminSubscriptionNextDelivery.exclusions') }}: {{ item.exclusions.length }}
              </li>
            </ul>
          </div>
          <div
            class="flex flex-row-reverse justify-between px-4 lg:flex-col lg:items-end  lg:gap-14 lg:py-10 "
          >
            <span
              v-if="shoppingCart.items.length > 1"
              class="mdi mdi-close text-red-primary cursor-pointer lg:text-[22px]"
              @click.prevent="removeItem(item.uuid)"
            />
            <div class="flex gap-2 mt-auto mb-0">
              <Button
                icon="mdi mdi-minus"
                outlined
                :pt="{
                  root: ['h-2 w-7'],
                }"
                :pt-options="{
                  mergeSections: true,
                  mergeProps: true,
                }"
                @click.prevent="decrementQuantity(item.uuid)"
              />
              <span>{{ item.quantity }}</span>
              <Button
                icon="mdi mdi-plus"
                outlined
                :pt="{
                  root: ['h-4 w-7'],
                }"
                :pt-options="{
                  mergeSections: true,
                  mergeProps: true,
                }"
                @click.prevent="incrementQuantity(item.uuid)"
              />
            </div>
          </div>
          <Divider class="text-grey-secondary" />
        </div>
      </template>
    </ShoppingCartResumeBox>
  </div>
</template>
