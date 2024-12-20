<script setup lang="ts">
const { locale } = useI18n()
const { getLocaleName } = useGetLocaleLanguage(locale.value)
const { shoppingCart } = useShoppingCartState()
const incrementQuantity = (uuid: string) => {
  shoppingCart.value.items.find(item => item.uuid === uuid).quantity++
}
const decrementQuantity = (uuid: string) => {
  const item = shoppingCart.value.items.find(item => item.uuid === uuid)
  item.quantity > 1 ? item.quantity-- : ''
}

const removeItem = (uuid: string) => {
  shoppingCart.value.items = shoppingCart.value.items.filter(item => item.uuid !== uuid)
}
</script>

<template>
  <div
    v-for="(item, index) in shoppingCart.items"
    :key="index"
    class="lg:flex mb-5 lg:mb-0 lg:flex-wrap lg:justify-center lg:gap-x-3"
  >
    <NuxtImg
      :src="item.product.image"
      loading="lazy"
      format="webp"
      class="rounded-lg mt-6 w-full lg:w-[10vw] lg:h-[130px] lg:mr-4"
    />
    <div class="p-4 lg:my-auto lg:p-0 lg:py-4 mt-5 lg:min-w-[10vw]">
      <div class="flex justify-between items-center">
        <span class="font-bold my-3 lg:my-1 text-lg lg:text-md">{{ item.product[`name${getLocaleName}`] }}</span>
      </div>
      <p class="mt-6 lg:mt-3 lg:hidden">
        {{ item.boxProduct?.description }}
      </p>
      <ul class="list-square ml-5 text-base leading-7 mt-2 lg:mt-0 lg:text-md lg:leading-[24px]">
        <li>{{ item?.frequency ? $t(`boxes.frequency.${item?.frequency}`) : $t('companies.frequency.once') }}</li>
        <li>{{ item?.boxType ? $t(`string.box.${item?.boxType}`) : '-' }}</li>
        <li>{{ $t('adminSubscriptionItems.exclusions') }}: {{ item.exclusions.length }}</li>
      </ul>
      <div class="flex justify-between items-center lg:mt-2 lg:w-full">
        <span class="font-bold text-lg hidden lg:block lg:text-base">{{ item.product?.priceWithTax }} €</span>
      </div>
    </div>
    <div
      class="flex flex-row-reverse justify-between px-4 lg:flex-col lg:items-end lg:justify-around lg:gap-14"
    >
      <span
        v-if="shoppingCart.items.length > 1"
        class="mdi mdi-close text-red-primary cursor-pointer"
        @click.prevent="removeItem(item.uuid)"
      />
      <div class="flex gap-2">
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
    <Divider class="text-grey-secondary w-full lg:w-[80%] mx-auto" />
  </div>
</template>
