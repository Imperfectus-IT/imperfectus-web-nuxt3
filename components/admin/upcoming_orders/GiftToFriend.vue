<template>
  <div class="text-[16px] mt-7 leading-6">
    <p class="font-bold">{{ $t(`${inputText.fragment}.title`) }}</p>
    <p>{{ $t(`${inputText.fragment}.description`) }}</p>
  </div>
  <div class="lg:grid lg:grid-cols-3">
    <InputFriendForm
      v-for="field in inputText.fields"
      @update-value="(payload: InputPayload) => updateDataFormValue(payload)"
      :label-text="$t(`${inputText.fragment}.field_${field}.label`)"
      :id="$t(`${inputText.fragment}.field_${field}.value`)"
      :input-class="'text-[15px] !h-14'"
      :label-class="'font-bold text-[15px]'"
      class="mt-5 lg:w-11/12"
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
      @click="giftToFriend"
      :label="$t(`${inputText.fragment}.gift_button`)"
    />
    <Button
      outlined
      @click="closeForm"
      :label="$t(`${inputText.fragment}.cancel_button`)"
    />
  </div>
</template>

<script setup lang="ts">
import type { FriendForm, InputPayload } from "./types/FormTypes";

const emit = defineEmits(["close-form", "gift-to-friend"]);
const closeForm = () => emit("close-form");
const giftToFriend = () => emit("gift-to-friend", formData);

const isFormCompleted = computed(() => {
  return (
    formData.address !== "" &&
    formData.city !== "" &&
    formData.cp !== "" &&
    formData.email !== "" &&
    formData.name !== "" &&
    formData.phone !== "" &&
    formData.surname !== ""
  );
});

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

const updateDataFormValue = (payload: InputPayload) => {
  formData[payload.id as keyof FriendForm] = payload.data;
};

const inputText = {
  fragment: "upcoming_orders.gift_to_friend",
  fields: 8,
};
</script>
