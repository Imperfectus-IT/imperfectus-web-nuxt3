<template>
  <TKCarousel
    tabindex="0"
    :data="cardsData"
    :show-pagination="!isDesktop"
    :show-navigation="isDesktop"
    :visible-items="!isDesktop ? 1.1 : 4"
    :navigation-next-class="'absolute text-[40px] left-12'"
    :navigation-prev-class="'absolute text-[40px] right-12'"
    @click="($event) => handleClick($event)"
  />
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { locale, t } = useI18n()
const language = computed(() => locale.value)
const { isDesktop } = useScreenSize()
const selectedDesignId = ref<number>(1)

const section = t('gift-card.create.images')
const cards = 6
const emits = defineEmits(['update-designId'])

const cardsData = ref<{ image: string }[]>([])

const handleClick = (event: MouseEvent) => {
  const target = event.target as HTMLImageElement
  const match = target.src.match(/(\d)\.webp$/)
  if (match) {
    emits('update-designId', parseInt(match[1] as string))
    selectedDesignId.value = parseInt(match[1] as string)
  }
}

watch(selectedDesignId, () => {
  cardsData.value = Array.from({ length: cards }, (_, i) => ({
    image: `${section}${language.value}/${i + 1}.webp`,
    imageClass: selectedDesignId.value === i + 1 ? 'w-[284px] h-[190px] cursor-pointer border-4 border-green-primary rounded-xl' : 'w-[284px] h-[190px] cursor-pointer',
  }))
})

onMounted(() => {
  cardsData.value = Array.from({ length: cards }, (_, i) => ({
    image: `${section}${language.value}/${i + 1}.webp`,
    imageClass: i === 0 ? 'w-[284px] h-[190px] cursor-pointer border-4 border-green-primary rounded-xl' : 'w-[284px] h-[190px] cursor-pointer ',
  }))
})
</script>
