<template>
   

<div>
  <Header :title="t('farmers.header.title')" :description="t('farmers.header.description')" background-desktop="'/images/farmers/header.jpg'" />
  <Container class="w-1/2">
    <div class="flex flex-col w-1/2 space-y-4">
    <p class="font-solina-condensed-bold font-bold lg:mt-10 lg:text-[18px] uppercase">{{ t('farmers.title') }}</p>
    <p class="lg:text-[26px] lg:leading-7">{{ t('farmers.description') }}</p>
  </div>

  <div 
    v-for="(farmer, index) in farmers"
    :key="index"
    class="mt-8"
    >
    <div class="w-1/3 ml-auto">
      <p class="font-bold">{{ farmer.name }}</p>
      <p class="pt-4">{{ farmer.description }}</p>
   </div>
    <FarmerImg 
      v-for="(image, index) in farmer.images"
      :key="index"
      :image="image"
      :width="image.width"
      :height="image.height"
      class=""
    />
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
  images: Image[]
}

export interface Image {
  url: string,
  width: number,
  height: number
  top?: string,
  left?: string,
  right?: string,
  bottom?: string,
}

const farmers: IFarmer[] = [
        {
          name: t('farmers.gallery.1.title'),
          description: t('farmers.gallery.1.description'),
          images: [{
            width: 28,
            height: 490,
            url: '/images/farmers/1.jpg',
            bottom: '220'
          },
          {
              width: 20,
              height: 490,
              url: '/images/farmers/2.jpg',
              bottom: '220',
              left: '520'
            },
          {
            width: 35,
            height: 590,
            url: '/images/farmers/3.jpg',
            right: '0',
            bottom: '-30'
          
          }
        ]
        },
        {
          name: t('farmers.gallery.2.title'),
          description: t('farmers.gallery.2.description'),
           images: [
          //   {
          //     width: 300,
          //     height: 300,
          //     url: '/images/farmers/4.jpg'
          //   },
          //   {
          //     width: 300,
          //     height: 300,
          //     url: '/images/farmers/5.jpg'
          //   },
          //   {
          //     width: 300,
          //     height: 300,
          //     url: '/images/farmers/6.jpg'
          //   },
          //   {
          //     width: 300,
          //     height: 300,
          //     url: '/images/farmers/7.jpg'
          //   }
           ]
        },
        {
          name: t('farmers.gallery.3.title'),
          description: t('farmers.gallery.3.description'),
          images: [
            // {
            //   width: 300,
            //   height: 300,
            //   url: '/images/farmers/8.jpg'
            // },
            // {
            //   width: 300,
            //   height: 300,
            //   url: '/images/farmers/9.jpg'
            // }
          ]
        },
        {
          name: t('farmers.gallery.4.title'),
          description: t('farmers.gallery.4.description'),
          images: [
            // {
            //   width: 300,
            //   height: 300,
            //   url: '/images/farmers/10.jpg'
            // },
            // {
            //   width: 300,
            //   height: 300,
            //   url: '/images/farmers/11.jpg'
            // },
            // {
            //   width: 300,
            //   height: 300,
            //   url: '/images/farmers/12.jpg'
            // }
          ]
        },
        {
          name: t('farmers.gallery.5.title'),
          description: t('farmers.gallery.5.description'),
          images: [
            // {
            //   width: 300,
            //   height: 300,
            //   url: '/images/farmers/13.jpg'
            // },
            // {
            //   width: 300,
            //   height: 300,
            //   url: '/images/farmers/14.jpg'
            // },
            // {
            //   width: 300,
            //   height: 300,
            //   url: '/images/farmers/15.jpg'
            // }
          ]
        }
      ]

</script>