<template>
   

<div class="mb-32">
  <Header :title="t('farmers.header.title')" :description="t('farmers.header.description')" background-desktop="'/images/farmers/header.jpg'" />
  <div class="absolute w-full top-[100vh]">
    <TKTopFooterEffect class="lg:!top-0"/>
    <div class="bg-green-tertiary lg:h-[100vh] " />
  </div>
  <div class="w-full lg:h-[100vh] lg:absolute bg-green-quaternary lg:top-[315vh]" />
  
  <Container>
    <div class="w-1/2 ">
      <p class="font-solina-condensed-bold font-bold lg:mt-10 lg:text-[18px] uppercase">{{ t('farmers.title') }}</p>
      <p class="lg:text-[26px] lg:leading-9 lg:my-6">{{ t('farmers.description') }}</p>
    </div>

    <!-- All farmers -->
    <div
     v-for="(farmer, index) in farmers"
        :key="index"
        :class="index === 1 ? '-mt-72' :
                index ===  3 ? '-mt-64' : ''"
        >

      <!-- First Farmer -->
      <div
       
        class="grid grid-cols-3 gap-y-6"
         style="grid-auto-rows: 145px;"
      >
        <div    
          :class="farmer.positionText"
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
        />
      </div>  
    </div>
  </Container>
</div>
   
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();

defineI18nRoute({
  paths: {
    ca: "/agricultors/",
    es: "/agricultores/",
  },
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

const farmers: IFarmer[] = [
        {
          name: t('farmers.gallery.1.title'),
          description: t('farmers.gallery.1.description'),
          positionText: 'col-start-3 row-start-1',
          images: [{
            width: 85,
            height: 490,
            url: '/images/farmers/1.jpg',
            class: 'col-start-1 row-start-1'
          },
          {
            width: 100,
            height: 490,
            url: '/images/farmers/2.jpg',
            class: 'col-start-2 row-start-1 mx-auto'

            },
          {
            width: 100,
            height: 590,
            url: '/images/farmers/3.jpg',
            class: 'col-start-3 row-start-2 row-span-4'
            
          }
        ]
        },
        {
          name: t('farmers.gallery.2.title'),
          description: t('farmers.gallery.2.description'),
          positionText: 'col-start-2 row-start-3 mt-10 text-green-quaternary',
           images: [
            {
              width: 80,
              height: 360,
              url: '/images/farmers/4.jpg',
              class: 'row-start-1 col-span-2 col-start-1 row-span-2 ml-20'
            },
            {
              width: 95,
              height: 520,
              url: '/images/farmers/5.jpg',
              class: 'row-start-3 col-start-1 row-span-4 mt-5'
            },
            {
              width: 100,
              height: 435,
              url: '/images/farmers/6.jpg',
              class: 'row-start-4 col-start-2 mx-auto'
            },
            {
              width: 100,
              height: 620,
              url: '/images/farmers/7.jpg',
              class: 'row-start-3 col-start-3 row-span-3 -mt-10'
            }
           ]
        },
        {
          name: t('farmers.gallery.3.title'),
          description: t('farmers.gallery.3.description'),
          descriptionExtended: t('farmers.gallery.3.description.2'),
          positionText: 'col-start-1 row-start-1',
          images: [
             {
              width: 100,
              height: 490,
              url: '/images/farmers/9.jpg',
              class: 'col-start-2 col-span-2 ml-auto'
            },
            {
              width: 100,
              height: 545,
              url: '/images/farmers/8.jpg',
              class: 'col-start-1 w-11/12 row-span-4'
            }
           
          ]
        },
        {
          name: t('farmers.gallery.4.title'),
          description: t('farmers.gallery.4.description'),
          positionText: 'row-start-4 w-3/4 mx-auto mt-5',
          images: [
            {
              width: 300,
              height: 500,
              url: '/images/farmers/10.jpg',
              class: 'col-start-1 row-start-2 mx-auto row-span-3'
            },
            {
              width: 300,
              height: 486,
              url: '/images/farmers/11.jpg',
              class: 'col-start-2 row-start-1 mx-auto -mt-3'
            },
            {
              width: 300,
              height: 680,
              url: '/images/farmers/12.jpg',
              class: 'col-start-3 row-start-1 mx-auto -mt-6'
            }
          ]
        },
        {
          name: t('farmers.gallery.5.title'),
          description: t('farmers.gallery.5.description'),
          positionText: 'col-start-2 row-start-5 w-5/6 mx-auto',
          images: [
            {
              width: 100,
              height: 650,
              url: '/images/farmers/13.jpg',
              class: 'col-start-1 row-start-1 row-span-4 mx-auto mt-4'
            },
            {
              width: 90,
              height: 600,
              url: '/images/farmers/14.jpg',
              class: 'col-start-2 row-start-1 row-span-4 mx-auto mt-6'
            },
            {
              width: 100,
              height: 575,
              url: '/images/farmers/15.jpg',
              class: 'col-start-3 row-start-1 row-span-4 mx-auto mt-12'
            }
          ]
        }
      ]

</script>