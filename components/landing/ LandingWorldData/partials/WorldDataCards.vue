<template>
  <div class="flex flex-row justify-evenly lg:w-11/12 lg:mx-auto">
    <div
      v-for="item in data"
      :key="item.index"
      class="w-1/4 mx-2"
    >
      <div
        id="dark"
        class="h-[300px] flex flex-col justify-center items-center"
      >
        <div
          class="flex flex-col justify-center items-center text-center rounded-full border-2 border-green-primary mx-auto z-10"
          :class="[
            item.index % 2 === 0 ? 'bg-green-primary' : 'bg-green-tertiary',
            item.index === 1
              ? [
                'h-44 w-44',
                playAnimation ? animateClasses[item.index - 1] : '',
              ]
              : item.index === 2
                ? [
                  'h-40 w-40',
                  playAnimation ? animateClasses[item.index - 1] : '',
                ]
                : item.index === 3
                  ? [
                    'h-32 w-32',
                    playAnimation ? animateClasses[item.index - 1] : '',
                  ]
                  : [
                    'h-60 w-60',
                    playAnimation ? animateClasses[item.index - 1] : '',
                  ],
          ]"
        >
          <p
            class="font-recoleta-medium text-[26px]"
            :class="
              item.index % 2 !== 0
                ? 'text-green-quaternary'
                : 'text-green-tertiary'
            "
          >
            {{ item.value }}
          </p>
        </div>
        <div
          class="w-0.5 bg-green-primary absolute z-0"
          :class="
            item.index === 1
              ? 'top-[418px] h-20'
              : item.index === 2
                ? 'top-[410px] h-20'
                : item.index === 3
                  ? 'top-[400px] h-24'
                  : 'top-[440px] h-14'
          "
        />
        <div
          class="w-2 h-2 rounded-full absolute top-[490px] bg-green-primary"
        />
      </div>
      <div>
        <p class="text-center mt-2 text-[20px] w-10/12 mx-auto">
          {{ item["description_" + localeLanguage] }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { CarouselSlideObject } from '~/components/talkual-ui/TKCarousel/TKCarouselTypes'

defineProps({
  data: {
    type: Array as PropType<CarouselSlideObject[]>,
    required: true,
  },
})

const localeLanguage = computed(() => {
  return useI18n().locale.value
})

const playAnimation: Ref<boolean> = ref(false)

const animateClasses: Record<number, string> = {
  0: 'animate-scaleAnimation animation-delay-500',
  1: 'animate-scaleAnimation animation-delay-1000',
  2: 'animate-scaleAnimation animation-delay-1500',
  3: 'animate-scaleAnimation animation-delay-2000',
}

let worldDataObserver: IntersectionObserver | null = null

onMounted(() => {
  setObserver()
})

onBeforeUnmount(() => {
  disconnectObserver()
})

const setObserver = () => {
  const target = document.querySelector('#dark')
  worldDataObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting === true) {
      playAnimation.value = true
    }
    else {
      playAnimation.value = false
    }
  })
  worldDataObserver?.observe(target as HTMLElement)
}

const disconnectObserver = () => {
  worldDataObserver?.disconnect()
}
</script>

<style>
@keyframes scaleAnimation {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.8);
  }
  100% {
    transform: scale(1);
  }
}
</style>
