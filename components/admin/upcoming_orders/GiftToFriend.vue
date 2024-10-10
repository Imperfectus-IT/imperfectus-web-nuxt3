<template>
  <div class="text-[16px] mt-7 leading-6">
    <p class="font-bold">
      {{ $t(`${inputText.fragment}.title`) }}
    </p>
    <p>{{ $t(`${inputText.fragment}.description`) }}</p>
  </div>
  <div class="lg:grid lg:grid-cols-3">
    <InputFriendForm
      v-for="(field, index) in inputText.fields"
      :key="index"
      :name="$t(`${inputText.fragment}.field_${field}.value`)"
      :label-text="$t(`${inputText.fragment}.field_${field}.label`)"
      :input-class="'text-[15px] !h-14'"
      :label-class="'font-bold text-[15px]'"
      class="mt-5 lg:w-11/12"
      @update-value="updateDataFormValue"
    />
    <TextareaForm
      :name="'shippingNotes'"
      :label-text="$t(`${inputText.fragment}.field_10.label`)"
      :label-class="'font-bold text-[15px]'"
      :textarea-class="'text-[15px] !mt-1 lg:w-11/12'"
      :rows="6"
      class="lg:row-start-4 lg:col-start-1"
      @update-value="updateDataFormValue"
    />
  </div>
  <div class="mt-5 mb-2 flex flex-row gap-2">
    <Button
      :disabled="!isFormCompleted"
      primary
      :label="$t(`${inputText.fragment}.gift_button`)"
      @click="giftToFriend"
    />
    <Button
      outlined
      :label="$t(`${inputText.fragment}.cancel_button`)"
      @click="closeForm"
    />
  </div>
</template>

<script setup lang="ts">
import type { InputPayload } from './types/FormTypes'
import type { SubscriptionShipping } from '~/composables/admin/subscriptions/domain/SubscriptionTypes.ts'

const emit = defineEmits(['close-form', 'gift-to-friend'])
const closeForm = () => emit('close-form')
const giftToFriend = () => emit('gift-to-friend', giveToFriendForm)

const isFormCompleted = computed(() => {
  return (
    giveToFriendForm.shippingAddress !== ''
    && giveToFriendForm.shippingCity !== ''
    && giveToFriendForm.shippingPostCode !== ''
    && giveToFriendForm.shippingEmail !== ''
    && giveToFriendForm.shippingFirstName !== ''
    && giveToFriendForm.shippingPhone !== ''
    && giveToFriendForm.shippingLastName !== ''
  )
})

const giveToFriendForm = reactive<SubscriptionShipping>({
  shippingState: '',
  shippingCountry: 'ES',
  shippingAddress2: '',
  shippingAddress: '',
  shippingCity: '',
  shippingNotes: '',
  shippingLastName: '',
  shippingEmail: '',
  shippingFirstName: '',
  shippingPhone: '',
  shippingPostCode: '',
})

const updateDataFormValue = (payload: InputPayload) => {
  giveToFriendForm[payload.name as keyof SubscriptionShipping] = payload.data
}

const inputText = {
  fragment: 'upcoming_orders.gift_to_friend',
  fields: 9,
}
</script>
