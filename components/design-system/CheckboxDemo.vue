<template>
  <div class="flex flex-wrap justify-center gap-3">
    <div class="flex items-center">
      <Checkbox
        v-model="noChecked"
        :binary="true"
      />
      <label
        for="ingredient1"
        class="ml-2"
      > Binario </label>
    </div>
    <div class="flex items-center">
      <Checkbox
        v-model="checked"
        :binary="true"
      />
      <label
        for="ingredient1"
        class="ml-2"
      > Binario Checked </label>
    </div>
    <div class="flex items-center">
      <Checkbox
        v-model="pizza"
        input-id="ingredient2"
        name="pizza"
        value="Mushroom"
      />
      <label
        for="ingredient2"
        class="ml-2"
      >Value</label>
    </div>
    <div class="flex items-center">
      <Checkbox
        v-model="pizza"
        input-id="ingredient2"
        name="pizza"
        value="Mushroom"
        disabled
      />
      <label
        for="ingredient2"
        class="ml-2"
      > Disabled </label>
    </div>
    <div class="flex items-center">
      <Checkbox
        v-model="checked"
        :binary="true"
        disabled
      />
      <label
        for="ingredient2"
        class="ml-2"
      > Disabled Checked</label>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const checked = ref(true);
const noChecked = ref(false);
const pizza = ref();
</script>
