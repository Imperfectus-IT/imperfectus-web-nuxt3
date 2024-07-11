<template>
  <div class="text-[16px] mt-7 leading-6">
    <p class="font-bold">
      {{ $t(`${inputText.fragment}.title`) }}
    </p>
    <p>{{ $t(`${inputText.fragment}.description`) }}</p>
  </div>
  <div class="lg:grid lg:grid-cols-3">
    {{ giveToFriendForm }}
    <InputFriendForm
      v-for="field in inputText.fields"
      :id="$t(`${inputText.fragment}.field_${field}.value`)"
      :label-text="$t(`${inputText.fragment}.field_${field}.label`)"
      :input-class="'text-[15px] !h-14'"
      :label-class="'font-bold text-[15px]'"
      class="mt-5 lg:w-11/12"
      @update-value="(payload: InputPayload) => updateDataFormValue(payload)"
    />
    <TextareaForm
      :id="'comments'"
      :label-text="$t(`${inputText.fragment}.field_9.label`)"
      :label-class="'font-bold text-[15px] mt-5'"
      :textarea-class="'text-[15px] !mt-1 lg:w-11/12'"
      :rows="6"
      class="lg:row-start-4 lg:col-start-1"
      @update-value="(payload: InputPayload) => updateDataFormValue(payload)"
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
import type { GiveToFriendForm, InputPayload } from './types/FormTypes'

const emit = defineEmits(['close-form', 'gift-to-friend'])
const closeForm = () => emit('close-form')
const giftToFriend = () => emit('gift-to-friend', giveToFriendForm)

const isFormCompleted = computed(() => {
  return (
    giveToFriendForm.address !== ''
    && giveToFriendForm.city !== ''
    && giveToFriendForm.cp !== ''
    && giveToFriendForm.email !== ''
    && giveToFriendForm.name !== ''
    && giveToFriendForm.phone !== ''
    && giveToFriendForm.surname !== ''
  )
})

const giveToFriendForm = reactive<GiveToFriendForm>({
  name: '',
  surname: '',
  email: '',
  phone: '',
  address: '',
  addressDetails: '',
  cp: '',
  city: '',
  comments: '',
})

const updateDataFormValue = (payload: InputPayload) => {
  console.log('payload', payload)
  giveToFriendForm[payload.id as keyof GiveToFriendForm] = payload.payload
}

const inputText = {
  fragment: 'upcoming_orders.gift_to_friend',
  fields: 8,
}
</script>
