<template>
  <div
    class="border-green-tertiary border-[1px] rounded-lg p-4 m-6 flex flex-col justify-center"
  >
    <h4 class="font-recoleta-regular text-[30px]">
      {{ $t("profile.my_acount.preferred_products.title") }}
    </h4>
    <Divider />

    <div v-if="componentLayers.mainView" >
      <p class="mt-2">
        {{ $t("profile.my_acount.preferred_products.fruits.title") }}
      </p>
      <MultiSelect
        v-model="preferredProducts.fruits"
        :options="fruits"
        filter
        option-label="label"
        option-value="value"
        :placeholder="
          $t('profile.my_acount.preferred_products.fruits.placeholder')
        "
        :selection-limit="2"
        class="w-full md:w-20rem border-[1px] rounded-md text-[16px] mt-3"
      />
      <p class="mt-6">
        {{ $t("profile.my_acount.preferred_products.vegetables.title") }}
      </p>
      <MultiSelect
        v-model="preferredProducts.vegetables"
        :options="vegetables"
        filter
        option-label="label"
        option-value="value"
        :placeholder="
          $t('profile.my_acount.preferred_products.vegetables.placeholder')
        "
        :selection-limit="2"
        class="w-full md:w-20rem border-[1px] rounded-md text-[16px] mt-3"
      />
      <p class="mt-6">
        {{ $t("profile.my_acount.preferred_products.paragraph_1") }}
      </p>
      <div class="flex flex-col items-center">
        <Button
          :disabled="disabledButton"
          outlined
          :label="$t('profile.my_acount.preferred_products.save_preferred')"
          class="w-3/4 mt-5 mb-3"
          @click="savePreferredProducts"
        />
      </div>
    </div>

    <div v-if="componentLayers.confirmView" class="w-full flex items-center flex-col">
      <p class="whitespace-normal">{{ $t('profile.my_acount.preferred_products.saved_paragraph', {products: preferredProducts.fruits.join(', ') + preferredProducts.vegetables.join(', ')}) }}</p>
      <Button class="w-3/4 mt-5 mb-3" outlined :label="$t('profile.my_acount.preferred_products.modify_button')" @click="toggleComponentLayers()" />
    </div>
  </div>
</template>

<script setup lang="ts">
const savePreferredProducts = () => {
  // TODO fetch API
  console.log("Fetching API...");
  return toggleComponentLayers();
};

const toggleComponentLayers = () => {
  componentLayers.confirmView = !componentLayers.confirmView;
  componentLayers.mainView = !componentLayers.mainView;
};

const preferredProducts = reactive({
  fruits: [],
  vegetables: [],
});

const disabledButton = computed(() => {
  return (
    preferredProducts.fruits.length === 0 &&
    preferredProducts.vegetables.length === 0
  );
});

const componentLayers = reactive({
  mainView: true,
  confirmView: false,
});

const fruits = [
  {
    label: "Manzana",
    value: "manzana",
  },
  {
    label: "Plátano",
    value: "plátano",
  },
  {
    label: "Naranja",
    value: "naranja",
  },
];
const vegetables = [
  {
    label: "Zanahoria",
    value: "zanahoria",
  },
  {
    label: "Pepino",
    value: "zanahoria",
  },
  {
    label: "Calabacín",
    value: "calabacín",
  },
];
</script>
