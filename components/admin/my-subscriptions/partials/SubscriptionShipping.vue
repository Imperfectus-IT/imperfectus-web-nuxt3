<template>
  <Panel
    :toggleable="!isDesktop"
    :collapsed="!isDesktop"
    :header="$t(`${textData.section}title`)"
    :pt="{
      root: 'h-full lg:border-[1px] rounded-lg w-full',
      toggleableContent: 'h-full !w-full',
    }"
  >
    <div v-if="isShippingFormDisplayed">
      <div
        v-for="(key, index) in getShippingKeys"
        :key="key"
        class="mt-3 "
      >
        <div v-if="key !== 'shippingNotes'">
          <span class="font-bold text-[14px]">
            {{ $t(`subscriptions.subscription.shipping.item_${index}`) }}
          </span>
          <InputText
            v-model="shippingForm[key as keyof SubscriptionShipping]"
            class="mt-2 rounded-lg w-full mb-4"
            :pt="{
              root: 'text-[16px] bg-transparent border-[1px] px-4 py-3 rounded-lg w-full mb-4',
            }"
          />
        </div>
        <div v-else>
          <span class="font-bold text-[14px]">
            {{ $t(`subscriptions.subscription.shipping.item_${index}`) }}
          </span>
          <Textarea
            v-model="shippingForm[key as keyof SubscriptionShipping]"
            class="w-full text-[16px] mt-2 rounded-lg mb-4"
            rows="5"
          />
        </div>
      </div>
    </div>
    <div v-else>
      <div
        v-for="(key, index) in getShippingKeys"
        :key="key"
        class="mt-3"
      >
        <div class="mb-5">
          <span class="font-bold text-[14px]">
            {{ $t(`subscriptions.subscription.shipping.item_${index}`) }}
          </span>
          <p class="lg:mt-1">
            {{ shippingForm[key as keyof SubscriptionShipping] }}
          </p>
        </div>
      </div>
    </div>
    <Button
      v-if="isShippingFormDisplayed"
      :label="$t(`subscriptions.subscription.billing.saveButton`)"
      class="mt-3 lg:w-1/2 lg:relative "
      outlined
      @click="modifySubscriptionShipping"
    />
    <Button
      v-if="!isShippingFormDisplayed"
      :label="$t(`subscriptions.subscription.billing.editButton`)"
      class="mt-3 lg:w-1/2 lg:mt-auto lg:relative lg:bottom-10"
      outlined
      @click="displayShippingForm"
    />
  </Panel>
</template>

<script setup lang="ts">
import type { SubscriptionShipping } from '~/composables/admin/subscriptions/domain/SubscriptionTypes.ts'

const { isDesktop } = useScreenSize()
const props = defineProps<{
  shipping: SubscriptionShipping
}>()
const textData = {
  section: 'subscriptions.subscription.shipping.',
}
const isShippingFormDisplayed = ref(false)
const emits = defineEmits(['modifyShipping'])
const getShippingKeys = computed(() => Object.keys(props.shipping))
const shippingForm = reactive<SubscriptionShipping>({
  shippingAddress: props.shipping.shippingAddress,
  shippingCity: props.shipping.shippingCity,
  shippingCountry: props.shipping.shippingCountry,
  shippingAddress2: props.shipping.shippingAddress2,
  shippingState: props.shipping.shippingState,
  shippingEmail: props.shipping.shippingEmail,
  shippingFirstName: props.shipping.shippingFirstName,
  shippingPhone: props.shipping.shippingPhone,
  shippingLastName: props.shipping.shippingLastName,
  shippingPostCode: props.shipping.shippingPostCode,
  shippingNotes: props.shipping.shippingNotes,
})

const modifySubscriptionShipping = () => {
  emits('modifyShipping', shippingForm)
  isShippingFormDisplayed.value = false
}
const displayShippingForm = () => {
  isShippingFormDisplayed.value = true
}
</script>
