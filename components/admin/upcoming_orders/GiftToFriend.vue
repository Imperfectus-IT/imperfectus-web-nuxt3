<template>
  <div class="text-[16px] mt-7 leading-6">
    <p class="font-bold">{{ $t(`${inputText.fragment}.title`) }}</p>
    <p>{{ $t(`${inputText.fragment}.description`) }}</p>
  </div>
  <InputFriendForm
    v-for="field in inputText.fields"
    @update-value="(payload: Payload) => updateDataFormValue(payload)"
    :label-text="$t(`${inputText.fragment}.field_${field}.label`)"
    :id="$t(`${inputText.fragment}.field_${field}.value`)"
    :input-class="'text-[15px] !h-14'"
    :label-class="'font-bold text-[15px]'"
    class="mt-5"
  />
  <TextareaForm
    :id="'comments'"
    :label-text="$t(`${inputText.fragment}.field_9.label`)"
    :label-class="'font-bold text-[15px] mt-5'"
    :textarea-class="'text-[15px] !mt-1'"
    :rows="6"
    @update-value="(payload: Payload) => updateDataFormValue(payload)"
  />
  <div class="mt-5 mb-2 flex flex-row gap-2">
    <Button primary :label="$t(`${inputText.fragment}.gift_button`)" />
    <Button outlined @click="closeForm" :label="$t(`${inputText.fragment}.cancel_button`)" />
  </div>
</template>

<script setup lang="ts">
import type { FriendForm, Payload } from "./types/FormTypes";

const emit = defineEmits(["close-form"]);
const closeForm = () => emit("close-form");

const formData: FriendForm = reactive({
  name: "",
  surname: "",
  email: "",
  phone: "",
  address: "",
  addressDetails: "",
  cp: "",
  city: "",
  comments: "",
});

const updateDataFormValue = (payload: Payload) => {
  formData[payload.id as keyof FriendForm] = payload.payload;
};

const inputText = {
  fragment: "upcoming_orders.gift_to_friend",
  fields: 8,
};
</script>
