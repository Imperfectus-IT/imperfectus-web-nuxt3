<script setup lang="ts">
import { useGetLocaleLanguage } from '~/composables/shared/useGetLocaleLanguage.ts'

const { t } = useI18n()
const emit = defineEmits([GO_TO_STEP_EVENT])
const goToNextStep = () => {
  emit(GO_TO_STEP_EVENT, SHIPPING_STEP)
}
const goBack = () => {
  emit(GO_TO_STEP_EVENT, PURCHASE_TYPE_STEP)
}
const { locale } = useI18n()
const { shoppingCart } = useShoppingCartState()
const { getLocaleName } = useGetLocaleLanguage(locale)
const { addOrderCoupon, removeOrderCoupon } = useUpdateOrderHandler(t)

const handleRemoveOrderCoupon = async () => {
  await removeOrderCoupon(props.order, props.order.coupon, textData)
}
const handleAddOrderCoupon = async (coupon: string) => {
  await addOrderCoupon(props.order, coupon, textData)
}
</script>

<template>
  <div class="px-8 md:px-[28%] lg:px-[25%] 2xl:px-[20%] relative">
    <slot name="title" />
    <div class="!absolute left-[25px] lg:left-[35px] flex flex-row gap-3">
      <Button
        class="w-[2rem] h-[2rem] text-xl "
        icon="mdi mdi-chevron-left"
        rounded
        outlined
        @click.prevent="goBack"
      />
      <span class="my-auto hidden lg:block">{{ $t('string.back') }}</span>
    </div>
    <div
      v-for="(item, index) in shoppingCart.items"
      :key="index"
      class="lg:flex mb-5 lg:mb-0 lg:gap-16 lg:flex-wrap lg:justify-center"
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
          <span class="font-bold text-lg inline lg:ml-20">{{ item.product.price }} €</span>
        </div>
        <p class="mt-6 lg:mt-3 lg:hidden">
          {{ item.product[`description${getLocaleName}`] }}
        </p>
        <ul class="list-square ml-5 text-base leading-7 mt-2 lg:mt-6 lg:text-md lg:leading-[18px]">
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
        <!--        <span class="font-bold text-lg hidden lg:hidden lg:mt-2 lg:text-base">{{ item.product.price }} €</span> -->
      </div>
      <div class="flex flex-row-reverse justify-between px-4 lg:flex-col lg:items-end lg:justify-around lg:gap-14">
        <!--        <span -->
        <!--          class="mdi mdi-close text-red-primary cursor-pointer" -->
        <!--          @click.prevent="removeItem(item.id)" -->
        <!--        /> -->
        <!--          <div class="flex gap-2"> -->
        <!--            <Button -->
        <!--              icon="mdi mdi-minus" -->
        <!--              outlined -->
        <!--              :pt="{ -->
        <!--                root: ['h-4 w-7'], -->
        <!--              }" -->
        <!--              :pt-options="{ -->
        <!--                mergeSections: true, -->
        <!--                mergeProps: true, -->
        <!--              }" -->
        <!--              @click.prevent="decrementQuantity(item)" -->
        <!--            /> -->
        <!--            <span>{{ item.quantity }}</span> -->
        <!--            <Button -->
        <!--              icon="mdi mdi-plus" -->
        <!--              outlined -->
        <!--              :pt="{ -->
        <!--                root: ['h-4 w-7'], -->
        <!--              }" -->
        <!--              :pt-options="{ -->
        <!--                mergeSections: true, -->
        <!--                mergeProps: true, -->
        <!--              }" -->
        <!--              @click.prevent="incrementQuantity(item)" -->
        <!--            /> -->
        <!--          </div> -->
      </div>
      <Divider class="text-grey-secondary" />
    </div>

    <Button
      :label="$t('orderResume.add')"
      outlined
      class="lg: mb-10"
    />
    <OrderCoupon
      :show-title="false"
      @add-coupon="handleAddOrderCoupon"
      @remove-coupon="handleRemoveOrderCoupon"
    />
    <Divider class="text-grey-secondary mt-7" />
    <div class="flex justify-between">
      <span>{{ $t('orderAmount.subtotal') }}</span>
      <span>19.18€</span>
    </div>
    <div class="flex justify-between mt-2">
      <span>{{ $t('orderAmount.shippingCost') }}</span>
      <span>0,00€</span>
    </div>
    <div class="flex justify-between mt-2">
      <span>{{ $t('orderAmount.discount') }}</span>
      <span>0,00€</span>
    </div>
    <Divider class="text-grey-secondary" />
    <div class="flex justify-between text-[22px] font-solina-extended-medium">
      <span>{{ $t('orderAmount.total') }}</span>
      <span>19.18€</span>
    </div>
    <div class="flex justify-center">
      <Button
        :label="$t('order.next')"
        severity="secondary"
        class="mt-4"
        @click.prevent="goToNextStep"
      />
    </div>
  </div>
</template>
