<template>
  <div class="card flex justify-center">
    <MultiSelect
      v-model="selectedCities"
      :options="cities"
      option-label="name"
      placeholder="Select Cities"
      :max-selected-labels="3"
      class="w-full md:w-[20rem]"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";

const selectedCities = ref();
const cities = ref([
  { name: "New York", code: "NY" },
  { name: "Rome", code: "RM" },
  { name: "London", code: "LDN" },
  { name: "Istanbul", code: "IST" },
  { name: "Paris", code: "PRS" },
]);
</script>
