<template>
  <div>
    <Header
      :title="$t('layout.navbar.whatinbox')"
      :description="$t('content.whatinbox.description')"
      :background-desktop="'/images/whatinbox/whatinbox-banner.webp'"
      class="px-5 pb-16 pt-7 leading-5 lg:leading-8 "
    />
    <div class="grid grid-cols-1 lg:grid-cols-4 lg:gap-y-6 lg:gap-x-0 xl:w-11/12 2xl:w-11/12 lg:mx-auto">
      <span class="relative mx-auto mt-10 mb-6 lg:mt-20 lg:row-start-1 lg:col-span-4">
        <i class="mdi mdi-magnify absolute top-2/4 -mt-2 left-3 text-base" />
        <InputText
          v-model="searchField"
          type="text"
          :pt="{
            root: 'w-[80vw] lg:w-[50vw] border-[1px] border-grey-primary pl-10 py-2 rounded-lg',
          }"
          :placeholder="$t('content.whatinbox.searchPlaceholder')"
        />
      </span>
      <ImageTextCard
        v-for="(product, index) in productsToShow"
        :key="index"
        :image="product?.image"
        container-class="w-10/12 mx-auto bg-beige-secondary my-5 lg:my-4 rounded-xl"
        image-class="mx-auto w-[250px] h-[250px] object-cover"
      >
        <template #text>
          <p class="text-center pb-3">
            {{ product[`name${language}`] }}
          </p>
        </template>
      </ImageTextCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineI18nRoute({
  paths: {
    ca: '/que-hi-ha-a-la-caixa/',
    es: '/que-hay-en-la-caja/',
  },
})

useHead({
  title: t('pages.whatinbox.title'),
  meta: [
    {
      name: 'description',
      content: t('pages.whatinbox.description'),
    },
  ],
})

const { activeItemProducts } = useProductsState()
const { locale } = useI18n()
const searchField = ref<string>('')
const language = computed(() => locale.value === 'ca' ? 'Ca' : 'Es')

const productsToShow: ComputedRef<ItemProduct[]> = computed(() => {
  if (searchField.value) {
    return activeItemProducts.value.filter(product => product[`name${language.value}`].toLowerCase().includes(searchField.value.toLowerCase()))
  }
  else {
    return activeItemProducts.value
  }
})
</script>
