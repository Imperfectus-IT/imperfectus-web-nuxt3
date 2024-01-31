<template>
  <div class="flex flex-wrap justify-center gap-3">
    <span class="relative">
      <i class="mdi mdi-magnify absolute top-2/4 -mt-2 left-3 text-base" />
      <InputText
        v-model="value1"
        class="pl-10 rounded-xl"
        type="text"
        placeholder="Search"
      />
    </span>

    <span class="relative">
      <InputText
        v-model="value2"
        class="rounded-xl"
        type="text"
        placeholder="Escribe"
      />
    </span>
    <span class="relative">
      <InputText
        v-model="value2"
        class="rounded-none border-0 border-b border-green-tertirary"
        type="text"
        placeholder="Tu email"
      />
    </span>
    <div class="flex flex-col gap-2">
      <label for="username">Username</label>
      <InputText
        id="username"
        v-model="value1"
        class="rounded-xl"
        aria-describedby="username-help"
      />
      <small id="username-help">Enter your username to reset your password.</small>
    </div>
    <span class="relative">
      <InputText
        v-model="value1"
        class="rounded-xl mb-3"
        disabled
        placeholder="Disabled"
      />
    </span>
  </div>
</template>

<script setup>
import { ref } from "vue";

const value1 = ref(null);
const value2 = ref(null);
</script>
