<template>
  <div
    class="border-green-tertiary border-[1px] rounded-lg p-4 mt-6 flex flex-col justify-center"
  >
    <h4 class="font-recoleta-medium text-[25px]">
      {{ $t("profile.my_account.preferred_products.title") }}
    </h4>
    <Divider />
    <div class="lg:flex lg:flex-row lg:gap-5">
      <div class="flex flex-col w-full">
        <p class="mt-2 lg:mt-0">
          {{ $t("profile.my_account.preferred_products.fruits.title") }}
        </p>
        <MultiSelect
          v-model="preferredProducts.fruits"
          :options="sortedFruits"
          filter
          :option-disabled="(item: ItemProduct) => isItemsFruitsDisabled && !preferredProducts.fruits?.includes(item.id as number)"
          :option-label="`name${getLocaleLanguage}`"
          option-value="id"
          :selection-limit="2"
          :placeholder="$t('profile.my_account.preferred_products.fruits.placeholder')"
          class="w-full border-[1px] rounded-md text-[16px] mt-3"
          :pt-options="{
            mergeProps: true,
            mergeSections: true,
          }"
          :pt="{
            itemCheckbox: {
              box: ({ context }) => ({
                class: ['border-2 rounded-md w-6 h-6 flex items-center justify-center', { 'opacity-60': !context.checked && isItemsFruitsDisabled }],
              }),
              input: ({ context }) => ({
                class: ['peer w-full h-full absolute top-0 left-0 z-10 p-0 m-0 opacity-0 rounded-md outline-none border-2 border-green-tertiary appareance-none cursor-pointer', { '!cursor-not-allowed': !context.checked && isItemsFruitsDisabled }],
              }),
            },
          }"
        >
          <template #option="{ option }">
            <div class="flex items-center ">
              <span :class=" isItemsFruitsDisabled && !preferredProducts.fruits.includes(option.id) ? 'opacity-60' : ''">
                {{ option[`name${getLocaleLanguage}`] }}
              </span>
            </div>
          </template>
        </MultiSelect>
      </div>
      <div class="flex flex-col w-full">
        <p class="mt-6 lg:mt-0">
          {{ $t("profile.my_account.preferred_products.vegetables.title") }}
        </p>

        <MultiSelect
          v-model="preferredProducts.vegetables"
          :options="sortedVegetables"
          filter
          :option-disabled="(item: ItemProduct) => isItemsVegetablesDisabled && !preferredProducts.vegetables.includes(item.id as number)"
          :option-label="`name${getLocaleLanguage}`"
          option-value="id"
          :selection-limit="2"
          :placeholder="$t('profile.my_account.preferred_products.fruits.placeholder')"
          class="w-full border-[1px] rounded-md text-[16px] mt-3"
          :pt-options="{
            mergeProps: true,
            mergeSections: true,
          }"
          :pt="{
            itemCheckbox: {
              box: ({ context }) => ({
                class: ['border-2 rounded-md w-6 h-6 flex items-center justify-center', { 'opacity-60': !context.checked && isItemsVegetablesDisabled }],
              }),
              input: ({ context }) => ({
                class: ['peer w-full h-full absolute top-0 left-0 z-10 p-0 m-0 opacity-0 rounded-md outline-none border-2 border-green-tertiary appareance-none cursor-pointer', { '!cursor-not-allowed': !context.checked && isItemsVegetablesDisabled }],
              }),
            },
          }"
        >
          <template #option="{ option }">
            <div class="flex items-center ">
              <span :class=" isItemsVegetablesDisabled && !preferredProducts.vegetables.includes(option.id) ? 'opacity-60 !cursor-not-allowed' : ''">
                {{ option[`name${getLocaleLanguage}`] }}
              </span>
            </div>
          </template>
        </MultiSelect>
      </div>
    </div>
    <div class="lg:flex lg:flex-row lg:justify-between lg:mt-5">
      <p class="mt-6">
        {{ $t("profile.my_account.preferred_products.paragraph_1") }}
      </p>
      <div class="flex flex-col items-center">
        <Button
          outlined
          :label="$t('profile.my_account.preferred_products.save_preferred')"
          class="w-3/4 mt-5 mb-3 lg:h-10 lg:w-full"
          @click="savePreferredProducts"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { locale } = useI18n()
const { fruitsItemProducts, vegetablesItemProducts } = useProductsState()
const { handleSetPreferredProducts } = useSetPreferredProductsHandler()
const props = defineProps<{
  user: User
}>()

const getLanguage = computed(() => locale.value === 'es' ? 'Es' : locale.value === 'ca' ? 'Ca' : 'Pt')
const sortedFruits = computed(() => {
  return [...fruitsItemProducts.value].sort((a, b) => a[`name${getLanguage.value}`].localeCompare(b[`name${getLanguage.value}`]))
})

const sortedVegetables = computed(() => {
  return [...vegetablesItemProducts.value].sort((a, b) => a[`name${getLanguage.value}`].localeCompare(b[`name${getLanguage.value}`]))
})

const savePreferredProducts = async () => {
  await handleSetPreferredProducts(props.user.id, preferredProducts)
}

const getLocaleLanguage = computed(() => {
  return locale.value === 'es' ? 'Es' : 'Ca'
})

const preferredProducts = reactive({
  fruits: [] as number [],
  vegetables: [] as number [],
})

const isItemsFruitsDisabled = computed(() => preferredProducts.fruits.length >= 2)
const isItemsVegetablesDisabled = computed(() => preferredProducts.vegetables.length >= 2)

watch(() => props.user, (newUser) => {
  if (newUser) {
    preferredProducts.fruits = newUser.preferredProducts?.fruits || []
    preferredProducts.vegetables = newUser.preferredProducts?.vegetables || []
  }
}, { immediate: true })
</script>
