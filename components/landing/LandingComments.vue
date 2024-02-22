<template>
  <div
class="my-4 leading-10 bg-green-tertiary pb-10 mb-10 
lg:flex lg:flex-row lg:justify-between lg:px-4 lg:items-center lg:pr-28">
<h2 class="mx-7 font-recoleta-regular text-[35px] text-green-primary mt-10 mb-6 lg:text-[67px] lg:leading-tight lg:w-1/3 lg:pl-20 lg:py-20">
  {{ $t('homeTribe.title') }}
</h2>

<TKCarousel
:carousel-class="'lg:w-1/3 lg:mt-6 lg:items-center'"
:data="reviews"
:show-navigation="false"
:slide-class="'w-5/6 h-[400px] lg:w-full lg:mt-6  lg:h-[300px]'"
:slot-class="'min-h-[200px]'"
:autoplay="3000"
>
<template #SlideContent="{ item }">
  <div class=" bg-beige-primary h-full rounded-lg leading-6 text-left pl-2 mb-3 lg:p-3">
    
      <div class=" w-full bg-beige-primary flex flex-row items-center">
        <Rating
        class="py-2 "
        
        :model-value="item.rating"
        :cancel="false"
        />
        <span class="mdi mdi-check-decagram text-lg ml-4 text-blue-primary"></span>
        <NuxtImg
          src="/images/logos/landing/google-mini.webp"
          class="w-5 h-5 ml-auto mr-4"
          />
            </div>
          
          <p>
            {{ item.description }}
          </p>
        </div>
        <div class="flex flex-row">
          <NuxtImg
            :src="item.authorPhoto"
            :alt="item.name"
            class="rounded-full "
          />
          <div class="flex flex-col leading-6 justify-center ml-3">
            <p class="text-left text-green-primary">
              {{ item.name }}
            </p>
            <p class="text-left text-white">
              {{ item.relativeTime }}
            </p>
          </div>
        </div>
      </template>
    </TKCarousel>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import type { CarouselSlideObject } from '../talkual-ui/TKCarousel/TKCarouselTypes';
const { t } = useI18n();

const reviews: CarouselSlideObject[] = [
  {
    index: 1,
    description: "Cada semana lo recibimos y es una MUY buena opción para el desperdicio alimentario y para nosotros es muy reconfortante tener fruta y verdura de temporada a precio JUsTO!!\nLo recomiendo. Es una buena iniciativa.",
    rating: 5,
    name: "familia codijimi",
    authorPhoto: "https://lh3.googleusercontent.com/a-/ALV-UjXNM8TZYv4yCLJNAkfQ2AvAQ-1_uL6COVpREWZdirBu21Q=s128-c0x00000000-cc-rp-mo",
    relativeTime: "Hace 3 semanas"
  },
  {
    index: 2,
    description: "Ya van varias cajas y puedo decir que el producto es bueno y simplemente no cumple con la estetica de los supermercados pero supera con creces su calidad.\nEstoy totalmente satisfecha.\n\nMi primera caja y estoy encantada, buena calidad, facilidad de entrega, una buena causa, tips de conservacion y receta...se puede pedir más?",
    rating: 5,
    name: "Annadirri",
    authorPhoto: "https://lh3.googleusercontent.com/a-/ALV-UjVGCwysnLFfCUuS1ESI6Ufk2eBX_UZl8yQLgeR8YN-z3u0R=s128-c0x00000000-cc-rp-mo-ba5",
    relativeTime: "Hace 2 meses"
  },
  {
    index: 3,
    description: "Cada semana lo recibimos y es una MUY buena opción para el desperdicio alimentario y para nosotros es muy reconfortante tener fruta y verdura de temporada a precio JUsTO!!\nLo recomiendo. Es una buena iniciativa.",
    rating: 5,
    name: "familia codijimi",
    authorPhoto: "https://lh3.googleusercontent.com/a-/ALV-UjXNM8TZYv4yCLJNAkfQ2AvAQ-1_uL6COVpREWZdirBu21Q=s128-c0x00000000-cc-rp-mo",
    relativeTime: "Hace 3 semanas"
  },
  {
    index: 4,
    description: "Ya van varias cajas y puedo decir que el producto es bueno y simplemente no cumple con la estetica de los supermercados pero supera con creces su calidad.\nEstoy totalmente satisfecha.\n\nMi primera caja y estoy encantada, buena calidad, facilidad de entrega, una buena causa, tips de conservacion y receta...se puede pedir más?",
    rating: 4.5,
    name: "Annadirri",
    authorPhoto: "https://lh3.googleusercontent.com/a-/ALV-UjVGCwysnLFfCUuS1ESI6Ufk2eBX_UZl8yQLgeR8YN-z3u0R=s128-c0x00000000-cc-rp-mo-ba5",
    relativeTime: "Hace 2 meses"
  },
  {
    index: 5,
    description: "Cada semana lo recibimos y es una MUY buena opción para el desperdicio alimentario y para nosotros es muy reconfortante tener fruta y verdura de temporada a precio JUsTO!!\nLo recomiendo. Es una buena iniciativa.",
    rating: 5,
    name: "familia codijimi",
    authorPhoto: "https://lh3.googleusercontent.com/a-/ALV-UjXNM8TZYv4yCLJNAkfQ2AvAQ-1_uL6COVpREWZdirBu21Q=s128-c0x00000000-cc-rp-mo",
    relativeTime: "Hace 3 semanas"
  }
]

</script>




