<template>
  <Panel>
    <h4 class="font-solina-extended-medium text-[22px]">
      {{ $t(`${textData}title`) }}
    </h4>
    <div class="flex flex-row gap-5 mt-4 text-[16px]">
      <span
        :class="getUnusedSpanClass"
        @click="setUnusedCoupons"
      >{{ $t(`${textData}unused`, { quantity: coupons.unusedCoupons.length }) }}</span>
      <span
        :class="getUsedSpanClass"
        @click="setUsedCoupons"
      >{{ $t(`${textData}used`, { quantity: coupons.usedCoupons.length }) }}</span>
    </div>
    <Divider class="mt-2 mb-0" />
    <div v-if="isCouponsEmpty">
      <p class="text-[16px] mt-5">
        {{ $t(`${textData}text`) }}
      </p>
    </div>
    <div
      v-for="(coupon, index) in coupons[couponsSelector]"
      v-else
      :key="index"
      class="mt-4"
    >
      <p class="text-[20px] font-bold">
        {{ coupon.coupon }}
      </p>
      <p class="text-grey-primary text-[14px]">
        {{ $t(`${textData}discount`, { discount: coupon.discountValue }) }}
      </p>
    </div>
  </Panel>
</template>

<script setup lang="ts">
import {
  useGetReferredCouponsHandler,
} from '~/composables/shared/coupons/application/get-referred-coupons/useGetReferredCouponsHandler.ts'

const { coupons } = useGetReferredCouponsHandler()
const textData = 'referrals.my_coupons.'
const couponsSelector = ref<'unusedCoupons' | 'usedCoupons'>('unusedCoupons')
const setUnusedCoupons = () => couponsSelector.value = 'unusedCoupons'
const setUsedCoupons = () => couponsSelector.value = 'usedCoupons'
const isCouponsEmpty = computed(() => coupons[couponsSelector.value].length < 1)
const getUsedSpanClass = computed(() => couponsSelector.value === 'usedCoupons' ? 'cursor-pointer font-bold' : 'cursor-pointer')
const getUnusedSpanClass = computed(() => couponsSelector.value === 'unusedCoupons' ? 'cursor-pointer font-bold' : 'cursor-pointer')
</script>
