<template>
  <Panel
    :toggleable="!isDesktop"
    :collapsed="!isDesktop"
    :header="$t(`${textData.section}title`)"
    :pt="{
      root: 'h-full rounded-lg text-left lg:border-[1px]',
      toggleableContent: 'h-full flex flex-col',
    }"
  >
    <div
      v-if="isBillingFormDisplayed"
      class="h-full"
    >
      <div
        v-for="(key, index) in getBillingKeys"
        :key="key"
        class="mt-3"
      >
        <div v-if="key !== 'shippingNotes'">
          <span class="font-bold text-[14px]">
            {{ $t(`subscriptions.subscription.shipping.item_${index}`) }}
          </span>
          <InputText
            v-model="billingForm[key as keyof SubscriptionBilling]"
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
            v-model="billingForm[key as keyof SubscriptionBilling]"
            class="w-full text-[16px] mt-2 rounded-lg mb-4"
            rows="5"
          />
        </div>
      </div>
    </div>
    <div v-else>
      <div
        v-for="(key, index) in getBillingKeys"
        :key="key"
        class="mt-3"
      >
        <div class="mb-5">
          <span class="font-bold text-[14px]">
            {{ $t(`subscriptions.subscription.shipping.item_${index}`) }}
          </span>
          <p class="lg:mt-1">
            {{ billingForm[key as keyof SubscriptionBilling] }}
          </p>
        </div>
      </div>
    </div>
    <Button
      v-if="isBillingFormDisplayed"
      :label="$t(`subscriptions.subscription.billing.saveButton`)"
      class="mt-3 lg:w-1/2 lg:mt-auto lg:relative lg:bottom-10"
      outlined
      @click="modifySubscriptionBilling"
    />
    <Button
      v-if="!isBillingFormDisplayed"
      :label="$t(`subscriptions.subscription.billing.editButton`)"
      class="mt-3 lg:w-1/2 lg:mt-auto lg:relative lg:bottom-10"
      outlined
      @click="displayBillingForm"
    />
  </Panel>
</template>

<script setup lang="ts">
const textData = {
  section: 'subscriptions.subscription.billing.',
}
const { isDesktop } = useScreenSize()
const props = defineProps<{
  billing: SubscriptionBilling
}>()
const isBillingFormDisplayed = ref(false)
const emits = defineEmits(['modifyBilling'])
const getBillingKeys = computed(() => Object.keys(props.billing))
const billingForm = reactive<SubscriptionBilling>({
  billingAddress: props.billing.billingAddress,
  billingCity: props.billing.billingCity,
  billingCountry: props.billing.billingCountry,
  billingAddress2: props.billing.billingAddress2,
  billingState: props.billing.billingState,
  billingCif: props.billing.billingCif,
  billingEmail: props.billing.billingEmail,
  billingFirstName: props.billing.billingFirstName,
  billingPhone: props.billing.billingPhone,
  billingLastName: props.billing.billingLastName,
  billingPostCode: props.billing.billingPostCode,
})

const modifySubscriptionBilling = () => {
  emits('modifyBilling', billingForm)
  isBillingFormDisplayed.value = false
}
const displayBillingForm = () => {
  isBillingFormDisplayed.value = true
}
</script>
