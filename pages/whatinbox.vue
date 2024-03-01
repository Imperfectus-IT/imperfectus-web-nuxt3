<template>
  <div>
    <Header
      :title="t('layout.navbar.whatinbox')"
      :description="t('content.whatinbox.description')"
      :background-desktop="'/images/whatinbox/whatinbox-banner.webp'"
      class="px-5 pb-16 pt-7 leading-5 lg:leading-8"
    />
    <div class="grid grid-cols-1 lg:grid-cols-4 lg:gap-y-6 lg:gap-x-0">
      <span class="relative mx-auto mt-20 lg:row-start-1 lg:col-span-4">
        <i class="mdi mdi-magnify absolute top-2/4 -mt-2 left-3 text-base" />
        <InputText
        v-model="searchField"
        class="pl-10 rounded-lg "
        type="text"
        :placeholder="t('content.whatinbox.searchPlaceholder')"
        @input="searchProducts"
        />
      </span>
      <ImageTextCard
        v-for="(product, index) in productsToShow"
        :key="index"
        :image="product.image"
        :title="product.name"
        container-class="w-10/12 mx-auto bg-beige-secondary my-5 lg:my-4 rounded-xl"
        image-class="mx-auto py-4 w-11/12 h-[280px] object-cover"
        >
        <template #text>
          <p class="text-center pb-3">{{ product.name }}</p>
        </template>
      </ImageTextCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

defineI18nRoute({
    paths: {
        ca: "/que-hi-ha-a-la-caixa/",
        es: "/que-hay-en-la-caja/",
    },
});

const { t } = useI18n();

const searchField = ref<string>('');

const searchProducts = () => {
  productsToShow.value = products.value.filter((product) => product.name.toLowerCase().includes(searchField.value.toLowerCase()));
};

//DONDE?
interface Product {
  name: string;
  image: string;
}

const products: ComputedRef<Product[]> = computed(() => {
  return [
    {

      name: 'Fresas',
      image: '/images/landing/products/frutas/fresas.webp',
    },
    {
      
      name: 'Ciruela',
      image: '/images/landing/products/frutas/ciruela.webp',
    },
    {
      
      name: 'Kiwi',
      image: '/images/landing/products/frutas/kiwi.webp',
    },
    {
      
      name: 'Mango',
      image: '/images/landing/products/frutas/mango.webp',
    },
    {
      
      name: 'Manzana',
      image: '/images/landing/products/frutas/manzana.webp',
    },
    {
      
      name: 'Naranja',
      image: '/images/landing/products/frutas/naranja.webp',
    },
    {
      
      name: 'Limón',
      image: '/images/landing/products/frutas/limon.webp',
    },
    {
      
      name: 'Acelgas',
      image: '/images/landing/products/verduras/acelgas.webp',
    },
    {
      
      name: 'Alcachofas',
      image: '/images/landing/products/verduras/alcachofas.webp',
    },
    {
      name: 'Acelgas',
      image: '/images/landing/products/verduras/acelgas.webp',
    },
    {
      
      name: 'Alcachofas',
      image: '/images/landing/products/verduras/alcachofas.webp',
    }
  ]
}) 

const productsToShow = ref<Product[]>([...products.value]);

</script>