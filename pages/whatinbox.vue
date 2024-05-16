<template>
  <div>
    <Header
      :title="t('layout.navbar.whatinbox')"
      :description="t('content.whatinbox.description')"
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
          :placeholder="t('content.whatinbox.searchPlaceholder')"
        />
      </span>
      <ImageTextCard
        v-for="(product, index) in productsToShow"
        :key="index"
        :image="product?.image"
        :title="product?.name"
        container-class="w-10/12 mx-auto bg-beige-secondary my-5 lg:my-4 rounded-xl"
        image-class="mx-auto py-4 w-[250px] h-[250px] object-cover"
      >
        <template #text>
          <p class="text-center pb-3">
            {{ product?.name }}
          </p>
        </template>
      </ImageTextCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

defineI18nRoute({
  paths: {
    ca: '/que-hi-ha-a-la-caixa/',
    es: '/que-hay-en-la-caja/',
  },
})

const { t } = useI18n()

const searchField = ref<string>('')
const products = useGetProductsHandler().products.value.itemProducts
const activeProducts = ref<Product[]> ([...products.fruits, ...products.vegetables].filter(product => product.isActive))

const productsToShow: ComputedRef<Product[]> = computed(() => {
  if (searchField.value) {
    return activeProducts.value.filter(product => product.name.toLowerCase().includes(searchField.value.toLowerCase()))
  }
  else {
    return activeProducts.value
  }
})

type Product = {
  name: string
  image: string
}
</script>
