<template>
  <div class="flex flex-wrap justify-center">
    <div class="flex flex-col items-center">
      <h3 class="text-lg">Basic Rating</h3>
      <Rating v-model="value" />
    </div>
    <div class="flex flex-col items-center">
      <h3 class="text-lg">Basic Rating without cancel</h3>
      <Rating v-model="value" :cancel="false" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const value = ref(null);
</script>
