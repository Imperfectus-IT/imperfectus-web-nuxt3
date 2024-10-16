<template>
  <div
    class="border-green-tertiary border-[1px] rounded-lg p-4 mt-6 flex flex-col justify-center"
  >
    <h4 class="font-recoleta-medium text-[25px]">
      {{ $t("profile.my_account.preferred_products.title") }}
    </h4>
    <Divider />
    <div v-if="componentLayers.mainView">
      <div class="lg:flex lg:flex-row lg:gap-5">
        <div class="flex flex-col w-full">
          <p class="mt-2 lg:mt-0">
            {{ $t("profile.my_account.preferred_products.fruits.title") }}
          </p>
          <MultiSelect
            v-model="preferredProducts.fruits"
            :options="fruitsItemProducts"
            filter
            :option-label="`name${getLocaleLanguage}`"
            option-value="id"
            :placeholder="$t('profile.my_account.preferred_products.fruits.placeholder')"
            :selection-limit="2"
            class="w-full border-[1px] rounded-md text-[16px] mt-3"
          />
        </div>
        <div class="flex flex-col w-full">
          <p class="mt-6 lg:mt-0">
            {{ $t("profile.my_account.preferred_products.vegetables.title") }}
          </p>
          <MultiSelect
            v-model="preferredProducts.vegetables"
            :options="vegetablesItemProducts"
            filter
            :option-label="`name${getLocaleLanguage}`"
            option-value="id"
            :placeholder="
              $t('profile.my_account.preferred_products.vegetables.placeholder')
            "
            :selection-limit="2"
            class="w-full border-[1px] rounded-md text-[16px] mt-3"
          />
        </div>
      </div>
      <div class="lg:flex lg:flex-row lg:justify-between lg:mt-5">
        <p class="mt-6">
          {{ $t("profile.my_account.preferred_products.paragraph_1") }}
        </p>
        <div class="flex flex-col items-center">
          <Button
            :disabled="disabledButton"
            outlined
            :label="$t('profile.my_account.preferred_products.save_preferred')"
            class="w-3/4 mt-5 mb-3 lg:h-10 lg:w-full"
            @click="savePreferredProducts"
          />
        </div>
      </div>
    </div>

    <div
      v-if="componentLayers.confirmView"
      class="w-full flex items-center flex-col"
    >
      <p class="whitespace-normal">
        {{
          $t("profile.my_account.preferred_products.saved_paragraph", {
            products:
              preferredProducts.fruits.join(", ")
              + preferredProducts.vegetables.join(", "),
          })
        }}
      </p>
      <Button
        class="w-3/4 mt-5 mb-3"
        outlined
        :label="$t('profile.my_account.preferred_products.modify_button')"
        @click="toggleComponentLayers()"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const { locale } = useI18n()
const savePreferredProducts = () => {
  // @TODO fetch API
  return toggleComponentLayers()
}

const getLocaleLanguage = computed(() => {
  return locale.value === 'es' ? 'Es' : 'Ca'
})

const toggleComponentLayers = () => {
  componentLayers.confirmView = !componentLayers.confirmView
  componentLayers.mainView = !componentLayers.mainView
}

const preferredProducts = reactive({
  fruits: [],
  vegetables: [],
})

const disabledButton = computed(() => {
  return (
    preferredProducts.fruits.length === 0
    && preferredProducts.vegetables.length === 0
  )
})

const componentLayers = reactive({
  mainView: true,
  confirmView: false,
})

const { fruitsItemProducts, vegetablesItemProducts } = useProductsState()
</script>
