<script setup lang="ts">
import { ref } from "vue";

const value = ref(null);
</script>

<template>
  <div class="flex flex-wrap justify-center gap-3">
    <h3 class="text-xl">Password input</h3>
    <Password v-model="value" :feedback="false" />
    <Password disabled placeholder="Disabled" />
    <Password
      v-model="value"
      class="mb-5"
      prompt-label="Escribe una contraseña"
      weak-label="Simple"
      medium-label="Medio"
      strong-label="Compleja"
    />
    <Password v-model="value" prompt-label="Escribe una contraseña">
      <template #footer>
        <Divider />
        <ul
          class="p-0 pl-2 m-0 ml-2 list-disc leading-6"
          style="line-height: 1.5"
        >
          <li>At least one lowercase</li>
          <li>At least one uppercase</li>
          <li>At least one numeric</li>
          <li>Minimum 8 characters</li>
        </ul>
      </template>
    </Password>
  </div>
</template>
