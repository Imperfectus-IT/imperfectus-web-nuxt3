<template>
<div class="lg:mb-32">
  <Header :title="t('farmers.header.title')" :description="t('farmers.header.description')" background-desktop="'/images/farmers/header.jpg'" />
  <div v-if="displayDesktop">
    <div class="absolute w-full top-[100vh]">
    <TKTopFooterEffect class="lg:!top-0"/>
    <div class="bg-green-tertiary lg:h-[100vh] " />
  </div>
  <div class="w-full lg:h-[100vh] lg:absolute bg-green-quaternary lg:top-[315vh]" />
  </div>
  
  <Container>
    <div class="w-11/12 ml-4 mt-12 lg:w-1/2 lg:ml-0">
      <p class="mt-6 text-[18px] font-solina-condensed-bold font-bold lg:mt-10 lg:text-[18px] uppercase">{{ t('farmers.title') }}</p>
      <p class="my-10 leading-8 text-[26px] lg:leading-9">{{ t('farmers.description') }}</p>
    </div>

    <!-- All farmers -->
    <div
     v-for="(farmer, index) in farmers"
        :key="index"
        :class="index === 1 ? 'lg:-mt-72' :
                index ===  3 ? 'lg:-mt-64' : ''"
        >

      <!-- First Farmer -->
      <div
        class="flex flex-col gap-y-2 lg:grid lg:grid-cols-3 lg:gap-y-6"
         style="grid-auto-rows: 145px;"
      >
        <div    
          :class="farmer.positionText"
          class="ml-4 my-6 w-11/12 lg:ml-0 lg:my-0"
        >
          <p class="font-bold">{{ farmer.name }}</p>
          <p class="pt-4">{{ farmer.description }}</p>
          <p>{{ farmer.descriptionExtended }}</p>
        </div>
        <FarmerImg 
          v-for="(image, index) in farmer.images"
          :key="index"
          :image="image"
          :class="image.class"
          loading="lazy"
          format="webp"
          :alt="image.url"
        />
      </div>  
    </div>
  </Container>
</div>
   
</template>

<script setup lang="ts">
import { displayPartsToString } from "typescript";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const displayDesktop = ref(false);

defineI18nRoute({
  paths: {
    ca: "/agricultors/",
    es: "/agricultores/",
  },
});

onMounted(() => {
  if (process.client) {
    displayDesktop.value = window.innerWidth > 768;
  }
});
interface IFarmer {
  name: string;
  description: string;
  descriptionExtended?: string;
  positionText: string;
  images: Image[]
}

export interface Image {
  url: string,
  width: number,
  height: number,
  class: string,
  top?: string,
  left?: string,
  right?: string,
  bottom?: string,
}

const farmers = computed<IFarmer[]>(() => [
        {
          name: t('farmers.gallery.1.title'),
          description: t('farmers.gallery.1.description'),
          positionText: 'lg:col-start-3 lg:row-start-1 order-3',
          images: [{
            width: displayDesktop.value ? 85 : 95,
            height: displayDesktop.value ? 490 : 460,
            url: '/images/farmers/1.jpg',
            class: 'ml-1.5 lg:col-start-1 lg:row-start-1 order-1'
          },
          {
            width: 95,
            height: displayDesktop.value ? 490 : 630,
            url: '/images/farmers/2.jpg',
            class: 'ml-1.5 lg:mx-auto lg:col-start-2 lg:row-start-1 order-2'

            },
          {
            width: displayDesktop.value ? 100 : 95,
            height: displayDesktop.value ? 590 : 530,
            url: '/images/farmers/3.jpg',
            class: 'ml-2 lg:ml-0 lg:col-start-3 lg:row-start-2 lg:row-span-4 order-4'
            
          }
        ]
        },
        {
          name: t('farmers.gallery.2.title'),
          description: t('farmers.gallery.2.description'),
          positionText: 'lg:col-start-2 lg:row-start-3 lg:mt-10 lg:text-green-quaternary order-5',
           images: [
            {
              width: displayDesktop.value ? 80 : 95,
              height: displayDesktop.value ? 360 : 220,
              url: '/images/farmers/4.jpg',
              class: 'ml-1.5 mt-1.5 lg:mt-0 lg:row-start-1 lg:row-span-2 lg:col-start-1 lg:col-span-2 lg:ml-20'
            },
            {
              width: 95,
              height: displayDesktop.value ? 520 : 425,
              url: '/images/farmers/5.jpg',
              class: 'ml-1.5 lg:ml-0 lg:row-start-3 lg:col-start-1 lg:row-span-4 lg:mt-5'
            },
            {
              width: displayDesktop.value ? 100 : 95,
              height: 435,
              url: '/images/farmers/6.jpg',
              class: 'ml-1.5 lg:row-start-4 lg:col-start-2 lg:mx-auto'
            },
            {
              width: displayDesktop.value ? 100 : 95,
              height: displayDesktop.value ? 620 : 435,
              url: '/images/farmers/7.jpg',
              class: 'ml-1.5 lg:ml-0 lg:row-start-3 lg:col-start-3 lg:row-span-3 lg:-mt-10'
            }
           ]
        },
        {
          name: t('farmers.gallery.3.title'),
          description: t('farmers.gallery.3.description'),
          descriptionExtended: t('farmers.gallery.3.description.2'),
          positionText: 'lg:col-start-1 lg:row-start-1 order-3',
          images: [
             {
              width: displayDesktop.value ? 100 : 95,
              height: displayDesktop.value ? 490 : 210,
              url: '/images/farmers/9.jpg',
              class: ' ml-1.5 lg:col-start-2 lg:col-span-2 lg:ml-auto'
            },
            {
              width: displayDesktop.value ? 100 : 95,
              height: displayDesktop.value ? 545 : 469,
              url: '/images/farmers/8.jpg',
              class: 'ml-1.5 lg:ml-0 lg:col-start-1 lg:w-11/12 lg:row-span-4'
            }
           
          ]
        },
        {
          name: t('farmers.gallery.4.title'),
          description: t('farmers.gallery.4.description'),
          positionText: 'lg:row-start-4 lg:w-3/4 lg:mx-auto lg:-mt-7 order-4',
          images: [
            {
              width: displayDesktop.value ? 100 : 95,
              height: 500,
              url: '/images/farmers/10.jpg',
              class: 'ml-1.5 lg:ml-0 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:row-span-3 order-1'
            },
            {
              width: displayDesktop.value ? 100 : 95,
              height: displayDesktop.value ? 486 : 536,
              url: '/images/farmers/11.jpg',
              class: 'ml-1.5 lg:ml-0 lg:col-start-2 lg:row-start-1 lg:mx-auto lg:-mt-3 order-3'
            },
            {
              width: displayDesktop.value ? 100 : 95,
              height: displayDesktop.value ? 680 : 565,
              url: '/images/farmers/12.jpg',
              class: 'ml-1.5 lg:col-start-3 lg:row-start-1 lg:mx-auto lg:-mt-6 order-2'
            }
          ]
        },
        {
          name: t('farmers.gallery.5.title'),
          description: t('farmers.gallery.5.description'),
          positionText: 'lg:col-start-2 lg:row-start-5 lg:w-5/6 lg:!mx-auto order-4',
          images: [
            {
              width: displayDesktop.value ? 100 : 95,
              height: displayDesktop.value ? 650 : 536,
              url: '/images/farmers/13.jpg',
              class: 'ml-1.5 lg:ml-0 lg:col-start-1 lg:row-start-1 lg:row-span-4 lg:mx-auto lg:mt-4 order-1'
            },
            {
              width: displayDesktop.value ? 90 : 95,
              height: displayDesktop.value ? 600 : 536,
              url: '/images/farmers/14.jpg',
              class: 'ml-1.5 lg:mx-auto lg:col-start-2 lg:row-start-1 lg:row-span-4 lg:mx-auto lg:mt-6 order-3'
            },
            {
              width: displayDesktop.value ? 100 : 95,
              height: displayDesktop.value ? 575 : 714,
              url: '/images/farmers/15.jpg',
              class: 'ml-1.5 lg:ml-auto lg:col-start-3 lg:row-start-1 lg:row-span-4 lg:mt-16 order-2'
            }
          ]
        }
      ])

</script>